import React from 'react';

const ImageGrid = ({ images, screen, backgroundColors, handleChoice }) => {
  return (
    <div className="outer-container" style={{ backgroundColor: '#76c7c0', padding: '20px', 
    borderRadius: '10px', marginTop:'2%', width:'95%', border:'2px solid black' }}>
      <div className="images-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
        {images.map((image, index) => (
          <div key={index} className="image-wrapper" style={{ backgroundColor: backgroundColors[index], width: '150px', height: '250px', borderRadius: '5px', overflow: 'hidden' }}>
            <img
              src={`./images/screen_${screen}_imgs/${image}`}
              alt={`Image ${index + 1}`}
              style={{ width: '100%', height: '100%', cursor: 'pointer' }}
              onClick={() => handleChoice(image, index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
