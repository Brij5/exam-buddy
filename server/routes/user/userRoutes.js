import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Placeholder route - Add actual user routes later
router.get('/profile', (req, res) => {
  res.send('User Profile Endpoint - Placeholder');
});

// router.route('/profile')
//   .get(protect, getUserProfile)       // Get user profile (needs auth)
//   .put(protect, updateUserProfile);   // Update user profile (needs auth)

export default router;
