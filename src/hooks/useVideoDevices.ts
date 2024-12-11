import { useState, useEffect } from 'react';
import type { VideoDevice } from '../types/stream';

export const useVideoDevices = () => {
  const [devices, setDevices] = useState<VideoDevice[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getDevices = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices
          .filter((device) => device.kind === 'videoinput')
          .map((device) => ({
            deviceId: device.deviceId,
            label: device.label || `Camera ${device.deviceId.slice(0, 4)}`,
          }));
        setDevices(videoDevices);
      } catch (err) {
        setError('Failed to access camera devices. Please check permissions.');
      }
    };

    getDevices();
  }, []);

  return { devices, error };
};