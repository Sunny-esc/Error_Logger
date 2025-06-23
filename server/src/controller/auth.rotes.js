import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import transponder from "./mailer.js";
import toast from "react-hot-toast";
import Apiresponse from "../utils/Apiresponse.js";
import authMiddleware from "../middleware/auth.middleware.js";
const router = express.Router();

// function to send email
const sendVerificationEmail = async (user) => {
  const emailSecret = process.env.EMAIL || "s19ctrl@gmail.com";
  const token = jwt.sign({ id: user._id }, emailSecret, { expiresIn: "1h" });

  const url = `http://localhost:3000/verify/${token}`;

  await transponder.sendMail({
    to: user.email,
    subject: "Verify Your Account",
    html: `<p>Click the link below to verify your account:</p><a href="${url}">${url}</a>`,
  });
};

// Register a new user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verified: false,
    });
    await newUser.save();
    await sendVerificationEmail(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, process.env.EMAIL_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) return res.status(404).send("User not found");

    user.verified = true;
    await user.save();

    res.send("Email verified successfully");
  } catch (err) {
    res.status(400).send("Invalid or expired token");
  }
});

// admin user
router.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const adminEmail = process.env.ADMIN_EMAIL || "Sunny@123";
    const adminPassword = process.env.ADMIN_PASS || "Sunny@123";
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

// Login user
router.post("/login", async (req, res) => {
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
      expiresIn: "1h",
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
