import React, { useState, useEffect } from 'react';
import gameData from './gameData.json';
import ConfettiComponent from './ConfettiComponent';
import Navbar from './Navbar';
import Modal from './Modal';
import ProgressBar from './ProgressBar';
import ImageGrid from './ImageGrid';
import AudioIcon from './AudioIcon';

function Game() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [shuffledData, setShuffledData] = useState([]);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [pauseStartTime, setPauseStartTime] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);
  const [currentScreen, setCurrentScreen] = useState(1);
  const totalScreens = shuffledData.length;

  // Utility function to shuffle an array
  const shuffleArray = (array) => {
    return array.slice().sort(() => Math.random() - 0.5);
  };

  // Shuffle game data on component mount
  useEffect(() => {
    const shuffleData = () => {
      const shuffled = gameData.map(item => {
        const shuffledImages = shuffleArray(item.images);
        return { ...item, images: shuffledImages };
      });
      setShuffledData(shuffled);
    };
    shuffleData();
    setStartTime(Date.now()); // Start the timer when the component mounts
  }, []);

  // Reset game state when moving to the next level
  useEffect(() => {
    setSelectedImage(null);
    setBackgroundColors([]);
    setModalVisible(false);
    setShowConfetti(false);
  }, [currentLevel]);

  // Update elapsed time every second
  useEffect(() => {
    let interval;
    if (startTime !== null && !modalVisible) {
      interval = setInterval(() => {
        const now = Date.now();
        const elapsed = now - startTime - pausedDuration;
        setElapsedTime(elapsed >= 0 ? elapsed : 0); // Prevent negative values
      }, 1000);
    } else if (modalVisible) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, modalVisible, pausedDuration]);

  // Handle pausing and resuming the timer
  useEffect(() => {
    if (modalVisible && pauseStartTime === null) {
      setPauseStartTime(Date.now());
    } else if (!modalVisible && pauseStartTime !== null) {
      setPausedDuration(pausedDuration + (Date.now() - pauseStartTime));
      setPauseStartTime(null);
    }
  }, [modalVisible]);

  const handleChoice = (chosenImage, index) => {
    setAttempts(attempts + 1); // Increment attempts on each image click
    const correctAnswer = shuffledData[currentLevel].correctAnswer;
    if (chosenImage === correctAnswer && currentLevel !== shuffledData.length - 1) {
      setModalContent('');
      setShowNextButton(true); // Activate the "Next" button in the modal
      setShowConfetti(true);
      const newBackgroundColors = shuffledData[currentLevel].images.map((_, i) =>
        i === correctAnswer ? 'green' : 'transparent'
      );
      setBackgroundColors(newBackgroundColors);
    } else if (chosenImage === correctAnswer && currentLevel === shuffledData.length - 1) {
      const totalAttempts = attempts;
      const totalElapsedTime = elapsedTime;
      setModalContent(
        <div style={{ fontWeight: 'bold', fontFamily: 'Segeto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="modal-style">
            <h2>You have completed all levels!</h2>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px',
           }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className='style-container' style={{ color: 'black', marginBottom: '0.5%' ,height:"50px",width:"150px"}}>
                <h6>Attempts: {totalAttempts}</h6>
                {/* <h6 style={{ color: 'black', margin: 0 }}>{totalAttempts}</h6> */}
              </div>
              <div className='style-container' style={{ color: 'black', marginBottom: '10px', height:'50px', width:'150px' }}>
                <h6>Time(sec): {Math.floor(totalElapsedTime / 1000)}</h6>
                {/* <h6 style={{ color: 'black', margin: 0, height: '50px', width: '80px' }}>{Math.floor(totalElapsedTime / 1000)}</h6> */}
              </div>
            </div>
            <div className='style-container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={`${process.env.PUBLIC_URL}/images/medal.gif`} alt="medal" style={{ width: '40px', height: '30px' }} />
            </div>
          </div>
        </div>
      );

      setShowNextButton(false); // Deactivate the "Next" button in the modal
      setModalVisible(true);
      setShowConfetti(true);
      const newBackgroundColors = shuffledData[currentLevel].images.map((_, i) =>
        i === correctAnswer ? 'green' : 'transparent'
      );
      setBackgroundColors(newBackgroundColors);
    } else {
      const newBackgroundColors = shuffledData[currentLevel].images.map((_, i) =>
        i === index ? 'red' : 'transparent'
      );
      setBackgroundColors(newBackgroundColors);
      setModalContent('.');
      setShowNextButton(false); // Deactivate the "Next" button in the modal
    }
    setSelectedImage(chosenImage);
    setModalVisible(true);
  };

  const handleNextLevel = () => {
    if (selectedImage === null) {
      setModalContent('Please select an image before proceeding to the next level.');
      setModalVisible(true);
      return;
    }
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1);
    }
    if (currentLevel + 1 < shuffledData.length) {
      setCurrentLevel(currentLevel + 1);
      // Reset the game state for the next level
      setSelectedImage(null);
      setBackgroundColors([]);
      setModalVisible(false);
      setShowConfetti(false);
    }
  };

  const handleNextButtonClick = () => {
    handleNextLevel();
  };

  const handlePlayAgain = () => {
    setCurrentLevel(0); // Reset current level to the first level
    setSelectedImage(null); // Reset selected image
    setBackgroundColors([]); // Reset background colors
    setModalVisible(false); // Hide the modal
    setShowConfetti(false); // Hide confetti
    setAttempts(0); // Reset attempts
    setStartTime(Date.now()); // Reset start time for the timer
    setElapsedTime(0); // Reset elapsed time
    setPausedDuration(0); // Reset paused duration
  };

  const handleTryAgain = () => {
    // Reset game state for the current level
    setSelectedImage(null);
    setBackgroundColors([]);
    setModalVisible(false);
  };

  const progressPercentage = (currentScreen / totalScreens) * 100;

  return (
    <div className="game-container" style={{
      position: 'relative',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'repeat'
    }}>
      <Navbar attempts={attempts} elapsedTime={elapsedTime} currentScreen={currentScreen} totalScreens={totalScreens} />
      {showConfetti && <ConfettiComponent />}

      {shuffledData.length > 0 && (
        <>
          <ProgressBar progressPercentage={progressPercentage} />

          <div className="transparent-box">
            <AudioIcon sentence={shuffledData[currentLevel].sentence} />

            <div className="sentence" style={{ textAlign: 'center', fontSize: '24px', fontFamily: 'fantasy', width: '100%' }}>
              {shuffledData[currentLevel].sentence}
            </div>
          </div>

          <ImageGrid
            images={shuffledData[currentLevel].images}
            screen={shuffledData[currentLevel].screen}
            backgroundColors={backgroundColors}
            handleChoice={handleChoice}
          />

          {modalVisible && (
            <Modal
              modalContent={modalContent}
              showNextButton={showNextButton}
              currentLevel={currentLevel}
              totalLevels={shuffledData.length}
              handleNextButtonClick={handleNextButtonClick}
              handleTryAgain={handleTryAgain}
              handlePlayAgain={handlePlayAgain}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Game;

