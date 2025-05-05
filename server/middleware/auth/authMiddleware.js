import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load env vars specifically needed here
dotenv.config({ path: './server/.env' });

const protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (split 'Bearer TOKEN' and take the TOKEN part)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      if (!process.env.JWT_SECRET) {
        console.error('FATAL ERROR: JWT_SECRET is not defined.');
        return res.status(500).json({ message: 'Server configuration error' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token payload (id) and attach to request
      // Exclude password field from being attached
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        // Handle case where user might have been deleted after token was issued
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    // If no token is found in the header
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Optional: Middleware for admin authorization
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'Admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' }); // 403 Forbidden
  }
};

// Optional: Middleware for exam manager authorization
const examManager = (req, res, next) => {
    if (req.user && (req.user.role === 'ExamManager' || req.user.role === 'Admin')) { // Admin can also manage exams
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as an exam manager or admin' });
    }
};

export { protect, admin, examManager };
