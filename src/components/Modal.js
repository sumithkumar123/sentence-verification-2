import React from 'react';
import { Link } from 'react-router-dom';

const Modal = ({ modalContent, showNextButton, currentLevel, totalLevels, handleNextButtonClick, handleTryAgain, handlePlayAgain }) => {
  return (
    <div className="modal-container">
      <div className="modal-overlay"></div>
      <div className="modal-content">
        {modalContent}
        {modalContent === '' && (
          <>
            <h4>Correct..! You have chosen the right image</h4>
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${process.env.PUBLIC_URL}/images/approved.png`} alt="Right choice" style={{ width: '200px', height: '200px' }} />
            </div>
            <button onClick={handleNextButtonClick}>Next</button>
          </>
        )}
        {modalContent === '.' && (
          <div>
            <h4>Incorrect..! Try again..</h4>
            <div style={{ justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${process.env.PUBLIC_URL}/images/cancel.png`} alt="Wrong choice" style={{
                width: '200px', height: '200px', justifyContent: 'center'
              }} />
            </div>
            <button onClick={handleTryAgain}>Try Again</button>
          </div>
        )}
        {(currentLevel === totalLevels - 1) && (
          <Link to="/">
            <button
              onClick={handlePlayAgain}
              className="play-again-button"
            >
              Play Again
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Modal;
