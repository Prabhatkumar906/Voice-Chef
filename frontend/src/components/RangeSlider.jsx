// src/components/RangeSlider.jsx
// A new, reusable, and styled range slider component.

import React from 'react';

const RangeSlider = ({ label, min, max, step, value, onChange }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="flex items-center space-x-4">
        <input
          id={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-1 rounded-full w-24 text-center">
          {value ? `Up to ${value} min` : 'Any time'}
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
