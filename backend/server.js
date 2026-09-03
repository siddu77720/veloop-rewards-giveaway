// backend/server.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const giveawayRoutes = require('./src/routes/giveawayRoutes');
const participationRoutes = require('./src/routes/participationRoutes');
const winnerRoutes = require('./src/routes/winnerRoutes');
const claimRoutes = require('./src/routes/claimRoutes');
const adminRoutes = require('./src/routes/adminRoutes');

const app = express();

// Allowed origins (local dev + deployed frontend)
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173'
].filter(Boolean);

// Middleware
app.use(helmet());
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/giveaways', giveawayRoutes);
app.use('/api/participations', participationRoutes);
app.use('/api/winners', winnerRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/admin', adminRoutes);

// Test Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'VELOOP Backend Running' });
});

// Only listen locally — Vercel handles this itself via api/index.js
if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;