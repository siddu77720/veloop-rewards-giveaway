// backend/src/middleware/rateLimitMiddleware.js
const rateLimit = require('express-rate-limit');

// Rate limit for joining giveaway
const joinRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // 5 requests per minute
  message: {
    message: 'Too many requests. Please try again later.'
  }
});

// Rate limit for claiming prize
const claimRateLimit = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // 3 requests per minute
  message: {
    message: 'Too many requests. Please try again later.'
  }
});

module.exports = { joinRateLimit, claimRateLimit };