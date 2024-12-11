import React from 'react';
import type { VideoDevice } from '../types/stream';

interface DeviceSelectProps {
  devices: VideoDevice[];
  value: string;
  onChange: (deviceId: string) => void;
  label: string;
}

export const DeviceSelect: React.FC<DeviceSelectProps> = ({
  devices,
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
      <option value="">Select camera</option>
      {devices.map((device) => (
        <option key={device.deviceId} value={device.deviceId}>
          {device.label}
        </option>
      ))}
    </select>
  </div>
);