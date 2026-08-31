import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ResumePage from './pages/ResumePage';
import JobPage from './pages/JobPage';
import InterviewPage from './pages/InterviewPage';
import CodingPage from './pages/CodingPage';
import HistoryPage from './pages/HistoryPage';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="job" element={<JobPage />} />
          <Route path="interview" element={<InterviewPage />} />
          <Route path="coding" element={<CodingPage />} />
          <Route path="history" element={<HistoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;