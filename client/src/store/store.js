import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import examReducer from './slices/examSlice'; 
import testAttemptReducer from './slices/testAttemptSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    exams: examReducer, 
    testAttempt: testAttemptReducer,
    // Add other reducers here as the application grows
  },
  // Redux Toolkit includes redux-thunk middleware by default,
  // which is useful for async actions (like API calls).
  // DevTools Extension is also enabled by default in development mode.
});

export default store;
