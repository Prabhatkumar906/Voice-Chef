// frontend/src/components/ProtectedRoute.jsx

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = () => {
  // Use our custom hook to get the token
  const { token } = useAuth();

  // If there's no token, redirect the user to the /login page
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If there IS a token, render the child route using the <Outlet /> component
  return <Outlet />;
};

export default ProtectedRoute;