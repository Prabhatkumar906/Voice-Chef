// backend/models/User.js
// This version includes the fix for the OverwriteModelError.

const mongoose = require('mongoose');

const SavedRecipeSchema = new mongoose.Schema({
  recipeId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  readyInMinutes: { type: Number },
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: false,
  },
  otpExpires: {
    type: Date,
    required: false,
  },
  cookbook: [SavedRecipeSchema],
  name: {
    type: String,
    trim: true,
  },
  profilePictureUrl: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// --- THE FIX ---
// This line checks if the 'User' model has already been compiled.
// If it has, it uses the existing model. If not, it creates it.
// This prevents the "overwrite" error from happening.
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
