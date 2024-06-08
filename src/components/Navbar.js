import React from 'react';

export default function Navbar({ attempts, elapsedTime, currentScreen, totalScreens }) {
  return (
    <div className="navbar-container">
      <div className="navbar-title">
        <h1>Sentence Verification</h1>
      </div>
      {/* <div className="navbar-info">
        <div className="info-item">
          <h3>Attempts: <span>{attempts}</span></h3>
        </div>
        <div className="info-item">
          <h3>Time: <span style={{ color: 'red' }}>{Math.floor(elapsedTime / 1000)}<span style={{ color: 'black' }}> seconds</span></span></h3>
        </div>
      </div> */}
      <div className="navbar-screens">
        <h5>Screens: <span>{currentScreen}/{totalScreens}</span></h5>
      </div>
    </div>
  );
}
