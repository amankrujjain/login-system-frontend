import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorToast, successToast } from '../config/toastConfig';

const LoginForm = ({ setAuth }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
                credentials: 'include', // Include credentials (cookies, authorization headers, etc.)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed. Please try again.');
            }

            const data = await response.json();
            setAuth(data.accessToken);
            successToast('Login successful');
            navigate('/profile');
        } catch (err) {
            errorToast(err.message);
        }
    };

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
