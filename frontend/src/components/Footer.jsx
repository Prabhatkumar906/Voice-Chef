// src/components/Footer.jsx
// A new component for the site-wide footer.

import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white">
            <div className="container mx-auto px-6 py-12">
                <div className="grid md:grid-cols-4 gap-8">
                    <div className="col-span-4 md:col-span-1 mb-8 md:mb-0">
                        <Link to="/" className="flex items-center space-x-2 mb-4">
                            <ChefHat className="h-8 w-8 text-green-400" />
                            <span className="text-2xl font-bold">VoiceChef</span>
                        </Link>
                        <p className="text-gray-400">Your personal AI cooking companion.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white">Features</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Pricing</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Updates</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white">About Us</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Blog</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li><Link to="#" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
                            <li><Link to="#" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-500">
                    <p>&copy; {new Date().getFullYear()} VoiceChef. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
