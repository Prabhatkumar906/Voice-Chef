// src/pages/RecipeDetailPage.jsx
// This is the complete and fully functional version with AI features and stable voice controls.

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Mic, MicOff, Volume2, VolumeX, HelpCircle, Sparkles, Loader, Languages, GlassWater, Grape, Beer, UtensilsCrossed,Speech } from 'lucide-react';

// --- Reusable Sub-Components ---

const AIResultCard = ({ title, description }) => (
  <div className="relative p-1 rounded-2xl bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 my-8 animate-[--animation-fade-in-up]">
    <div className="bg-white p-6 rounded-xl">
      <div className="flex items-center mb-3">
        <Sparkles className="h-6 w-6 text-purple-600 mr-3" />
        <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

const AIPairingsCard = ({ pairings }) => (
  <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 my-8 rounded-2xl shadow-2xl border border-gray-700 animate-[--animation-fade-in-up]">
    <div className="flex items-center mb-6">
      <GlassWater className="h-8 w-8 text-blue-400 mr-4" />
      <h3 className="text-3xl font-bold text-white">Expert Pairings</h3>
    </div>
    <div className="grid md:grid-cols-3 gap-6 text-white">
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center text-sm text-blue-300 mb-2 font-semibold">
          <Grape className="h-5 w-5 mr-2" /> WINE PAIRING
        </div>
        <p className="font-bold text-lg">{pairings.winePairing.suggestion}</p>
        <p className="text-sm text-gray-400 mt-1">{pairings.winePairing.reason}</p>
      </div>
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center text-sm text-blue-300 mb-2 font-semibold">
          <Beer className="h-5 w-5 mr-2" /> BEER PAIRING
        </div>
        <p className="font-bold text-lg">{pairings.beerPairing.suggestion}</p>
        <p className="text-sm text-gray-400 mt-1">{pairings.beerPairing.reason}</p>
      </div>
      <div className="bg-white/5 p-4 rounded-lg">
        <div className="flex items-center text-sm text-blue-300 mb-2 font-semibold">
          <UtensilsCrossed className="h-5 w-5 mr-2" /> SIDE DISH
        </div>
        <p className="font-bold text-lg">{pairings.sideDish.suggestion}</p>
        <p className="text-sm text-gray-400 mt-1">{pairings.sideDish.reason}</p>
      </div>
    </div>
  </div>
);

const SimplifiedStep = ({ text }) => (
  <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-2 rounded-r-lg animate-[--animation-fade-in-up]">
    <ul className="list-disc list-inside space-y-1 text-gray-700">
      {text.split('- ').filter(line => line.trim() !== '').map((line, index) => (
        <li key={index}>{line}</li>
      ))}
    </ul>
  </div>
);

// --- Main Recipe Detail Page Component ---

const RecipeDetailPage = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // State for AI Features
  const [enhancedContent, setEnhancedContent] = useState(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [simplifiedSteps, setSimplifiedSteps] = useState({});
  const [isSimplifying, setIsSimplifying] = useState({});
  const [translatedRecipe, setTranslatedRecipe] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  // State for Voice Control
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [isDictating, setIsDictating] = useState(false);
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(isListening);

  // --- NEW STATE FOR PAIRING FEATURE ---
  const [pairings, setPairings] = useState(null);
  const [isPairing, setIsPairing] = useState(false);

  useEffect(() => { isListeningRef.current = isListening; }, [isListening]);

  // --- Core Data Fetching ---
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/recipes/${id}`);
        setRecipe(response.data);
      } catch (err) { setError('Could not fetch recipe details.'); }
      finally { setLoading(false); }
    };
    fetchRecipe();
  }, [id]);

  // --- Voice Control Logic (Stable Version) ---
  const speak = (text, highPriority = false) => {
    if (!isDictating && !highPriority) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    // Use the correct language code for the speech synthesis
    const langCodeMap = {
      'Spanish': 'es-ES',
      'French': 'fr-FR',
      'German': 'de-DE',
      'Hindi': 'hi-IN',
      'Italian': 'it-IT',
      'English': 'en-US'
    };
    utterance.lang = langCodeMap[currentLanguage] || 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    const activeRecipe = translatedRecipe ? { ...recipe, ...translatedRecipe } : recipe;
    if (isDictating && activeRecipe && activeRecipe.analyzedInstructions[0]?.steps[currentStepIndex]) {
      const stepTextToSpeak = simplifiedSteps[currentStepIndex] || activeRecipe.analyzedInstructions[0].steps[currentStepIndex].step;
      speak(stepTextToSpeak, true);
    }
  }, [currentStepIndex, recipe, isDictating, translatedRecipe]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) recognitionRef.current.abort();
      window.speechSynthesis.cancel();
    };
  }, []);

  const handleCommand = (command) => {
    if (!recipe) return;
    if (command.includes('stop listening')) {
      if (isListeningRef.current) handleToggleListening();
      return;
    }

    let match;
    match = command.match(/go to step (\d+)/);
    if (match) {
      const stepNumber = parseInt(match[1], 10);
      const targetIndex = stepNumber - 1;
      if (targetIndex >= 0 && targetIndex < (recipe.analyzedInstructions[0]?.steps.length || 0)) {
        setCurrentStepIndex(targetIndex);
      } else {
        speak(`Sorry, I can't find step number ${stepNumber}.`, true);
      }
      return;
    }

    match = command.match(/repeat step (\d+)/);
    if (match) {
      const stepNumber = parseInt(match[1], 10);
      const targetIndex = stepNumber - 1;
      const instructions = (translatedRecipe || recipe).analyzedInstructions[0]?.steps;
      if (instructions && targetIndex >= 0 && targetIndex < instructions.length) {
        const stepText = simplifiedSteps[targetIndex] || instructions[targetIndex].step;
        speak(stepText, true);
      } else {
        speak(`Sorry, I can't find step number ${stepNumber}.`, true);
      }
      return;
    }

    switch (true) {
      case command.includes('next step'):
        setCurrentStepIndex((prev) => Math.min(prev + 1, (recipe.analyzedInstructions[0]?.steps.length || 1) - 1));
        break;
      case command.includes('previous step'):
        setCurrentStepIndex((prev) => Math.max(prev - 1, 0));
        break;
      case command.includes('repeat step'):
        const instructions = (translatedRecipe || recipe).analyzedInstructions[0]?.steps;
        if (instructions && instructions[currentStepIndex]) {
          const currentStepText = simplifiedSteps[currentStepIndex] || instructions[currentStepIndex].step;
          speak(currentStepText, true);
        }
        break;
      case command.includes('start reading'):
        setIsDictating(true);
        speak("Dictation started.", true);
        break;
      case command.includes('stop reading'):
        setIsDictating(false);
        window.speechSynthesis.cancel();
        break;
      default:
        break;
    }
  };

  const setupAndStartRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Speech Recognition not supported.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
      handleCommand(transcript);
    };
    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      if (event.error !== 'no-speech') setIsListening(false);
    };
    recognition.onend = () => {
      if (isListeningRef.current) {
        try { recognition.start(); }
        catch (e) { setIsListening(false); }
      }
    };
    recognitionRef.current = recognition;
    try { recognition.start(); }
    catch (e) { setIsListening(false); }
  };

  const handleToggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      setupAndStartRecognition();
    }
  };

  // --- NEW AI Feature Handlers ---
  const handleEnhanceRecipe = async () => {
    if (!recipe) return;
    setIsEnhancing(true);
    setEnhancedContent(null);
    try {
      const payload = { title: recipe.title, ingredients: recipe.extendedIngredients.map(ing => ing.name) };
      const response = await axios.post('/api/ai/enhance-recipe', payload);
      setEnhancedContent(response.data);
    } catch (err) { alert("Sorry, the AI chef is busy. Please try again."); }
    finally { setIsEnhancing(false); }
  };

  const handleSimplifyStep = async (stepIndex, stepText) => {
    setIsSimplifying(prev => ({ ...prev, [stepIndex]: true }));
    try {
        // --- THIS IS THE FIX ---
        // We now include the currentLanguage in the request payload.
        const response = await axios.post('/api/ai/simplify-step', { stepText, language: currentLanguage });
        setSimplifiedSteps(prev => ({ ...prev, [stepIndex]: response.data.simplifiedText }));
    } catch (err) { alert("Sorry, could not simplify this step."); }
    finally { setIsSimplifying(prev => ({ ...prev, [stepIndex]: false })); }
  };

  const handleTranslate = async (language) => {
    if (language === 'English') {
      setTranslatedRecipe(null);
      setCurrentLanguage('English');
      return;
    }
    setIsTranslating(true);
    try {
      const response = await axios.post('/api/ai/translate-recipe', { recipe, targetLanguage: language });
      // We need to map the translated instructions back to the correct format
      const formattedResponse = {
        ...response.data,
        analyzedInstructions: [{
          steps: response.data.translatedInstructions
        }]
      };
      setTranslatedRecipe(formattedResponse);
      setCurrentLanguage(language);
    } catch (err) { alert("Sorry, could not translate the recipe."); }
    finally { setIsTranslating(false); }
  };

  // --- NEW FUNCTION TO HANDLE PAIRING REQUEST ---
  const handleGetPairings = async () => {
    if (!recipe) return;
    setIsPairing(true);
    setPairings(null); // Clear old pairings

    try {
      const payload = {
        title: recipe.title,
        ingredients: recipe.extendedIngredients.map(ing => ing.name),
      };
      const response = await axios.post('/api/ai/get-pairings', payload);
      setPairings(response.data);
    } catch (err) {
      console.error("AI Pairing failed:", err);
      alert("Sorry, the AI sommelier is unavailable right now.");
    } finally {
      setIsPairing(false);
    }
  };



  // In RecipeDetailPage.jsx, replace the existing return statement with this:

  if (loading) return <p className="text-center mt-8">Loading...</p>; // We can create a skeleton for this later
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
  if (!recipe) return <p className="text-center mt-8">Recipe not found.</p>;

  const activeRecipe = translatedRecipe || recipe;
  const instructions = activeRecipe.analyzedInstructions[0]?.steps || [];

  return (
    <div className="animate-fadeInUp">
      {/* --- HERO IMAGE SECTION --- */}
      {/* --- UPDATED HERO IMAGE SECTION --- */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img
          src={activeRecipe.image || recipe.image}
          alt={activeRecipe.title}
          className="w-full h-full object-cover"
        />
        {/* A slightly different overlay for better center readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* This container now centers the title */}
        <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
            {activeRecipe.title}
          </h1>
        </div>
      </div>

      {/* --- MAIN CONTENT CARD --- */}
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">

          {/* --- AI CONTROLS SECTION --- */}
          {/* --- FINAL CORRECTED AI Controls Section --- */}
<div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center justify-center mb-8">
    
    {/* Enhance Button */}
    <button 
      onClick={handleEnhanceRecipe} 
      disabled={isEnhancing} 
      className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
    >
        {isEnhancing ? <Loader className="animate-spin h-5 w-5 mr-2" /> : <Sparkles className="h-5 w-5 mr-2" />}
        {isEnhancing ? 'Thinking...' : 'Enhance'}
    </button>
    
    {/* Get Pairings Button */}
    <button 
      onClick={handleGetPairings} 
      disabled={isPairing} 
      className="w-full md:w-auto bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
    >
        {isPairing ? <Loader className="animate-spin h-5 w-5 mr-2" /> : <GlassWater className="h-5 w-5 mr-2" />}
        {isPairing ? 'Consulting...' : 'Get Pairings'}
    </button>

    {/* Language Dropdown */}
    <div className="relative w-full md:w-auto">
        <Languages className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
        <select 
            onChange={(e) => handleTranslate(e.target.value)} 
            value={currentLanguage}
            disabled={isTranslating}
            className="w-full h-full bg-gray-100 border-2 border-gray-200 font-bold py-3 pl-12 pr-8 rounded-full appearance-none focus:outline-none focus:bg-white focus:border-gray-400"
        >
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Hindi</option>
            <option>Italian</option>
        </select>
    </div>
</div>

          {isTranslating && <p className="text-center text-sm text-gray-500 my-2">Translating recipe...</p>}
          {enhancedContent && <AIResultCard title={enhancedContent.newTitle} description={enhancedContent.description} />}
          {pairings && <AIPairingsCard pairings={pairings} />}

          {/* --- VOICE CONTROLS & INSTRUCTIONS --- */}
          <div className="text-center my-8 flex justify-center items-center space-x-4">
            <button onClick={handleToggleListening} className={`flex items-center font-bold py-3 px-6 rounded-lg text-white transition-all duration-300 ${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}>
              {isListening ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
              {isListening ? 'Listening...' : 'Start Listening'}
            </button>
            <button onClick={() => setIsDictating(!isDictating)} className={`flex items-center font-bold py-3 px-6 rounded-lg text-white transition-colors ${isDictating ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-500 hover:bg-gray-600'}`}>
              {isDictating ? <Volume2 className="h-5 w-5 mr-2" /> : <VolumeX className="h-5 w-5 mr-2" />}
              {isDictating ? 'Dictation ON' : 'Dictation OFF'}
            </button>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg border my-8">
<h3 className="flex items-center font-semibold text-lg mb-3"><Speech className="h-5 w-5 mr-2 text-gray-600"/>Voice Commands Guide</h3>            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div><strong className="text-gray-800">"next step"</strong><p className="text-gray-600">Moves to the next instruction.</p></div>
              <div><strong className="text-gray-800">"previous step"</strong><p className="text-gray-600">Goes back to the last instruction.</p></div>
              <div><strong className="text-gray-800">"repeat step"</strong><p className="text-gray-600">Repeats the current instruction.</p></div>
              <div><strong className="text-gray-800">"go to step 5"</strong><p className="text-gray-600">Jumps directly to a specific step.</p></div>
              <div><strong className="text-gray-800">"start reading"</strong><p className="text-gray-600">Turns on voice dictation.</p></div>
              <div><strong className="text-gray-800">"stop reading"</strong><p className="text-gray-600">Turns off voice dictation.</p></div>
              <div><strong className="text-gray-800">"stop listening"</strong><p className="text-gray-600">Deactivates the microphone.</p></div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-3">Instructions</h2>
            <ol className="list-decimal list-inside space-y-4">
              {instructions.map((step, index) => (
                <li key={step.number} className={`p-3 rounded-md transition-colors duration-300 ${index === currentStepIndex ? 'bg-green-100 border-l-4 border-green-500 font-semibold' : 'bg-gray-50'}`}>
                  <div className="flex justify-between items-start">
                    <p className="flex-grow pr-4">{step.step}</p>
                    <button onClick={() => handleSimplifyStep(index, step.step)} disabled={isSimplifying[index]} className="ml-4 flex-shrink-0 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full hover:bg-blue-200 disabled:opacity-50">
                      {isSimplifying[index] ? '...' : 'AI Simplify'}
                    </button>
                  </div>
                  {simplifiedSteps[index] && <SimplifiedStep text={simplifiedSteps[index]} />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;