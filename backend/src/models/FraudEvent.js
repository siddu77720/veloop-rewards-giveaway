// backend/src/models/FraudEvent.js
const mongoose = require('mongoose');

const fraudEventSchema = new mongoose.Schema({
  userId: { type: String },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway' },
  deviceHash: { type: String },
  riskScore: { type: Number, default: 0 },
  reason: { type: String },
  signals: [{ type: String }],
  action: { type: String, enum: ['FLAGGED', 'BLOCKED', 'REVIEW'], default: 'FLAGGED' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('FraudEvent', fraudEventSchema);