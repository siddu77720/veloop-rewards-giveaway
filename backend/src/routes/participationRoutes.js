// backend/src/routes/participationRoutes.js
const express = require('express');
const router = express.Router();
const participationController = require('../controllers/participationController');
const { authMiddleware } = require('../middleware/authMiddleware');
const fraudMiddleware = require('../middleware/fraudMiddleware');
const { joinRateLimit } = require('../middleware/rateLimitMiddleware');

// Join giveaway - must be logged in, rate limited, fraud checked
router.post('/join', authMiddleware, joinRateLimit, fraudMiddleware, participationController.joinGiveaway);

// Get my participation status
router.get('/my-status', authMiddleware, participationController.getMyStatus);

module.exports = router;