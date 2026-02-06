// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputPage from './components/InputPage';
import ResultPage from './components/ResultPage';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* CHANGE THIS: Make InputPage the main route */}
        <Route path="/" element={<InputPage />} />
        
        {/* Result page */}
        <Route path="/result" element={<ResultPage />} />
        
        {/* Dashboard route - accessible separately */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;