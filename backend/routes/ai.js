// backend/routes/ai.js

const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
const authMiddleware = require('../middleware/authMiddleware');


// Configure Multer to handle image uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// @route   POST /api/ai/enhance-recipe
// @desc    Uses AI to generate a creative title and description for a recipe
// @access  Private
router.post('/enhance-recipe', authMiddleware, async (req, res) => {
  try {
    const { title, ingredients } = req.body;

    if (!title || !ingredients) {
      return res.status(400).json({ msg: 'Recipe title and ingredients are required.' });
    }

    // 1. Construct the prompt for the Gemini API
    const prompt = `You are a creative food writer. Your task is to make a recipe sound more delicious and appealing.
    Given the following recipe information:
    Original Title: "${title}"
    Ingredients: "${ingredients.join(', ')}"

    Please provide a response in JSON format with two keys: "newTitle" and "description".
    - "newTitle": A new, creative, and enticing title for this recipe.
    - "description": A short, one-paragraph (2-3 sentences) description that would make someone excited to cook this dish.`;

    // 2. Prepare the request to the Gemini API
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const requestBody = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }]
    };

    // 3. Make the API call to Gemini
    const response = await axios.post(geminiUrl, requestBody);

    // 4. Extract and parse the AI's response
    // The response from Gemini is often wrapped in markdown backticks, so we need to clean it.
    let aiResponseText = response.data.candidates[0].content.parts[0].text;
    aiResponseText = aiResponseText.replace(/```json/g, '').replace(/```/g, '');

    const aiResponseJson = JSON.parse(aiResponseText);

    res.json(aiResponseJson); // Send the { newTitle, description } object back to our frontend

  } catch (error) {
    console.error('Gemini API Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error communicating with AI service.');
  }
});


router.post(
  '/identify-ingredients',
  authMiddleware,
  upload.single('pantryImage'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ msg: 'No image file uploaded.' });
      }

      const imageBase64 = req.file.buffer.toString('base64');

      const prompt = `Analyze this image of food ingredients. List only the primary, distinct food items you can identify. Respond with just a single line of comma-separated text. For example: "chicken breast, onion, red bell pepper, garlic, tomato"`;

      // --- THE FIX: Using the latest recommended model for vision tasks ---
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
      
      const requestBody = {
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: req.file.mimetype,
                  data: imageBase64,
                },
              },
            ],
          },
        ],
      };

      const response = await axios.post(geminiUrl, requestBody);

      // Add a check to ensure the response has the expected structure
      if (!response.data.candidates || !response.data.candidates[0].content.parts[0].text) {
          throw new Error("Invalid response structure from AI service.");
      }

      const ingredientsText = response.data.candidates[0].content.parts[0].text;
      res.json({ ingredients: ingredientsText.trim() });

    } catch (error) {
      // More detailed error logging for easier debugging
      if (error.response) {
        console.error('Gemini API Error - Data:', error.response.data);
        console.error('Gemini API Error - Status:', error.response.status);
      } else {
        console.error('Gemini API Error - Message:', error.message);
      }
      res.status(500).send('Error analyzing image.');
    }
  }
);

router.post('/simplify-step', authMiddleware, async (req, res) => {
  try {
    // --- DEBUGGING LINE ---
    // Let's see exactly what the frontend is sending us.
    console.log("Received data for /simplify-step:", req.body);

    const { stepText, language } = req.body;
    if (!stepText || !language) {
      return res.status(400).json({ msg: 'Step text and language are required.' });
    }

    const prompt = `You are a helpful cooking assistant. Your task is to make recipe instructions easier to understand in the specified language.
    Take the following complex instruction in ${language}:
    "${stepText}"

    Your response must be in ${language}. Break the instruction down into a series of simple, clear, bullet-pointed action items.
    Respond only with the simplified steps in a single block of text, with each step starting with a hyphen.`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const response = await axios.post(geminiUrl, requestBody);
    const simplifiedText = response.data.candidates[0].content.parts[0].text;
    
    res.json({ simplifiedText });

  } catch (error) {
    console.error('AI Simplification Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error simplifying step.');
  }
});



