// src/utils/device.js
// Har browser ke liye ek persistent random device hash generate/store karta hai.
// Backend isse fraudMiddleware mein "same device multiple accounts" detect karne ke liye use karta hai.

const DEVICE_KEY = 'veloop_device_hash';

export const getDeviceHash = () => {
  let hash = localStorage.getItem(DEVICE_KEY);
  if (!hash) {
    hash = 'dev_' + crypto.randomUUID();
    localStorage.setItem(DEVICE_KEY, hash);
  }
  return hash;
};