// src/api/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  withCredentials: true, // Allow cookies if using sessions/cookies
});

export default api;
