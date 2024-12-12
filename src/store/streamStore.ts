import { create } from 'zustand';
import type { StreamConfig, StreamState } from '../types/stream';

interface StreamStore extends StreamState {
  addStream: () => void;
  removeStream: (id: string) => void;
  setStreamOffset: (id: string, offset: { x: number; y: number }) => void;
  resetOffsets: () => void;
}

const createInitialStream = (position: number): StreamConfig => ({
  id: `stream-${Date.now()}-${position}`,
  offset: { x: 0, y: 0 },
  position,
});

const initialState: StreamState = {
  streams: [],
  activeStreams: 0,
  maxStreams: 8,
};

export const useStreamStore = create<StreamStore>((set) => ({
  ...initialState,
  addStream: () =>
    set((state) => {
      if (state.activeStreams >= state.maxStreams) return state;
      const newStream = createInitialStream(state.activeStreams);
      return {
        streams: [...state.streams, newStream],
        activeStreams: state.activeStreams + 1,
      };
    }),
  removeStream: (id) =>
    set((state) => {
      if (state.activeStreams <= 2) return state;
      const filteredStreams = state.streams
        .filter((s) => s.id !== id)
        .map((s, idx) => ({ ...s, position: idx }));
      return {
        streams: filteredStreams,
        activeStreams: state.activeStreams - 1,
      };
    }),
  setStreamOffset: (id, offset) =>
    set((state) => ({
      streams: state.streams.map((stream) =>
        stream.id === id ? { ...stream, offset } : stream
      ),
    })),
  resetOffsets: () =>
    set((state) => ({
      streams: state.streams.map((stream) => ({
        ...stream,
        offset: { x: 0, y: 0 },
      })),
    })),
}));