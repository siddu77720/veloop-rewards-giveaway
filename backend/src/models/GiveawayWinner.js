// backend/src/models/GiveawayWinner.js
const mongoose = require('mongoose');

const winnerSchema = new mongoose.Schema({
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway', required: true },
  prizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', required: true },
  userId: { type: String, required: true },
  selectionMethod: { type: String, default: 'random' },
  selectedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['PENDING', 'NOTIFIED', 'CLAIMED', 'EXPIRED'], default: 'PENDING' }
}, { timestamps: true });

// Ek user same prize ke liye dobara winner nahi ban sakta (agar select-winners dobara chal jaye)
winnerSchema.index({ giveawayId: 1, prizeId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('GiveawayWinner', winnerSchema);