// backend/src/controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Dev login — VELOOP's real auth system issues userId-based sessions (e.g. "VE10025"),
// so this endpoint accepts { userId } and finds/creates that user in our own DB.
// FIX: previously expected { email, password } while the frontend (and the User
// model, which has no email/password fields at all) always sent { userId } —
// every login attempt returned 400 "Please provide email and password", which
// meant nobody could ever get a token and the whole join/claim flow was dead.
exports.devLogin = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Please provide userId'
      });
    }

    let user = await User.findOne({ userId });

    if (!user) {
      // First time we see this VELOOP userId — provision it locally with a
      // demo starting balance so the giveaway flow is testable end-to-end.
      user = await User.create({
        userId,
        name: 'VELOOP User',
        role: userId.toUpperCase() === 'ADMIN' ? 'admin' : 'user',
        balance: { VEs: 5000, SVEs: 5000, Tokens: 5000 }
      });
    }

    const token = jwt.sign(
      {
        id: user.userId,
        role: user.role,
        name: user.name
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.userId,
        name: user.name,
        role: user.role,
        balance: user.balance
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};

// Get current user info (also refreshes balance, since req.user is only the JWT payload)
exports.getMe = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: 'User not authenticated'
      });
    }

    const user = await User.findOne({ userId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      success: true,
      user: {
        id: user.userId,
        name: user.name,
        role: user.role,
        balance: user.balance
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
};