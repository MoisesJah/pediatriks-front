export function generateColorPalette(hexColor: string, steps = 10) {
  // Ensure the hex color starts with '#'
  hexColor = hexColor.charAt(0) === '#' ? hexColor : '#' + hexColor;

  // Convert hex to RGB
  let r = parseInt(hexColor.slice(1, 3), 16);
  let g = parseInt(hexColor.slice(3, 5), 16);
  let b = parseInt(hexColor.slice(5, 7), 16);

  // Calculate the maximum increase (15% of the darkest channel's distance to 255)
  const darkestChannel = Math.min(r, g, b);
  const maxIncrease = Math.round((255 - darkestChannel) * 0.25);

  // Generate shades
  const shades = [];
  for (let i = 1; i <= steps; i++) {
    const factor = i / steps;
    const newR = Math.min(255, Math.round(r + maxIncrease * factor));
    const newG = Math.min(255, Math.round(g + maxIncrease * factor));
    const newB = Math.min(255, Math.round(b + maxIncrease * factor));
    
    // Convert back to hex, ensuring two digits for each component
    const newHex = '#' + 
      newR.toString(16).padStart(2, '0') +
      newG.toString(16).padStart(2, '0') +
      newB.toString(16).padStart(2, '0');
    
    shades.push(newHex);
  }

  return shades;
}
