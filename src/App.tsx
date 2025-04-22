// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import HomePage from './components/HomePage';
import CardGamePage from './components/CardGamePage';
import SpotTheDifferencePage from './components/SpotTheDifferencePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/card-game" element={<CardGamePage />} />
        <Route path="/spot-diff" element={<SpotTheDifferencePage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
