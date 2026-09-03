// backend/src/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminGiveawayController = require('../controllers/adminGiveawayController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

// All admin routes require authentication + admin role
router.use(authMiddleware);
router.use(adminMiddleware);

// Admin giveaway routes
router.post('/giveaways', adminGiveawayController.createGiveaway);
router.put('/giveaways/:id/status', adminGiveawayController.updateGiveawayStatus);
router.post('/giveaways/:id/select-winners', adminGiveawayController.selectWinners);
router.get('/giveaways', adminGiveawayController.getAllGiveaways);

module.exports = router;