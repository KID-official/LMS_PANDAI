import { QUIZ_KEYS } from "./curriculum";

export interface QuizOptionItem {
  key: "A" | "B" | "C" | "D";
  text: string;
}

export interface StaticQuizQuestion {
  id: string;
  questionText: string;
  points: number;
  options: QuizOptionItem[];
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
}

export interface StaticQuiz {
  quizKey: string;
  title: string;
  courseKey: string;
  passingScore: number;
  questions: StaticQuizQuestion[];
}

/**
 * Bank soal kuis statis sesuai kurikulum dan audit evaluasi.
 */
export const STATIC_QUIZZES: Record<string, StaticQuiz> = {
  [QUIZ_KEYS.QUIZ_BEGINNER_CH1]: {
    quizKey: QUIZ_KEYS.QUIZ_BEGINNER_CH1,
    title: "Kuis Evaluasi: Literasi AI Dasar & Etika Digital",
    courseKey: "literasi-ai-dasar",
    passingScore: 75,
    questions: [
      {
        id: "q1",
        questionText: "Apa yang dimaksud dengan Artificial Intelligence?",
        points: 40,
        options: [
          { key: "A", text: "Perangkat keras yang diprogram untuk menggantikan seluruh tenaga kerja manusia" },
          { key: "B", text: "Sistem komputer yang mampu meniru kecerdasan manusia (kemampuan belajar, bernalar, & koreksi mandiri)" },
          { key: "C", text: "Mesin pencari internet berbasis database statis" },
          { key: "D", text: "Bahasa pemrograman generasi terbaru untuk robot mekanik" },
        ],
        correctOption: "B",
        explanation: "AI adalah sistem komputasi yang meniru kecerdasan manusia seperti kemampuan belajar, bernalar, dan koreksi mandiri.",
      },
      {
        id: "q2",
        questionText: "Manakah contoh pemanfaatan AI yang bertanggung jawab dalam lingkungan pendidikan?",
        points: 40,
        options: [
          { key: "A", text: "Menggunakan AI sebagai asisten riset dan mencantumkan sumber sitasi dengan transparan" },
          { key: "B", text: "Meminta LLM menghasilkan esai lengkap dan langsung mengumpulkannya atas nama sendiri" },
          { key: "C", text: "Memasukkan seluruh data rekam medis siswa ke prompt publik tanpa izin" },
          { key: "D", text: "Mengabaikan validasi fakta hasil sintesis AI karena dianggap pasti akurat" },
        ],
        correctOption: "A",
        explanation: "Pemanfaatan AI yang beretika mencakup transparansi sumber sitasi tanpa mengambil alih pemikiran orisinal siswa.",
      },
      {
        id: "q3",
        questionText: "Apa dampak negatif jika menggunakan AI untuk membuat tugas tanpa membaca ulang?",
        points: 20,
        options: [
          { key: "A", text: "Kecepatan koneksi internet otomatis mengalami degradasi" },
          { key: "B", text: "Lisensi sistem operasi komputer akan langsung dicabut" },
          { key: "C", text: "Potensi plagiasi dan penyebaran informasi yang keliru/halusinasi" },
          { key: "D", text: "Komputer menjadi cepat panas" },
        ],
        correctOption: "C",
        explanation: "Siswa keliru memahami konsep halusinasi AI dengan kendala perangkat keras. Disarankan meninjau ulang Sub-bab 4: 'Etika & Keamanan Generatif AI'.",
      },
    ],
  },
  "quiz-literasi-ai-dasar": {
    quizKey: "quiz-literasi-ai-dasar",
    title: "Kuis Komprehensif: Literasi AI Dasar",
    courseKey: "literasi-ai-dasar",
    passingScore: 75,
    questions: [
      {
        id: "q1",
        questionText: "Apa yang dimaksud dengan Artificial Intelligence?",
        points: 40,
        options: [
          { key: "A", text: "Perangkat keras yang diprogram untuk menggantikan seluruh tenaga kerja manusia" },
          { key: "B", text: "Sistem komputer yang mampu meniru kecerdasan manusia (kemampuan belajar, bernalar, & koreksi mandiri)" },
          { key: "C", text: "Mesin pencari internet berbasis database statis" },
          { key: "D", text: "Bahasa pemrograman generasi terbaru untuk robot mekanik" },
        ],
        correctOption: "B",
        explanation: "AI adalah sistem komputasi yang meniru kecerdasan manusia seperti kemampuan belajar, bernalar, dan koreksi mandiri.",
      },
      {
        id: "q2",
        questionText: "Manakah contoh pemanfaatan AI yang bertanggung jawab dalam lingkungan pendidikan?",
        points: 40,
        options: [
          { key: "A", text: "Menggunakan AI sebagai asisten riset dan mencantumkan sumber sitasi dengan transparan" },
          { key: "B", text: "Meminta LLM menghasilkan esai lengkap dan langsung mengumpulkannya atas nama sendiri" },
          { key: "C", text: "Memasukkan seluruh data rekam medis siswa ke prompt publik tanpa izin" },
          { key: "D", text: "Mengabaikan validasi fakta hasil sintesis AI karena dianggap pasti akurat" },
        ],
        correctOption: "A",
        explanation: "Pemanfaatan AI yang beretika mencakup transparansi sumber sitasi tanpa mengambil alih pemikiran orisinal siswa.",
      },
      {
        id: "q3",
        questionText: "Apa dampak negatif jika menggunakan AI untuk membuat tugas tanpa membaca ulang?",
        points: 20,
        options: [
          { key: "A", text: "Kecepatan koneksi internet otomatis mengalami degradasi" },
          { key: "B", text: "Lisensi sistem operasi komputer akan langsung dicabut" },
          { key: "C", text: "Potensi plagiasi dan penyebaran informasi yang keliru/halusinasi" },
          { key: "D", text: "Komputer menjadi cepat panas" },
        ],
        correctOption: "C",
        explanation: "Siswa keliru memahami konsep halusinasi AI dengan kendala perangkat keras. Disarankan meninjau ulang Sub-bab 4: 'Etika & Keamanan Generatif AI'.",
      },
    ],
  },
};

