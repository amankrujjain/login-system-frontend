import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = ({ auth }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth}`,
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    toast.error('Failed to load profile');
                }

                const data = await response.json();
                setUser(data);
                toast.success('Profile loaded successfully');
            } catch (err) {
                toast.error('Failed to load profile. Redirecting to login...');
                navigate('/login');
            }
        };

        fetchProfile();
    }, [auth, navigate]);

    const handleLogout = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!response.ok) {
                toast.error('Failed to log out. Please try again.');
            };
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (!user) return null;

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-white p-8 rounded shadow-md w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Welcome {user.username} To Your Profile</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Username</label>
                    <p className="text-lg">{user.username}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <p className="text-lg">{user.email}</p>
                </div>
                <button
                    onClick={handleLogout}
                    className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
