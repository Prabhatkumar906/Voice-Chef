// backend/routes/recipes.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const authMiddleware = require('../middleware/authMiddleware'); // Import our bouncer

// @route   POST /api/recipes/find
// @desc    Find recipes based on user's pantry/criteria
// @access  Private (because we use the authMiddleware)
router.post('/find', authMiddleware, async (req, res) => {
  try {
    // Get search criteria from the request body sent by the frontend
    const { ingredients, maxReadyTime,cuisine  } = req.body;
    console.log('Backend received ingredients:', ingredients);

    if (!ingredients) {
      return res.status(400).json({ msg: 'Ingredients are required' });
    }

    // Construct the URL for the Spoonacular API call
    const spoonacularUrl = new URL('https://api.spoonacular.com/recipes/complexSearch');
    spoonacularUrl.searchParams.append('apiKey', process.env.SPOONACULAR_API_KEY);
    spoonacularUrl.searchParams.append('includeIngredients', ingredients);
    if (maxReadyTime) {
      spoonacularUrl.searchParams.append('maxReadyTime', maxReadyTime);
    }
    if (cuisine) {
  spoonacularUrl.searchParams.append('cuisine', cuisine);
}
    spoonacularUrl.searchParams.append('addRecipeInformation', true); // Get detailed info
    spoonacularUrl.searchParams.append('number', 10); // Get up to 10 recipes

    console.log('Calling Spoonacular with this URL:', spoonacularUrl.toString());


    // Make the request to the Spoonacular API
    const response = await axios.get(spoonacularUrl.toString());

    // Simplify the response to only send what our frontend needs
    const simplifiedRecipes = response.data.results.map(recipe => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      sourceUrl: recipe.sourceUrl,
    }));

    res.json(simplifiedRecipes);

  } catch (error) {
    console.error('Error fetching from Spoonacular:', error.message);
    res.status(500).send('Server Error');
  }
});

// backend/routes/recipes.js

// ... (existing /find route is above this) ...

// @route   GET /api/recipes/:id
// @desc    Get full details for a single recipe
// @access  Private
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const recipeId = req.params.id; // Get the ID from the URL parameter

    const spoonacularUrl = `https://api.spoonacular.com/recipes/${recipeId}/information`;
    const params = {
      apiKey: process.env.SPOONACULAR_API_KEY,
      includeNutrition: false,
    };

    const response = await axios.get(spoonacularUrl, { params });

    // We don't need to simplify this response much, as we want all the details.
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching recipe details:', error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;