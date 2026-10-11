export interface QuizOption {
  key: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface QuizData {
  quizKey: string;
  title: string;
  courseKey: string;
  chapterKey: string;
  passingScore: number;
  questions: QuizQuestion[];
}

/**
 * Server-side Answer Key Map for auto-grading securely.
 * Maps quizKey -> questionId -> correct option key ('A' | 'B' | 'C' | 'D').
 */
export const QUIZ_ANSWER_KEYS: Record<string, Record<string, 'A' | 'B' | 'C' | 'D'>> = {
  'quiz-beginner-ch-1': {
    q1: 'B',
    q2: 'C',
  },
  'quiz-beginner-ch-2': {
    q1: 'A',
    q2: 'C',
  },
  'quiz-beginner-ch-3': {
    q1: 'D',
    q2: 'B',
  },
  'quiz-beginner-ch-4': {
    q1: 'C',
    q2: 'A',
  },
  'quiz-intermediate-ch-1': {
    q1: 'B',
    q2: 'D',
  },
  'quiz-intermediate-ch-2': {
    q1: 'A',
    q2: 'C',
  },
  'quiz-intermediate-ch-3': {
    q1: 'C',
    q2: 'B',
  },
};

/**
 * Dummy Quiz Data Structure prepared for client content substitution.
 */
export const QUIZZES_DATA: QuizData[] = [
  {
    quizKey: 'quiz-beginner-ch-1',
    title: 'Evaluasi Kuis Bab 1: Pengenalan AI & Etika Digital',
    courseKey: 'course-beginner',
    chapterKey: 'beginner-ch-1',
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        question: 'Apa peran ideal teknologi Kecerdasan Artifisial (AI) generatif dalam proses belajar siswa?',
        options: [
          { key: 'A', text: 'Pengganti utama penulisan makalah akademis tanpa perlu dibaca ulang' },
          { key: 'B', text: 'Asisten bernalar (thinking copilot) untuk membantu memperkaya perspektif' },
          { key: 'C', text: 'Alat otomatis penyelesai kuis tanpa dipahami konsep dasarnya' },
          { key: 'D', text: 'Sumber data mutlak yang tidak pernah mengalami kesalahan faktual' },
        ],
        explanation: 'AI berfungsi sebagai asisten bernalar yang mendukung proses berpikir kritis siswa, bukan sebagai pembuat karya tulis independen.',
      },
      {
        id: 'q2',
        question: 'Manakah dari tindakan berikut yang melanggar etika penggunaan AI di sekolah?',
        options: [
          { key: 'A', text: 'Menggunakan AI untuk mencari ide topik riset karya ilmiah' },
          { key: 'B', text: 'Meminta AI menjelaskan rumus matematika yang sulit dipahami' },
          { key: 'C', text: 'Mengulangi klaim AI secara mentah-mentah tanpa verifikasi fakta' },
          { key: 'D', text: 'Mencantumkan tanggal akses dan model AI yang digunakan sebagai lampiran' },
        ],
        explanation: 'Mengulangi klaim sintetis tanpa verifikasi independen berisiko menyebarkan misinformasi atau halusinasi AI.',
      },
    ],
  },
  {
    quizKey: 'quiz-beginner-ch-2',
    title: 'Evaluasi Kuis Bab 2: Halusinasi AI & Verifikasi Fakta',
    courseKey: 'course-beginner',
    chapterKey: 'beginner-ch-2',
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        question: 'Istilah "Halusinasi AI" merujuk pada fenomena di mana model AI...',
        options: [
          { key: 'A', text: 'Menghasilkan jawaban faktual salah dengan tingkat keyakinan bahasa yang tinggi' },
          { key: 'B', text: 'Mengalami kegagalan koneksi ke server jaringan lokal' },
          { key: 'C', text: 'Menolak memberikan jawaban karena batasan privasi data' },
          { key: 'D', text: 'Menampilkan animasi grafik secara otomatis pada layar pemutar' },
        ],
        explanation: 'Halusinasi AI terjadi ketika model statistik AI merangkai kalimat salah tetapi terkesan sangat meyakinkan secara tata bahasa.',
      },
      {
        id: 'q2',
        question: 'Langkah pertama yang harus dilakukan siswa ketika mendapatkan kutipan angka riset dari AI adalah...',
        options: [
          { key: 'A', text: 'Langsung menyalin angka tersebut ke lembar jawaban tugas sekolah' },
          { key: 'B', text: 'Menghapus kutipan tersebut tanpa membaca lebih lanjut' },
          { key: 'C', text: 'Melakukan penelusuran silang (cross-check) ke jurnal/sumber resmi' },
          { key: 'D', text: 'Meminta AI membuat kutipan baru yang lebih panjang' },
        ],
        explanation: 'Penelusuran silang ke jurnal atau portal sumber primer wajib dilakukan untuk memastikan kebenaran data faktual.',
      },
    ],
  },
  {
    quizKey: 'quiz-intermediate-ch-1',
    title: 'Evaluasi Kuis Bab 1: Forensik Visual & Deepfake',
    courseKey: 'course-intermediate',
    chapterKey: 'intermediate-ch-1',
    passingScore: 75,
    questions: [
      {
        id: 'q1',
        question: 'Teknologi algoritma utama yang umumnya digunakan untuk memetakan dan menyintesis wajah deepfake adalah...',
        options: [
          { key: 'A', text: 'Decision Tree & Random Forest' },
          { key: 'B', text: 'Generative Adversarial Networks (GANs) & Neural Rendering' },
          { key: 'C', text: 'Linear Regression Analysis' },
          { key: 'D', text: 'Bubble Sort Sorting Algorithm' },
        ],
        explanation: 'GANs menggunakan generator dan diskriminator untuk memetakan landmark wajah dan menyintesis citra palsu secara realistis.',
      },
      {
        id: 'q2',
        question: 'Standar insiatif global untuk merekam asal-usul otentikasi media buatan manusia versus AI adalah...',
        options: [
          { key: 'A', text: 'ISO 9001' },
          { key: 'B', text: 'HTML5 Media Source' },
          { key: 'C', text: 'JPEG Standard v1' },
          { key: 'D', text: 'Standard Manifest C2PA (Coalition for Content Provenance and Authenticity)' },
        ],
        explanation: 'C2PA menyediakan manifest kriptografi untuk melacak jejak pembuatan dan penyuntingan file media.',
      },
    ],
  },
];

export function getQuizByKey(quizKey: string): QuizData | undefined {
  return QUIZZES_DATA.find((q) => q.quizKey === quizKey);
}

export function getQuizAnswerKeys(quizKey: string): Record<string, 'A' | 'B' | 'C' | 'D'> | undefined {
  return QUIZ_ANSWER_KEYS[quizKey];
}

export function calculateQuizScore(
  quizKey: string,
  userAnswers: Record<string, 'A' | 'B' | 'C' | 'D'>
): {
  score: number;
  passed: boolean;
  correctCount: number;
  totalQuestions: number;
} {
  const quiz = getQuizByKey(quizKey);
  const answerKeys = getQuizAnswerKeys(quizKey);

  if (!quiz || !answerKeys) {
    return { score: 0, passed: false, correctCount: 0, totalQuestions: 0 };
  }

  const totalQuestions = quiz.questions.length;
  let correctCount = 0;

  quiz.questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    const correctAnswer = answerKeys[question.id];
    if (userAnswer && userAnswer === correctAnswer) {
      correctCount += 1;
    }
  });

  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = score >= quiz.passingScore;

  return {
    score,
    passed,
    correctCount,
    totalQuestions,
  };
}
