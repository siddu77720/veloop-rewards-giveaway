// backend/src/models/PrizeClaim.js
const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  winnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'GiveawayWinner', required: true },
  userId: { type: String, required: true },
  prizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', required: true },
  claimType: { type: String, enum: ['PHYSICAL', 'GIFT_CARD'], required: true },
  fullName: { type: String },
  phone: { type: String },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  pin: { type: String },
  email: { type: String },
  status: { type: String, enum: ['NOT_SUBMITTED', 'SUBMITTED', 'PROCESSING', 'COMPLETED', 'EXPIRED'], default: 'SUBMITTED' },
  claimDeadline: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('PrizeClaim', claimSchema);