// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://error-logger.onrender.com/api/',
  withCredentials: true, // Allow cookies if using sessions/cookies
});

export default api;
