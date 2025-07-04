
//This makes routing available to every other component
// frontend/src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // <-- 1. Import
import { AuthProvider } from './context/AuthContext'; // <-- 1. Import
import { RecipeProvider } from './context/RecipeContext'
import App from './App.jsx'
import './index.css'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <-- 2. Wrap your <App /> component */}
    <AuthProvider>
      <RecipeProvider> {/* <-- 2. Wrap your App */}
          <App />
      </RecipeProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)