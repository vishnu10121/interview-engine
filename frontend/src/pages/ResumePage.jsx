import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

const ResumePage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [scanStage, setScanStage] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
      setAnalysis(null);
    } else {
      setError('Please select a valid PDF file');
      setFile(null);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please select a PDF file');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis(null);
    setUploadProgress(0);
    setTimeLeft(12);

    const stages = [
      '📄 Parsing resume structure...',
      '🔍 Scanning for keywords...',
      '📊 Analyzing skills and experience...',
      '📝 Evaluating content quality...',
      '⚡ Calculating ATS score...',
      '📋 Generating comprehensive report...'
    ];

    let timerValue = 12;
    const timerInterval = setInterval(() => {
      timerValue = Math.max(timerValue - 1, 0);
      setTimeLeft(timerValue);
    }, 1000);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const nextValue = Math.min(prev + Math.random() * 7, 98);
        const stageIndex = Math.min(Math.floor(nextValue / 17), stages.length - 1);
        setScanStage(stages[stageIndex] || stages[0]);
        return nextValue;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const extractResponse = await axios.post(`${API_BASE}/api/resume/extract`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (!extractResponse.data.success || !extractResponse.data.data) {
        throw new Error(extractResponse.data.error || 'Resume extraction failed');
      }

      const resumeText = extractResponse.data.data.raw_text || '';
      const jobDescription = "We are seeking a strong software engineer with experience in Python, JavaScript, React, Node.js, SQL, AWS, Docker, Git, TypeScript, MongoDB, REST APIs, and CI/CD. Candidate should have strong problem-solving abilities, product thinking, and experience building web applications and APIs.";

      const atsResponse = await axios.post(`${API_BASE}/api/resume/analyze`, {
        resume_text: resumeText,
        job_description: jobDescription,
      });

      const atsData = atsResponse.data.data;
      setUploadProgress(100);
      setScanStage('✅ Analysis complete!');
      setAnalysis(atsData);
    } catch (err) {
      console.error('Resume analysis failed:', err);
      setError('Failed to analyze resume. Please try again or upload a clearer PDF.');
    } finally {
      clearInterval(progressInterval);
      clearInterval(timerInterval);
      setTimeLeft(0);
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    const percentage = (score / 20) * 100;
    if (percentage >= 80) return 'text-green-400';
    if (percentage >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRecommendationColor = (rec) => {
    const colors = {
      'Strongly Recommend': 'text-green-400 border-green-500/30 bg-green-500/10',
      'Recommend': 'text-blue-400 border-blue-500/30 bg-blue-500/10',
      'Consider': 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
      'Weak Match': 'text-orange-400 border-orange-500/30 bg-orange-500/10',
      'Reject': 'text-red-400 border-red-500/30 bg-red-500/10'
    };
    return colors[rec] || 'text-gray-400 border-gray-500/30 bg-gray-500/10';
  };

  const sectionNames = {
    formatting: 'Formatting',
    contactInformation: 'Contact Info',
    summary: 'Summary',
    skills: 'Skills',
    experience: 'Experience',
    projects: 'Projects',
    education: 'Education',
    certifications: 'Certifications',
    achievements: 'Achievements',
    grammar: 'Grammar',
    keywords: 'Keywords'
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">📄</span>
        <h1 className="text-3xl font-bold text-white">ResumeScan AI</h1>
        <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">ATS Scanner</span>
      </div>
      <p className="text-gray-400 mb-6">Enterprise-grade ATS resume evaluation with 20+ years of recruiting expertise</p>

      {/* Upload Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-black via-orange-950/40 to-black rounded-3xl p-8 mb-8 border border-orange-500/20">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="flex-1 w-full">
              <label className="block text-gray-300 text-sm font-medium mb-2">📎 Upload Resume (PDF)</label>
              <div className="relative">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full p-3 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition cursor-pointer"
                />
                {file && (
                  <div className="mt-2 text-sm text-gray-400 flex items-center gap-2">
                    <span>✅</span>
                    <span>{file.name}</span>
                    <span className="text-gray-500">({(file.size / 1024).toFixed(0)} KB)</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-1">Only .pdf · max ~5MB recommended</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAnalyze}
              disabled={!file || loading}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl hover:from-orange-400 hover:to-orange-500 transition disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Analyzing...' : '🔍 Analyze Resume'}
            </motion.button>
          </div>

          {error && (
            <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">{error}</div>
          )}

          {loading && (
            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-1 gap-3">
                <span>{scanStage || 'Scanning resume...'}</span>
                <div className="flex items-center gap-3">
                  <span>{Math.round(uploadProgress)}%</span>
                  <span className="text-orange-300">
                    {timeLeft > 0 ? `~${timeLeft}s left` : 'Finalizing...'}
                  </span>
                </div>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      {analysis && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* ATS Score - Fixed Circle Alignment */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm flex flex-col items-center justify-center">
                <div className="relative flex items-center justify-center w-56 h-56">
                  <svg className="w-56 h-56 transform -rotate-90">
                    {/* Background Circle */}
                    <circle
                      cx="50%"
                      cy="50%"
                      r="90"
                      stroke="#1a1a1a"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    {/* Progress Circle */}
                    <circle
                      cx="50%"
                      cy="50%"
                      r="90"
                      stroke={analysis.overallATSScore >= 80 ? '#22c55e' : analysis.overallATSScore >= 60 ? '#eab308' : '#ef4444'}
                      strokeWidth="12"
                      strokeDasharray="565.48"
                      strokeDashoffset={565.48 - (analysis.overallATSScore / 100) * 565.48}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-white">{analysis.overallATSScore}%</span>
                    <span className="text-sm text-gray-400">ATS Score</span>
                    <span className="text-sm font-medium text-orange-400">Grade: {analysis.resumeGrade}</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm flex flex-col justify-center">
                <h3 className="text-xl font-bold text-white mb-2">📋 Evaluation Summary</h3>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400">ATS Compatibility</div>
                    <div className="text-sm font-semibold text-green-400">{analysis.atsCompatibility}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400">Keyword Match</div>
                    <div className="text-sm font-semibold text-orange-400">{analysis.keywordMatch}</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-3">
                    <div className="text-xs text-gray-400">Recruiter Readability</div>
                    <div className="text-sm font-semibold text-blue-400">{analysis.recruiterReadability}</div>
                  </div>
                  <div className={`rounded-lg p-3 border ${getRecommendationColor(analysis.hiringRecommendation)}`}>
                    <div className="text-xs text-gray-400">Recommendation</div>
                    <div className="text-sm font-semibold">{analysis.hiringRecommendation}</div>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{analysis.overallFeedback}</p>
              </div>
            </div>

            {/* Section Scores */}
            <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">📊 Section-wise Scores</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {Object.entries(analysis.sectionScores).map(([key, score]) => (
                  <div key={key} className="flex items-center justify-between bg-gray-800/30 rounded-lg px-4 py-2">
                    <span className="text-sm text-gray-300 capitalize">{sectionNames[key] || key}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${score >= 8 ? 'bg-green-500' : score >= 5 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${(score / 20) * 100}%` }} />
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(score)}`}>{score}/20</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Found */}
            {analysis.skillsFound && analysis.skillsFound.length > 0 && (
              <div className="bg-black/50 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-green-400 mb-3">✅ Skills Detected ({analysis.skillsFound.length})</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skillsFound.map((skill, i) => (
                    <span key={i} className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/30">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Strengths & Weaknesses */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/50 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-green-400 mb-4">✅ Strengths</h3>
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {analysis.strengths && analysis.strengths.length > 0 ? (
                    analysis.strengths.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400">▸</span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">No specific strengths identified yet</li>
                  )}
                </ul>
              </div>

              <div className="bg-black/50 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">⚠️ Areas for Improvement</h3>
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                  {analysis.weaknesses && analysis.weaknesses.length > 0 ? (
                    analysis.weaknesses.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-yellow-400">▸</span>
                        <span>{item}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400 text-sm">No major weaknesses identified</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Missing Sections & Keywords */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-black/50 border border-red-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-red-400 mb-3">📋 Missing Sections</h3>
                {analysis.missingSections && analysis.missingSections.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.missingSections.map((item, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-red-400">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 text-sm">All sections covered ✅</p>
                )}
              </div>

              <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-orange-400 mb-3">🔑 Missing Keywords</h3>
                {analysis.missingKeywords && analysis.missingKeywords.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {analysis.missingKeywords.map((item, i) => (
                      <span key={i} className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-xs border border-red-500/30">
                        {item}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">All keywords covered ✅</p>
                )}
              </div>
            </div>

            {/* Weak Bullet Points */}
            {analysis.weakBulletPoints && analysis.weakBulletPoints.length > 0 && (
              <div className="bg-black/50 border border-yellow-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-yellow-400 mb-4">📝 Weak Bullet Points & Suggestions</h3>
                <div className="space-y-3">
                  {analysis.weakBulletPoints.map((item, i) => (
                    <div key={i} className="bg-gray-800/20 rounded-lg p-3 border border-gray-700/50">
                      <div className="flex items-start gap-2 mb-1">
                        <span className="text-yellow-400">⚠️</span>
                        <span className="text-gray-300 text-sm">{item.text}</span>
                      </div>
                      <div className="flex items-start gap-2 ml-6">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-400 text-sm">Suggestion: {item.suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Improvements */}
            <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-4">💡 Suggestions to Improve</h3>
              <ul className="grid md:grid-cols-2 gap-2">
                {analysis.improvements && analysis.improvements.length > 0 ? (
                  analysis.improvements.map((item, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                      <span className="text-orange-400">▸</span>
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-400 text-sm">No specific improvements suggested</li>
                )}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default ResumePage;