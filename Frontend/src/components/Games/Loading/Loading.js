import React from 'react';
import './Loading.css';

const Loading = ({ width = '200px', height = '200px', logoSrc }) => {
  // Parse the width and height to get numeric values
  const widthNum = parseInt(width, 10);
  const heightNum = parseInt(height, 10);

  // Adjust the spinner size to account for the border thickness
  const spinnerWidth = widthNum + 10 + 'px'; // Adds 5px border on each side
  const spinnerHeight = heightNum + 10 + 'px';

  return (
    <div className="loading-container">
      <div className="spinner" style={{ width: width, height: height }}>
        <div
          className="spinner-circle"
          style={{ width: spinnerWidth, height: spinnerHeight }}
        ></div>
        <img src={logoSrc} alt="Logo" className="logo" style={{width: width, height: 'auto'}} />
      </div>
    </div>
  );
};

export default Loading;
