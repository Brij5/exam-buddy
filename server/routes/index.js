console.log('[DEBUG] Top of server/routes/index.js');

import express from 'express';
import authRoutes from './auth/authRoutes.js';
import categoryRoutes from './category/examCategoryRoutes.js'; // Corrected filename
import examRoutes from './exam/examRoutes.js';
import progressRoutes from './progress/progressRoutes.js';
import adminRoutes from './admin/index.js'; // Corrected to point to index.js
import userRoutes from './user/userRoutes.js';
import healthRoutes from './health/healthRoutes.js';
import examManagerRoutes from './examManagerRoutes.js'; // Import Exam Manager routes

const router = express.Router();

// Health check route
router.use('/health', healthRoutes);

// API routes
router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/exams', examRoutes);
router.use('/progress', progressRoutes);
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);
router.use('/exam-manager', examManagerRoutes); // Add Exam Manager routes

export default router;
