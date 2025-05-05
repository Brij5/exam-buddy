import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

// Import components
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ExamInstructionsPage from "../pages/ExamInstructionsPage";
import Navigation from "../components/Navigation/Navigation";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);
  
  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const RoutesComponent = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Navigation />
      <Box sx={{ flex: 1, p: 3 }}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/exam/:examId"
            element={
              <ProtectedRoute>
                <ExamInstructionsPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/progress" element={<Navigate to="/dashboard" replace />} />
          <Route path="/exams" element={<Navigate to="/dashboard" replace />} />
          <Route path="/logout" element={<Navigate to="/login" replace />} />
        </Routes>
      </Box>
    </Box>
  );
};

export default RoutesComponent;
