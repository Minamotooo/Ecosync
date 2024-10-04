import React, { useState, useEffect } from 'react';
import { Viewer, Entity, useCesium } from 'resium';
import * as Cesium from 'cesium';
import { getEmissionMaterial, getSmoothGradientMaterial } from '../utils/emissionUtils';
import co2Data from './owid-co2-data.json';
import countryCoordinates from './countryCoordinates.json';
import riverGeoJson from './rivers.json';
import droughtGeoJson from './df.json';
import { GeoJsonDataSource } from 'cesium';
import fireData from './fires.json';





const ViewerContent = ({ showCircles, animateDomes, showOzoneLayer, showRivers, showDroughts, showForests, showFires, showTemp, drawMode, polygonPoints, setPolygonPoints, isPolygonFinalized, setIsPolygonFinalized }) => {
    const { viewer } = useCesium();
    const [progress, setProgress] = useState(0);
    const [emissionData, setEmissionData] = useState([]);
    const [riversDataSource, setRiversDataSource] = useState(null);
    const [droughtDataSource, setDroughtDataSource] = useState(null);
    const [riverEntities, setRiverEntities] = useState([]);
    const polygonHeight = 50000;
    


    const maxRadii = 200000; // Max size of ellipsoid radii for animation
    const minRadii = 5000;
    const speedFactor = 1;
    const pulseDuration = 4;
  
    const addCloudLayer = (viewer) => {
      viewer.scene.imageryLayers.addImageryProvider(new Cesium.SingleTileImageryProvider({
        url: '/images/clouds.jpg', // Path to the cloud texture
        rectangle: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90), // Cover entire globe
        alpha: 0.5, // Adjust transparency of the clouds
        tileWidth: 2048, // Width of the cloud texture image
        tileHeight: 1024, // Height of the cloud texture image
      }));
    };

    const loadRivers = async () => {
        try {
            // Load the GeoJSON data for rivers
            console.log("Loading river data..."); 
            const riverSource = await Cesium.GeoJsonDataSource.load(riverGeoJson, {
                stroke: Cesium.Color.BLUE.withAlpha(0.8), // Set river color 
                strokeWidth: 2,
                clampToGround: true // Ensure it follows the terrain
            });

            console.log("River data loaded:", riverSource); 
            viewer.dataSources.add(riverSource); 
            setRiversDataSource(riverSource);

            // Iterate over each feature and render it progressively
            riverSource.entities.values.forEach((entity) => {
                entity.polyline.material = new Cesium.PolylineDashMaterialProperty({
                  color: Cesium.Color.CYAN, // Flowing river color
                  dashLength: 20,           // Length of the dashes
                  gapColor: Cesium.Color.TRANSPARENT, // Makes the gaps fully transparent
                });
              });
        } catch (error) {
            console.error("Error loading river GeoJSON:", error);
        }
    };


    
    
    
    
      const removeRivers = () => {
        if (riversDataSource) {
          viewer.dataSources.remove(riversDataSource);
          setRiversDataSource(null);
        }
      };

      const getColorByBrightness = (brightness) => {
        if (brightness >= 320) {
          return Cesium.Color.RED.withAlpha(0.8);
        } else {
          return Cesium.Color.ORANGE.withAlpha(0.8);
        }
      };


    
  
    React.useEffect(() => {
      // Map CO2 data to country coordinates
      const mappedData = Object.entries(co2Data).map(([country, data]) => {
        const latestData = data.data[data.data.length - 1]; // Get latest year data
        const coords = countryCoordinates[country]; // Get country coordinates
  
        // Ensure we have valid coordinates and emission data
        if (!coords || isNaN(latestData.cumulative_co2)) {
          return null; // Skip if no coordinates or emission data is invalid
        }
  
        return {
          name: country,
          latitude: coords.latitude,
          longitude: coords.longitude,
          emission: latestData.cumulative_co2, // Example emission value
        };
      }).filter(Boolean); // Remove null values
  
      setEmissionData(mappedData);


      
  
      if (viewer) {
        viewer.scene.globe.showGroundAtmosphere = false;
        viewer.scene.frameState.creditDisplay.container.style.display = "none";
  
        viewer.scene.globe.show = false;
        viewer.scene.globe.baseColor = Cesium.Color.DARKSLATEGRAY;
        viewer.scene.skyAtmosphere.show = true;
  
        const customTime = Cesium.JulianDate.fromDate(new Date(Date.UTC(2024, 1, 25, 17, 0, 0))); // Set custom time
  viewer.clock.currentTime = customTime;
  viewer.clock.shouldAnimate = false;
  
        viewer.scene.skyBox = new Cesium.SkyBox({
          sources: {
            positiveX: '/images/px.png',
            negativeX: '/images/nx.png',
            positiveY: '/images/py.png',
            negativeY: '/images/ny.png',
            positiveZ: '/images/nz.png',
            negativeZ: '/images/pz.png',
          },
        });
  
        viewer.scene.requestRender();
  
  
  
        // Add Photorealistic 3D Tiles
        const addPhotorealisticTiles = async () => {
          try {
            const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(2275207); // Google 3D tileset
            console.log("Tileset loaded:", tileset);
        
            viewer.scene.primitives.add(tileset);
        
            tileset.style = new Cesium.Cesium3DTileStyle({
              color: "rgba(200, 200, 200, 1)" // Darker gray color with some transparency
            });
        
            // Adjust clipping planes
            viewer.scene.camera.frustum.near = 1.0; // Adjust near clipping plane
          // Increase far clipping plane
        
            // Disable depth testing against terrain

            viewer.scene.globe.depthTestAgainstTerrain = false;
        
            // Enable logarithmic depth buffer for better depth precision
            viewer.scene.logarithmicDepthBuffer = true;
        
            // Optionally disable sky and lighting effects to check for conflicts
            viewer.scene.skyAtmosphere.show = false;
            viewer.scene.fog.enabled = false;
            viewer.scene.globe.enableLighting = false;

            
        
            // Fly the camera to the tileset
  
        
          } catch (error) {
            console.log(`Error loading Photorealistic 3D Tiles tileset: ${error}`);
          }
        };
        
        // Add a listener to re-render the scene when the camera changes (to prevent black screen)
        viewer.camera.changed.addEventListener(() => {
          viewer.scene.requestRender();
        });
        
        addPhotorealisticTiles();
  
        //addCloudLayer(viewer);
  
         // Enable globe lighting, which adds day-night shading
        viewer.shadows = true;
        viewer.scene.shadowMap.maximumDistance = 10000.0; // Control shadow distance
        viewer.scene.shadowMap.size = 2048; // Set shadow resolution
        viewer.scene.shadowMap.softShadows = true;

        
        if(showOzoneLayer) {
          
          const existingOzoneLayer = viewer.entities.getById('ozoneLayer');
          if (!existingOzoneLayer) {
            viewer.entities.add({
              id: "ozoneLayer",
              rectangle: {
                coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                material: new Cesium.ImageMaterialProperty({
                  image: '/images/ozone.png',  // Path to your ozone image
                  transparent: true,           // Optional: Make the image transparent
                  color: Cesium.Color.WHITE.withAlpha(0.5)  // Adjust transparency level (0.0 fully transparent, 1.0 fully opaque)
                }),
                height: 90000,  // Set the altitude (300 km above the Earth's surface)
   // Optional: Extruded height for thickness (100 km)
                outline: false,
              },
            });
          }
        }
              // Remove the outline for a cleaner look
                
        else {
            // Remove the ozone layer if it exists
            const ozoneLayer = viewer.entities.getById('ozoneLayer');
            if (ozoneLayer) {
              viewer.entities.remove(ozoneLayer);
            }
        }

        if (showRivers) {
            if (!riversDataSource) {
                loadRivers();
            }
          } else {
            removeRivers();
          }

          if (showDroughts) {
            const existingDroughtLayer = viewer.entities.getById('droughts');
            if (!existingDroughtLayer) {
              viewer.entities.add({
                id: 'droughts',
                rectangle: {
                  coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                  material: new Cesium.ImageMaterialProperty({
                    image: '/images/as.png',
                    transparent: true,
                    color: Cesium.Color.WHITE.withAlpha(0.5),
                  }),
                  height: 100000,  // Set the altitude for the drought layer
                  outline: false,
                },
              });
            }
          } else {
            const droughtLayer = viewer.entities.getById('droughts');
            if (droughtLayer) {
              viewer.entities.remove(droughtLayer);
            }
          }
          


          if (showForests) {
            const existingForestsLayer = viewer.entities.getById('forests');
            if (!existingForestsLayer) {
              viewer.entities.add({
                id: 'forests',
                rectangle: {
                  coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                  material: new Cesium.ImageMaterialProperty({
                    image: '/images/forest.png',
                    transparent: true,
                    color: Cesium.Color.WHITE.withAlpha(0.8),
                  }),
                  height: 140000,  // Set the altitude for the forest layer
                  outline: false,
                },
              });
            }
          } else {
            const forestsLayer = viewer.entities.getById('forests');
            if (forestsLayer) {
              viewer.entities.remove(forestsLayer);
            }
          }

          if (showTemp) {
            const existingTempLayer = viewer.entities.getById('temp');
            if (!existingTempLayer) {
              viewer.entities.add({
                id: 'temp',
                rectangle: {
                  coordinates: Cesium.Rectangle.fromDegrees(-180, -90, 180, 90),
                  material: new Cesium.ImageMaterialProperty({
                    image: '/images/temp.png',
                    transparent: true,
                    color: Cesium.Color.WHITE.withAlpha(0.8),
                  }),
                  height: 150000,  // Set the altitude for the forest layer
                  outline: false,
                },
              });
            }
          } else {
            const tempLayer = viewer.entities.getById('temp');
            if (tempLayer) {
              viewer.entities.remove(tempLayer);
            }
          }
          
  
        const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
        handler.setInputAction((movement) => {
          const pickedObject = viewer.scene.pick(movement.endPosition);
          
          // Check if the picked object is defined and has a valid entity with a label
          if (Cesium.defined(pickedObject) && Cesium.defined(pickedObject.id) && Cesium.defined(pickedObject.id.label)) {
            pickedObject.id.label.show = true; // Show label when hovering
          } else {
            // Hide all other entity labels when not hovering
            viewer.entities.values.forEach(entity => {
              if (Cesium.defined(entity.label)) {
                entity.label.show = false;
              }
            });
          }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  
  
        handler.setInputAction(function (movement) {
          const cartesian = viewer.camera.pickEllipsoid(movement.position, Cesium.Ellipsoid.WGS84);
          if (cartesian) {
            const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
            const longitude = Cesium.Math.toDegrees(cartographic.longitude).toFixed(4);
            const latitude = Cesium.Math.toDegrees(cartographic.latitude).toFixed(4);
            console.log('Longitude: ' + longitude + ', Latitude: ' + latitude);
          }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
        let interval;
      if (animateDomes) {
        interval = setInterval(() => {
          setProgress(prevProgress => (prevProgress >= pulseDuration ? 0 : prevProgress + 0.1));
        }, 16);
      }
  
        return () => {
  
          handler.destroy();
          if (interval) clearInterval(interval);
        };
      }
    }, [viewer, animateDomes, showOzoneLayer, showRivers, showDroughts, showForests, showFires, showTemp]);
  
    const getEllipsoidRadii = (location) => {
      if (animateDomes) {
        return new Cesium.CallbackProperty((time, result) => {
          const sineValue = Math.abs(Math.sin((progress / pulseDuration)));
          const pulse = minRadii + sineValue * (maxRadii - minRadii);
          return Cesium.Cartesian3.fromElements(pulse, pulse, pulse, result);
        }, false);
      } else {
        // Static dome size for non-animated state
        return new Cesium.Cartesian3(200000, 200000, 200000);
      }
    };


    React.useEffect(() => {
      if (!viewer || !drawMode || isPolygonFinalized) return;
  
      const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  
      // Left-click to add points
      handler.setInputAction((clickEvent) => {
        const cartesian = viewer.camera.pickEllipsoid(clickEvent.position, Cesium.Ellipsoid.WGS84);
        if (cartesian && !isPolygonFinalized) {
          const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          const latitude = Cesium.Math.toDegrees(cartographic.latitude);
          const longitude = Cesium.Math.toDegrees(cartographic.longitude);
  
          setPolygonPoints([...polygonPoints, { latitude, longitude }]);
        }
      }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
      // Right-click to finalize polygon
      handler.setInputAction(() => {
        setIsPolygonFinalized(true);
      }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  
      return () => handler.destroy();
    }, [viewer, drawMode, isPolygonFinalized, polygonPoints, setPolygonPoints, setIsPolygonFinalized]);
  
    
  
    return (
        <>
        {/* <Entity
        position={Cesium.Cartesian3.fromDegrees(24, 20, 100)}  
        name="Circle"
        description="This is a circle at (5, 45)"
        ellipse={{
          semiMinorAxis: 200000.0,  // Radius of the circle (in meters)
          semiMajorAxis: 200000.0,
          material: Cesium.Color.RED.withAlpha(0.5),  // Semi-transparent red color
          outline: true,
          outlineColor: Cesium.Color.WHITE,
          height: 50000.0,  // Set the height of the circle
    extrudedHeight: 50000.0,  // Optional: Extruded height if you want a vertical extrusion
        }}
      /> */}
      {drawMode && polygonPoints.length > 1 && (
        <Entity
          polygon={{
            hierarchy: Cesium.Cartesian3.fromDegreesArray(
              polygonPoints.flatMap(point => [point.longitude, point.latitude])
            ),
            material: Cesium.Color.ORANGE.withAlpha(0.5),
            height: polygonHeight, // Sets the height of the polygon
 // Extrudes the polygon to appear "floating"
          }}
        />
      )}
        {showCircles && emissionData.map((location, index) => (
            
          <Entity
            key={index}
            position={Cesium.Cartesian3.fromDegrees(location.longitude, location.latitude)}
            name={location.name}
            ellipsoid={{
              radii: getEllipsoidRadii(location),
              material: getSmoothGradientMaterial(location.emission, 0.4),
              outlineWidth: 10,
              outlineColor: getEmissionMaterial(location.emission, 0.1),
            }}
            label={{
              text: `${location.name}\nEmission: ${location.emission} MT`,
              font: '14pt monospace',
              fillColor: Cesium.Color.WHITE,
              outlineColor: Cesium.Color.BLACK,
              outlineWidth: 2,
              style: Cesium.LabelStyle.FILL_AND_OUTLINE,
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              pixelOffset: new Cesium.Cartesian2(0, -50),
              show: false
            }}
            onMouseMove={e => e.target.label.show = true}
            onMouseOut={e => e.target.label.show = false}
          />
        ))}
        {showFires && fireData.map((fire, index) => {
        const { latitude, longitude, brightness } = fire;

        return (
          <Entity
            key={index}
            position={Cesium.Cartesian3.fromDegrees(longitude, latitude, 50000)}
            point={{
              pixelSize: 4,
              color: getColorByBrightness(brightness)
            }}
            description={`
              <b>Brightness:</b> ${brightness}<br/>
              <b>Date:</b> ${fire.acq_date}<br/>
              <b>Time:</b> ${fire.acq_time}<br/>
              <b>Satellite:</b> ${fire.satellite}<br/>
              <b>FRP:</b> ${fire.frp}
            `}
          />
        );
      })}
      </>
    );
  };


  export default ViewerContent;