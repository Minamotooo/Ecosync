import React, { useState } from 'react';
import { Viewer, Entity, useCesium } from "resium";
import * as Cesium from "cesium";
import "cesium/Build/Cesium/Widgets/widgets.css";
import ViewerContent from './ViewerContent';
import Controls from './Controls';
import Modal from 'react-modal';
import DualBoxChart from './DualBoxChart';



function CesiumMap() {

  const [showCircles, setShowCircles] = useState(false);
  const [animateDomes, setAnimateDomes] = useState(false);
  const [showOzoneLayer, setShowOzoneLayer] = useState(false);
  const [showRivers, setShowRivers] = useState(false);
  const [showDroughts, setShowDroughts] = useState(false);
  const [showForests, setShowForests] = useState(false);
  const [showFires, setShowFires] = useState(false);
  const [showTemp, setShowTemp] = useState(false);
  const [drawMode, setDrawMode] = useState(false);
  const [polygonPoints, setPolygonPoints] = useState([]);
  const [isPolygonFinalized, setIsPolygonFinalized] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const toggleDrawMode = () => {
    setDrawMode(!drawMode);
    if (!drawMode) {
      setPolygonPoints([]); // Reset polygon when enabling draw mode
    }
    setIsPolygonFinalized(false);
    setShowModal(false);
  };

  const finalizePolygon = () => {
    setIsPolygonFinalized(true);
    setShowModal(true); // Show modal when the polygon is finalized
  };

  const closeModal = () => {
    setShowModal(false);
  };

  React.useEffect(() => {
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyOTBlMzQ1Yi1iODhkLTQ0ZWQtYWI1NC01MWMwYzZmOTMzODAiLCJpZCI6MjM5NjczLCJpYXQiOjE3MjU2NTQ5MzR9.q4O8y_HPueoTeAorxcq0Yl2g-tO8hrEWyIV-p_jVroQ';
  }, []);



  return (
    <div style={{ width: '100%', height: '100vh' }} onContextMenu={(e) => e.preventDefault()}>
      <Controls
        showCircles={showCircles}
        animateDomes={animateDomes}
        setShowCircles={setShowCircles}
        setAnimateDomes={setAnimateDomes}
        showOzoneLayer={showOzoneLayer}
        setShowOzoneLayer={setShowOzoneLayer}
        showRivers={showRivers} // Pass the rivers state
        setShowRivers={setShowRivers}
        showDroughts={showDroughts} // Pass the drought
        setShowDroughts={setShowDroughts}
        showForests={showForests} // Pass the forests state
        setShowForests={setShowForests}
        showFires={showFires} // Pass the fires state
        setShowFires={setShowFires}
        showTemp={showTemp} // Pass the temperature state
        setShowTemp={setShowTemp}
        drawMode={drawMode}
        toggleDrawMode={toggleDrawMode}
      />
      <Viewer
        full
        animation={false}
        timeline={false}
        sceneMode={Cesium.SceneMode.SCENE3D}
        homeButton={false}          // Disables the home button
        baseLayerPicker={false}      // Disables the base layer picker (the globe icon)
        navigationHelpButton={false} // Disables the help button
        sceneModePicker={false}      // Disables the scene mode picker
        geocoder={false} 
        fullscreenButton={false}
        
      >
        <ViewerContent 
        showCircles={showCircles} 
        animateDomes={animateDomes} 
        showOzoneLayer={showOzoneLayer} 
        showRivers={showRivers} 
        showDroughts={showDroughts}
        showForests={showForests}
        showFires={showFires}
        showTemp={showTemp}
        drawMode={drawMode} 
          polygonPoints={polygonPoints}
          setPolygonPoints={setPolygonPoints}
          isPolygonFinalized={isPolygonFinalized}
          setIsPolygonFinalized={finalizePolygon}
        />
        </Viewer>
        {/* Modal Component */}
        <Modal 
  isOpen={showModal} 
  onRequestClose={closeModal}
  shouldCloseOnOverlayClick={true} // Allows closing on overlay click
  contentLabel="Polygon Finalized Modal"
  style={{
    overlay: { backgroundColor: 'rgba(0, 0, 0, 0)' },
    content: { 
      padding: '20px', 
      width: '600px', // Adjust width as needed
      height: '700px', // Adjust height for a shorter modal
      top: '50%', 
      right: '4%', // Shift modal to the right side
      left: 'auto', // Override default left position
      bottom: 'auto', 
      marginRight: '0',
      transform: 'translate(0, -50%)',
      textAlign: 'center'
    }
  }}
  
>
  <DualBoxChart />
</Modal>
    </div>
  );
}

export default CesiumMap;