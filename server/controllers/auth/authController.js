import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import asyncHandler from '../../utils/asyncHandler.js';
import { sendEmail } from '../../utils/emailService.js';
import config from '../../config/config.js';
import User from '../../models/user/User.js';
import ApiError from '../../utils/ApiError.js';

const { jwt: jwtConfig, app } = config;

/**
 * Generate JWT Token
 * @param {string} id - User ID
 * @returns {string} JWT token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
  });
};

/**
 * Generate verification/reset token hash
 * @returns {Object} Token details
 */
const generateHashToken = () => {
  const token = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const expiry = Date.now() + jwtConfig.resetTokenExpiresIn;
  return { token, hashedToken, expiry };
};

// --- Controller Functions ---

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate verification token
    const { token, hashedToken, expiry } = generateHashToken();

    // Create user (password hashing is handled by pre-save hook in model)
    const user = await User.create({
      name,
      email,
      password, // Pass plain password, model will hash it
      verificationToken: hashedToken,
      verificationTokenExpiry: expiry,
    });

    // Prepare verification email
    const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${token}`; // Adjust frontend URL later
    const message = `Please verify your email by clicking on the following link: \n\n ${verificationUrl} \n\n This link will expire in 10 minutes.`;

    // Send verification email (simulation)
    await sendEmail({
      to: user.email,
      subject: 'Exam Buddy - Email Verification',
      text: message,
    });

    res.status(201).json({
      message: 'Registration successful. Please check your email to verify your account.',
      // Optionally return limited user info if needed, but usually not needed here
    });

  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email, include password field for comparison
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      // Increment failed attempts (consider locking later)
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      await user.save({ validateBeforeSave: false });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is verified
    if (!user.isVerified) {
       return res.status(401).json({ message: 'Please verify your email before logging in.' });
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Generate token and return user info (excluding sensitive fields)
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePictureUrl: user.profilePictureUrl,
      token: generateToken(user._id),
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Verify user email
// @route   GET /api/auth/verify-email/:token
// @access  Public
const verifyEmail = async (req, res) => {
  try {
    // Hash the token from the params
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Find user by hashed token and check expiry
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).send('<h1>Email Verification Failed</h1><p>Invalid or expired verification link.</p>'); // Simple HTML response
    }

    // Update user verification status
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).send('<h1>Email Verified Successfully</h1><p>You can now log in to your Exam Buddy account.</p>'); // Simple HTML response

  } catch (error) {
    console.error('Email Verification Error:', error);
    res.status(500).send('<h1>Server Error</h1><p>Could not verify email. Please try again later.</p>');
  }
};

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // Important: Don't reveal if the user exists or not for security
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate reset token
    const { token, hashedToken, expiry } = generateHashToken();

    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiry = expiry;
    await user.save({ validateBeforeSave: false });

    // Prepare password reset email
    const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`; // Adjust frontend URL later
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please click on the following link, or paste this into your browser to complete the process: \n\n ${resetUrl} \n\n This link will expire in 10 minutes. \n\nIf you did not request this, please ignore this email and your password will remain unchanged.`;

    // Send password reset email (simulation)
    await sendEmail({
      to: user.email,
      subject: 'Exam Buddy - Password Reset Request',
      text: message,
    });

    res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });

  } catch (error) {
    console.error('Forgot Password Error:', error);
    // Avoid specific error messages here too
    res.status(500).json({ message: 'Error processing request' });
  }
};

// @desc    Reset password using token
// @route   POST /api/auth/reset-password/:token
// @access  Public
const resetPassword = async (req, res) => {
  const { password } = req.body;

  try {
    // Hash the token from the params
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    // Find user by hashed token and check expiry
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Set new password (pre-save hook will hash it)
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    // Maybe force re-verification or notify user of password change?
    await user.save(); // Let validation run here

    // Maybe log the user in automatically or just confirm success
    res.status(200).json({ message: 'Password reset successful' });

  } catch (error) {
    console.error('Reset Password Error:', error);
    if (error.name === 'ValidationError') {
       return res.status(400).json({ message: `Validation Error: ${error.message}` });
    }
    res.status(500).json({ message: 'Error resetting password' });
  }
};

export {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
