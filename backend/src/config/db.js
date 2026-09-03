// backend/src/config/db.js
const mongoose = require('mongoose');
const Giveaway = require('../models/Giveaway');
const Prize = require('../models/Prize');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/veloop_giveaway');
    console.log('MongoDB Connected Successfully');
    
    const giveawayCount = await Giveaway.countDocuments();
    if (giveawayCount === 0) {
      await seedData();
    }
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    const giveaway = await Giveaway.create({
      title: "Summer Rewards Giveaway",
      slug: "summer-rewards-2026",
      description: "Complete eligible activities, collect entries and get a chance to win exciting rewards.",
      status: "ACTIVE",
      startAt: new Date('2026-08-01'),
      endAt: new Date('2026-09-10'),
      totalParticipants: 8500
    });

    const createdPrizes = await Prize.create([
      {
        name: "iPhone 15 Pro",
        position: "1st Prize",
        type: "PHYSICAL",
        claimType: "PHYSICAL",
        winnerCount: 1,
        image: "/assets/iphone.png",
        description: "Latest iPhone 15 Pro",
        entryFee: 250,
        currency: "VEs",
        giveawayId: giveaway._id
      },
      {
        name: "Apple Watch",
        position: "2nd Prize",
        type: "PHYSICAL",
        claimType: "PHYSICAL",
        winnerCount: 3,
        image: "/assets/watch.png",
        description: "Apple Watch Series 9",
        entryFee: 200,
        currency: "VEs",
        giveawayId: giveaway._id
      },
      {
        name: "AirPods Pro",
        position: "3rd Prize",
        type: "PHYSICAL",
        claimType: "PHYSICAL",
        winnerCount: 5,
        image: "/assets/airpods.png",
        description: "AirPods Pro (2nd Gen)",
        entryFee: 500,
        currency: "SVEs",
        giveawayId: giveaway._id
      }
    ]);

    giveaway.prizes = createdPrizes.map((p) => p._id);
    await giveaway.save();

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Seed data error:', error.message);
  }
};

module.exports = connectDB;