#!/usr/bin/env node

console.log('[DEBUG] Minimal server/start.js executing...');

// console.log('[DEBUG] Top of server/start.js (after shebang)'); // Keep this commented for now

console.log('[DEBUG] server/start.js: Attempting to import config...');
import config from './config/config.js';
console.log('[DEBUG] server/start.js: Config imported successfully. Value:', config ? 'loaded' : 'undefined/null');

console.log('[DEBUG] server/start.js: Attempting to import logger...');
import { logger } from './utils/logger.js';
console.log('[DEBUG] server/start.js: Logger imported successfully. Value:', logger ? 'loaded' : 'undefined/null');

console.log('[DEBUG] server/start.js: Attempting to import connectDB...');
import { connectDB } from './utils/db.js';
console.log('[DEBUG] server/start.js: connectDB imported successfully. Value:', connectDB ? 'loaded' : 'undefined/null');

console.log('[DEBUG] server/start.js: Importing app...');
import app from './app.js';
console.log('[DEBUG] server/start.js: App imported successfully. Value:', app ? 'loaded' : 'undefined/null');

/*
console.log('[DEBUG] server/start.js: Setting up uncaughtException handler...');
// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('[DEBUG] UNCAUGHT EXCEPTION in server/start.js:', err.name, err.message, err.stack);
  // Use console.error here as logger might be the cause or not yet initialized
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});
console.log('[DEBUG] server/start.js: uncaughtException handler set up.');

console.log('[DEBUG] server/start.js: Calling connectDB()...');
// Connect to MongoDB
connectDB()
  .then(() => {
    console.log('[DEBUG] server/start.js: connectDB() resolved.');
    // logger.info('Database connection established'); // Logger might not be safe yet
  })
  .catch((error) => {
    console.error('[DEBUG] server/start.js: connectDB() rejected.', error);
    // logger.error(`Database connection failed: ${error.message}`); // Logger might not be safe yet
    process.exit(1);
  });

console.log('[DEBUG] server/start.js: Starting server with app.listen()...');
// Start the server
// const server = app.listen(config.port, () => { // App not imported yet
//   console.log('[DEBUG] server/start.js: app.listen() callback executed.');
  // logger.info(`Server running in ${config.env} mode on port ${config.port}`); // Logger might not be safe yet
// });

console.log('[DEBUG] server/start.js: Setting up unhandledRejection handler...');
// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('[DEBUG] UNHANDLED REJECTION in server/start.js:', err.name, err.message, err.stack);
  // Use console.error here as logger might be the cause or not yet initialized
  console.error('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  
  // Close server & exit process
  // if (server) server.close(() => { // Server not defined yet
  //   console.log('[DEBUG] server/start.js: Server closed due to unhandledRejection.');
  //   process.exit(1);
  // });
  process.exit(1); // Exit directly if server isn't up
});
console.log('[DEBUG] server/start.js: unhandledRejection handler set up.');

console.log('[DEBUG] server/start.js: Setting up SIGTERM handler...');
// Handle SIGTERM (For Docker, Kubernetes, etc.)
process.on('SIGTERM', () => {
  console.log('[DEBUG] server/start.js: SIGTERM received.');
  // logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully'); // Logger might not be safe yet
  // if (server) server.close(() => { // Server not defined yet
  //   console.log('[DEBUG] server/start.js: Server closed due to SIGTERM.');
    // logger.info('💥 Process terminated!'); // Logger might not be safe yet
  // });
});
console.log('[DEBUG] server/start.js: SIGTERM handler set up.');

console.log('[DEBUG] server/start.js: Setting up SIGINT handler...');
// Handle process termination
process.on('SIGINT', async () => {
  console.log('[DEBUG] server/start.js: SIGINT received.');
  // logger.info('👋 SIGINT RECEIVED. Shutting down gracefully'); // Logger might not be safe yet
  
  try {
    // Close the server
    // if (server) server.close(() => { // Server not defined yet
    //   console.log('[DEBUG] server/start.js: Server closed due to SIGINT.');
      // logger.info('💥 Process terminated!'); // Logger might not be safe yet
    //   process.exit(0);
    // });
    process.exit(0); // Exit directly if server isn't up
  } catch (err) {
    console.error('[DEBUG] server/start.js: Error during shutdown:', err);
    // logger.error('Error during shutdown:', err); // Logger might not be safe yet
    process.exit(1);
  }
});
console.log('[DEBUG] server/start.js: SIGINT handler set up.');

// export default server; // Server not defined yet
*/
