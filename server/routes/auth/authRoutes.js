import express from 'express';
import {
  registerUser,
  loginUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  // getUserProfile // Add later when needed
} from '../controllers/authController.js';
// import { protect } from '../middleware/authMiddleware.js'; // Add later for protected routes

const router = express.Router();

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);

// @desc    Verify user email
// @route   GET /api/auth/verify-email/:token
// @access  Public
router.get('/verify-email/:token', verifyEmail);

// @desc    Request password reset
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', forgotPassword);

// @desc    Reset password using token
// @route   POST /api/auth/reset-password/:token
// @access  Public
router.post('/reset-password/:token', resetPassword);

// Example of a protected route (add later)
// router.route('/profile').get(protect, getUserProfile);

export default router;
