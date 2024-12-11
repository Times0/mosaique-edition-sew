export const getPlaceholderImage = (side: string): string => {
  // Generate a color based on the stream position
  const position = parseInt(side.split('-')[1], 10);
  const hue = (position * 45) % 360;
  const color = hslToHex(hue, 70, 60);
  
  return `https://via.placeholder.com/300x225/${color}/ffffff?text=Stream+${position + 1}`;
};

// Helper function to convert HSL to Hex
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `${f(0)}${f(8)}${f(4)}`;
}