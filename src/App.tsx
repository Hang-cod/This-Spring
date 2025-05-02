// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import HomePage from './components/HomePage';
import CardGamePage from './components/CardGamePage';
import SpotTheDifferencePage from './components/SpotTheDifferencePage';
import MeaningDescribePage from './components/MeaningDescribePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/card-game" element={<CardGamePage />} />
        <Route path="/spot-diff" element={<SpotTheDifferencePage />} />
        <Route path="/describe" element={<MeaningDescribePage />} />
      </Routes>
    </Router>
  );
}

export default App;
