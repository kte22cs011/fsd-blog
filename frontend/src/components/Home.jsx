import React from 'react';
import { Link } from 'react-router';
const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Go-Blog</h1>
            <p className="text-lg text-gray-600 mb-8 text-center max-w-xl">
                Share your thoughts, read amazing stories, and connect with fellow bloggers. Start your blogging journey today!
            </p>
            <div className="flex space-x-4">
                <button className="px-6 py-2 bg-white border border-blue-600 text-blue-600 rounded hover:bg-blue-50 transition">
                    <Link to='/read'>Explore Blogs</Link>
                </button>
            </div>
        </div>
    );
};

export default Home;