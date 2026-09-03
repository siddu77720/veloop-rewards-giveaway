// src/hooks/useGiveaway.js
import { useState, useEffect, useRef } from 'react';
import { currentGiveaway, prizes, winnerList, previousWinners } from '../data/giveawayData';
import { getCurrentGiveaway } from '../services/api';

const baseGiveawayState = {
  current: currentGiveaway,
  prizes: prizes,
  winners: winnerList,
  previousWinners: previousWinners,
  isLive: false,
};

const attachBackendIds = (demoPrizes, backendPrizes) => {
  if (!Array.isArray(backendPrizes) || backendPrizes.length === 0) {
    return demoPrizes;
  }

  const usedBackendIds = new Set();

  const findMatch = (demoPrize) => {
    let match = backendPrizes.find(
      (bp) =>
        bp?._id &&
        !usedBackendIds.has(String(bp._id)) &&
        bp.name &&
        bp.name.trim().toLowerCase() === demoPrize.name.trim().toLowerCase()
    );
    if (match) return match;

    match = backendPrizes.find(
      (bp) =>
        bp?._id &&
        !usedBackendIds.has(String(bp._id)) &&
        bp.position &&
        demoPrize.position &&
        bp.position.trim().toLowerCase() === demoPrize.position.trim().toLowerCase()
    );
    if (match) return match;

    return null;
  };

  const withDirectMatches = demoPrizes.map((demoPrize) => {
    const match = findMatch(demoPrize);
    if (match) usedBackendIds.add(String(match._id));
    return { demoPrize, match };
  });

  const leftoverBackend = backendPrizes.filter((bp) => !usedBackendIds.has(String(bp._id)));
  let leftoverIndex = 0;

  return withDirectMatches.map(({ demoPrize, match }) => {
    let finalMatch = match;

    if (!finalMatch && demoPrizes.length === backendPrizes.length && leftoverIndex < leftoverBackend.length) {
      finalMatch = leftoverBackend[leftoverIndex];
      leftoverIndex += 1;
    }

    if (!finalMatch) return demoPrize;

    return {
      ...demoPrize,
      _id: finalMatch._id,
      giveawayId: finalMatch.giveawayId,
    };
  });
};

const buildGiveawayState = async () => {
  try {
    const apiCurrentGiveaway = await getCurrentGiveaway();

    if (apiCurrentGiveaway && apiCurrentGiveaway._id) {
      return {
        ...baseGiveawayState,
        current: { ...currentGiveaway, _id: apiCurrentGiveaway._id },
        prizes: attachBackendIds(prizes, apiCurrentGiveaway.prizes),
        isLive: true,
      };
    }

    return baseGiveawayState;
  } catch {
    return baseGiveawayState;
  }
};

export const useGiveaway = () => {
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [data, setData] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    buildGiveawayState().then((state) => {
      if (!mountedRef.current) return;
      setData(state);
      setLoading(false);
    });

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const refetch = () => {
    setLoading(true);
    buildGiveawayState().then((state) => {
      if (!mountedRef.current) return;
      setData(state);
      setLoading(false);
    });
  };

  return { loading, error, data, refetch };
};