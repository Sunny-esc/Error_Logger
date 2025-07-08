import express from 'express';
import cors from 'cors';
import healthcheckRouter from './routes/healthcheck.route.js';
import cookieParser from 'cookie-parser';
import router from './routes/auth.js';
import errorHandler from './middleware/error.middleware.js';
import Erouter from './controller/error.controller.js';
import Frouter from './controller/feedback.controller.js';
import path from "path";
import session from 'express-session';

import passport from 'passport';


import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

// Cookie and JSON parsing
app.use(cookieParser());
app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static('public'));

// ✅ CORS comes FIRST
const allowedOrigins = [
  'https://error-logger-rust.vercel.app', // production frontend
  'http://localhost:5173' // development frontend
];


app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(session({ secret:process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// Routes
app.use('/api/auth', router);
app.use('/api/',Erouter);
app.use('/api/v1/healthcheck', healthcheckRouter);
app.use('/api/', Frouter);

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  
}
// Error handler (should be last)
app.use(errorHandler);

export { app };