/**
 * Helper untuk mengambil bank soal kuis berdasarkan quizKey.
 * Mengembalikan default quiz jika key tidak ditemukan.
 */
export function getStaticQuiz(quizKey?: string): StaticQuiz {
  if (quizKey && STATIC_QUIZZES[quizKey]) {
    return STATIC_QUIZZES[quizKey];
  }
  return STATIC_QUIZZES[QUIZ_KEYS.QUIZ_BEGINNER_CH1] || Object.values(STATIC_QUIZZES)[0];
}

// Backwards compatibility untuk bagian lama yang mungkin mengimpor QUIZZES
export const QUIZZES = {
  [QUIZ_KEYS.QUIZ_BEGINNER_CH1]: {
    questions: STATIC_QUIZZES[QUIZ_KEYS.QUIZ_BEGINNER_CH1]?.questions.map((q) => ({
      id: q.id,
      question: q.questionText,
      options: q.options.map((opt) => opt.text),
      correctAnswer: q.options.find((opt) => opt.key === q.correctOption)?.text || "",
    })) || [],
  },
  [QUIZ_KEYS.QUIZ_BEGINNER_CH2]: {
    questions: [
      {
        id: "q1",
        question: "Apakah menggunakan AI untuk mencontek saat ujian diperbolehkan?",
        options: ["Ya", "Tidak", "Boleh saja jika tidak ketahuan", "Tergantung gurunya"],
        correctAnswer: "Tidak",
      },
    ],
  },
  [QUIZ_KEYS.QUIZ_BEGINNER_CH3]: {
    questions: [
      {
        id: "q1",
        question: "Bagaimana AI dapat membantu pekerjaan manusia?",
        options: ["Menggantikan manusia sepenuhnya", "Mengotomatisasi tugas berulang", "Membuat manusia menjadi malas", "Tidak ada manfaatnya"],
        correctAnswer: "Mengotomatisasi tugas berulang",
      },
    ],
  },
};
