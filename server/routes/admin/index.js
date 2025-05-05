import express from 'express';
import { adminController } from '../../controllers';
import { protect, admin } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected admin routes
router.get('/users', protect, admin, adminController.getAllUsers);
router.get('/users/:id', protect, admin, adminController.getUserById);
router.put('/users/:id', protect, admin, adminController.updateUser);
router.delete('/users/:id', protect, admin, adminController.deleteUser);

export default router;
