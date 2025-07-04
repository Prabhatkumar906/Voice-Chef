// src/pages/LandingPage.jsx
// Updated with a new "How It Works" section for a more complete and professional feel.

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Search, Mic, Sparkles, MoveRight, Star, List, Soup, Volume2 } from 'lucide-react';
import ImageViewer from 'react-simple-image-viewer';
import pantryChefImage from '../assets/pic2.png'; // Make sure you have your image here

// --- Reusable Components ---

const FeatureCard = ({ icon, title, children }) => (
  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl animate-[--animation-fade-in-up]">
    <div className="bg-green-100 rounded-full p-4 inline-block mb-5 transition-transform duration-300 group-hover:scale-110">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="text-gray-600">{children}</p>
  </div>
);

const TestimonialCard = ({ name, role, image, children }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 flex flex-col h-full mx-4 w-80 md:w-96 flex-shrink-0">
        <div className="flex text-yellow-400 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
        </div>
        <p className="text-gray-600 mb-6 flex-grow">"{children}"</p>
        <div className="flex items-center">
            <img src={image} alt={name} className="h-12 w-12 rounded-full object-cover mr-4" />
            <div>
                <p className="font-bold text-gray-800">{name}</p>
                <p className="text-sm text-gray-500">{role}</p>
            </div>
        </div>
    </div>
);

const testimonials = [
    { name: "Sarah K.", role: "Busy Mom", image: "https://placehold.co/100x100/FFC0CB/000000?text=SK", text: "VoiceChef has been a lifesaver on busy weeknights. The Pantry Chef feature is genius! No more 'what's for dinner?' stress." },
    { name: "Mike R.", role: "New Cook", image: "https://placehold.co/100x100/ADD8E6/000000?text=MR", text: "I used to burn water. The voice assistant is like having a patient teacher in the kitchen with me. I actually made a decent meal!" },
    { name: "Jessica L.", role: "Foodie", image: "https://placehold.co/100x100/90EE90/000000?text=JL", text: "I love experimenting, and VoiceChef helps me discover new recipes with the ingredients I have. It's fantastic for reducing food waste." },
    { name: "David C.", role: "Tech Enthusiast", image: "https://placehold.co/100x100/FFD700/000000?text=DC", text: "The voice recognition is surprisingly accurate. Being able to cook completely hands-free is a game-changer. So cool!" },
];

// --- Main Landing Page Component ---

const LandingPage = () => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const openImageViewer = useCallback(() => setIsViewerOpen(true), []);
  const closeImageViewer = () => setIsViewerOpen(false);

  return (
    <div className="text-gray-800 overflow-x-hidden">
      {/* Hero Section */}
      <section 
        className="relative text-center py-24 md:py-40 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=2070&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative">
          <div className="animate-[--animation-fade-in-up]">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-4 text-gray-900">
              Never Worry About What's for Dinner Again.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-10">
              Turn the ingredients you have into delicious meals with AI-powered recipes and hands-free voice guidance.
            </p>
            <Link
              to="/login"
              className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center"
            >
              Get Started For Free <MoveRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Your Personal Cooking Companion</h2>
          <p className="text-gray-600 mb-16 max-w-2xl mx-auto">From finding the perfect recipe to guiding you through it, VoiceChef has you covered.</p>
          <div className="grid md:grid-cols-3 gap-10">
            <FeatureCard icon={<ChefHat className="h-10 w-10 text-green-600" />} title="Pantry Chef" />
            <FeatureCard icon={<Search className="h-10 w-10 text-green-600" />} title="Smart Search" />
            <FeatureCard icon={<Mic className="h-10 w-10 text-green-600" />} title="Voice Assistant" />
          </div>
        </div>
      </section>

      {/* --- NEW: How It Works Section --- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Get Started in 3 Simple Steps</h2>
          <div className="relative grid md:grid-cols-3 gap-10">
            {/* Dotted line for desktop view */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px border-t-2 border-dashed border-gray-300 -translate-y-12"></div>
            
            <div className="relative flex flex-col items-center">
              <div className="bg-white border-2 border-gray-200 h-24 w-24 rounded-full flex items-center justify-center z-10">
                <List className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">1. List Your Ingredients</h3>
              <p className="text-gray-600">Tell us what you have in your kitchen by typing or snapping a photo.</p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="bg-white border-2 border-gray-200 h-24 w-24 rounded-full flex items-center justify-center z-10">
                <Soup className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">2. Get AI Recipes</h3>
              <p className="text-gray-600">Our AI generates delicious recipes tailored to your ingredients and preferences.</p>
            </div>
            <div className="relative flex flex-col items-center">
              <div className="bg-white border-2 border-gray-200 h-24 w-24 rounded-full flex items-center justify-center z-10">
                <Volume2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2">3. Cook with Voice</h3>
              <p className="text-gray-600">Follow along with hands-free voice commands for a seamless cooking experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-24">
         <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-[--animation-subtle-float]">
                <Sparkles className="h-10 w-10 text-green-500 mb-4" />
                <h2 className="text-4xl font-bold mb-6">Where Ingredients Turn into Masterpieces</h2>
                <p className="text-gray-600 text-lg mb-6">
                    Have a stocked pantry but no inspiration? The Pantry Chef is the kitchen genie that turns your basic ingredients into delectable dinner ideas. No more food waste, just delicious possibilities.
                </p>
                <Link to="/login" className="text-green-600 font-bold hover:text-green-700 inline-flex items-center">
                    Discover PantryChef <MoveRight className="ml-2 h-4 w-4" />
                </Link>
            </div>
            <div className="animate-[--animation-subtle-float]">
                <img 
                    src={pantryChefImage}
                    alt="App screenshot showing the PantryChef feature"
                    className="rounded-2xl shadow-2xl transform cursor-pointer hover:shadow-green-200 hover:scale-105 transition-all duration-300"
                    onClick={openImageViewer}
                />
            </div>
         </div>
      </section>
      
      {isViewerOpen && (
        <ImageViewer
          src={[pantryChefImage]}
          currentIndex={0}
          disableScroll={false}
          closeOnClickOutside={true}
          onClose={closeImageViewer}
          backgroundStyle={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        />
      )}

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">Loved by Home Cooks Everywhere</h2>
            <p className="text-gray-600 mb-16 max-w-2xl mx-auto">We're helping thousands of people cook smarter, not harder.</p>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
            <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-[--animation-scroll-x] hover:[animation-play-state:paused]">
                {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <li key={index}>
                        <TestimonialCard {...testimonial}>{testimonial.text}</TestimonialCard>
                    </li>
                ))}
            </ul>
        </div>
      </section>

       {/* Final Call to Action Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">The Perfect Companion for Your Kitchen.</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">Ready to revolutionize your cooking? Get started in seconds.</p>
           <Link
            to="/login"
            className="bg-green-500 hover:bg-green-600 text-white font-bold text-lg py-4 px-10 rounded-full shadow-lg transition-transform transform hover:scale-105 inline-flex items-center"
          >
            Sign Up for Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;