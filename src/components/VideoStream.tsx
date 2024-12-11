import React, { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { GripHorizontal, Camera } from 'lucide-react';
import { getPlaceholderImage } from '../utils/placeholders';

interface VideoStreamProps {
  deviceId: string;
  offset: { x: number; y: number };
  onDrag: (offset: { x: number; y: number }) => void;
  side: 'left' | 'right';
}

export const VideoStream: React.FC<VideoStreamProps> = ({
  deviceId,
  offset,
  onDrag,
  side,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [streamError, setStreamError] = useState(false);

  useEffect(() => {
    if (!deviceId) {
      setStreamError(true);
      return;
    }

    const startStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: deviceId } },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStreamError(false);
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setStreamError(true);
      }
    };

    startStream();

    return () => {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [deviceId]);

  return (
    <Draggable
      axis="x"
      position={offset}
      onDrag={(_, data) => onDrag({ x: data.x, y: data.y })}
    >
      <div className="relative cursor-move">
        {!deviceId || streamError ? (
          <div className="w-[400px] h-[300px] relative">
            <img
              src={getPlaceholderImage(side)}
              alt={`${side} camera placeholder`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="text-center text-white">
                <Camera size={48} className="mx-auto mb-2 opacity-60" />
                <p className="text-sm">No camera selected</p>
              </div>
            </div>
          </div>
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-[400px] h-[300px] object-cover bg-black"
          />
        )}
        <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-gray-800/50 p-2 rounded-l">
          <GripHorizontal className="text-white" size={24} />
        </div>
      </div>
    </Draggable>
  );
};