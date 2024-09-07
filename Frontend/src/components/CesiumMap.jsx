import { useEffect, useRef } from 'react';
import { Viewer } from "resium";
import { Ion } from "cesium";

function CesiumMap() {
  const viewerRef = useRef(null);

  useEffect(() => {
    // Disable default Cesium Ion loading screen and other watermarks
    Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1ZWNjOWNmOC0xZGU3LTQ1ZmEtYWJhMS02MmFhZWZmZTUyN2UiLCJpZCI6MjM5MTYxLCJpYXQiOjE3MjU0Njc4NTR9.MDpOADGYfYK-DdzuxOYmKdtP7WJCXeZxsPu8bUNGz1U';  // Optionally remove the Cesium Ion access token
    
    const viewer = viewerRef.current?.cesiumElement;

    if (viewer) {
      viewer.scene.screenSpaceCameraController.enableRotate = true; // Example setting if you want rotation
      
      // Disable Cesium default credits
      viewer.scene.frameState.creditDisplay.container.style.display = "none";
    }
  }, []);

  return (
    <Viewer ref={viewerRef} full={true} animation={false} timeline={false} />
  );
}

export default CesiumMap;