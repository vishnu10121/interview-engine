import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 text-center">
          🎯 AI Interview Engine
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Practice interviews with AI-powered feedback
        </p>
        
        <Link to="/dashboard">
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium">
            Get Started 🚀
          </button>
        </Link>
        
        <div className="mt-4 text-center space-x-4">
          <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
          <Link to="/register" className="text-indigo-600 hover:underline">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;