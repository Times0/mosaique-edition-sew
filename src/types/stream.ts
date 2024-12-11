export interface StreamConfig {
  id: string;
  imageId: string;
  offset: { x: number; y: number };
  position: number;
}

export interface ImageSource {
  id: string;
  label: string;
  url: string;
}

export interface StreamState {
  streams: StreamConfig[];
  activeStreams: number;
  maxStreams: number;
}