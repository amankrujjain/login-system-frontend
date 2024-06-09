// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../config/toastConfig';

/**
 * SignupForm component for user registration.
 * 
 * @returns {JSX.Element} The SignupForm component
 */
const SignupForm = () => {
    // State to manage the form data for registration
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    /**
     * Handle changes to the form fields and update the formData state.
     * 
     * @param {Object} e - The event object
     */
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    /**
     * Handle form submission for registration.
     * 
     * @param {Object} e - The event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send registration request to the API
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
    
            // Check if the response is not OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed. Please try again.');
            }
    
            successToast('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            errorToast(err.message);
        }
    };

    /**
     * Redirect the user to the login page.
     */
    const handleLoginRedirect = () => {
        navigate('/login');
    };
    
    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={handleLoginRedirect}
                    className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                    Already have an account? Log in
                </button>
            </form>
        </div>
    );
};

export default SignupForm;
