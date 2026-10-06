import { QUIZ_KEYS } from "./curriculum";

export const QUIZZES = {
  [QUIZ_KEYS.QUIZ_BEGINNER_CH1]: {
    questions: [
      {
        id: "q1",
        question: "Apa kepanjangan dari AI?",
        options: ["Artificial Intelligence", "Automatic Internet", "Anonymous Identity", "Application Interface"],
        correctAnswer: "Artificial Intelligence"
      },
      {
        id: "q2",
        question: "Manakah yang merupakan contoh AI dalam kehidupan sehari-hari?",
        options: ["Asisten Virtual", "Mesin Ketik", "Buku Tulis", "Sepeda"],
        correctAnswer: "Asisten Virtual"
      }
    ]
  },
  [QUIZ_KEYS.QUIZ_BEGINNER_CH2]: {
    questions: [
      {
        id: "q1",
        question: "Apakah menggunakan AI untuk mencontek saat ujian diperbolehkan?",
        options: ["Ya", "Tidak", "Boleh saja jika tidak ketahuan", "Tergantung gurunya"],
        correctAnswer: "Tidak"
      }
    ]
  },
  [QUIZ_KEYS.QUIZ_BEGINNER_CH3]: {
    questions: [
      {
        id: "q1",
        question: "Bagaimana AI dapat membantu pekerjaan manusia?",
        options: ["Menggantikan manusia sepenuhnya", "Mengotomatisasi tugas berulang", "Membuat manusia menjadi malas", "Tidak ada manfaatnya"],
        correctAnswer: "Mengotomatisasi tugas berulang"
      }
    ]
  }
};
