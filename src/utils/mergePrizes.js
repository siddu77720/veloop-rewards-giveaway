// src/utils/mergePrizes.js
// Merges a backend Prize document (source of truth for money-related fields)
// with the locally bundled display assets (image, participants, remainingTime)
// that the backend doesn't store. Matching is done by prize name.
//
// Why this exists: the backend seed stores `image` as "/assets/iphone.png"
// (a public-folder style path), but this Vite project imports images from
// src/assets and bundles them with hashed filenames — that path never
// resolves. Rather than silently showing a broken <img>, we keep using our
// bundled asset for the picture while trusting the backend for entryFee,
// currency, winnerCount and the real Mongo _id used to actually join.

import { prizes as staticPrizes } from '../data/giveawayData';

export const mergePrizeWithAssets = (backendPrize) => {
  if (!backendPrize) return backendPrize;

  const staticMatch = staticPrizes.find(
    (p) => p.name.toLowerCase() === backendPrize.name.toLowerCase()
  );

  return {
    // cosmetic-only fallbacks the backend doesn't track
    participants: staticMatch?.participants || '—',
    remainingTime: staticMatch?.remainingTime || '—',
    image: staticMatch?.image || backendPrize.image,
    // backend is authoritative for everything below
    ...backendPrize,
    // real Mongo id — used for routing (/giveaway/:prizeId) and for join()
    id: backendPrize._id,
  };
};

export const mergePrizesWithAssets = (backendPrizes = []) =>
  backendPrizes.map(mergePrizeWithAssets);