// backend/src/middleware/fraudMiddleware.js
const FraudEvent = require('../models/FraudEvent');
const GiveawayParticipation = require('../models/GiveawayParticipation');

const fraudMiddleware = async (req, res, next) => {
  try {
    const userId = req.user ? req.user.id : null;
    const deviceHash = req.headers['x-device-hash'] || null;
    const { giveawayId } = req.body;

    // 1. Pehle se BLOCKED user/device hai?
    if (userId) {
      const blocked = await FraudEvent.findOne({ userId, action: 'BLOCKED' });
      if (blocked) {
        return res.status(403).json({
          message: "Participation couldn't be completed. Please try again later or contact support."
        });
      }
    }
    if (deviceHash) {
      const blockedDevice = await FraudEvent.findOne({ deviceHash, action: 'BLOCKED' });
      if (blockedDevice) {
        return res.status(403).json({
          message: "Participation couldn't be completed. Please try again later or contact support."
        });
      }
    }

    // 2. Same device se already alag account ne isi giveaway mein entry li hai kya? -> flag/block
    if (deviceHash && giveawayId && userId) {
      const sameDeviceOtherUser = await GiveawayParticipation.findOne({
        giveawayId,
        deviceHash,
        userId: { $ne: userId }
      });

      if (sameDeviceOtherUser) {
        await FraudEvent.create({
          userId,
          giveawayId,
          deviceHash,
          riskScore: 80,
          reason: 'Same device used by multiple accounts for the same giveaway',
          signals: ['SAME_DEVICE_MULTIPLE_ACCOUNTS'],
          action: 'BLOCKED'
        });
        return res.status(403).json({
          message: "Participation couldn't be completed. Please try again later or contact support."
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = fraudMiddleware;