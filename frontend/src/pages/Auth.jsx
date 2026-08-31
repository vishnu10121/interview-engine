import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white p-12 flex-col justify-between relative overflow-hidden"
      >
        {/* Background Animations */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"
        />
        
        <div className="relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <motion.span 
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-3xl"
            >
              🎯
            </motion.span>
            <h1 className="text-2xl font-bold">AI Interview</h1>
          </motion.div>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative z-10 max-w-md"
        >
          <motion.h2 
            key={isLogin ? 'login' : 'register'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-4"
          >
            {isLogin ? 'Welcome Back!' : 'Join Us Today!'}
          </motion.h2>
          
          <motion.p 
            key={isLogin ? 'login-p' : 'register-p'}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg opacity-90 mb-8"
          >
            {isLogin 
              ? 'Login to continue your interview preparation journey and track your progress.' 
              : 'Start your interview preparation journey with AI-powered mock interviews.'}
          </motion.p>
          
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            {[
              { icon: '📄', text: 'AI-Powered Resume Analysis' },
              { icon: '💻', text: 'Live Coding with AI Review' },
              { icon: '📊', text: 'Detailed Performance Reports' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ x: 10, scale: 1.02 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition"
                >
                  {item.icon}
                </motion.div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="relative z-10"
        >
          <p className="text-sm opacity-75">© 2024 AI Interview Engine. All rights reserved.</p>
        </motion.div>
      </motion.div>

      {/* Right Side - Form */}
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50"
      >
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mb-8 lg:hidden"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center gap-2 mb-2"
            >
              <motion.span 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🎯
              </motion.span>
              <h1 className="text-2xl font-bold text-gray-800">AI Interview</h1>
            </motion.div>
            <motion.p 
              key={isLogin ? 'login-mobile' : 'register-mobile'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-600"
            >
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </motion.p>
          </motion.div>

          <motion.div 
            whileHover={{ boxShadow: "0 20px 60px rgba(0,0,0,0.1)" }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-6 relative">
              <motion.div
                className="absolute bg-indigo-600 rounded-lg shadow-lg"
                layout
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                style={{
                  width: isLogin ? '50%' : '50%',
                  height: '90%',
                  left: isLogin ? '2px' : 'calc(50% + 2px)',
                  top: '5%',
                }}
              />
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all relative z-10 ${
                  isLogin ? 'text-white' : 'text-gray-600'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all relative z-10 ${
                  !isLogin ? 'text-white' : 'text-gray-600'
                }`}
              >
                Register
              </button>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? <LoginForm key="login" /> : <RegisterForm key="register" />}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// ============ LOGIN FORM ============
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // API call for login
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        navigate('/dashboard');
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
        <motion.div whileHover={{ scale: 1.01 }} className="relative">
          <span className="absolute left-3 top-3 text-gray-400">📧</span>
          <input
            type="email"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <motion.div whileHover={{ scale: 1.01 }} className="relative">
          <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          <input
            type="password"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </motion.div>
        <motion.div whileHover={{ x: 5 }} className="text-right mt-2">
          <button type="button" className="text-sm text-indigo-600 hover:underline">
            Forgot password?
          </button>
        </motion.div>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            ⏳
          </motion.div>
        ) : (
          'Login 🚀'
        )}
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <p className="text-gray-600">
          Don't have an account?{' '}
          <button type="button" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </button>
        </p>
      </motion.div>
    </motion.form>
  );
};

// ============ REGISTER FORM ============
const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // API call for registration
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('✅ Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4 }}
      onSubmit={handleSubmit}
    >
      {error && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}
      
      {success && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-green-50 text-green-600 rounded-lg text-sm"
        >
          {success}
        </motion.div>
      )}

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-4"
      >
        <label className="block text-gray-700 font-medium mb-2">Full Name</label>
        <motion.div whileHover={{ scale: 1.01 }} className="relative">
          <span className="absolute left-3 top-3 text-gray-400">👤</span>
          <input
            type="text"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-4"
      >
        <label className="block text-gray-700 font-medium mb-2">Email Address</label>
        <motion.div whileHover={{ scale: 1.01 }} className="relative">
          <span className="absolute left-3 top-3 text-gray-400">📧</span>
          <input
            type="email"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <label className="block text-gray-700 font-medium mb-2">Password</label>
        <motion.div whileHover={{ scale: 1.01 }} className="relative">
          <span className="absolute left-3 top-3 text-gray-400">🔒</span>
          <input
            type="password"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs text-gray-500 mt-1"
        >
          Password must be at least 6 characters
        </motion.p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg"
      >
        {loading ? (
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
            ⏳
          </motion.div>
        ) : (
          'Create Account ✨'
        )}
      </motion.button>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-center"
      >
        <p className="text-gray-600">
          Already have an account?{' '}
          <button type="button" className="text-indigo-600 font-medium hover:underline">
            Login
          </button>
        </p>
      </motion.div>
    </motion.form>
  );
};

export default Auth;