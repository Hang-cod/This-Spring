// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import HomePage from './components/HomePage';
import CardGamePage from './components/CardGamePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/card-game" element={<CardGamePage />} />
      </Routes>
    </Router>
  );
}

export default App;
