// Middleware to handle 404 Not Found errors
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error); // Pass the error to the next middleware (errorHandler)
};

// Middleware to handle general errors
const errorHandler = (err, req, res, next) => {
  // Sometimes errors come with status codes, otherwise default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // Specific Mongoose Bad ObjectId Error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  // Specific Mongoose Duplicate Key Error
  if (err.code === 11000) {
    statusCode = 400; // Bad Request
    // Extract field name from error message if possible
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate field value entered: ${field}`;
  }

  // Specific Mongoose Validation Error
  if (err.name === 'ValidationError') {
    statusCode = 400; // Bad Request
    // Combine multiple validation errors if they exist
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  // Log the error in development mode for debugging
  if (process.env.NODE_ENV !== 'production') {
    console.error('--- Error Stack ---');
    console.error(err.stack);
    console.error('-------------------');
  }

  res.status(statusCode).json({
    message: message,
    // Optionally include stack trace in development mode
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
