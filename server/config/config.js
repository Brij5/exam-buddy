import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Server configuration
const server = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
};

// MongoDB configuration
const mongo = {
  uri: process.env.MONGO_URI || 'mongodb://localhost:27017/exam-buddy',
  options: {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    maxPoolSize: 10,
  },
};

// JWT configuration
const jwt = {
  secret: process.env.JWT_SECRET || 'your_jwt_secret',
  expiresIn: process.env.JWT_EXPIRES_IN || '30d',
};

// Email configuration
const email = {
  service: process.env.EMAIL_SERVICE || 'gmail',
  user: process.env.EMAIL_USERNAME || '',
  pass: process.env.EMAIL_PASSWORD || '',
  from: process.env.EMAIL_FROM || 'noreply@exambuddy.com',
};

// Client URL for CORS and redirects
const clientUrl = process.env.CLIENT_URL || 'http://localhost:3000';

// Export configuration
export default {
  server,
  mongo,
  jwt,
  email,
  clientUrl,
  paths: {
    root: path.resolve(__dirname, '../..'),
    client: path.resolve(__dirname, '../../client'),
    server: path.resolve(__dirname, '..'),
    uploads: path.resolve(__dirname, '../../uploads'),
  },
};
