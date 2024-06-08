// Import the main stylesheet for the application
import './index.css';

// Import necessary libraries from React and React Router
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// Import components
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import NotFound from './components/NotFound';

// Import ToastContainer for displaying notifications
import { ToastContainer } from 'react-toastify';

/**
 * Main App component that sets up the routes and manages the authentication state.
 */
const App = () => {
    // State to manage the authentication status of the user
    const [auth, setAuth] = useState(null);

    return (
        <Router>
            {/* ToastContainer configuration for notifications */}
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <Routes>
                {/* Route for user registration */}
                <Route path="/register" element={<SignupForm />} />
                {/* Route for user login, with setAuth passed as a prop to update auth state */}
                <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
                {/* Protected route for user profile, redirects to login if not authenticated */}
                <Route
                    path="/profile"
                    element={auth ? <Profile auth={auth} /> : <Navigate to="/login" />}
                />
                {/* Default route redirects to the registration page */}
                <Route path="/" element={<Navigate to="/register" />} />
                {/* Catch-all route for 404 */}
                <Route path="*" element={<NotFound />} /> 
            </Routes>
        </Router>
    );
};

export default App;
