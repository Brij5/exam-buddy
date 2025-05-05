import { logger } from '../../utils/logger.js';
import { ApiError } from '../../utils/ApiError.js';

/**
 * Middleware to handle 404 Not Found errors
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const notFound = (req, res, next) => {
  const error = new ApiError(404, `Not Found - ${req.originalUrl}`);
  next(error);
};

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
  // Default to 500 Internal Server Error if status code not set
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';
  let errors = [];

  // Log the error
  logger.error(err.message, {
    statusCode,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
  });

  // Handle specific error types
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    // Mongoose bad ObjectId
    statusCode = 404;
    message = 'Resource not found';
  } else if (err.code === 11000) {
    // Mongoose duplicate key
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value: ${field}`;
    errors = [{ field, message }];
  } else if (err.name === 'ValidationError') {
    // Mongoose validation error
    statusCode = 400;
    message = 'Validation failed';
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  } else if (err.name === 'JsonWebTokenError') {
    // JWT error
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    // JWT expired
    statusCode = 401;
    message = 'Token expired';
  } else if (err instanceof ApiError) {
    // Our custom ApiError
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors || [];
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    message,
    errors: errors.length > 0 ? errors : undefined,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

/**
 * Handle 404 errors for API routes
 */
const apiNotFound = (req, res) => {
  throw new ApiError(404, `API endpoint not found: ${req.originalUrl}`);
};

export { notFound, errorHandler, apiNotFound };
