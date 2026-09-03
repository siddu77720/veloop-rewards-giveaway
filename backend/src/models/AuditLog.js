// backend/src/models/AuditLog.js
const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  userId: { type: String },
  action: { type: String, required: true },
  giveawayId: { type: mongoose.Schema.Types.ObjectId, ref: 'Giveaway' },
  amount: { type: Number },
  currency: { type: String },
  result: { type: String },
  requestId: { type: String },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);