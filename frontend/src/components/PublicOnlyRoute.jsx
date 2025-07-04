// src/components/PublicOnlyRoute.jsx
// This component protects routes that should ONLY be visible to logged-out users.

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicOnlyRoute = () => {
  // Use our custom hook to get the token
  const { token } = useAuth();

  // If a token EXISTS, it means the user is logged in.
  // Redirect them away from the public page (e.g., login) to the main homepage.
  if (token) {
    return <Navigate to="/" />;
  }

  // If there is NO token, the user is logged out.
  // Allow them to see the public page (e.g., login, verify-otp).
  return <Outlet />;
};

export default PublicOnlyRoute;
