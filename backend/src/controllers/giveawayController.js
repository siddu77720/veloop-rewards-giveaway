// backend/src/controllers/giveawayController.js
const Giveaway = require('../models/Giveaway');

// Get current giveaway
exports.getCurrentGiveaway = async (req, res) => {
  try {
    const giveaway = await Giveaway.findOne({ status: 'ACTIVE' })
      .populate('prizes');
    
    if (!giveaway) {
      return res.status(404).json({ message: 'No active giveaway found' });
    }

    res.status(200).json(giveaway);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get giveaway by ID
exports.getGiveawayById = async (req, res) => {
  try {
    const giveaway = await Giveaway.findById(req.params.id)
      .populate('prizes');
    
    if (!giveaway) {
      return res.status(404).json({ message: 'Giveaway not found' });
    }

    res.status(200).json(giveaway);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get previous giveaways
exports.getPreviousGiveaways = async (req, res) => {
  try {
    const giveaways = await Giveaway.find({ status: 'ENDED' })
      .populate('prizes')
      .sort({ endAt: -1 });
    
    res.status(200).json(giveaways);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};