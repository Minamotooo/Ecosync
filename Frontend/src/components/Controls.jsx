import React from 'react';
import ozone from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/ozone_icon.png";
import co2 from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/co2_icon.png";
import drought from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/drought.png";
import forest from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/forest_icon.png";
import river from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/river.png";
import wildfire from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/wildfire.png";
import temperature from "F:/ECOSYNC/Ecosync/Frontend/src/assets/logo/thermometer.png";
import seaLevel from "F:/ECOSYNC/Ecosync/Frontend/src/assets/extra1.png";
import AirQuality from "F:/ECOSYNC/Ecosync/Frontend/src/assets/extra2.png";
import Landslides from "F:/ECOSYNC/Ecosync/Frontend/src/assets/extra3.png";

import "./Controls.css";


function Controls({
  showCircles, animateDomes, setShowCircles, setAnimateDomes,
  showOzoneLayer, setShowOzoneLayer, showRivers, setShowRivers, showDroughts, setShowDroughts,
  showForests, setShowForests, showFires, setShowFires, showTemp, setShowTemp,
  drawMode, toggleDrawMode 
}) {

  return (
    <div>
    <div className="sidebar">
      {/* Carbon Dioxide */}
      <h1 className='heading'>Earth Systems</h1>
      <button
        onClick={() => setShowCircles(!showCircles)}
        className={`sidebar-btn ${showCircles ? 'active' : ''}`}
      >
        <img src={co2} alt="Circle Icon" className="icon" />
        Carbon Dioxide
      </button>

      {showCircles && (
        <button
          onClick={() => setAnimateDomes(!animateDomes)}
          className={`sidebar-btn pad ${animateDomes ? 'active' : ''}`}
        >
          Animation
        </button>
      )}

      {/* Ozone Layer */}
      <button
        onClick={() => setShowOzoneLayer(!showOzoneLayer)}
        className={`sidebar-btn ${showOzoneLayer ? 'active' : ''}`}
      >
        <img src={ozone} alt="Ozone Layer Icon" className="icon" />
        Ozone
      </button>

      {/* River */}
      <button
        onClick={() => setShowRivers(!showRivers)}
        className={`sidebar-btn ${showRivers ? 'active' : ''}`}
      >
        <img src={river} alt="River Icon" className="icon" />
        River
      </button>

      {/* Drought */}
      <button
        onClick={() => setShowDroughts(!showDroughts)}
        className={`sidebar-btn ${showDroughts ? 'active' : ''}`}
      >
        <img src={drought} alt="Drought Icon" className="icon" />
        Drought
      </button>

      {/* Forest */}
      <button
        onClick={() => setShowForests(!showForests)}
        className={`sidebar-btn ${showForests ? 'active' : ''}`}
      >
        <img src={forest} alt="Forest Icon" className="icon" />
        Forest
      </button>

      {/* Fire */}
      <button
        onClick={() => setShowFires(!showFires)}
        className={`sidebar-btn ${showFires ? 'active' : ''}`}
      >
        <img src={wildfire} alt="Fire Icon" className="icon" />
        Wildfire
      </button>

      {/* Temperature */}
      <button
        onClick={() => setShowTemp(!showTemp)}
        className={`sidebar-btn ${showTemp ? 'active' : ''}`}
      >
        <img src={temperature} alt="Temperature Icon" className="icon" />
        Temperature
      </button>
      {/* Dummy */}
      <button
        className={`sidebar-btn `}
      >
        <img src={seaLevel} alt="Temperature Icon" className="icon" />
        Sea Level
      </button>
      <button
        className={`sidebar-btn `}
      >
        <img src={AirQuality} alt="Temperature Icon" className="icon" />
        Air Quality
      </button>

      <button
        className={`sidebar-btn `}
      >
        <img src={Landslides} alt="Temperature Icon" className="icon" />
        Land Slides
      </button>


    </div>
    <div style={{ position: 'absolute', top: '880px', left: '50px', zIndex: 1000 }}>
    <button onClick={toggleDrawMode} className={`sidebar2-btn ${drawMode ? 'active' : ''}`}>
        {drawMode ? 'End Simulation' : 'Run Simulation'}
      </button>
    </div>
    </div>
  );
}

export default Controls;
