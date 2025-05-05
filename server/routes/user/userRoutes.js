import express from 'express';
import { 
  loginUser,
  getUserProfile, 
  updateUserProfile 
} from '../../controllers/userController.js';
import { protect } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.post('/login', loginUser);

// Protected Routes
router.route('/profile')
  .get(protect, getUserProfile)       // Get user profile (needs auth)
  .put(protect, updateUserProfile);   // Update user profile (needs auth)

export default router;
