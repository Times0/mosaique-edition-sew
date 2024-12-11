export const exportConfig = (streams: { position: number; offset: { x: number; y: number } }[]) => {
  const config = {
    timestamp: new Date().toISOString(),
    streams: streams.map(({ position, offset }) => ({
      position,
      offset,
    })),
  };

  const blob = new Blob([JSON.stringify(config, null, 2)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'stream-offsets.json';
  a.click();
  
  URL.revokeObjectURL(url);
};