// @route   POST /api/ai/translate-recipe
// @desc    Uses AI to translate a recipe into a different language
// @access  Private
router.post('/translate-recipe', authMiddleware, async (req, res) => {
  try {
    const { recipe, targetLanguage } = req.body;
    if (!recipe || !targetLanguage) {
      return res.status(400).json({ msg: 'Recipe data and target language are required.' });
    }

    // We create a simplified text version of the recipe to send to the AI
    const recipeString = `
      Title: ${recipe.title}
      Ingredients: ${recipe.extendedIngredients.map(ing => ing.original).join('; ')}
      Instructions: ${recipe.analyzedInstructions[0].steps.map(step => `Step ${step.number}: ${step.step}`).join('; ')}
    `;

    const prompt = `You are an expert translator specializing in culinary terms.
    Translate the following recipe into ${targetLanguage}.
    Your response must be in a valid JSON format with three keys: "translatedTitle", "translatedIngredients", and "translatedInstructions".
    - "translatedTitle" should be a string.
    - "translatedIngredients" should be an array of strings.
    - "translatedInstructions" should be an array of objects, where each object has a "number" and a "step" key, just like the original.

    Original Recipe Text:
    ${recipeString}`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      // We tell Gemini to respond with JSON
      generationConfig: {
        responseMimeType: "application/json",
      }
    };

    const response = await axios.post(geminiUrl, requestBody);
    const translatedData = JSON.parse(response.data.candidates[0].content.parts[0].text);

    res.json(translatedData);

  } catch (error) {
    console.error('AI Translation Error:', error.response ? error.response.data : error.message);
    res.status(500).send('Error translating recipe.');
  }
});

router.post('/get-pairings', authMiddleware, async (req, res) => {
  try {
    const { title, ingredients } = req.body;
    if (!title || !ingredients) {
      return res.status(400).json({ msg: 'Recipe title and ingredients are required.' });
    }

    const prompt = `You are an expert sommelier and chef. Your task is to provide food and drink pairing recommendations for a given recipe.
    Analyze the following recipe:
    - Title: "${title}"
    - Main Ingredients: "${ingredients.join(', ')}"

    Please provide a response in a valid JSON format with three main keys: "winePairing", "beerPairing", and "sideDish".
    Each of these keys should be an object containing two sub-keys: "suggestion" (a string with the name of the item) and "reason" (a short, one-sentence explanation for why it pairs well).

    Example response format:
    {
      "winePairing": {
        "suggestion": "Sauvignon Blanc",
        "reason": "Its crisp acidity and citrus notes will cut through the richness of the dish."
      },
      "beerPairing": {
        "suggestion": "Belgian Witbier",
        "reason": "The beer's light body and hints of coriander and orange peel complement the recipe's flavors."
      },
      "sideDish": {
        "suggestion": "Roasted Asparagus with Lemon",
        "reason": "The simple, bright flavors of the asparagus will provide a fresh contrast to the main course."
      }
    }`;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      // We explicitly tell Gemini to respond with structured JSON
      generationConfig: {
        responseMimeType: "application/json",
      }
    };

    const response = await axios.post(geminiUrl, requestBody);
    const pairingData = JSON.parse(response.data.candidates[0].content.parts[0].text);

    res.json(pairingData);

  } catch (error) {
    // --- THIS IS THE UPDATED PART ---
    // We will log the detailed error from the AI service to our terminal
    if (error.response) {
      console.error('Gemini API Error - Data:', error.response.data);
      console.error('Gemini API Error - Status:', error.response.status);
    } else {
      console.error('AI Pairing Error - Message:', error.message);
    }
    res.status(500).send('Error generating pairings.');
  }
});

module.exports = router;