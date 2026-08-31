import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

const loadingMessages = [
  'Preparing your interview room...',
  'Scanning your resume...',
  'Matching your skills to the role...',
  'Launching AI mock interview...'
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [loaderIndex, setLoaderIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoaderIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: credentialResponse?.credential,
          provider: 'google'
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Google login failed');
      }

      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify({
        provider: 'google',
        email: data.email || 'google-user@gmail.com'
      }));

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google login failed. Please try again.');
  };

  return (
    <div className="min-h-screen bg-[#020b14] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_30%)]" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-24 left-20 h-72 w-72 rounded-full bg-orange-500/10 blur-[120px]" />
        <div className="absolute right-16 bottom-20 h-80 w-80 rounded-full bg-sky-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 text-sm font-medium text-orange-200">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-400 shadow-[0_0_18px_rgba(251,146,60,0.9)]" />
              AI Interview Practice Platform
            </div>

            <div className="space-y-5">
              <h1 className="text-5xl font-black leading-none tracking-tight md:text-6xl">
                Interview smarter.
                <span className="block bg-gradient-to-r from-orange-400 via-amber-200 to-sky-300 bg-clip-text text-transparent">
                  Get hired faster.
                </span>
              </h1>
              <p className="max-w-xl text-lg text-slate-300">
                Practice real-world coding rounds, AI-powered mock interviews, and resume feedback with a Google account in one polished workspace.
              </p>
            </div>

            <div className="grid max-w-lg grid-cols-3 gap-4">
              {[
                ['1.2k+', 'interviews'],
                ['94%', 'success rate'],
                ['24/7', 'AI feedback']
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-slate-700/80 bg-slate-900/60 p-4 backdrop-blur-sm">
                  <div className="text-2xl font-bold text-white">{value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-[28px] border border-slate-700 bg-slate-950/80 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-amber-600 text-lg font-bold text-slate-950">
                    AI
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Interview</p>
                    <h2 className="text-lg font-semibold text-white">Loading profile</h2>
                  </div>
                </div>
                <div className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-emerald-300">
                  live
                </div>
              </div>

              <div className="rounded-2xl border border-slate-700 bg-[#061826] p-4">
                <div className="mb-4 flex items-center gap-3">
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/10">
                    <div className="h-7 w-7 animate-pulse rounded-full bg-orange-400/80" />
                    <div className="absolute inset-0 rounded-full border border-orange-400/60 animate-ping" />
                  </div>
                  <div className="flex-1">
                    <div className="h-2.5 w-2/3 rounded-full bg-slate-700" />
                    <div className="mt-2 h-2.5 w-1/2 rounded-full bg-slate-800" />
                  </div>
                </div>

                <div className="mb-4 overflow-hidden rounded-full bg-slate-800">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '82%' }}
                    transition={{ duration: 1.8, ease: 'easeInOut' }}
                    className="h-2 rounded-full bg-gradient-to-r from-orange-400 via-amber-400 to-sky-400"
                  />
                </div>

                <div className="rounded-xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-200">
                  <div className="mb-2 flex items-center gap-2 text-orange-300">
                    <span className="inline-flex h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
                    <span className="font-medium">System</span>
                  </div>
                  <p className="min-h-[52px] text-slate-200">
                    {loadingMessages[loaderIndex]}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {loading && (
                  <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-200">
                    Signing you in, please wait...
                  </div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                  >
                    {error}
                  </motion.div>
                )}

                {googleClientId ? (
                  <GoogleOAuthProvider clientId={googleClientId}>
                    <div className="flex justify-center">
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={handleGoogleError}
                        theme="filled_black"
                        text="continue_with"
                        shape="pill"
                        width="100%"
                        size="large"
                        useOneTap
                      />
                    </div>
                  </GoogleOAuthProvider>
                ) : (
                  <div className="rounded-xl border border-orange-500/30 bg-orange-500/5 px-4 py-3 text-center text-sm text-orange-200">
                    Add REACT_APP_GOOGLE_CLIENT_ID to enable Google sign-in.
                  </div>
                )}

                <div className="text-center text-sm text-slate-400">
                  Continue with your Google account to enter the interview workspace
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;