// src/services/auth.js
const API_URL = import.meta.env.VITE_API_URL || '/api';
const TOKEN_KEY = 'veloop_token';

export const devLogin = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    });
    const data = await response.json();
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
    return data;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const logout = () => localStorage.removeItem(TOKEN_KEY);