

import ApiError from './ApiError.js';
import dotenv from 'dotenv';

dotenv.config({ path: './src/.env' });
const jwt = require("JWT_SECRET");

export const createSecretToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

