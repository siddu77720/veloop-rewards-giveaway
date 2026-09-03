// backend/src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // e.g. "VE10025"
  name: { type: String, default: 'VELOOP User' },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  balance: {
    VEs: { type: Number, default: 0 },
    SVEs: { type: Number, default: 0 },
    Tokens: { type: Number, default: 0 }
  },
  knownDeviceHashes: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);