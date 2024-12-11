import React, { memo, useMemo } from "react";
import Draggable from "react-draggable";
import {
  GripHorizontal,
  Image,
  Trash2,
  ArrowLeftRight,
  ArrowUpDown,
} from "lucide-react";
import { getPlaceholderImage } from "../utils/placeholders";

interface ImageStreamProps {
  offset: { x: number; y: number };
  onDrag: (offset: { x: number; y: number }) => void;
  side: string;
  onDelete?: () => void;
  showDelete?: boolean;
}

export const ImageStream: React.FC<ImageStreamProps> = memo(
  ({ offset, onDrag, side, onDelete, showDelete }) => {
    const bounds = { left: -300, right: 300, top: -100, bottom: 100 };

    const handleDrag = useMemo(
      () => (_: any, data: { x: number; y: number }) =>
        onDrag({ x: data.x, y: data.y }),
      [onDrag]
    );

    return (
      <Draggable position={offset} bounds={bounds} onDrag={handleDrag}>
        <div className="relative cursor-move group z-10 hover:z-20">
          <div className="w-[300px] h-[225px] relative transition-opacity duration-200 hover:opacity-50">
            <img
              src={getPlaceholderImage(side)}
              alt={`${side} stream placeholder`}
              className="w-full h-full object-cover rounded-lg"
              draggable={false}
              loading="lazy"
              decoding="async"
              width={300}
              height={225}
            />
            {
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
                <div className="text-center text-white">
                  <Image size={48} className="mx-auto mb-2 opacity-60" />
                  <p className="text-sm">No image selected</p>
                </div>
              </div>
            }
            {showDelete && onDelete && (
              <button
                onClick={onDelete}
                className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove stream"
              >
                <Trash2 size={16} />
              </button>
            )}
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
          </div>
        </div>
      </Draggable>
    );
  }
);
