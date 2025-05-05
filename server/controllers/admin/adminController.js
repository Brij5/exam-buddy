import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import Exam from '../models/Exam.js';
import ExamCategory from '../models/ExamCategory.js';

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = asyncHandler(async (req, res) => {
  const [userCount, examCount, categoryCount] = await Promise.all([
    User.countDocuments({}),
    Exam.countDocuments({}),
    ExamCategory.countDocuments({}),
  ]);

  res.json({
    userCount,
    examCount,
    categoryCount,
    // Add more stats as needed
  });
});

export { getAdminStats };
