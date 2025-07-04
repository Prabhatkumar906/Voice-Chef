// src/pages/MyCookbookPage.jsx
// This is the new page to display the user's saved recipes.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { BookMarked, Trash2 } from 'lucide-react';

const MyCookbookPage = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // This function will fetch the saved recipes from our backend
  const fetchCookbook = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cookbook');
      setSavedRecipes(response.data);
    } catch (err) {
      setError('Could not fetch your cookbook. Please try again later.');
      console.error('Fetch cookbook error:', err);
    } finally {
      setLoading(false);
    }
  };

  // This useEffect hook runs once when the component first loads
  useEffect(() => {
    fetchCookbook();
  }, []);

  // This function handles removing a recipe
  const handleRemove = async (recipeId, recipeTitle) => {
    // We use a window.confirm to make sure the user didn't click by accident
    if (window.confirm(`Are you sure you want to remove '${recipeTitle}' from your cookbook?`)) {
      try {
        // We call our new DELETE endpoint
        const response = await axios.delete(`/api/cookbook/${recipeId}`);
        // We update our state with the new cookbook returned from the backend
        setSavedRecipes(response.data);
        alert(`'${recipeTitle}' was removed.`);
      } catch (err) {
        console.error('Error removing recipe:', err);
        alert('Failed to remove recipe.');
      }
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading your cookbook...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500 mt-8">{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <BookMarked className="h-8 w-8 mr-3 text-green-600" />
        <h1 className="text-4xl font-extrabold text-gray-800">My Cookbook</h1>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Your cookbook is empty!</h2>
          <p className="text-gray-600">Start exploring and save recipes to see them here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {savedRecipes.map((recipe) => (
            <div key={recipe.recipeId} className="relative group">
              {/* We reuse our RecipeCard component for a consistent look */}
              <RecipeCard recipe={{...recipe, id: recipe.recipeId}} />
              {/* We add a "Remove" button on top of the card */}
              <button
                onClick={() => handleRemove(recipe.recipeId, recipe.title)}
                className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-red-100 transition-colors z-10"
                aria-label="Remove from cookbook"
              >
                <Trash2 className="h-5 w-5 text-red-600" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCookbookPage;
