// src/components/PantryUploader.jsx
// A new component for the "Visual Pantry Chef" feature.

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { UploadCloud, X, Loader, Image as ImageIcon } from 'lucide-react';

const PantryUploader = ({ onIngredientsFound, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError('');

    const formData = new FormData();
    formData.append('pantryImage', selectedFile);

    try {
      const response = await axios.post('/api/ai/identify-ingredients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // Pass the AI-generated ingredients list back to the parent (HomePage)
      onIngredientsFound(response.data.ingredients);
    } catch (err) {
      setError('Could not analyze image. Please try a clearer photo.');
      console.error('Image analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 relative animate-[--animation-fade-in-up]">
      <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
        <X />
      </button>
      <div className="text-center">
        <ImageIcon className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-2 text-2xl font-bold text-gray-900">Analyze Your Pantry</h2>
        <p className="mt-2 text-sm text-gray-600">Upload a photo of your ingredients, and let our AI do the rest.</p>

        <div className="mt-6">
          {preview ? (
            <div className="mb-4">
              <img src={preview} alt="Pantry preview" className="mx-auto max-h-64 rounded-lg shadow-md" />
            </div>
          ) : (
            <div 
              className="mt-1 flex justify-center px-6 pt-10 pb-10 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
              onClick={() => fileInputRef.current.click()}
            >
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-green-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className="text-sm text-red-600 text-center mt-4">{error}</p>}

        <div className="mt-6">
          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400"
          >
            {isAnalyzing ? (
              <>
                <Loader className="animate-spin h-5 w-5 mr-2" />
                Analyzing...
              </>
            ) : (
              'Find Ingredients with AI'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PantryUploader;
