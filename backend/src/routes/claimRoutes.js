// backend/src/routes/claimRoutes.js
const express = require('express');
const router = express.Router();
const claimController = require('../controllers/claimController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { claimRateLimit } = require('../middleware/rateLimitMiddleware');

// Get my claim status
router.get('/my-claim', authMiddleware, claimController.getMyClaim);

// Submit claim
router.post('/:winnerId/claim', authMiddleware, claimRateLimit, claimController.submitClaim);

module.exports = router;