import React from 'react';

const AudioIcon = ({ sentence }) => {
  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  return (
    <img
      src={`${process.env.PUBLIC_URL}/images/audio-icon.png`}
      alt="audio icon"
      onClick={() => speakText(sentence)}
      style={{ width: '30px', height: '30px', cursor: 'pointer', marginLeft: '10px' }}
    />
  );
};

export default AudioIcon;
