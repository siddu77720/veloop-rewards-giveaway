// backend/src/models/Giveaway.js
const mongoose = require('mongoose');

const giveawaySchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['UPCOMING', 'ACTIVE', 'ENDED', 'ARCHIVED'], default: 'ACTIVE' },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true },
  totalParticipants: { type: Number, default: 0 },
  prizes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prize' }]
}, { timestamps: true });

module.exports = mongoose.model('Giveaway', giveawaySchema);