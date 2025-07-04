// src/components/Navbar.jsx
// This is the fully responsive Navbar component with a mobile "hamburger" menu.

import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChefHat, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { token, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // This function returns a string of Tailwind classes for active/inactive links
  const navLinkClasses = ({ isActive }) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-blue-100 text-blue-700' 
        : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
    }`;
  };

  // This is a helper component for links inside the mobile menu
  const MobileNavLink = ({ to, children }) => (
    <NavLink 
      to={to} 
      className="block text-lg text-gray-700 py-2 hover:bg-blue-50 rounded-md px-4"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
            <ChefHat className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-800">
              VoiceChef
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <NavLink to="/" className={navLinkClasses}>Pantry Chef</NavLink>
                <NavLink to="/my-cookbook" className={navLinkClasses}>My Cookbook</NavLink>
                {/* --- NEW PROFILE LINK --- */}
                <NavLink to="/profile" className={navLinkClasses}>Profile</NavLink>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-sm shadow-sm transition-colors">Logout</button>
              </>
            ) : (
              <>
                <NavLink to="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Features</NavLink>
                <NavLink to="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium">Sign In</NavLink>
                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-sm shadow-md transition-transform transform hover:scale-105">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-7 w-7 text-gray-700" /> : <Menu className="h-7 w-7 text-gray-700" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-2">
              {token ? (
                <>
                  <MobileNavLink to="/">Pantry Chef</MobileNavLink>
                  <MobileNavLink to="/my-cookbook">My Cookbook</MobileNavLink>
                  <MobileNavLink to="/profile">Profile</MobileNavLink>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }} 
                    className="w-full text-left bg-red-100 text-red-700 font-bold py-3 px-4 rounded-md mt-2"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="#">Features</MobileNavLink>
                  <MobileNavLink to="/login">Sign In</MobileNavLink>
                  <Link 
                    to="/login" 
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-5 rounded-lg text-md shadow-md mt-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
