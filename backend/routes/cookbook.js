// backend/routes/cookbook.js

const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/user');

// @route   POST /api/cookbook/save
// @desc    Save a recipe to the user's cookbook
// @access  Private
router.post('/save', authMiddleware, async (req, res) => {
  try {
    // The recipe details sent from the frontend
    const { recipeId, title, image, readyInMinutes } = req.body;
    
    // Find the logged-in user by the ID from our authMiddleware
    const user = await User.findById(req.user.id);

    // Check if the recipe is already in the cookbook
    const alreadySaved = user.cookbook.some(recipe => recipe.recipeId === recipeId);
    if (alreadySaved) {
      return res.status(400).json({ msg: 'Recipe already in cookbook' });
    }

    // Add the new recipe to the cookbook array
    user.cookbook.push({ recipeId, title, image, readyInMinutes });

    // Save the updated user document
    await user.save();

    res.json(user.cookbook); // Send back the updated cookbook
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/cookbook
// @desc    Get all recipes from the user's cookbook
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.cookbook);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/cookbook/:recipeId
// @desc    Remove a recipe from the cookbook
// @access  Private
router.delete('/:recipeId', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    // Find the index of the recipe to remove
    const removeIndex = user.cookbook.findIndex(
      recipe => recipe.recipeId === req.params.recipeId
    );

    if (removeIndex === -1) {
      return res.status(404).json({ msg: 'Recipe not found in cookbook' });
    }

    // Remove the recipe from the array
    user.cookbook.splice(removeIndex, 1);

    await user.save();

    res.json(user.cookbook); // Send back the updated cookbook
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
