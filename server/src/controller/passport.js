import { User } from '../models/user.model.js';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import dotenv, { config } from 'dotenv'
config("./env")

// Serialize and Deserialize User for session management
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

// Use GoogleStrategy for OAuth 2.0 authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_AUTH_SERVER_CALLBACK, // Update with your callback URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          // If not, create a new user
          user = new User({
            email: profile.emails[0].value,
            username: profile.displayName,
            googleId: profile.id,
            verified:true,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

