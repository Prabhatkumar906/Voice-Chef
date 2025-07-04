// frontend/src/context/AuthContext.jsx
// This is the updated version with a global error handler (Axios Interceptor).

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // This function will handle logging the user out
  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }

    // --- THIS IS THE NEW, CRUCIAL PART ---
    // We set up an Axios interceptor to listen for responses.
    const responseInterceptor = axios.interceptors.response.use(
      (response) => response, // If the response is successful, just pass it through.
      (error) => {
        // Check if the error is a 401 Unauthorized error
        if (error.response && error.response.status === 401) {
          console.log("Session expired or token is invalid. Logging out.");
          logout(); // If it is, call our logout function.
        }
        // Always reject the promise so the original error can be handled if needed.
        return Promise.reject(error);
      }
    );

    // This is a cleanup function. It's important to "eject" the interceptor
    // when the component unmounts to prevent memory leaks.
    return () => {
      axios.interceptors.response.eject(responseInterceptor);
    };

  }, [token]);

  const login = (newToken) => {
    setToken(newToken);
  };
  
  const contextValue = { token, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};