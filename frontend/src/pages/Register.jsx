import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.detail || 'Registration failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-orange-500/20 shadow-2xl overflow-hidden"
      >
        <div className="grid md:grid-cols-2">
          {/* Left Side - Branding */}
          <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-orange-500/20 to-black/50 border-r border-orange-500/10">
            <div>
              <motion.div 
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-3 mb-8"
              >
                <span className="text-4xl">🎯</span>
                <span className="text-2xl font-bold text-white">INTERVIEW<span className="text-orange-500">OS</span></span>
              </motion.div>
              
              <motion.h2 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-white mb-4"
              >
                Join Us! 🚀
              </motion.h2>
              
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-gray-400 text-lg"
              >
                Start your interview preparation journey with AI-powered mock interviews
              </motion.p>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              {[
                { icon: '🎯', text: '9+ Interview Categories' },
                { icon: '🤖', text: 'AI-Powered Evaluations' },
                { icon: '📈', text: 'Track Your Progress' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-gray-300">
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Register Form */}
          <div className="p-8 md:p-12">
            <div className="md:hidden text-center mb-8">
              <span className="text-3xl">🎯</span>
              <h1 className="text-2xl font-bold text-white">INTERVIEW<span className="text-orange-500">OS</span></h1>
              <p className="text-gray-400 text-sm mt-1">Create your account</p>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
              <p className="text-gray-400 text-sm mb-6">Start your interview preparation journey</p>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg mb-4 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">👤</span>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">📧</span>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-300 text-sm font-medium mb-2">Password</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500">🔒</span>
                    <input
                      type="password"
                      className="w-full pl-10 pr-4 py-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
                      placeholder="Min 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-black py-3 rounded-xl font-bold hover:from-orange-400 hover:to-orange-500 transition disabled:opacity-50"
                >
                  {loading ? 'Creating Account...' : 'Create Account →'}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Already have an account?{' '}
                  <Link to="/login" className="text-orange-400 hover:text-orange-300 font-medium transition">
                    Login
                  </Link>
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;