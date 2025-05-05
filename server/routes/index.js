import express from 'express';
import authRoutes from './auth';
import categoryRoutes from './category';
import examRoutes from './exam';
import progressRoutes from './progress';
import adminRoutes from './admin';
import userRoutes from './user';
import healthRoutes from './health';

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

export default router;
