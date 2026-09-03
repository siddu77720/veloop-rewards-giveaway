// src/data/giveawayData.js

import iphoneImage from '../assets/iphone.png';
import watchImage from '../assets/watch.png';
import airpodsImage from '../assets/airpods.png';
import amazonImage from '../assets/amazon.png';
import giftboxImage from '../assets/giftbox.png';
import coinsImage from '../assets/coins.png';
import trophyImage from '../assets/trophy.png';
import ticketImage from '../assets/ticket.png';
import heroBannerImage from '../assets/hero-banner.png';

export const currentGiveaway = {
  id: "GW-2026-08",
  title: "Summer Rewards Giveaway",
  status: "active",
  startDate: "2026-08-01T00:00:00Z",
  endDate: "2026-09-10T00:00:00Z",
  participants: 8500,
  totalGiveaways: 24,
  totalParticipants: "8.5K+",
  prizesWon: "1.2K+",
  entryFee: 250,
  currency: "VEs",
  description: "Complete eligible activities, collect entries and get a chance to win exciting rewards.",
  heroImage: heroBannerImage,
  giftboxImage: giftboxImage,
  coinsImage: coinsImage,
  trophyImage: trophyImage,
  ticketImage: ticketImage,
};

export const prizes = [
  {
    id: "PRIZE-001",
    name: "iPhone 15 Pro",
    position: "1st Prize",
    type: "physical",
    claimType: "physical",
    winnerCount: 1,
    participants: "2.3K+",
    remainingTime: "12d",
    entryFee: 250,
    currency: "VEs",
    image: iphoneImage,
    description: "Latest iPhone 15 Pro",
  },
  {
    id: "PRIZE-002",
    name: "Apple Watch",
    position: "2nd Prize",
    type: "physical",
    claimType: "physical",
    winnerCount: 3,
    participants: "1.8K+",
    remainingTime: "12d",
    entryFee: 200,
    currency: "VEs",
    image: watchImage,
    description: "Apple Watch Series 9",
  },
  {
    id: "PRIZE-003",
    name: "AirPods Pro",
    position: "3rd Prize",
    type: "physical",
    claimType: "physical",
    winnerCount: 5,
    participants: "1.2K+",
    remainingTime: "12d",
    entryFee: 500,
    currency: "SVEs",
    image: airpodsImage,
    description: "AirPods Pro (2nd Gen)",
  },
  {
    id: "PRIZE-004",
    name: "Amazon Gift Card (₹2,000)",
    position: "Lucky Draw",
    type: "gift_card",
    claimType: "gift_card",
    winnerCount: 10,
    participants: "5.0K+",
    remainingTime: "12d",
    entryFee: 500,
    currency: "VEs",
    image: amazonImage,
    description: "₹2,000 Amazon Voucher",
  },
];

export const currentUser = {
  id: "VE10025",
  name: "You",
  balance: {
    VEs: 3850,
    SVEs: 1240,
    Tokens: 5000,
  },
  isLoggedIn: true,
  hasJoined: false,
};

export const winnerSliderMessages = [
  "VE****21 won an iPhone 15 Pro!",
  "VE****83 won an Apple Watch!",
  "VE****54 won AirPods Pro!",
  "VE****92 won an Amazon Gift Card!",
];

export const previousWinners = [
  {
    id: "WIN-001",
    userId: "VE****42",
    prizeName: "iPhone 15 Pro",
    giveawayName: "August Reward Rush",
    date: "05 Aug 2026",
    type: "physical",
  },
  {
    id: "WIN-002",
    userId: "VE****91",
    prizeName: "Apple Watch Series 9",
    giveawayName: "Summer Rewards",
    date: "06 Aug 2026",
    type: "physical",
  },
  {
    id: "WIN-003",
    userId: "VE****27",
    prizeName: "AirPods Pro",
    giveawayName: "July Mega Giveaway",
    date: "01 Aug 2026",
    type: "physical",
  },
  {
    id: "WIN-004",
    userId: "VE****88",
    prizeName: "₹2,000 Amazon Gift Card",
    giveawayName: "Independence Rewards",
    date: "15 Aug 2026",
    type: "gift_card",
  },
];

export const winnerList = [
  {
    id: "WIN-CUR-001",
    userId: "VE10025",
    prizeName: "Apple Watch Series 9",
    date: "10 Sep 2026",
    status: "winner",
  },
  {
    id: "WIN-CUR-002",
    userId: "VE****77",
    prizeName: "iPhone 15 Pro",
    date: "10 Sep 2026",
    status: "winner",
  },
];

export const giveawayRules = [
  "Eligibility: Must be a registered VELOOP user.",
  "Participation: One entry per user per giveaway.",
  "Winner Selection: Random and transparent selection process.",
  "Claim Period: Winners must claim within 7 days.",
  "Disqualification: Fraudulent activity leads to disqualification.",
];

export const faqs = [
  {
    question: "How do I participate?",
    answer: "Login to your account, click Join Giveaway, and pay the entry fee using your VEs/SVEs/Tokens.",
  },
  {
    question: "How are winners selected?",
    answer: "Winners are selected randomly by the backend system after the giveaway ends.",
  },
  {
    question: "When are winners announced?",
    answer: "Winners are announced within 24 hours after the giveaway ends.",
  },
  {
    question: "How do I claim my prize?",
    answer: "If you are a winner, a Claim Your Prize button will appear on your dashboard. Fill in the required details.",
  },
];