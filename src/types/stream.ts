export interface StreamConfig {
  id: string;
  offset: { x: number; y: number };
  position: number;
}

export interface StreamState {
  streams: StreamConfig[];
  activeStreams: number;
  maxStreams: number;
}

export interface VideoDevice {
  deviceId: string;
  label: string;
}