// Import necessary libraries and components
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../assests/lottie/Animation - 1717882333064.json';

/**
 * NotFound component to display a 404 error page with animation and navigation options.
 * 
 * @returns {JSX.Element} The NotFound component
 */
const NotFound = () => {
    const navigate = useNavigate();

    /**
     * Redirect the user to the login page.
     */
    const handleLoginRedirect = () => {
        navigate('/login');
    };

    /**
     * Redirect the user to the signup page.
     */
    const handleSignupRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-64 h-64 mb-8">
                <Lottie animationData={animationData} loop={true} />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Page Not Found</h2>
            <div className="flex space-x-4">
                <button
                    onClick={handleLoginRedirect}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Log In
                </button>
                <button
                    onClick={handleSignupRedirect}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default NotFound;
