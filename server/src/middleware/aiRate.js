// middleware/rateLimiter.js (optional for modularity)
import rateLimit from 'express-rate-limit';

// Limit to 60 requests per minute per IP
export const geminiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 50,              // Limit each IP to 60 requests per windowMs
  message: {
    error: 'Too many requests, please wait a moment before trying again.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
