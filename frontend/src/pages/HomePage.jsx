// src/pages/HomePage.jsx
// This is the corrected version that uses the global RecipeContext.

import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeCardSkeleton from '../components/RecipeCardSkeleton';
import RangeSlider from '../components/RangeSlider';
import PantryUploader from '../components/PantryUploader';
import { useRecipes } from '../context/RecipeContext'; // Import the new hook
import { Filter, X, Loader, Search, Camera } from 'lucide-react';

const HomePage = () => {
  // Get all the state and the search function from our global context
  const { recipes, loading, error, searched, handleSearch } = useRecipes();

  // Keep local state just for the form inputs themselves
  const [ingredients, setIngredients] = useState('');
  const [maxTime, setMaxTime] = useState(120);
  const [cuisine, setCuisine] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [isVisualMode, setIsVisualMode] = useState(false);

  // The submit handler now just gathers the local form state
  // and passes it to the handleSearch function from the context.
  const onFormSubmit = (e) => {
    e.preventDefault();
    const searchParams = {
      ingredients,
      maxReadyTime: maxTime,
      cuisine: cuisine || null,
    };
    handleSearch(searchParams);
  };

  const handleIngredientsFound = (foundIngredients) => {
    setIngredients(foundIngredients);
    setIsVisualMode(false);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900">Pantry Chef</h1>
        <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">Tell us what's in your kitchen, and we'll handle the inspiration.</p>
      </div>

      {isVisualMode ? (
        <PantryUploader 
          onIngredientsFound={handleIngredientsFound} 
          onCancel={() => setIsVisualMode(false)}
        />
      ) : (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl mb-12 border border-gray-100">
          <form onSubmit={onFormSubmit}>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                className="w-full text-lg pl-16 pr-40 py-5 border-2 border-gray-200 rounded-full focus:ring-green-500 focus:border-green-500 transition-colors"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., chicken, tomato, rice"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 px-8 py-3 bg-green-500 text-white font-bold rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 flex items-center"
              >
                {loading && <Loader className="animate-spin h-5 w-5 mr-2" />}
                {loading ? 'Searching...' : 'Generate'}
              </button>
            </div>

            <div className="flex justify-center items-center space-x-6 mt-5">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="text-gray-600 hover:text-green-600 font-semibold text-sm flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? 'Hide Filters' : 'Advanced Filters'}
              </button>
              <div className="border-l h-5 border-gray-300"></div>
              <button
                type="button"
                onClick={() => setIsVisualMode(true)}
                className="text-gray-600 hover:text-green-600 font-semibold text-sm flex items-center"
              >
                <Camera className="h-4 w-4 mr-2" />
                Analyze Pantry with AI
              </button>
            </div>

            {showFilters && (
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 mt-6 border-t pt-6 border-gray-200 animate-fade-in">
                <div>
                  <label htmlFor="cuisine" className="block text-sm font-medium text-gray-700 mb-1">Cuisine (optional)</label>
                  <input type="text" id="cuisine" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500" value={cuisine} onChange={(e) => setCuisine(e.target.value)} placeholder="e.g., Italian, Indian" />
                </div>
                <RangeSlider label="Max cooking time" min="15" max="180" step="15" value={maxTime} onChange={(e) => setMaxTime(e.target.value)} />
              </div>
            )}
          </form>
        </div>
      )}

      {/* Results Section */}
      <div>
        {error && <p className="text-center text-red-500 font-medium py-10">{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => <RecipeCardSkeleton key={index} />)
          ) : (
            recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)
          )}
        </div>
        {!loading && !error && recipes.length === 0 && searched && (
          <p className="text-center text-gray-500 py-10">No recipes found. Try adjusting your filters!</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;