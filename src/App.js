import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartingScreen from './components/StartingScreen';
import Game from './components/Game';
import './App.css';

function App() {
  return (

        <Routes>
          {/* <Route path="/" element={<StartingScreen />} /> */}
          <Route path="/game" element={<Game />} />
        </Routes>
  );
}

export default App;
