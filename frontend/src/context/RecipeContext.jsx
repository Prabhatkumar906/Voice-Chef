// src/context/RecipeContext.jsx
// This new context will manage the state for recipe searches across the app.

import React, { createContext, useState, useContext } from 'react';
import axios from '../api/axios';

// 1. Create the Context
const RecipeContext = createContext(null);

// 2. Create the Provider Component
export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  // The search logic is now moved into the context
  const handleSearch = async (searchParams) => {
    setLoading(true);
    setError('');
    // We don't clear recipes here, so old results show while new ones load
    setSearched(true);

    try {
      const response = await axios.post('/api/recipes/find', searchParams);
      setRecipes(response.data);
      if (response.data.length === 0) {
        setError('No recipes found with these criteria. Try being less specific!');
      }
    } catch (err) {
      setError('Could not fetch recipes. Please try again later.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // The value provided to all children components
  const contextValue = {
    recipes,
    loading,
    error,
    searched,
    handleSearch,
  };

  return (
    <RecipeContext.Provider value={contextValue}>
      {children}
    </RecipeContext.Provider>
  );
};

// 3. Create a custom hook for easy access
export const useRecipes = () => {
  return useContext(RecipeContext);
};