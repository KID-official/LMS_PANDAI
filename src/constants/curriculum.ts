export const COURSE_KEYS = {
  BEGINNER: "course-beginner",
  INTERMEDIATE: "course-intermediate",
} as const;

export const CHAPTER_KEYS = {
  BEGINNER_CH1: "beginner-ch-1",
  BEGINNER_CH2: "beginner-ch-2",
  BEGINNER_CH3: "beginner-ch-3",
} as const;

export const QUIZ_KEYS = {
  QUIZ_BEGINNER_CH1: "quiz-beginner-ch-1",
  QUIZ_BEGINNER_CH2: "quiz-beginner-ch-2",
  QUIZ_BEGINNER_CH3: "quiz-beginner-ch-3",
} as const;

export const CURRICULUM = [
  {
    key: COURSE_KEYS.BEGINNER,
    title: "Literasi AI Dasar",
    description: "Pengenalan Artificial Intelligence untuk siswa SMP",
    chapters: [
      {
        key: CHAPTER_KEYS.BEGINNER_CH1,
        title: "Apa itu AI?",
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Dummy URL
        content_text: "AI atau Kecerdasan Buatan adalah sistem komputer yang dapat melakukan tugas yang biasanya membutuhkan kecerdasan manusia.",
        min_watch_seconds: 60,
        quiz_key: QUIZ_KEYS.QUIZ_BEGINNER_CH1,
      },
      {
        key: CHAPTER_KEYS.BEGINNER_CH2,
        title: "Etika Menggunakan AI",
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Dummy URL
        content_text: "Kita harus menggunakan AI secara bijak dan bertanggung jawab.",
        min_watch_seconds: 60,
        quiz_key: QUIZ_KEYS.QUIZ_BEGINNER_CH2,
      },
      {
        key: CHAPTER_KEYS.BEGINNER_CH3,
        title: "Masa Depan AI",
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Dummy URL
        content_text: "AI akan terus berkembang dan membantu berbagai pekerjaan manusia di masa depan.",
        min_watch_seconds: 60,
        quiz_key: QUIZ_KEYS.QUIZ_BEGINNER_CH3,
      }
    ]
  }
];
