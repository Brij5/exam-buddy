import axios from 'axios';

// Define the base URL for the API. Adjust if your backend runs on a different port/URL.
// Consider using environment variables for this in a real application.
// Using relative URL, assumes frontend/backend on same origin or proxy configured
const AUTH_API_URL = '/api/auth'; // Base URL for auth-specific endpoints

// Auth service
export const authService = {
  // Login user
  login: async (credentials) => {
    try {
      const response = await axios.post('/api/auth/login', credentials);
      if (response.data.token && response.data._id) {
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        return response.data;
      }
      throw new Error('Login failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  // Register user
  register: async (email, name, password) => {
    try {
      const response = await axios.post('/api/auth/register', { email, name, password });
      if (response.data.success) {
        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error('Registration failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await axios.post('/api/auth/logout');
      if (response.data.success) {
        localStorage.removeItem('userInfo');
        return response.data;
      }
      throw new Error('Logout failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  },

  // Refresh token
  refreshToken: async () => {
    try {
      const response = await axios.post('/api/auth/refresh-token');
      if (response.data.success) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, token: response.data.token }));
        return { token: response.data.token };
      }
      throw new Error('Token refresh failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token refresh failed');
    }
  },

  // Get current user
  getCurrentUser: () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  },

  // Update user profile
  updateProfile: async (userId, updates) => {
    try {
      const response = await axios.put(`/api/auth/users/${userId}`, updates);
      if (response.data.success) {
        const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...response.data.user }));
        return response.data;
      }
      throw new Error('Profile update failed');
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  }
};
