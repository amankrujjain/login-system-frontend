import './index.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Profile from './components/Profile';
import { ToastContainer } from 'react-toastify';

const App = () => {
    const [auth, setAuth] = useState(null);

    return (
        <Router>
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
                <Route path="/register" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm setAuth={setAuth} />} />
                <Route
                    path="/profile"
                    element={auth ? <Profile auth={auth} /> : <Navigate to="/login" />}
                />
                <Route path="/" element={<Navigate to="/register" />} />
            </Routes>
        </Router>
    );
};

export default App;

