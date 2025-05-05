// Export all controllers from a single entry point
import authController from './auth';
import categoryController from './category';
import adminController from './admin';
import progressController from './progress';

export {
  authController,
  categoryController,
  adminController,
  progressController
};

export default {
  authController,
  categoryController,
  adminController,
  progressController
};
