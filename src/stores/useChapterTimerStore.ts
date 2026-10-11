import { create } from 'zustand';

interface ChapterTimerState {
  chapterKey: string | null;
  requiredSeconds: number;
  remainingSeconds: number;
  elapsedSeconds: number;
  isPlaying: boolean;
  isCompleted: boolean;

  // Actions
  initChapter: (chapterKey: string, requiredSeconds: number, isAlreadyCompleted?: boolean) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  tick: () => void;
  markCompleted: () => void;
  resetTimer: () => void;
}

export const useChapterTimerStore = create<ChapterTimerState>((set, get) => ({
  chapterKey: null,
  requiredSeconds: 60,
  remainingSeconds: 60,
  elapsedSeconds: 0,
  isPlaying: false,
  isCompleted: false,

  initChapter: (chapterKey: string, requiredSeconds: number, isAlreadyCompleted = false) => {
    const current = get();
    // If same chapter and already initialized, do not overwrite if running
    if (current.chapterKey === chapterKey && current.isCompleted === isAlreadyCompleted) {
      return;
    }

    set({
      chapterKey,
      requiredSeconds: Math.max(1, requiredSeconds),
      remainingSeconds: isAlreadyCompleted ? 0 : Math.max(1, requiredSeconds),
      elapsedSeconds: isAlreadyCompleted ? requiredSeconds : 0,
      isPlaying: false,
      isCompleted: isAlreadyCompleted,
    });
  },

  startTimer: () => {
    set({ isPlaying: true });
  },

  pauseTimer: () => {
    set({ isPlaying: false });
  },

  tick: () => {
    const { remainingSeconds, elapsedSeconds, requiredSeconds, isCompleted } = get();
    if (isCompleted) return;

    if (remainingSeconds <= 1) {
      set({
        remainingSeconds: 0,
        elapsedSeconds: requiredSeconds,
        isPlaying: false,
        isCompleted: true,
      });
    } else {
      set({
        remainingSeconds: remainingSeconds - 1,
        elapsedSeconds: elapsedSeconds + 1,
      });
    }
  },

  markCompleted: () => {
    const { requiredSeconds } = get();
    set({
      remainingSeconds: 0,
      elapsedSeconds: requiredSeconds,
      isPlaying: false,
      isCompleted: true,
    });
  },

  resetTimer: () => {
    const { requiredSeconds } = get();
    set({
      remainingSeconds: requiredSeconds,
      elapsedSeconds: 0,
      isPlaying: false,
      isCompleted: false,
    });
  },
}));
