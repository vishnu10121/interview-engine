import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8010';

const InterviewPage = () => {
  const navigate = useNavigate();
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [interviewEnded, setInterviewEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [results, setResults] = useState(null);

  const [setup, setSetup] = useState({
    category: 'HR',
    difficulty: 'Hard',
    duration: 30,
    user_id: 1
  });

  const categories = [
    { id: 'HR', icon: '💼', label: 'HR Interview', color: 'border-blue-500/30 hover:border-blue-500' },
    { id: 'Technical', icon: '⚙️', label: 'Technical Interview', color: 'border-purple-500/30 hover:border-purple-500' },
    { id: 'DSA', icon: '📊', label: 'DSA Interview', color: 'border-green-500/30 hover:border-green-500' },
    { id: 'Machine Learning', icon: '🧠', label: 'ML Interview', color: 'border-orange-500/30 hover:border-orange-500' },
    { id: 'Data Science', icon: '📈', label: 'Data Science', color: 'border-red-500/30 hover:border-red-500' },
    { id: 'Frontend', icon: '🎨', label: 'Frontend', color: 'border-cyan-500/30 hover:border-cyan-500' },
    { id: 'Backend', icon: '🗄️', label: 'Backend', color: 'border-indigo-500/30 hover:border-indigo-500' },
    { id: 'Full Stack', icon: '🏗️', label: 'Full Stack', color: 'border-pink-500/30 hover:border-pink-500' },
    { id: 'System Design', icon: '🏛️', label: 'System Design', color: 'border-yellow-500/30 hover:border-yellow-500' }
  ];

  const difficulties = [
    { id: 'Easy', icon: '🟢', label: 'Easy' },
    { id: 'Medium', icon: '🟡', label: 'Medium' },
    { id: 'Hard', icon: '🔴', label: 'Hard' }
  ];

  const durations = [
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 45, label: '45 min' },
    { value: 60, label: '60 min' }
  ];

  // ========== COMPLETE QUESTION BANK ==========
  const questionBank = {
    'HR': {
      'Easy': [
        "Tell me about yourself.",
        "What are your strengths and weaknesses?",
        "Why do you want to work here?",
        "Where do you see yourself in 5 years?",
        "Describe your ideal work environment."
      ],
      'Medium': [
        "Tell me about a time you faced a challenge at work.",
        "How do you handle conflict with colleagues?",
        "Describe your leadership style.",
        "How do you handle criticism?",
        "Tell me about a time you failed and what you learned."
      ],
      'Hard': [
        "Tell me about a time you had to make a difficult decision with no clear right answer.",
        "How would you handle a situation where a team member is underperforming?",
        "Describe a time you had to persuade someone to see things your way.",
        "How do you handle ambiguity in your work?",
        "How do you build trust with a new team?"
      ]
    },
    'Technical': {
      'Easy': [
        "What is the difference between OOP and procedural programming?",
        "Explain the concept of inheritance.",
        "What is polymorphism?",
        "Explain the difference between array and linked list.",
        "What is a stack and when would you use it?"
      ],
      'Medium': [
        "Explain the concept of MVC architecture.",
        "What is the difference between REST and SOAP?",
        "Explain how garbage collection works.",
        "Explain the principles of SOLID.",
        "What is dependency injection?"
      ],
      'Hard': [
        "How would you design a scalable microservices architecture?",
        "Explain the CAP theorem in detail with examples.",
        "How would you handle database sharding at scale?",
        "Explain the differences between ACID and BASE with real-world scenarios.",
        "How would you implement a distributed rate limiter?"
      ]
    },
    'DSA': {
      'Easy': [
        "Reverse a linked list.",
        "Check if a string is palindrome.",
        "Find the maximum element in an array.",
        "Implement a stack using array.",
        "Find the factorial of a number using recursion."
      ],
      'Medium': [
        "Find the longest substring without repeating characters.",
        "Merge two sorted arrays.",
        "Implement a binary search tree.",
        "Find the next permutation.",
        "Detect cycle in a linked list."
      ],
      'Hard': [
        "Find the median of two sorted arrays in O(log n) time.",
        "Solve the N-Queens problem with backtracking.",
        "Implement Dijkstra's algorithm for shortest path.",
        "Solve the traveling salesman problem using DP.",
        "Implement a LRU cache with O(1) operations."
      ]
    },
    'Machine Learning': {
      'Easy': [
        "What is supervised learning vs unsupervised learning?",
        "Explain the difference between classification and regression.",
        "What is overfitting and how do you prevent it?",
        "Explain the bias-variance tradeoff.",
        "What is the purpose of feature scaling?"
      ],
      'Medium': [
        "Explain the working of Random Forest algorithm.",
        "What is the difference between Bagging and Boosting?",
        "Explain how SVM works with kernel trick.",
        "What is the difference between PCA and t-SNE?",
        "Explain how a neural network learns."
      ],
      'Hard': [
        "How would you handle class imbalance in a large dataset?",
        "Design a deep learning model for image classification with 10M images.",
        "Explain the working of GANs (Generative Adversarial Networks).",
        "How would you build a real-time fraud detection system?",
        "Explain the transformer architecture in detail."
      ]
    },
    'Data Science': {
      'Easy': [
        "What is the difference between structured and unstructured data?",
        "Explain the data science lifecycle.",
        "What is the difference between correlation and causation?",
        "Explain what is A/B testing.",
        "What are the common data types in Python?"
      ],
      'Medium': [
        "How do you handle missing data in a dataset?",
        "Explain the process of feature engineering.",
        "What is the difference between hypothesis testing and confidence intervals?",
        "Explain how K-means clustering works.",
        "How do you evaluate the performance of a regression model?"
      ],
      'Hard': [
        "How would you build a recommendation system for a streaming platform?",
        "Design a real-time data pipeline for processing clickstream data.",
        "How would you detect anomalies in a high-dimensional dataset?",
        "How would you predict customer churn with 95% accuracy?",
        "Design an experiment to measure the impact of a new feature."
      ]
    },
    'Frontend': {
      'Easy': [
        "What is the difference between HTML and HTML5?",
        "Explain the box model in CSS.",
        "What is the difference between '==' and '===' in JavaScript?",
        "Explain what is DOM manipulation.",
        "What is the difference between inline and block elements?"
      ],
      'Medium': [
        "Explain the component lifecycle in React.",
        "What is the difference between state and props in React?",
        "Explain how virtual DOM works.",
        "What is the difference between useEffect and useLayoutEffect?",
        "Explain code splitting in React."
      ],
      'Hard': [
        "How would you optimize a React application with 100+ components?",
        "Explain how you would implement server-side rendering with React.",
        "How would you build a reusable component library for a large organization?",
        "Design a state management solution for a complex enterprise application.",
        "How would you implement real-time updates in a React application?"
      ]
    },
    'Backend': {
      'Easy': [
        "What is the difference between HTTP and HTTPS?",
        "Explain what is an API.",
        "What is the difference between GET and POST requests?",
        "Explain what is middleware in Express.js.",
        "What is the difference between SQL and NoSQL?"
      ],
      'Medium': [
        "Explain how you would design a scalable REST API.",
        "What is the difference between synchronous and asynchronous programming?",
        "Explain how caching works in backend systems.",
        "What is the difference between process and thread?",
        "Explain what is load balancing and how it works."
      ],
      'Hard': [
        "How would you design a high-throughput messaging system?",
        "Explain how you would implement a distributed transaction.",
        "How would you design a microservices architecture with service discovery?",
        "Design a rate limiting system for a public API.",
        "How would you implement a circuit breaker pattern?"
      ]
    },
    'Full Stack': {
      'Easy': [
        "What is the difference between frontend and backend?",
        "Explain the client-server model.",
        "What is the MERN stack?",
        "Explain what is REST API.",
        "What is the difference between MongoDB and MySQL?"
      ],
      'Medium': [
        "Explain how you would design a full-stack application architecture.",
        "What is the difference between session-based and token-based authentication?",
        "Explain how to deploy a full-stack application to the cloud.",
        "Explain how to implement real-time features using WebSockets.",
        "What is the difference between SSR and CSR?"
      ],
      'Hard': [
        "How would you design and architect a full-stack e-commerce platform?",
        "Explain how you would implement a real-time collaboration tool like Google Docs.",
        "Design a full-stack social media platform with millions of users.",
        "How would you implement a payment gateway integration with security best practices?",
        "Explain how you would scale a full-stack application to handle 1M concurrent users."
      ]
    },
    'System Design': {
      'Easy': [
        "What is system design?",
        "Explain the difference between monolithic and microservices architecture.",
        "What is load balancing and why is it important?",
        "Explain what is caching and its types.",
        "What is the purpose of a message queue?"
      ],
      'Medium': [
        "Design a URL shortening service like bit.ly.",
        "Design a chat application with 1M concurrent users.",
        "Design a notification system for a large-scale application.",
        "Explain how you would design a distributed file storage system.",
        "Design a rate limiter for a public API."
      ],
      'Hard': [
        "Design YouTube with 1B+ daily active users.",
        "Design a ride-sharing platform like Uber with real-time tracking.",
        "Design a distributed database like Cassandra or DynamoDB.",
        "Design a global event streaming platform like Kafka.",
        "Design a scalable e-commerce platform like Amazon."
      ]
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const getQuestions = (category, difficulty, count = 5) => {
    const allQuestions = questionBank[category]?.[difficulty] || [];
    const shuffled = shuffleArray([...allQuestions]);
    return shuffled.slice(0, count);
  };

  // ✅ AI Evaluation Function
  const evaluateAnswer = async (question, answer, category, difficulty) => {
    try {
      const response = await axios.post(`${API_BASE}/api/interview/evaluate`, {
        question: question,
        answer: answer,
        category: category,
        difficulty: difficulty
      });
      return response.data;
    } catch (error) {
      console.error('Evaluation error:', error);
      // Fallback evaluation
      return {
        score: answer.length > 20 ? 60 : 30,
        feedback: answer.length > 20 ? 'Good attempt. Keep practicing!' : 'Please provide a more detailed answer.',
        strengths: ['Attempted to answer'],
        improvements: ['Provide more details', 'Use technical terms'],
        correct: answer.length > 30
      };
    }
  };

  const endInterview = useCallback(() => {
    setIsTimerRunning(false);
    setInterviewEnded(true);
    
    const totalScore = answers.reduce((sum, a) => sum + a.score, 0);
    const avgScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;
    
    setResults({
      totalQuestions: questions.length,
      answered: answers.length,
      averageScore: avgScore,
      timeTaken: timer,
      grade: avgScore >= 80 ? 'A' : avgScore >= 60 ? 'B' : avgScore >= 40 ? 'C' : 'D',
      feedback: avgScore >= 80 ? '🌟 Excellent performance! You are exceptionally well prepared.' : 
                avgScore >= 60 ? '👍 Good performance. Keep practicing to reach the next level!' : 
                '📚 Needs improvement. Focus on key concepts and practice more.'
    });
  }, [answers, questions.length, timer]);

  const startInterview = () => {
    setLoading(true);
    setTimeout(() => {
      const questionList = getQuestions(setup.category, setup.difficulty, 5);
      setQuestions(questionList);
      setInterviewStarted(true);
      setIsTimerRunning(true);
      setLoading(false);
    }, 1500);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer < setup.duration * 60) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (isTimerRunning && timer >= setup.duration * 60) {
      endInterview();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, setup.duration, endInterview]);

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) {
      alert('Please write your answer before submitting');
      return;
    }

    setEvaluating(true);

    try {
      // ✅ AI Evaluation
      const evaluation = await evaluateAnswer(
        questions[currentQuestion],
        answer,
        setup.category,
        setup.difficulty
      );

      const newAnswers = [...answers, {
        question: questions[currentQuestion],
        answer: answer,
        score: evaluation.score,
        feedback: evaluation.feedback,
        strengths: evaluation.strengths || [],
        improvements: evaluation.improvements || [],
        correct: evaluation.correct || false
      }];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswer('');
      } else {
        endInterview();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error evaluating answer. Please try again.');
    } finally {
      setEvaluating(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  if (interviewEnded) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-white mb-2">Interview Complete!</h2>
          <p className="text-gray-400 mb-6">Here's your performance summary</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-orange-400">{results?.averageScore}%</div>
              <div className="text-xs text-gray-400">Average Score</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-green-400">{results?.answered}/{results?.totalQuestions}</div>
              <div className="text-xs text-gray-400">Answered</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-blue-400">{formatTime(results?.timeTaken || 0)}</div>
              <div className="text-xs text-gray-400">Time Taken</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4">
              <div className="text-2xl font-bold text-purple-400">{results?.grade}</div>
              <div className="text-xs text-gray-400">Grade</div>
            </div>
            <div className="col-span-2 bg-gray-800/50 rounded-xl p-4">
              <div className="text-sm text-gray-300">{results?.feedback}</div>
            </div>
          </div>

          {/* Detailed Answer Review */}
          {answers.length > 0 && (
            <div className="mt-6 text-left">
              <h3 className="text-lg font-semibold text-white mb-3">📝 Answer Review</h3>
              <div className="max-h-60 overflow-y-auto space-y-3">
                {answers.map((a, i) => (
                  <div key={i} className="bg-gray-800/30 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex justify-between items-start">
                      <p className="text-sm text-gray-300 flex-1">
                        <span className="text-orange-400">Q{i+1}:</span> {a.question}
                      </p>
                      <span className={`text-sm font-bold px-2 py-0.5 rounded ${a.score >= 70 ? 'text-green-400 bg-green-500/20' : 'text-red-400 bg-red-500/20'}`}>
                        {a.score}%
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">Your answer: {a.answer.substring(0, 100)}...</p>
                    <p className="text-xs text-gray-400 mt-1">Feedback: {a.feedback}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition"
            >
              🔄 Retry Interview
            </button>
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-2 bg-gray-700 text-white font-bold rounded-lg hover:bg-gray-600 transition"
            >
              📊 Go to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (interviewStarted) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-sm text-gray-400">
              {setup.category} · {setup.difficulty} · {setup.duration} min
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-black/50 border border-orange-500/30 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-400">⏱️ {formatTime(timer)}</span>
            </div>
            <div className="bg-black/50 border border-orange-500/30 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-400">
                {answers.length}/{questions.length} answered
              </span>
            </div>
          </div>
        </div>

        <motion.div 
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-black/50 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm mb-6"
        >
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">💡</span>
            <h3 className="text-xl text-white font-medium">{questions[currentQuestion]}</h3>
          </div>

          <div className="mt-4">
            <label className="block text-gray-300 text-sm font-medium mb-2">Your Answer</label>
            <textarea
              className="w-full min-h-[150px] p-4 bg-black/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition resize-none"
              placeholder="Type your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-gray-500">{answer.length} characters</span>
              <span className="text-xs text-gray-500">{answer.split(' ').length} words</span>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmitAnswer}
              disabled={evaluating}
              className="px-6 py-2 bg-orange-500 text-black font-bold rounded-lg hover:bg-orange-400 transition disabled:opacity-50"
            >
              {evaluating ? '⏳ Evaluating...' : currentQuestion === questions.length - 1 ? 'Submit & Finish ✅' : 'Next Question →'}
            </button>
          </div>
        </motion.div>

        <div className="bg-black/50 border border-orange-500/30 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + (answer ? 0.5 : 0)) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
              style={{ width: `${((currentQuestion + (answer ? 0.5 : 0)) / questions.length) * 100}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + (answer ? 0.5 : 0)) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🎤</span>
        <h1 className="text-3xl font-bold text-white">AI Interview</h1>
        <span className="text-xs bg-orange-500/20 text-orange-400 px-3 py-1 rounded-full border border-orange-500/30">Mock Practice</span>
      </div>
      <p className="text-gray-400 mb-6">Configure your interview settings and start practicing with AI-powered mock interviews.</p>

      <div className="bg-black/50 border border-orange-500/30 rounded-2xl p-8 backdrop-blur-sm">
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-3">📂 Select Category</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSetup({ ...setup, category: cat.id })}
                className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${cat.color} ${
                  setup.category === cat.id ? 'bg-orange-500/20 border-orange-500' : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-2xl">{cat.icon}</div>
                <div className="text-xs text-gray-300 mt-1">{cat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-medium mb-3">📊 Difficulty Level</label>
          <div className="flex gap-3">
            {difficulties.map((diff) => (
              <div
                key={diff.id}
                onClick={() => setSetup({ ...setup, difficulty: diff.id })}
                className={`border rounded-xl p-3 text-center cursor-pointer transition-all flex-1 ${
                  setup.difficulty === diff.id ? 'bg-orange-500/20 border-orange-500' : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-xl">{diff.icon}</div>
                <div className="text-xs text-gray-300 mt-1">{diff.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-300 text-sm font-medium mb-3">⏱️ Duration</label>
          <div className="flex flex-wrap gap-3">
            {durations.map((dur) => (
              <div
                key={dur.value}
                onClick={() => setSetup({ ...setup, duration: dur.value })}
                className={`border rounded-xl px-4 py-2 text-center cursor-pointer transition-all ${
                  setup.duration === dur.value ? 'bg-orange-500/20 border-orange-500' : 'border-gray-700 hover:border-gray-500'
                }`}
              >
                <div className="text-sm text-gray-300">{dur.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={startInterview}
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-black font-bold rounded-xl hover:from-orange-400 hover:to-orange-500 transition disabled:opacity-50 text-lg shadow-lg shadow-orange-500/20"
        >
          {loading ? '⏳ Starting Interview...' : '🚀 Start Interview'}
        </button>

        {loading && (
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-400 mb-1">
              <span>Preparing your questions...</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                animate={{ width: '100%' }}
                transition={{ duration: 1.5 }}
              />
            </div>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500 text-center">
          {setup.category} · {setup.difficulty} · {setup.duration} minutes
        </div>
      </div>
    </motion.div>
  );
};

export default InterviewPage;