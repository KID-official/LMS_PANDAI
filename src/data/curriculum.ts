export interface Chapter {
  key: string;
  chapterNumber: number;
  title: string;
  description: string;
  durationMinutes: number;
  minWatchSeconds: number;
  youtubeUrl: string;
  textContent: string;
  hasQuiz: boolean;
  quizKey?: string;
}

export interface Course {
  key: string;
  title: string;
  tagline: string;
  category: string;
  level: string;
  badge: string;
  thumbnail: string;
  description: string;
  estimatedHours: number;
  instructorName: string;
  instructorRole: string;
  chapters: Chapter[];
}

export const COURSE_KEYS = {
  BEGINNER: 'course-beginner',
  INTERMEDIATE: 'course-intermediate',
} as const;

export const CHAPTER_KEYS = {
  BEGINNER_CH1: 'beginner-ch-1',
  BEGINNER_CH2: 'beginner-ch-2',
  BEGINNER_CH3: 'beginner-ch-3',
  BEGINNER_CH4: 'beginner-ch-4',
  INTERMEDIATE_CH1: 'intermediate-ch-1',
  INTERMEDIATE_CH2: 'intermediate-ch-2',
  INTERMEDIATE_CH3: 'intermediate-ch-3',
} as const;

export const COURSES_DATA: Course[] = [
  {
    key: COURSE_KEYS.BEGINNER,
    title: 'Etika & Keamanan AI Siswa',
    tagline: 'Landasan Fondasional Penggunaan AI Generatif Secara Bijak di Ruang Kelas',
    category: 'Etika Digital & Regulasi',
    level: 'Pemula (SMP/SMA)',
    badge: 'Sertifikasi Resmi SFA 2026',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCPeiptoSn8t2O-_nMKe_zwFs5P812AbI7fF_3HvXBZDGP5_U1Bf2JHbLYIpFdNn3f62gxlUB5w_ELsFptGk1JSwz7SbwpqAh91iooO4JRaA2jAEhazNTXmhl4NXrXbTC-83VzWYHN_OSW38dF1LYXUre1BswWpwWI96i_vA4fd519vGMTCLlWXjgZTMN_YWchhceT0WDV3Q_jshOGxrNHmSw5XHJDjOYKHTInGy9HnEOv_RuJKViXE',
    description:
      'Pelajari prinsip etika sitasi AI, batas kerahasiaan data pribadi sekolah, serta cara menggunakan kecerdasan artifisial sebagai asisten belajar tanpa melanggar integritas akademik.',
    estimatedHours: 2.5,
    instructorName: 'Dr. Alwan Hakim, M.Kom.',
    instructorRole: 'Kepala Laboratorium Forensik Digital UNAIR',
    chapters: [
      {
        key: CHAPTER_KEYS.BEGINNER_CH1,
        chapterNumber: 1,
        title: 'Pengenalan Kecerdasan Artifisial & Etika Digital',
        description: 'Memahami cara kerja dasar AI generatif, model bahasa besar (LLM), dan batasan penggunaannya dalam pembelajaran.',
        durationMinutes: 15,
        minWatchSeconds: 60,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Kecerdasan Artifisial (AI) generatif adalah teknologi komputasi yang mampu menghasilkan teks, gambar, dan suara baru berdasarkan pola data latihan. Dalam ranah pendidikan, AI harus diposisikan sebagai alat bantu bernalar (thinking copilot), bukan sebagai pengganti pemikiran kritis siswa.',
        hasQuiz: true,
        quizKey: 'quiz-beginner-ch-1',
      },
      {
        key: CHAPTER_KEYS.BEGINNER_CH2,
        chapterNumber: 2,
        title: 'Mendeteksi Halusinasi & Misinformasi AI',
        description: 'Teknik mengenali jawaban sintetis yang tampak yakin namun secara faktual salah (hallucination).',
        durationMinutes: 20,
        minWatchSeconds: 120,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Model AI tidak memiliki pemahaman kesadaran nyata. AI memprediksi kata berikutnya berdasarkan statistik frekuensi kemunculan kata. Oleh karena itu, verifikasi fakta independen wajib dilakukan untuk setiap klaim akademis yang dihasilkan AI.',
        hasQuiz: true,
        quizKey: 'quiz-beginner-ch-2',
      },
      {
        key: CHAPTER_KEYS.BEGINNER_CH3,
        chapterNumber: 3,
        title: 'Privasi Data & Pelindungan Identitas Biometrik',
        description: 'Mencegah kebocoran foto wajah, nomor induk siswa, dan data sensitif sekolah ke platform AI publik.',
        durationMinutes: 18,
        minWatchSeconds: 90,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Jangan pernah mengunggah dokumen pribadi (KTP, kartu pelajar, foto wajah jelas) ke generator AI publik tanpa izin enkripsi. Data yang diunggah dapat disimpan secara permanen oleh penyedia platform untuk latihan model generasi berikutnya.',
        hasQuiz: true,
        quizKey: 'quiz-beginner-ch-3',
      },
      {
        key: CHAPTER_KEYS.BEGINNER_CH4,
        chapterNumber: 4,
        title: 'Integritas Akademik & Standar Sitasi Prompt',
        description: 'Pedoman mencantumkan klausa deklarasi penggunaan AI dalam tugas riset dan karya tulis sekolah.',
        durationMinutes: 25,
        minWatchSeconds: 150,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Gunakan format sitasi AI standar (seperti APA 7th Edition) yang mencantumkan nama model, versi, tanggal akses, serta sintaks prompt yang digunakan sebagai lampiran dokumen riset mandiri.',
        hasQuiz: true,
        quizKey: 'quiz-beginner-ch-4',
      },
    ],
  },
  {
    key: COURSE_KEYS.INTERMEDIATE,
    title: 'Forensik Visual & Deteksi Deepfake',
    tagline: 'Panduan Investigasi Citra Sintetis & Metadata Otentikasi C2PA',
    category: 'Forensik Digital & Keamanan',
    level: 'Menengah',
    badge: 'Laboratorium Praktikum SFA',
    thumbnail:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBLnjDd4mHNWqKZZMaa0IOrcrlFdJ7yTdSlqsXpgPuXU_tnVgf2h4C00cheN7nGcZFiAXWEXCPa182g4PmK3fmlgdXnX_GyAp5VlkTabDdAr9lbGyuYFQ2yo-6gP9hLwIE8Y9inNdUrNybrUmird1CCe59Gbnhe3u7l-bcVcbcZ-CKjUkt0pCBjFKKMFirocFnNE_uDlnWBluKrKHQ5fS-8c98AQ7Ty_aTXwW2kHCaI3u0UI6C9XRkG',
    description:
      'Metode praktis menguji keaslian foto dan rekaman video menggunakan analisis bayangan, metadata EXIF, watermark SynthID, serta standar manifest C2PA.',
    estimatedHours: 3.0,
    instructorName: 'Dr. Rizal Pratama, M.T.',
    instructorRole: 'Dosen Komputer Vokasi UNAIR x AmosProduction',
    chapters: [
      {
        key: CHAPTER_KEYS.INTERMEDIATE_CH1,
        chapterNumber: 1,
        title: 'Prinsip Dasar Media Sintetis & Deepfake',
        description: 'Cara kerja model difusi citra dan sintesis suara kloning AI modern.',
        durationMinutes: 20,
        minWatchSeconds: 100,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Deepfake bekerja dengan memetakan atribut fitur wajah (landmarking) atau frekuensi akustik suara asli lalu mentransplantasikannya ke media target menggunakan Generative Adversarial Networks (GANs).',
        hasQuiz: true,
        quizKey: 'quiz-intermediate-ch-1',
      },
      {
        key: CHAPTER_KEYS.INTERMEDIATE_CH2,
        chapterNumber: 2,
        title: 'Analisis Artefak Visual & Metode SIFT',
        description: '4 Langkah verifikasi Stanford Edu: Stop, Investigate source, Find coverage, Trace claims.',
        durationMinutes: 25,
        minWatchSeconds: 120,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Periksa ketidaksesuaian sudut datang cahaya, inkonsistensi tekstur retina mata, serta ketidakseimbangan pencahayaan background versus subjek utama.',
        hasQuiz: true,
        quizKey: 'quiz-intermediate-ch-2',
      },
      {
        key: CHAPTER_KEYS.INTERMEDIATE_CH3,
        chapterNumber: 3,
        title: 'Inspeksi Enkripsi C2PA & Watermark SynthID',
        description: 'Membaca manifest kriptografi otentikasi konten yang tersemat pada file media.',
        durationMinutes: 30,
        minWatchSeconds: 180,
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent:
          'Manifest C2PA mencatat riwayat suntingan dan perangkat pembuatan media sejak pertama kali ditangkap oleh sensor kamera secara kriptografis.',
        hasQuiz: true,
        quizKey: 'quiz-intermediate-ch-3',
      },
    ],
  },
];

export function getAllCourses(): Course[] {
  return COURSES_DATA;
}

export function getCourseByKey(key: string): Course | undefined {
  return COURSES_DATA.find((c) => c.key === key);
}

export function getChapterByKey(courseKey: string, chapterKey: string): Chapter | undefined {
  const course = getCourseByKey(courseKey);
  return course?.chapters.find((ch) => ch.key === chapterKey);
}

export function getTotalChaptersCount(courseKey?: string): number {
  if (courseKey) {
    const course = getCourseByKey(courseKey);
    return course ? course.chapters.length : 0;
  }
  return COURSES_DATA.reduce((acc, curr) => acc + curr.chapters.length, 0);
}
