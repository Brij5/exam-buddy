import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const generateToken = (userId, userRole) => {
  return jwt.sign(
    { 
      id: userId, 
      role: userRole 
    },
    config.jwt.secret,
    {
      expiresIn: config.jwt.expiresIn,
    }
  );
};

export default generateToken; 