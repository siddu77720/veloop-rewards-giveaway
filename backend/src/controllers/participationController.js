// backend/src/controllers/participationController.js
const crypto = require('crypto');
const mongoose = require('mongoose');
const GiveawayParticipation = require('../models/GiveawayParticipation');
const Giveaway = require('../models/Giveaway');
const Prize = require('../models/Prize');
const User = require('../models/User');
const GiveawayEntryTransaction = require('../models/GiveawayEntryTransaction');
const AuditLog = require('../models/AuditLog');

exports.joinGiveaway = async (req, res) => {
  const { giveawayId, prizeId, idempotencyKey } = req.body;
  const userId = req.user.id;
  const deviceHash = req.headers['x-device-hash'] || null;

  if (!mongoose.Types.ObjectId.isValid(giveawayId) || !mongoose.Types.ObjectId.isValid(prizeId)) {
    return res.status(400).json({ message: 'Invalid giveaway or prize reference' });
  }

  try {
    if (idempotencyKey) {
      const existingTxn = await GiveawayEntryTransaction.findOne({ idempotencyKey });
      if (existingTxn) {
        const existingParticipation = await GiveawayParticipation.findOne({
          userId, giveawayId, prizeId
        });
        return res.status(200).json({ message: 'Already processed', participation: existingParticipation });
      }
    }

    const giveaway = await Giveaway.findById(giveawayId);
    if (!giveaway) {
      return res.status(404).json({ message: 'Giveaway not found' });
    }
    if (giveaway.status !== 'ACTIVE') {
      return res.status(400).json({ message: 'This giveaway is not active anymore' });
    }
    if (new Date() > new Date(giveaway.endAt)) {
      return res.status(400).json({ message: 'This giveaway has already ended' });
    }

    const prize = await Prize.findById(prizeId);
    if (!prize || prize.giveawayId.toString() !== giveawayId) {
      return res.status(404).json({ message: 'Prize not found for this giveaway' });
    }

    const existingParticipation = await GiveawayParticipation.findOne({ userId, giveawayId });
    if (existingParticipation) {
      return res.status(400).json({ message: 'You have already joined this giveaway' });
    }

    const currency = prize.currency;
    const amount = prize.entryFee;

    const balanceField = `balance.${currency}`;
    const updatedUser = await User.findOneAndUpdate(
      { userId, [balanceField]: { $gte: amount } },
      { $inc: { [balanceField]: -amount } },
      { new: true }
    );

    if (!updatedUser) {
      const currentUser = await User.findOne({ userId });
      const currentBalance = currentUser ? currentUser.balance[currency] : 0;
      return res.status(400).json({
        message: `Insufficient ${currency}. You need ${amount - currentBalance} more ${currency} to join.`
      });
    }

    const balanceBefore = updatedUser.balance[currency] + amount;
    const balanceAfter = updatedUser.balance[currency];
    const transactionId = `TXN-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;

    try {
      const participation = await GiveawayParticipation.create({
        userId,
        giveawayId,
        prizeId,
        entryCurrency: currency,
        entryAmount: amount,
        deviceHash,
        status: 'SUCCESS',
        transactionId
      });

      await GiveawayEntryTransaction.create({
        userId, giveawayId, prizeId, currency, amount,
        type: 'DEBIT',
        status: 'SUCCESS',
        balanceBefore, balanceAfter,
        transactionId,
        idempotencyKey: idempotencyKey || undefined
      });

      await AuditLog.create({
        userId, action: 'GIVEAWAY_JOIN_SUCCESS', giveawayId,
        amount, currency, result: 'SUCCESS', requestId: transactionId
      });

      return res.status(201).json({
        message: 'Successfully joined the giveaway!',
        participation,
        newBalance: balanceAfter
      });

    } catch (innerError) {
      await User.findOneAndUpdate(
        { userId },
        { $inc: { [balanceField]: amount } }
      );
      await GiveawayEntryTransaction.create({
        userId, giveawayId, prizeId, currency, amount,
        type: 'CREDIT',
        status: 'REVERSED',
        balanceBefore: balanceAfter,
        balanceAfter: balanceAfter + amount,
        transactionId: `${transactionId}-REFUND`
      });
      await AuditLog.create({
        userId, action: 'GIVEAWAY_JOIN_FAILED_REFUNDED', giveawayId,
        amount, currency, result: 'FAILED', requestId: transactionId
      });

      if (innerError.code === 11000) {
        return res.status(400).json({ message: 'You have already joined this giveaway' });
      }
      throw innerError;
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyStatus = async (req, res) => {
  try {
    const participation = await GiveawayParticipation.find({
      userId: req.user.id
    }).populate('giveawayId').populate('prizeId');

    res.status(200).json(participation);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getMyStatusForGiveaway = async (req, res) => {
  try {
    const participation = await GiveawayParticipation.findOne({
      userId: req.user.id,
      giveawayId: req.params.id
    }).populate('prizeId');

    res.status(200).json({ hasJoined: !!participation, participation: participation || null });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};