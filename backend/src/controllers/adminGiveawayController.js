// backend/src/controllers/adminGiveawayController.js
const Giveaway = require('../models/Giveaway');
const GiveawayParticipation = require('../models/GiveawayParticipation');
const GiveawayWinner = require('../models/GiveawayWinner');

// Create new giveaway (Admin only)
exports.createGiveaway = async (req, res) => {
  try {
    const giveaway = await Giveaway.create(req.body);
    res.status(201).json(giveaway);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update giveaway status (Admin only)
exports.updateGiveawayStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const giveaway = await Giveaway.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!giveaway) {
      return res.status(404).json({ message: 'Giveaway not found' });
    }
    res.status(200).json(giveaway);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Select winners (Admin only)
exports.selectWinners = async (req, res) => {
  try {
    const giveawayId = req.params.id;
    const giveaway = await Giveaway.findById(giveawayId).populate('prizes');
    if (!giveaway) {
      return res.status(404).json({ message: 'Giveaway not found' });
    }

    // Dobara select-winners na chal jaye isliye check
    const alreadySelected = await GiveawayWinner.findOne({ giveawayId });
    if (alreadySelected) {
      return res.status(400).json({ message: 'Winners have already been selected for this giveaway' });
    }

    const participations = await GiveawayParticipation.find({ giveawayId, status: 'SUCCESS' });
    if (participations.length === 0) {
      return res.status(400).json({ message: 'No participations found' });
    }

    const winners = [];
    for (const prize of giveaway.prizes) {
      const prizeParticipations = participations.filter(
        p => p.prizeId.toString() === prize._id.toString()
      );
      if (prizeParticipations.length === 0) continue;

      const shuffled = [...prizeParticipations].sort(() => 0.5 - Math.random());
      const selectedWinners = shuffled.slice(0, prize.winnerCount);

      for (const winner of selectedWinners) {
        const giveawayWinner = await GiveawayWinner.create({
          giveawayId,
          prizeId: prize._id,
          userId: winner.userId,
          selectionMethod: 'random',
          status: 'NOTIFIED'
        });
        winners.push(giveawayWinner);
      }
    }

    await Giveaway.findByIdAndUpdate(giveawayId, { status: 'ENDED' });
    res.status(201).json(winners);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all giveaways (Admin only)
exports.getAllGiveaways = async (req, res) => {
  try {
    const giveaways = await Giveaway.find().populate('prizes').sort({ createdAt: -1 });
    res.status(200).json(giveaways);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};