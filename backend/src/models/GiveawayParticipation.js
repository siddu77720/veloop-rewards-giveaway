// backend/src/models/GiveawayParticipation.js
const mongoose = require('mongoose');

const participationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway', required: true },
  prizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', required: true },
  entryCurrency: { type: String, required: true },
  entryAmount: { type: Number, required: true },
  deviceHash: { type: String },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'REVERSED'], default: 'SUCCESS' },
  joinedAt: { type: Date, default: Date.now },
  transactionId: { type: String }
}, { timestamps: true });

// One user can participate only once per giveaway
participationSchema.index({ userId: 1, giveawayId: 1 }, { unique: true });

module.exports = mongoose.model('GiveawayParticipation', participationSchema);