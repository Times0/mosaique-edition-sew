import React from 'react';
import { availableImages } from '../utils/images';

interface ImageSelectProps {
  value: string;
  onChange: (imageId: string) => void;
  label: string;
}

export const ImageSelect: React.FC<ImageSelectProps> = ({
  value,
  onChange,
  label,
}) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
    >
      <option value="">Select image</option>
      {availableImages.map((image) => (
        <option key={image.id} value={image.id}>
          {image.label}
        </option>
      ))}
    </select>
  </div>
);