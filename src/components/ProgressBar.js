import React from 'react';

const ProgressBar = ({ progressPercentage }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
