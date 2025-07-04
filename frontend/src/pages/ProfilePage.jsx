// src/pages/ProfilePage.jsx
// Redesigned to allow viewing and editing of user profile information.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Book, Calendar, Edit, Save, X, UploadCloud } from 'lucide-react';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', profilePictureUrl: '' });

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/user/me');
      setProfile(response.data);
      // Pre-fill the form data for the edit mode
      setFormData({
        name: response.data.name || '',
        bio: response.data.bio || '',
        profilePictureUrl: response.data.profilePictureUrl || '',
      });
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/user/me', formData);
      // Refetch the profile to show updated data and exit edit mode
      fetchProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Could not update profile.");
    }
  };

  if (loading) {
    return <p className="text-center mt-8">Loading profile...</p>;
  }

  if (!profile) {
    return <p className="text-center text-red-500 mt-8">Could not load profile.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center space-x-6">
            <img
              src={profile.profilePictureUrl || `https://ui-avatars.com/api/?name=${profile.email.charAt(0)}&background=a7f3d0&color=14532d&size=128`}
              alt="Profile"
              className="h-32 w-32 rounded-full object-cover border-4 border-green-200"
            />
            <div>
              <h1 className="text-3xl font-extrabold text-gray-800">{profile.name || profile.email}</h1>
              <p className="text-md text-gray-500">{profile.bio || 'No bio yet. Click Edit Profile to add one!'}</p>
            </div>
          </div>
          {!isEditing && (
            <button onClick={() => setIsEditing(true)} className="flex items-center text-sm font-medium text-gray-600 hover:text-green-600 p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors">
              <Edit className="h-4 w-4 mr-2" /> Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          // EDIT MODE
          <form onSubmit={handleSave} className="space-y-6 animate-fade-in">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"/>
            </div>
            
            {/* --- UPDATED PROFILE PICTURE SECTION --- */}
            <div>
              <label htmlFor="profilePictureUrl" className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input type="text" name="profilePictureUrl" id="profilePictureUrl" value={formData.profilePictureUrl} onChange={handleInputChange} className="block w-full flex-1 rounded-none rounded-l-md px-3 py-2 border border-gray-300 focus:ring-green-500 focus:border-green-500" placeholder="Paste image URL here..."/>
                <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-4 py-2 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-600 text-sm font-medium hover:bg-gray-100">
                  <UploadCloud className="h-5 w-5 mr-2" /> Upload Photo
                </a>
              </div>
               <p className="mt-2 text-xs text-gray-500">
                 Tip: Use a free service like <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-green-600">imgbb.com</a>, upload your photo, and paste the "Direct link" here.
               </p>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
              <textarea name="bio" id="bio" rows="3" value={formData.bio} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"></textarea>
            </div>
            <div className="flex justify-end space-x-4">
              <button type="button" onClick={() => setIsEditing(false)} className="flex items-center bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                <X className="h-5 w-5 mr-2"/> Cancel
              </button>
              <button type="submit" className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                <Save className="h-5 w-5 mr-2"/> Save Changes
              </button>
            </div>
          </form>
        ) : (
          // VIEW MODE
          <div className="border-t border-gray-200 pt-6 space-y-6">
            <div className="flex items-center">
              <User className="h-6 w-6 mr-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-lg font-semibold">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Book className="h-6 w-6 mr-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Saved Recipes</p>
                <p className="text-lg font-semibold">{profile.cookbookCount} recipes in your cookbook</p>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-6 w-6 mr-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Member Since</p>
                <p className="text-lg font-semibold">{new Date(profile.memberSince).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
