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
import './controller/passport.js'
import passport from 'passport';
import mongoSanitize from 'express-mongo-sanitize'
import helmet from 'helmet'
//import rateLimit from 'express-rate-limit'
//import csurf from 'csurf';

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

//const csrfProtection = csurf({ cookie: false }); // token stored in session
// ✅ CORS comes FIRST
const allowedOrigins = [
, // production frontend
   
];


app.use(
  cors({
    origin:"https://error-logger-rust.vercel.app",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);
app.use(mongoSanitize());     // Prevents MongoDB operator injection
app.use(helmet());

app.use(session({ secret:process.env.JWT_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
//app.use(csrfProtection); // ✅ CSRF protection middleware

// Rate Limiting
//const authLimiter = rateLimit({
 // windowMs: 15 * 60 * 1000, // 15 minutes
  //max: 10, // limit each IP to 10 requests per window
  //message: 'Too many authentication attempts, please try again later.',
  //standardHeaders: true,
  //legacyHeaders: false,
//});

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
