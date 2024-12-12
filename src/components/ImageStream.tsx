import React, { memo, useMemo } from "react";
import Draggable from "react-draggable";
import {
  GripHorizontal,
  Trash2,
  ArrowLeftRight,
  ArrowUpDown,
  RotateCcw,
} from "lucide-react";

interface ImageStreamProps {
  offset: { x: number; y: number };
  onDrag: (offset: { x: number; y: number }) => void;
  side: string;
  onDelete?: () => void;
  showDelete?: boolean;
}

export const ImageStream: React.FC<ImageStreamProps> = memo(
  ({ offset, onDrag, side, onDelete }) => {
    const handleDrag = useMemo(
      () => (_: any, data: { x: number; y: number }) =>
        onDrag({ x: data.x, y: data.y }),
      [onDrag]
    );

    // Extract stream number from side prop (e.g., "stream-1" -> 1)
    const streamNumber = parseInt(side.split("-")[1]) || 0;

    // Generate background color based on stream number
    const bgColors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
    ];
    const bgColor = bgColors[streamNumber % bgColors.length];

    const handleReset = () => {
      onDrag({ x: 0, y: 0 });
    };

    return (
      <Draggable position={offset} onDrag={handleDrag}>
        <div className="relative cursor-move group z-10 hover:z-20">
          <div className="w-[300px] h-[169px] relative transition-opacity duration-200 hover:opacity-50">
            <div
              className={`w-full h-full ${bgColor} rounded-lg flex items-center justify-center`}
            >
              <span className="text-white text-lg font-medium">
                Stream {streamNumber}
              </span>
            </div>

            <button
              onClick={onDelete}
              className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Remove stream"
            >
              <Trash2 size={16} />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-0 bg-gray-800/50 p-2 rounded-l">
            <GripHorizontal className="text-white" size={24} />
          </div>

          {/* Offset indicators */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-3 whitespace-nowrap z-30">
            <div className="bg-gray-800/75 px-3 py-1 rounded-full text-white text-sm flex items-center gap-2">
              <ArrowLeftRight size={14} />
              <span>{offset.x}px</span>
            </div>
            <div className="bg-gray-800/75 px-3 py-1 rounded-full text-white text-sm flex items-center gap-2">
              <ArrowUpDown size={14} />
              <span>{offset.y}px</span>
            </div>
            <button
              onClick={handleReset}
              className="bg-gray-800/75 px-3 py-1 rounded-full text-white text-sm flex items-center gap-2 hover:bg-gray-700/75"
              aria-label="Reset position"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </Draggable>
    );
  }
);
