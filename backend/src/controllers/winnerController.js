// backend/src/controllers/winnerController.js
const GiveawayWinner = require('../models/GiveawayWinner');
const Giveaway = require('../models/Giveaway');

// Get winners for a giveaway
exports.getWinners = async (req, res) => {
  try {
    const winners = await GiveawayWinner.find({
      giveawayId: req.params.id
    }).populate('prizeId');

    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get previous winners
exports.getPreviousWinners = async (req, res) => {
  try {
    const giveaways = await Giveaway.find({ status: 'ENDED' });
    const giveawayIds = giveaways.map(g => g._id);

    const winners = await GiveawayWinner.find({
      giveawayId: { $in: giveawayIds }
    }).populate('giveawayId').populate('prizeId');

    res.status(200).json(winners);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};