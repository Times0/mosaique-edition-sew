import React from 'react';
import { Ruler } from 'lucide-react';

interface OffsetDisplayProps {
  offset: number;
}

export const OffsetDisplay: React.FC<OffsetDisplayProps> = ({ offset }) => (
  <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
    <Ruler className="text-blue-500" />
    <span className="font-medium">Offset: {offset}px</span>
  </div>
);