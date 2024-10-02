import * as Cesium from 'cesium';

export const getEmissionMaterial = (emission, opacity) => {
    const maxEmission = 430000; // Adjust as necessary
    const minEmission = 0;
    const normalized = (emission - minEmission) / (maxEmission - minEmission);
    const yellow = new Cesium.Color(1, 1, 0, opacity); // Yellow with variable opacity
    const orange = new Cesium.Color(1, 0.65, 0, opacity); // Orange with variable opacity
    const red = new Cesium.Color(1, 0, 0, opacity); // Red with variable opacity
  
    let color;
    if (normalized < 0.5) {
      color = Cesium.Color.lerp(yellow, orange, normalized * 2, new Cesium.Color());
    } else {
      color = Cesium.Color.lerp(orange, red, (normalized - 0.5) * 2, new Cesium.Color());
    }
    return color;
  };

export const getSmoothGradientMaterial = (emission, opacity) => {
    const maxEmission = 43000;
    const minEmission = 0;
    const normalized = (emission - minEmission) / (maxEmission - minEmission);
  
    // Hue for yellow is ~60° (0.167 in HSL), and red is ~0° (0.0 in HSL)
    const hueStart = 0.167; // Yellow
    const hueEnd = 0.0; // Red
  
    // Interpolate the hue between yellow (hue = 0.167) and red (hue = 0.0)
    const hueEven = hueStart - normalized * (hueStart - hueEnd);
    const hueOdd = hueEven - 0.05; // Keep a 0.1 difference between even and odd colors
  
    // Ensure hue values remain between 0.0 and 1.0 (hue is cyclical in HSL)
    const safeHueOdd = (hueOdd < 0.0) ? hueOdd + 1.0 : hueOdd; 
  
    return new Cesium.StripeMaterialProperty({
      evenColor: Cesium.Color.fromHsl(hueEven, 1.0, 0.5, opacity), // Interpolated color based on emission
      oddColor: Cesium.Color.fromHsl(safeHueOdd, 1.0, 0.5, opacity), // Offset by 0.1 in hue
      repeat: 2, // Number of stripes
      offset: new Cesium.CallbackProperty(() => normalized * 2 * Math.PI, false), // Optional: add animation effect
      orientation: Cesium.StripeOrientation.VERTICAL, // Adjust to make stripes horizontal or vertical
    });
  };
  
  
  
  
  
  
  
  
  