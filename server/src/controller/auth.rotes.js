import passport from "passport";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import simpleGit from 'simple-git'
import { User } from "../models/user.model.js";
//import transponder from "./mailer.js";
import toast from "react-hot-toast";
import Apiresponse from "../utils/Apiresponse.js";
import {check,validationResult } from 'express-validator'
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

// function to send email, there is an issue with it so we leaving as it is 

const sendVerificationEmail = async (user) => {
  const emailSecret = process.env.EMAIL ;
  const token = jwt.sign({ id: user._id }, emailSecret, { expiresIn: "1h" });

  const url = `https://error-logger.onrender.com/verify/${token}`;

  await transponder.sendMail({
    to: user.email,
    subject: "Verify Your Account",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border-radius: 8px; border: 1px solid #eee;">
      <h2 style="color: #333;">🔒 Verify Your Email</h2>
      <p>Hello ${user.name || "there"},</p>
      <p>Thank you for signing up for <strong>ErrorLogger</strong>.</p>
      <p>Please verify your email address by clicking the button below:</p>
      <a href="${url}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
      <p style="margin-top: 20px;">Or copy and paste this link into your browser:</p>
      <p><a href="${url}" style="color: #4F46E5;">${url}</a></p>
      <hr style="margin-top: 30px;" />
      <p style="font-size: 12px; color: #777;">If you did not create an account, you can safely ignore this email.</p>
    </div>`,
  });
};

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).send("User not found");

    user.verified = true;
    await user.save();

    res.send("Email verified successfully");
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
});

// Register a new user
router.post("/register",   [
    // ✅ Input Validation & Sanitization
    check("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters")
      .escape(),

    check("email")
      .trim()
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail(),

    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),

  ],async (req, res) => {
     // ✅ Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });}

  try {
    const { username, email, password ,googleId} = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const userData = new User({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });
       // Only include googleId if it's present and non-null
    if (googleId) {
      userData.googleId = googleId;
    }

    await userData.save();
    await sendVerificationEmail(userData);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Login user
router.post("/login",[
  check("email").isEmail().normalizeEmail(),
  check("password").notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token"); // only if you're using cookies
  res.status(200).json({ message: "Logged out successfully" });
});


// Google authentication route
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google callback route
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, send a token
    const token = jwt.sign({  userId: req.user._id}, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });
    res.redirect(
      `https://error-logger-rust.vercel.app/success?token=${token}`
    );
  }
);

// Success route
router.get('/success', (req, res) => {
  const { token } = req.query;
  // Render a success page or send a response with the token
  res.json({ message: 'Authentication successful', token });
});

// Protected Route
router.get('/isAuthenticated', authMiddleware, (req, res) => {
  res.status(200).json({
    message: 'This is a protected endpoint',
    user: req.user,
  });
});

















// admin user
router.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL ;
    const adminPassword = process.env.ADMIN_PASS ;
    if (email === adminEmail && password === adminPassword) {
      // Generate token for admin (use a static admin ID)
      const adminId = "admin123";
      const token = jwt.sign(
        { userId: adminId, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
      });
      res.status(200).json(new Apiresponse(200, "Admin Token", { token }));
    } else {
      res.status(401).json({ error: "Invalid admin credentials" });
    }
  } catch (err) {
    console.error("Admin login error:", err);
    res
      .status(500)
      .json({ error: "Internal server error or not have admin access" });
  }
});


//get user profile
router.get("/profile", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: Token missing" });
    }
    //console.log("token recived", token);
    //decode token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    if (decoded.isAdmin) {
      // Return admin profile info
      return res.status(200).json({
        _id: decoded.userId,
        username: "admin",
        email: "Sunny@123",
        isAdmin: true,
      });
    }
    if (!decoded.userId) {
      return res.status(403).json({ error: "Access denied: Not a user token" });
    }
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//get all user
router.get("/usersall", authMiddleware, async (req, res) => {
  try {
    if (!req.userData || !req.userData.isAdmin) {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find({ isAdmin: false }).select(
      "email createdAt username password"
    );
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// upadte new pass
router.post("/updatepass", authMiddleware, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Both old and new passwords are required" });
    }

    // Get user by ID from auth middleware
    const user = await User.findById(req.userData.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect" });
    }

    // Hash and save the new password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


//git records
const git = simpleGit();

router.get('/commits', async (req, res) => {
  try {
    const log = await git.log({ maxCount: 5 }); // Get last 5 commits
    const commits = log.all.map(commit => ({
      message: commit.message,
      author: commit.author_name,
      date: commit.date,
    }));
    res.json(commits);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Unable to fetch commits' });
  }
});


router.post("/updateemail", authMiddleware, async (req, res) => {
  console.log("Hit /updateemail route"); // <-- add this

  try {
    const { newEmail } = req.body;
    const { email } = req.userData;

    if (!newEmail) {
      return res.status(400).json({ error: "New email is required" });
    }

    const existing = await User.findOne({ email: newEmail });
    if (existing) {
      return res.status(409).json({ error: "Email already in use" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.email = newEmail;
    await user.save();

    res.status(200).json({ message: "Email updated successfully" });
  } catch (err) {
    console.error("Update email error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
