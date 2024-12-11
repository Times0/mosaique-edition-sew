import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { useStreamStore } from '../store/streamStore';

export const StreamControls: React.FC = () => {
  const { activeStreams, maxStreams, addStream } = useStreamStore();
  const isNearLimit = activeStreams >= maxStreams - 2;
  const isAtLimit = activeStreams >= maxStreams;

  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={addStream}
        disabled={isAtLimit}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-lg transition
          ${isAtLimit
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
          }
        `}
        aria-label="Add new stream"
      >
        <Plus size={20} />
        Add Stream
      </button>
      
      {isNearLimit && (
        <div className="flex items-center gap-2 text-amber-600">
          <AlertCircle size={20} />
          <span className="text-sm">
            {isAtLimit
              ? 'Maximum number of streams reached'
              : `${maxStreams - activeStreams} slots remaining`}
          </span>
        </div>
      )}
    </div>
  );
};