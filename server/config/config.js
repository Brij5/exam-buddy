import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import Joi from 'joi';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Define environment schema
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5001),
    MONGODB_URI: Joi.string().required().description('MongoDB connection URL'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_EXPIRES_IN: Joi.string().default('30d').description('JWT expiration time'),
    JWT_COOKIE_EXPIRES_IN: Joi.number().default(30).description('JWT cookie expiration in days'),
    CLIENT_URL: Joi.string().required().description('Frontend URL'),
    EMAIL_SERVICE: Joi.string().description('Email service provider'),
    EMAIL_USERNAME: Joi.string().description('Email username'),
    EMAIL_PASSWORD: Joi.string().description('Email password'),
    EMAIL_FROM: Joi.string().description('Sender email address'),
    RATE_LIMIT_WINDOW_MS: Joi.number().default(15 * 60 * 1000).description('Rate limit window in milliseconds'),
    RATE_LIMIT_MAX: Joi.number().default(100).description('Maximum requests per window'),
  })
  .unknown();

// Validate environment variables
const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Server configuration
const server = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  isProduction: envVars.NODE_ENV === 'production',
  isDevelopment: envVars.NODE_ENV === 'development',
  isTest: envVars.NODE_ENV === 'test',
};

// MongoDB configuration
const mongo = {
  uri: envVars.MONGODB_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
    maxPoolSize: 10,
  },
};

// JWT configuration
const jwt = {
  secret: envVars.JWT_SECRET,
  expiresIn: envVars.JWT_EXPIRES_IN,
  cookieExpiresIn: envVars.JWT_COOKIE_EXPIRES_IN,
};

// Email configuration
const email = {
  service: envVars.EMAIL_SERVICE,
  user: envVars.EMAIL_USERNAME,
  pass: envVars.EMAIL_PASSWORD,
  from: envVars.EMAIL_FROM || 'noreply@exambuddy.com',
};

// Rate limiting configuration
const rateLimit = {
  windowMs: Number(envVars.RATE_LIMIT_WINDOW_MS),
  max: Number(envVars.RATE_LIMIT_MAX),
};

// Client URL for CORS and redirects
const clientUrl = envVars.CLIENT_URL;

// CORS configuration
const corsOptions = {
  origin: clientUrl,
  credentials: true,
  optionsSuccessStatus: 200,
};

// Export configuration
export default {
  env: server.env,
  port: server.port,
  mongo,
  jwt,
  email,
  rateLimit,
  clientUrl,
  corsOptions,
  paths: {
    root: path.resolve(__dirname, '../..'),
    server: path.resolve(__dirname, '..'),
    config: __dirname,
    uploads: path.resolve(__dirname, '../../uploads'),
  },
};
