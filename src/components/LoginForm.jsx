// Import necessary libraries and components
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../config/toastConfig';

/**
 * LoginForm component for user authentication.
 * 
 * @param {Object} props - Component properties
 * @param {Function} props.setAuth - Function to update the authentication state
 * @returns {JSX.Element} The LoginForm component
 */
const LoginForm = ({ setAuth }) => {
    // State to manage the form data for login
    const [formData, setFormData] = useState({
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
     * Handle form submission for login.
     * 
     * @param {Object} e - The event object
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to the API
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                // Include credentials (cookies, authorization headers, etc.)
                credentials: 'include', 
            });

            // Check if the response is not OK
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please try again.');
            }

            // Parse the response data
            const data = await response.json();
            setAuth(data.accessToken);
            successToast('Login successful');
            navigate('/profile');
        } catch (err) {
            errorToast(err.message);
        }
    };

    /**
     * Redirect the user to the signup page.
     */
    const handleSignupRedirect = () => {
        navigate('/register');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
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
                    Log In
                </button>
                <button
                    type="button"
                    onClick={handleSignupRedirect}
                    className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                >
                    Don't have an account? Sign Up
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
