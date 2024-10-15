function hexToRgb(hex: string): [number, number, number] | null {
  return /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)?.map((x: string) => parseInt(x, 16)) as [number, number, number] | null;
}

function rgbToHex([r, g, b]: [number, number, number]): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

function generateColorPalette(hex: string, numColors: number): string[] {
  const rgb = hexToRgb(hex);
  if (!rgb) throw new Error(`Invalid hex color: ${hex}`);
  const [r, g, b] = rgb;
  const palette: string[] = [];
  const step = 20;

  // Generate lighter tones
  for (let i = 1; i <= numColors / 2; i++) {
    const newR = Math.min(255, r + i * step);
    const newG = Math.min(255, g + i * step);
    const newB = Math.min(255, b + i * step);
    palette.push(rgbToHex([newR, newG, newB]));
  }

  // Generate darker tones
  for (let i = 1; i <= numColors / 2; i++) {
    const newR = Math.max(0, r - i * step);
    const newG = Math.max(0, g - i * step);
    const newB = Math.max(0, b - i * step);
    palette.push(rgbToHex([newR, newG, newB]));
  }

  return palette;
}

const hexColor: string = '#00695c';
const numColors: number = 12;
const palette: string[] = generateColorPalette(hexColor, numColors);
console.log('Final Palette:', palette);

export { generateColorPalette };