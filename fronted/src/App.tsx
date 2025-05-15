// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './pages/start/StartPage';
import HomePage from './pages/home/HomePage';
import CardGamePage from './pages/cardgame/CardGamePage';
import SpotTheDifferencePage from './pages/spotdifference/SpotTheDifferencePage';
import MeaningDescribePage from './pages/describe/MeaningDescribePage';
import { useInitUser } from './hooks/useInitUser';

function App() {
  useInitUser();
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
