// src/components/Layout.jsx
// This component acts as the main frame for your app, holding the Navbar.

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer'; 

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Navbar />
      <main className="container mx-auto p-4 md:p-8">
        {/* Child pages like HomePage will be rendered here */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;