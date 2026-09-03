// backend/src/routes/giveawayRoutes.js
const express = require('express');
const router = express.Router();
const giveawayController = require('../controllers/giveawayController');
const participationController = require('../controllers/participationController');
const { authMiddleware } = require('../middleware/authMiddleware');

// Get current giveaway
router.get('/current', giveawayController.getCurrentGiveaway);

// Get previous giveaways
router.get('/previous', giveawayController.getPreviousGiveaways);

// Get my participation status for a specific giveaway (must come before /:id)
router.get('/:id/my-status', authMiddleware, participationController.getMyStatusForGiveaway);

// Get giveaway by ID
router.get('/:id', giveawayController.getGiveawayById);

module.exports = router;