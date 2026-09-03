// backend/src/controllers/claimController.js
const PrizeClaim = require('../models/PrizeClaim');
const GiveawayWinner = require('../models/GiveawayWinner');
const AuditLog = require('../models/AuditLog');

const CLAIM_WINDOW_DAYS = 7;

// Submit claim
exports.submitClaim = async (req, res) => {
  try {
    const { winnerId } = req.params;
    const userId = req.user.id;

    const winner = await GiveawayWinner.findById(winnerId);
    if (!winner) {
      return res.status(404).json({ message: 'Winner not found' });
    }
    if (winner.userId !== userId) {
      return res.status(403).json({ message: 'Not authorized to claim this prize' });
    }

    // Claim window check
    const deadline = new Date(winner.selectedAt);
    deadline.setDate(deadline.getDate() + CLAIM_WINDOW_DAYS);
    if (new Date() > deadline) {
      return res.status(400).json({ message: 'Your claim window has expired' });
    }

    // Already claimed?
    const existingClaim = await PrizeClaim.findOne({ winnerId });
    if (existingClaim) {
      return res.status(400).json({ message: 'You have already submitted a claim', claim: existingClaim });
    }

    const claim = await PrizeClaim.create({
      winnerId,
      userId,
      prizeId: winner.prizeId,
      claimDeadline: deadline,
      status: 'SUBMITTED',
      ...req.body
    });

    winner.status = 'CLAIMED';
    await winner.save();

    await AuditLog.create({
      userId, action: 'PRIZE_CLAIM_SUBMITTED', result: 'SUCCESS', requestId: claim._id.toString()
    });

    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get my claim status
exports.getMyClaim = async (req, res) => {
  try {
    const claim = await PrizeClaim.findOne({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};