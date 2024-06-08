import React, { useState } from 'react';
import AudioIcon from './AudioIcon'; // Adjust the path as needed

export default function Navbar({ attempts, elapsedTime, currentScreen, totalScreens }) {
  const [showInstructions, setShowInstructions] = useState(false);
  const instructionsText = " Choose the image that best mathches the passage."; // Replace with your actual instructions

  const toggleInstructions = () => {
    setShowInstructions(!showInstructions);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <h1>Sentence Verification Global</h1>
      </div>
      <div className="navbar-screens" >
        <h5>Screens: <span>{currentScreen}/{totalScreens}</span></h5>
        <div className="instructions-container">
          <button onClick={toggleInstructions} className="instructions-button">Instructions</button>
          {showInstructions && (
            <div className="instructions-dropdown">
              <p>{instructionsText}</p>
              {/* Add more instructions as needed */}
            </div>
          )}
          <AudioIcon sentence={instructionsText} />
        </div>
      </div>
    </div>
  );
}
