import React from 'react';
import { Link } from 'react-router-dom';
import './StartingScreen.css'; // Import the CSS file

function StartingScreen() {
  return (
    <div
      className="starting-screen"
      style={{
        backgroundImage: `url(/images/startscreen.png)`,
      }}
    >
      <div className="starting-screen-text">
        <Link to="/game">
          <button className="play-button">Play</button>
        </Link>
        <p>Please use in Landscape mode</p>
      </div>
    </div>
  );
}

export default StartingScreen;
