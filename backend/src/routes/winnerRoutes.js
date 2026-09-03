// backend/src/routes/winnerRoutes.js
const express = require('express');
const router = express.Router();
const winnerController = require('../controllers/winnerController');

// Get previous winners
router.get('/previous', winnerController.getPreviousWinners);

// Get winners for a giveaway
router.get('/:id/winners', winnerController.getWinners);

module.exports = router;