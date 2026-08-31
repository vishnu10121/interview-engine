import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HistoryPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  // ========== DEMO HISTORY DATA ==========
  const [historyData] = useState([
    {
      id: 1,
      type: 'interview',
      title: 'HR Interview - Medium',
      date: '2024-07-16',
      time: '14:30',
      duration: '25 min',
      score: 78,
      grade: 'B+',
      status: 'completed',
      category: 'HR',
      difficulty: 'Medium',
      questions: 5,
      answered: 4,
      feedback: 'Good communication skills. Needs more confidence.',
      icon: '🎤',
      color: 'border-blue-500/30'
    },
    {
      id: 2,
      type: 'coding',
      title: 'Two Sum - Easy',
      date: '2024-07-16',
      time: '12:15',
      duration: '15 min',
      score: 100,
      grade: 'A+',
      status: 'completed',
      category: 'Arrays',
      difficulty: 'Easy',
      language: 'JavaScript',
      feedback: 'Perfect solution! Optimal approach used.',
      icon: '💻',
      color: 'border-green-500/30'
    },
    {
      id: 3,
      type: 'interview',
      title: 'Technical Interview - Hard',
      date: '2024-07-15',
      time: '16:00',
      duration: '45 min',
      score: 65,
      grade: 'C+',
      status: 'completed',
      category: 'Technical',
      difficulty: 'Hard',
      questions: 6,
      answered: 4,
      feedback: 'Strong technical knowledge but needs more practice with complex problems.',
      icon: '⚙️',
      color: 'border-purple-500/30'
    },
    {
      id: 4,
      type: 'coding',
      title: 'Merge Intervals - Medium',
      date: '2024-07-15',
      time: '10:30',
      duration: '20 min',
      score: 85,
      grade: 'A-',
      status: 'completed',
      category: 'Arrays',
      difficulty: 'Medium',
      language: 'Python',
      feedback: 'Good approach. Could optimize further.',
      icon: '💻',
      color: 'border-yellow-500/30'
    },
    {
      id: 5,
      type: 'resume',
      title: 'Resume Analysis - Vishnu Resume',
      date: '2024-07-14',
      time: '09:00',
      duration: '5 min',
      score: 87,
      grade: 'A',
      status: 'completed',
      category: 'Resume',
      feedback: 'Strong resume with good ATS compatibility. Add more keywords.',
      icon: '📄',
      color: 'border-orange-500/30'
    },
    {
      id: 6,
      type: 'interview',
      title: 'DSA Interview - Medium',
      date: '2024-07-14',
      time: '11:45',
      duration: '30 min',
      score: 72,
      grade: 'B',
      status: 'completed',
      category: 'DSA',
      difficulty: 'Medium',
      questions: 5,
      answered: 5,
      feedback: 'Good problem-solving skills. Work on optimization.',
      icon: '📊',
      color: 'border-green-500/30'
    },
    {
      id: 7,
      type: 'coding',
      title: 'Longest Substring - Medium',
      date: '2024-07-13',
      time: '15:20',
      duration: '18 min',
      score: 70,
      grade: 'B-',
      status: 'completed',
      category: 'Strings',
      difficulty: 'Medium',
      language: 'Java',
      feedback: 'Good attempt. Sliding window approach could be improved.',
      icon: '💻',
      color: 'border-orange-500/30'
    },
    {
      id: 8,
      type: 'interview',
      title: 'System Design - Hard',
      date: '2024-07-13',
      time: '13:00',
      duration: '60 min',
      score: 55,
      grade: 'C',
      status: 'completed',
      category: 'System Design',
      difficulty: 'Hard',
      questions: 4,
      answered: 3,
      feedback: 'Good conceptual knowledge. Needs more practical experience.',
      icon: '🏛️',
      color: 'border-red-500/30'
    }
  ]);

  const getFilteredData = () => {
    let filtered = historyData;

    if (filter !== 'all') {
      filtered = filtered.filter(item => item.type === filter);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.feedback.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeColor = (grade) => {
    const colors = {
      'A+': 'text-green-400 bg-green-500/20 border-green-500/30',
      'A': 'text-green-300 bg-green-500/10 border-green-500/20',
      'A-': 'text-green-200 bg-green-500/5 border-green-500/10',
      'B+': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      'B': 'text-yellow-300 bg-yellow-500/10 border-yellow-500/20',
      'B-': 'text-yellow-200 bg-yellow-500/5 border-yellow-500/10',
      'C+': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
      'C': 'text-orange-300 bg-orange-500/10 border-orange-500/20',
      'C-': 'text-orange-200 bg-orange-500/5 border-orange-500/10',
      'D': 'text-red-400 bg-red-500/20 border-red-500/30',
      'F': 'text-red-500 bg-red-500/30 border-red-500/50'
    };
    return colors[grade] || 'text-gray-400 bg-gray-500/10 border-gray-500/20';
  };

  const getStatusBadge = (status) => {
    if (status === 'completed') {
      return <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full border border-green-500/30">✅ Completed</span>;
    }
    return <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full border border-yellow-500/30">⏳ In Progress</span>;
  };

  const filteredData = getFilteredData();

  // Stats - Only used variables
  const totalInterviews = historyData.filter(i => i.type === 'interview').length;
  const totalCoding = historyData.filter(i => i.type === 'coding').length;
  const totalResume = historyData.filter(i => i.type === 'resume').length;
  const avgScore = Math.round(historyData.reduce((sum, i) => sum + i.score, 0) / historyData.length);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="text-white max-w-6xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="text-3xl">📜</span>
        <h1 className="text-3xl font-bold text-white">History</h1>
        <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">Activity Log</span>
      </div>
      <p className="text-gray-400 mb-6">Track all your interview, coding, and resume activities</p>

      {/* Stats Cards - Added Resume count */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-black/50 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm text-center">
          <div className="text-2xl font-bold text-white">{historyData.length}</div>
          <div className="text-xs text-gray-400">Total Activities</div>
        </div>
        <div className="bg-black/50 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm text-center">
          <div className="text-2xl font-bold text-blue-400">{totalInterviews}</div>
          <div className="text-xs text-gray-400">Interviews</div>
        </div>
        <div className="bg-black/50 border border-green-500/30 rounded-xl p-4 backdrop-blur-sm text-center">
          <div className="text-2xl font-bold text-green-400">{totalCoding}</div>
          <div className="text-xs text-gray-400">Coding Challenges</div>
        </div>
        <div className="bg-black/50 border border-purple-500/30 rounded-xl p-4 backdrop-blur-sm text-center">
          <div className="text-2xl font-bold text-purple-400">{totalResume}</div>
          <div className="text-xs text-gray-400">Resume Analyses</div>
        </div>
        <div className="bg-black/50 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm text-center">
          <div className="text-2xl font-bold text-orange-400">{avgScore}%</div>
          <div className="text-xs text-gray-400">Average Score</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-4 backdrop-blur-sm mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === 'all' 
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              📊 All
            </button>
            <button
              onClick={() => setFilter('interview')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === 'interview' 
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              🎤 Interviews
            </button>
            <button
              onClick={() => setFilter('coding')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === 'coding' 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              💻 Coding
            </button>
            <button
              onClick={() => setFilter('resume')}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === 'resume' 
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50'
              }`}
            >
              📄 Resume
            </button>
          </div>

          <div className="flex-1 min-w-[150px]">
            <input
              type="text"
              placeholder="🔍 Search history..."
              className="w-full px-4 py-1.5 bg-black/50 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              setFilter('all');
              setSearchTerm('');
            }}
            className="text-xs text-gray-500 hover:text-gray-300 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* History List */}
      <div className="space-y-3">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
              className={`bg-black/50 border ${item.color} rounded-2xl p-4 backdrop-blur-sm cursor-pointer transition-all hover:border-orange-500/50 ${
                selectedItem?.id === item.id ? 'border-orange-500/70' : ''
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                      <span>{item.category}</span>
                      <span className="text-gray-600">•</span>
                      <span>{item.date}</span>
                      <span className="text-gray-600">•</span>
                      <span>{item.time}</span>
                      {item.duration && (
                        <>
                          <span className="text-gray-600">•</span>
                          <span>⏱️ {item.duration}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold ${getScoreColor(item.score)}`}>
                      {item.score}%
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${getGradeColor(item.grade)}`}>
                      {item.grade}
                    </span>
                  </div>
                  {getStatusBadge(item.status)}
                  <span className="text-gray-500 text-sm">▶</span>
                </div>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedItem?.id === item.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-gray-700/50"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 mb-2">📋 Details</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Type:</span>
                            <span className="text-white capitalize">{item.type}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Category:</span>
                            <span className="text-white">{item.category}</span>
                          </div>
                          {item.difficulty && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Difficulty:</span>
                              <span className={`${
                                item.difficulty === 'Easy' ? 'text-green-400' :
                                item.difficulty === 'Medium' ? 'text-yellow-400' :
                                'text-red-400'
                              }`}>{item.difficulty}</span>
                            </div>
                          )}
                          {item.questions && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Questions:</span>
                              <span className="text-white">{item.answered}/{item.questions}</span>
                            </div>
                          )}
                          {item.language && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">Language:</span>
                              <span className="text-white">{item.language}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-gray-400 mb-2">💬 Feedback</h4>
                        <p className="text-sm text-gray-300">{item.feedback}</p>
                        <div className="mt-3 flex gap-2">
                          <button 
                            onClick={() => navigate(`/results/${item.id}`)}
                            className="px-3 py-1 text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition"
                          >
                            View Detailed Report
                          </button>
                          <button 
                            onClick={() => window.location.reload()}
                            className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition"
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        ) : (
          <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-12 backdrop-blur-sm text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-white mb-2">No History Found</h3>
            <p className="text-gray-400">Try adjusting your filters or start practicing!</p>
          </div>
        )}
      </div>

      {/* Clear History */}
      {historyData.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-xs text-gray-500 hover:text-red-400 transition">
            🗑️ Clear All History
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default HistoryPage;