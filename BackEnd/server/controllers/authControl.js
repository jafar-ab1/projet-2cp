const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require("../../config.js");
const VerificationCode = require('../models/VerificationCode');
const { sendVerificationEmail } = require('../services/emailService');

// Registration (keeps verification requirement)
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, mobileNumber } = req.body;
    
    // Check if user already exists
    const found = await User.findOne({ email });
    if (found) return res.status(401).json({ message: `Email ${email} already exists` });

    // Create new user (not verified by default)
    const user = new User({
      fullName, 
      email, 
      password, 
      mobileNumber,
      isVerified: false
    });
    await user.save();

    // Generate and send verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save verification code
    await VerificationCode.findOneAndUpdate(
      { email },
      { code, expiresAt },
      { upsert: true, new: true }
    );

    // Send verification email
    await sendVerificationEmail(email, code);

    res.status(201).json({ 
      message: "User registered successfully. Please check your email for verification code.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified
      },
      requiresVerification: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error during registration.', error });
  }
};

// Login (removed verification check)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Email or password incorrect.' });
    }

    // Verify password
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      return res.status(401).json({ message: 'Email or password incorrect.' });
    }

    // Generate JWT token (no verification check)
    const token = jwt.sign(
      { id: user._id },
      config.jwt.keys.secret,
      { 
        algorithm: 'HS256',
        expiresIn: '1h'
      }
    );

    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error during login.', error });
  }
};

// Send verification code (unchanged)
exports.sendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ message: "Email already verified." });
    }
    
    // Generate 6-digit PIN
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Save verification code
    await VerificationCode.findOneAndUpdate(
      { email },
      { code, expiresAt },
      { upsert: true, new: true }
    );

    // Send email
    await sendVerificationEmail(email, code);

    res.status(200).json({ message: "Verification code sent successfully." });
  } catch (error) {
    console.error("Error sending verification code:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Verify email (unchanged)
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    // Find verification code
    const verification = await VerificationCode.findOne({ email });
    if (!verification) {
      return res.status(400).json({ message: "No verification code found." });
    }

    // Verify code
    if (verification.code !== code) {
      return res.status(400).json({ message: "Invalid code." });
    }

    // Check if code expired
    if (verification.expiresAt < new Date()) {
      return res.status(400).json({ message: "Code expired." });
    }

    // Mark user as verified
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Delete verification code
    await VerificationCode.deleteOne({ email });

    // Generate JWT token now that email is verified
    const token = jwt.sign(
      { id: user._id },
      config.jwt.keys.secret,
      { 
        algorithm: 'HS256',
        expiresIn: '1h'
      }
    );

    res.status(200).json({
      message: "Email verified successfully!",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified
      }
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};