// src/App.jsx
// This is the complete and final router setup for your application.

import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import MyCookbookPage from './pages/MyCookbookPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {/* The Layout component wraps all pages to provide the Navbar */}
      <Route element={<Layout />}>
        
        {/* Public-Only Routes: These are only accessible when logged OUT */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
        </Route>

        {/* Conditional Homepage: Shows LandingPage if logged out, otherwise handled by ProtectedRoute */}
        {!token && <Route path="/" element={<LandingPage />} />}

        {/* Protected Routes: These are only accessible when logged IN */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-cookbook" element={<MyCookbookPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
