// backend/src/models/GiveawayEntryTransaction.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway', required: true },
  prizeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prize', required: true },
  currency: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ['DEBIT', 'CREDIT'], required: true },
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'REVERSED'], default: 'SUCCESS' },
  balanceBefore: { type: Number, required: true },
  balanceAfter: { type: Number, required: true },
  transactionId: { type: String, unique: true },
  idempotencyKey: { type: String, unique: true, sparse: true } // same key dobara aaye toh duplicate process na ho
}, { timestamps: true });

module.exports = mongoose.model('GiveawayEntryTransaction', transactionSchema);