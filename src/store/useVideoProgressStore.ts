import { create } from 'zustand';

interface VideoProgressState {
  watchSeconds: number;
  isCompleted: boolean;
  incrementWatchSeconds: () => void;
  setWatchSeconds: (seconds: number) => void;
  markCompleted: () => void;
  resetProgress: () => void;
}

export const useVideoProgressStore = create<VideoProgressState>((set) => ({
  watchSeconds: 0,
  isCompleted: false,
  incrementWatchSeconds: () => set((state) => ({ watchSeconds: state.watchSeconds + 1 })),
  setWatchSeconds: (seconds) => set({ watchSeconds: seconds }),
  markCompleted: () => set({ isCompleted: true }),
  resetProgress: () => set({ watchSeconds: 0, isCompleted: false }),
}));
