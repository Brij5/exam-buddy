import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
// Removed useSelector import, assuming ProtectedRoute handles it
import { Box } from '@mui/material'; // Keep Box for potential layout use within routes

// Common Components
import ProtectedRoute from '../components/common/ProtectedRoute'; // Changed to default import
import MainLayout from '../layouts/MainLayout'; // Conceptual: To be created
import AuthLayout from '../layouts/AuthLayout'; // Conceptual: To be created

// Page Components (ensure all needed pages are imported)
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; // Added
import ForgotPasswordPage from "../pages/ForgotPasswordPage"; // Added
import ResetPasswordPage from "../pages/ResetPasswordPage"; // Added
import VerifyEmailPage from "../pages/VerifyEmailPage"; // Added
import SplashScreen from "../pages/SplashScreen"; // Added
import DashboardPage from "../pages/DashboardPage";
import AdminDashboardPage from "../pages/admin/AdminDashboard.jsx"; // Corrected path and filename
// import ExamManagerDashboardPage from '../pages/ExamManagerDashboardPage'; // Add if needed
import ExamInstructionsPage from "../pages/ExamInstructionsPage";
// import NotFoundPage from '../pages/NotFoundPage'; // Good practice to have a 404 page

// Removed local ProtectedRoute definition

const RoutesComponent = () => {
  return (
    <Routes>
      {/* Routes without specific layout (e.g., Splash) */}
      <Route path="/" element={<SplashScreen />} />

      {/* Public routes with Auth Layout */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
        {/* Add forgot/reset password routes here? */}
      </Route>

      {/* Protected routes with Main Layout */}
      <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/exam/:examId/instructions" element={<ExamInstructionsPage />} />
        {/* Add other user routes here: /profile, /test/:id, /results/:id etc. */}
      </Route>
      
      {/* Admin routes with Main Layout (or dedicated AdminLayout) */}
      <Route element={<ProtectedRoute adminRequired><MainLayout /></ProtectedRoute>}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        {/* Add other admin routes here: /admin/users, /admin/exams, etc. */}
      </Route>

      {/* Exam Manager routes? */}
      {/* <Route element={<ProtectedRoute examManagerRequired><MainLayout /></ProtectedRoute>}>
        <Route path="/exam-manager/dashboard" element={<ExamManagerDashboardPage />} />
      </Route> */}

      {/* Catch all / 404 Route */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} /> // Or redirect to a 404 page

    </Routes>
  );
};

export default RoutesComponent;
