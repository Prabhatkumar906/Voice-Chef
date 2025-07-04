// src/components/RecipeCardSkeleton.jsx
// This is a new component that displays a placeholder while recipes are loading.

import React from 'react';

const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-5">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        {/* Subtitle Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default RecipeCardSkeleton;
