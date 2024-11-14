// colorUtils.js
import chroma from 'chroma-js';

const shadeKeys = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const lightnessValues = [97, 92, 85, 74, 60, 45, 40, 31, 22, 13];
const saturationAdjustments = [10, 5, 0, -5, -10, 0, -5, -10, -15, -20];

/**
 * Generates a random color with constrained HSL values to ensure quality shades.
 * @returns {string} Hex representation of the random color.
 */
export function getRandomColor() {
  const hue = Math.random() * 360;
  const saturation = 0.3 + Math.random() * 0.7;
  const lightness = 0.1 + Math.random() * 0.8;
  return chroma.hsl(hue, saturation, lightness).hex();
}

/**
 * Generates a set of color shades based on the base color.
 * Ensures the base color is included at the appropriate shade.
 * @param {string} baseColor - The base color in hex format.
 * @returns {Array} Array of shade objects with `shade` and `hex` properties.
 */
export function generateColorShades(baseColor) {
  let [baseHue, baseSaturation, baseLightness] = chroma(baseColor).hsl();
  const baseLightnessPercent = baseLightness * 100;

  // Find the closest shade based on lightness with improved thresholds
  let baseShadeIndex;
  if (baseLightnessPercent > 90) baseShadeIndex = 0; // 50
  else if (baseLightnessPercent > 80) baseShadeIndex = 1; // 100
  else if (baseLightnessPercent > 70) baseShadeIndex = 2; // 200
  else if (baseLightnessPercent > 60) baseShadeIndex = 3; // 300
  else if (baseLightnessPercent > 50) baseShadeIndex = 4; // 400
  else if (baseLightnessPercent > 40) baseShadeIndex = 5; // 500
  else if (baseLightnessPercent > 30) baseShadeIndex = 6; // 600
  else if (baseLightnessPercent > 20) baseShadeIndex = 7; // 700
  else if (baseLightnessPercent > 10) baseShadeIndex = 8; // 800
  else baseShadeIndex = 9; // 900

  return shadeKeys.map((shade, index) => {
    if (index === baseShadeIndex) {
      return {
        shade,
        hex: baseColor,
      };
    }

    // Calculate adjusted saturation and lightness for other shades
    let adjustedSaturation = Math.max(
      0,
      Math.min(1, baseSaturation + (saturationAdjustments[index] || 0) / 100),
    );
    let lightness = lightnessValues[index] / 100;

    return {
      shade,
      hex: chroma.hsl(baseHue, adjustedSaturation, lightness).hex(),
    };
  });
}
