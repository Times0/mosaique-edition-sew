import React, { memo, useCallback } from 'react';
import { ImageStream } from './ImageStream';
import { StreamConfig } from '../types/stream';
import { useStreamStore } from '../store/streamStore';

interface StreamGridProps {
  streams: StreamConfig[];
  onDrag: (id: string, offset: { x: number; y: number }) => void;
}

export const StreamGrid: React.FC<StreamGridProps> = memo(({ streams, onDrag }) => {
  const { removeStream, activeStreams } = useStreamStore();
  const columns = 4;
  
  const handleDrag = useCallback((id: string) => 
    (offset: { x: number; y: number }) => onDrag(id, offset),
    [onDrag]
  );

  const handleDelete = useCallback((id: string) => 
    () => removeStream(id),
    [removeStream]
  );
  
  return (
    <div className="grid gap-4">
      <div 
        className="grid gap-4 transition-all duration-300"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {streams.map((stream) => (
          <div key={stream.id} className="relative">
            <ImageStream
              offset={stream.offset}
              onDrag={handleDrag(stream.id)}
              side={`stream-${stream.position}`}
              onDelete={handleDelete(stream.id)}
              showDelete={activeStreams > 2}
            />
          </div>
        ))}
      </div>
    </div>
  );
});