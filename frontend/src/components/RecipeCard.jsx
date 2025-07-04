// src/components/RecipeCard.jsx
// Updated with a "Save to Cookbook" button.

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Clock, Bookmark } from 'lucide-react';

const RecipeCard = ({ recipe }) => {
  // This function will be called when the user clicks the save button
  const handleSave = async (e) => {
    // e.stopPropagation() prevents the click from also triggering the Link navigation
    e.stopPropagation(); 
    e.preventDefault(); // This also helps prevent the link navigation

    try {
      // We create the payload with the data our backend needs
      const payload = {
        recipeId: recipe.id.toString(), // Ensure recipeId is a string
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
      };
      // We make the API call to our new save endpoint
      await axios.post('/api/cookbook/save', payload);
      alert(`'${recipe.title}' has been saved to your cookbook!`);
    } catch (error) {
      // Handle errors, like if the recipe is already saved
      console.error('Error saving recipe:', error);
      alert(error.response?.data?.msg || 'Could not save recipe.');
    }
  };

  return (
    // The main Link component still wraps the card
    <Link to={`/recipe/${recipe.id}`} className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative">
        <img 
            src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* --- NEW SAVE BUTTON --- */}
        <button
          onClick={handleSave}
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-green-100 transition-colors z-10"
          aria-label="Save to cookbook"
        >
          <Bookmark className="h-5 w-5 text-green-600" />
        </button>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate group-hover:text-green-600 transition-colors">
          {recipe.title}
        </h3>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-2" />
          <span>Ready in {recipe.readyInMinutes} minutes</span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
