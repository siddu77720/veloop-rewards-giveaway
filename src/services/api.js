// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || '/api';

// Get current giveaway
export const getCurrentGiveaway = async () => {
  try {
    const response = await fetch(`${API_URL}/giveaways/current`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current giveaway:', error);
    return null;
  }
};

// Get previous giveaways
export const getPreviousGiveaways = async () => {
  try {
    const response = await fetch(`${API_URL}/giveaways/previous`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching previous giveaways:', error);
    return null;
  }
};

// Join giveaway
export const joinGiveaway = async (giveawayId, prizeId, token, deviceHash) => {
  try {
    const response = await fetch(`${API_URL}/participations/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...(deviceHash ? { 'x-device-hash': deviceHash } : {})
      },
      body: JSON.stringify({ giveawayId, prizeId })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error joining giveaway:', error);
    return null;
  }
};

// Get my participation status for one specific giveaway (e.g. "already joined?")
export const getMyGiveawayStatus = async (giveawayId, token) => {
  try {
    const response = await fetch(`${API_URL}/giveaways/${giveawayId}/my-status`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching participation status:', error);
    return null;
  }
};

// Get winners for a specific giveaway (FIXED path — matches backend /:id/winners)
export const getWinners = async (giveawayId) => {
  try {
    const response = await fetch(`${API_URL}/winners/${giveawayId}/winners`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching winners:', error);
    return null;
  }
};

// Get previous winners across all ended giveaways
export const getPreviousWinners = async () => {
  try {
    const response = await fetch(`${API_URL}/winners/previous`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching previous winners:', error);
    return null;
  }
};

// Submit prize claim (NEW — was missing, modal never called backend)
export const submitClaim = async (winnerId, formData, token) => {
  try {
    const response = await fetch(`${API_URL}/claims/${winnerId}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting claim:', error);
    return null;
  }
};