// backend/src/models/Prize.js
const mongoose = require('mongoose');

const prizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  type: { type: String, enum: ['PHYSICAL', 'GIFT_CARD', 'DIGITAL'], required: true },
  claimType: { type: String, enum: ['PHYSICAL', 'GIFT_CARD'], required: true },
  winnerCount: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  entryFee: { type: Number, required: true },
  currency: { type: String, enum: ['VEs', 'SVEs', 'Tokens'], required: true },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prize', prizeSchema);