#!/usr/bin/env node
import { logger } from './utils/logger.js';
import { connectDB } from './utils/db.js';
import app from '../server.js';
import config from './config/config.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  process.exit(1);
});

// Connect to MongoDB
connectDB()
  .then(() => {
    logger.info('Database connection established');
  })
  .catch((error) => {
    logger.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });

// Start the server
const server = app.listen(config.port, () => {
  logger.info(`Server running in ${config.env} mode on port ${config.port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! 💥 Shutting down...');
  logger.error(err.name, err.message);
  
  // Close server & exit process
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM (For Docker, Kubernetes, etc.)
process.on('SIGTERM', () => {
  logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
});

// Handle process termination
process.on('SIGINT', async () => {
  logger.info('👋 SIGINT RECEIVED. Shutting down gracefully');
  
  try {
    // Close the server
    server.close(async () => {
      logger.info('💥 Process terminated!');
      process.exit(0);
    });
  } catch (err) {
    logger.error('Error during shutdown:', err);
    process.exit(1);
  }
});

export default server;
