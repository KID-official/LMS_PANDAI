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
  category?: string;
  imageUrl?: string;
  imageAlt?: string;
  caseBadge?: string;
  caseResolution?: string;
  insightTip?: string;
}

export interface StaticQuiz {
  quizKey: string;
  title: string;
  courseKey: string;
  moduleBadge?: string;
  passingScore: number;
  durationMinutes?: number;
  questions: StaticQuizQuestion[];
}

/**
 * Bank soal kuis statis sesuai kurikulum dan rancangan UI-06 Stitch.
 */
export const STATIC_QUIZZES: Record<string, StaticQuiz> = {
  [QUIZ_KEYS.QUIZ_BEGINNER_CH1]: {
    quizKey: QUIZ_KEYS.QUIZ_BEGINNER_CH1,
    title: "Kuis Evaluasi: Literasi AI Dasar & Etika Digital",
    courseKey: "course-beginner",
    moduleBadge: "Etika & Keamanan AI",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apa yang dimaksud dengan Artificial Intelligence?",
        points: 35,
        category: "Konsep Dasar AI",
        options: [
          { key: "A", text: "Perangkat keras yang diprogram untuk menggantikan seluruh tenaga kerja manusia" },
          { key: "B", text: "Sistem komputer yang mampu meniru kecerdasan manusia (kemampuan belajar, bernalar, & koreksi mandiri)" },
          { key: "C", text: "Mesin pencari internet berbasis database statis" },
          { key: "D", text: "Bahasa pemrograman generasi terbaru untuk robot mekanik" },
        ],
        correctOption: "B",
        explanation: "AI adalah sistem komputasi yang meniru kecerdasan manusia seperti kemampuan belajar, bernalar, dan koreksi mandiri.",
        insightTip: "Petunjuk: Ingat kembali definisi dasar kecerdasan komputasi vs otomatisasi mekanik sederhana.",
      },
      {
        id: "q2",
        questionText: "Manakah contoh pemanfaatan AI yang bertanggung jawab dalam lingkungan pendidikan?",
        points: 35,
        category: "Etika Pembelajaran",
        options: [
          { key: "A", text: "Menggunakan AI sebagai asisten riset dan mencantumkan sumber sitasi dengan transparan" },
          { key: "B", text: "Meminta LLM menghasilkan esai lengkap dan langsung mengumpulkannya atas nama sendiri" },
          { key: "C", text: "Memasukkan seluruh data rekam medis siswa ke prompt publik tanpa izin" },
          { key: "D", text: "Mengabaikan validasi fakta hasil sintesis AI karena dianggap pasti akurat" },
        ],
        correctOption: "A",
        explanation: "Pemanfaatan AI yang beretika mencakup transparansi sumber sitasi tanpa mengambil alih pemikiran orisinal siswa.",
        insightTip: "Petunjuk: Kuncinya adalah kejujuran intelektual dan transparansi sumber bantuan.",
      },
      {
        id: "q3",
        questionText: "Apa dampak negatif jika menggunakan AI untuk membuat tugas tanpa membaca ulang dan verifikasi?",
        points: 30,
        category: "Validasi Fakta & Integritas",
        options: [
          { key: "A", text: "Kecepatan koneksi internet otomatis mengalami degradasi" },
          { key: "B", text: "Lisensi sistem operasi komputer akan langsung dicabut" },
          { key: "C", text: "Potensi plagiasi dan penyebaran informasi yang keliru akibat fenomena halusinasi AI" },
          { key: "D", text: "Komputer menjadi cepat panas dan rusak" },
        ],
        correctOption: "C",
        explanation: "Model AI dapat mengalami halusinasi fakta sehingga verifikasi kritis wajib dilakukan sebelum menyebarkan tulisan.",
        insightTip: "Petunjuk forensik: Teliti potensi halusinasi fakta dan tanggung jawab penyaji informasi.",
      },
    ],
  },

  // UI-06 Stitch Assessment Session (Evaluasi Pemahaman Bab 2)
  [QUIZ_KEYS.QUIZ_BEGINNER_CH2]: {
    quizKey: QUIZ_KEYS.QUIZ_BEGINNER_CH2,
    title: "Evaluasi Pemahaman Bab 2",
    courseKey: "course-beginner",
    moduleBadge: "Etika & Keamanan AI",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apa faktor mendasar yang menyebabkan model Generative AI dapat menghasilkan teks halusinasi yang tampak sangat meyakinkan?",
        points: 20,
        category: "Literasi AI & Bias Algoritma",
        options: [
          { key: "A", text: "Model komputer kehabisan memori server secara tiba-tiba" },
          { key: "B", text: "Model mengutamakan kelancaran statistik probabilitas susunan kata dibandingkan validitas fakta objektif" },
          { key: "C", text: "Pengguna salah mengetik tanda baca pada instruksi prompt" },
          { key: "D", text: "Koneksi internet pengguna mengalami gangguan packet loss" },
        ],
        correctOption: "B",
        explanation: "Large Language Models (LLM) dilatih memprediksi kemungkinan token kata berikutnya berdasarkan pola bahasa, bukan basis pengetahuan faktual yang absolut.",
        insightTip: "Petunjuk: Pahami perbedaan mendasar antara model probabilitas bahasa vs database fakta relasional.",
      },
      {
        id: "q2",
        questionText: "Perhatikan karakteristik gambar profil berikut. Manakah indikator visual paling akurat yang membuktikan bahwa foto tersebut merupakan hasil manipulasi Deepfake AI generative?",
        points: 20,
        category: "Studi Kasus Visual AI & Hoaks",
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqjxuL_nn8DyV64X8r78ePp-6H5VpL-_r1GzTITVOWJO1pOw3tv1fWRB5y88V8p1U3NivnjqHA6h_1v14bmUQngIFaVJDo-T9WSNlP79lpU_AdqTMotFTjGV_YakVDEhcLCSClC57NuholziAOsse8QnAHJOQBzBBGvdZUoEhrpt-I3sJcNr88UZVlq8hAoi00UjqRvnZ1L4ex7U075tSKbr7PZe7oK4tyF4fXWRmnFwQ3qkIMdvMV",
        imageAlt: "High-resolution split inspection view of an AI generated synthetic female human face showcasing digital artifacts, irregular catchlights inside eye pupil, and subtle skin blur distortion on earlobes and hairline under laboratory soft violet forensic lighting tone",
        caseBadge: "Kasus A: Anomali Glare Mata & Tekstur Kulit",
        caseResolution: "1080p",
        insightTip: "Petunjuk forensik: Teliti fokus pantulan cahaya pantul kedua bola mata serta distorsi tepi rambut halus.",
        options: [
          { key: "A", text: "Tekstur pupil iris mata simetris sempurna dan memantulkan dua sumber cahaya alami yang identik" },
          { key: "B", text: "Terdapat inkonsistensi pantulan cahaya (catchlight) pada iris mata serta artefak distorsi halus pada helai rambut dan cuping telinga" },
          { key: "C", text: "Format file gambar disimpan dalam resolusi standar JPEG 1080p tanpa kompresi" },
          { key: "D", text: "Latar belakang foto memiliki efek blur bokeh kamera DSLR standar" },
        ],
        correctOption: "B",
        explanation: "Inkonsistensi titik pantulan cahaya (catchlight) pada pupil kedua mata dan degradasi detail pada tepian anatomi telinga atau helai rambut merupakan artefak khas sintesis model difusi AI.",
      },
      {
        id: "q3",
        questionText: "Dalam kerangka verifikasi Stanford SIFT, apa langkah prioritas pertama yang harus dilakukan siswa ketika menemukan narasi viral mengejutkan?",
        points: 20,
        category: "Metode Verifikasi Digital",
        options: [
          { key: "A", text: "Segera meneruskan pesan ke seluruh grup percakapan agar orang lain waspada" },
          { key: "B", text: "Stop (Berhenti sejenak) untuk mengecek emosi dan tidak langsung menyebarkan informasi sebelum verifikasi sumber" },
          { key: "C", text: "Mengandalkan opini pengguna di kolom komentar media sosial sebagai sumber kebenaran" },
          { key: "D", text: "Menganggap informasi valid jika telah ditonton lebih dari 10.000 kali" },
        ],
        correctOption: "B",
        explanation: "Langkah 'Stop' pada metode SIFT berfungsi mengendalikan respons emosional agar tidak menjadi agen penyebar disinformasi.",
        insightTip: "Petunjuk: Akronim SIFT diawali oleh Stop, kemudian Investigate source, Find coverage, dan Trace claims.",
      },
      {
        id: "q4",
        questionText: "Manakah teknik investigasi awal yang paling efektif untuk memverifikasi keaslian tangkapan layar (screenshot) bukti berita yang mencurigakan?",
        points: 20,
        category: "Forensik Konten & Verifikasi",
        options: [
          { key: "A", text: "Lakukan pencarian gambar terbalik (Reverse Image Search) dan konfirmasi langsung ke situs resmi penerbit berita" },
          { key: "B", text: "Melihat apakah jenis font yang digunakan berukuran proporsional menurut perkiraan mata" },
          { key: "C", text: "Menilai validitas hanya berdasarkan apakah tangkapan layar beresolusi tinggi" },
          { key: "D", text: "Meminta pendapat teman sebangku tanpa memeriksa arsip digital" },
        ],
        correctOption: "A",
        explanation: "Reverse Image Search dan pemeriksaan langsung pada arsip berita media resmi adalah prosedur primer forensik digital.",
        insightTip: "Petunjuk: Selalu telusuri klaim orisinal (Trace claims to original context) melalui mesin pencari terbalik.",
      },
      {
        id: "q5",
        questionText: "Mengapa mencantumkan transparansi penggunaan AI (Prompt Disclosure) menjadi prinsip penting dalam integritas akademik?",
        points: 20,
        category: "Integritas Pembelajaran",
        options: [
          { key: "A", text: "Agar sistem kecerdasan buatan dapat mengenali pemilik hak cipta" },
          { key: "B", text: "Menjaga kejujuran ilmiah dengan memisahkan secara jelas mana analisis orisinal siswa dan saran mesin pembantu" },
          { key: "C", text: "Karena platform AI akan menolak akun siswa yang tidak mempublikasikan prompt" },
          { key: "D", text: "Hanya sebagai formalitas administratif tanpa nilai etis pembelajaran" },
        ],
        correctOption: "B",
        explanation: "Transparansi sitasi AI menjamin penghargaan terhadap proses berpikir mandiri siswa sekaligus menjaga kejujuran akademis.",
        insightTip: "Petunjuk: Integritas didasarkan pada kejujuran pembagian kontribusi antara pemikiran pribadi dan alat bantu.",
      },
    ],
  },

  [QUIZ_KEYS.QUIZ_BEGINNER_CH3]: {
    quizKey: QUIZ_KEYS.QUIZ_BEGINNER_CH3,
    title: "Evaluasi Pemahaman Bab 3: Privasi Data & Identitas Biometrik",
    courseKey: "course-beginner",
    moduleBadge: "Etika & Keamanan AI",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Mengapa siswa dilarang mengunggah foto kartu identitas pelajar atau data biometrik wajah ke platform AI publik?",
        points: 50,
        category: "Perlindungan Data Pribadi",
        options: [
          { key: "A", text: "Server AI otomatis crash jika menerima foto berformat JPG" },
          { key: "B", text: "Data yang diunggah ke server publik berisiko disimpan secara permanen dan disalahgunakan untuk kloning identitas" },
          { key: "C", text: "Model AI hanya menerima teks dan tidak dapat membaca file gambar" },
          { key: "D", text: "Koneksi sekolah akan langsung diblokir oleh provider internet" },
        ],
        correctOption: "B",
        explanation: "Data sensitif yang masuk ke server AI publik dapat digunakan sebagai dataset latihan ulang dan rentan terhadap pelanggaran kerahasiaan identitas.",
        insightTip: "Petunjuk: Ingat prinsip dasar privasi: data yang sudah diunggah ke cloud publik tidak dapat ditarik kembali secara instan.",
      },
      {
        id: "q2",
        questionText: "Apa langkah paling aman sebelum menguji gambar atau dokumen tugas pada tools AI online?",
        points: 50,
        category: "Keamanan Siber Siswa",
        options: [
          { key: "A", text: "Melakukan sensor atau menghapus informasi pengenal pribadi (PII) seperti nama lengkap, NISN, dan alamat" },
          { key: "B", text: "Menggunakan mode penyamaran (incognito) browser saja tanpa sensor data" },
          { key: "C", text: "Mengubah nama file dokumen menjadi huruf acak" },
          { key: "D", text: "Mengunggah dokumen pada malam hari saat server sepi" },
        ],
        correctOption: "A",
        explanation: "Anonimisasi data (redacting Personally Identifiable Information) adalah perlindungan mutlak sebelum data diproses pihak ketiga.",
        insightTip: "Petunjuk: Hapus semua data yang bisa mengidentifikasi individu secara langsung.",
      },
    ],
  },

  [QUIZ_KEYS.QUIZ_BEGINNER_CH4]: {
    quizKey: QUIZ_KEYS.QUIZ_BEGINNER_CH4,
    title: "Evaluasi Pemahaman Bab 4: Integritas Akademik & Standar Sitasi Prompt",
    courseKey: "course-beginner",
    moduleBadge: "Etika & Keamanan AI",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Bagaimana cara melakukan sitasi yang benar ketika menggunakan model AI dalam tugas riset sekolah sesuai standar integritas akademik?",
        points: 50,
        category: "Standar Sitasi AI",
        options: [
          { key: "A", text: "Tidak perlu mencantumkan sitasi karena AI adalah alat komputasi bebas" },
          { key: "B", text: "Mencantumkan nama model, versi rilis, tanggal prompt, serta salinan prompt yang digunakan pada lampiran" },
          { key: "C", text: "Hanya menyebutkan kata 'AI' tanpa detail model atau tanggal akses" },
          { key: "D", text: "Menyalin seluruh jawaban AI dan mengklaimnya sebagai karya tulis orisinal" },
        ],
        correctOption: "B",
        explanation: "Standar sitasi akademik (seperti APA 7th Edition) mewajibkan pencantuman nama model AI, versi, tanggal akses, dan kutipan prompt yang digunakan untuk menjamin kejujuran ilmiah.",
        insightTip: "Petunjuk: Transparansi metodologi adalah fondasi integritas akademik.",
      },
      {
        id: "q2",
        questionText: "Apa peran ideal kecerdasan artifisial (AI) dalam proses belajar siswa di sekolah?",
        points: 50,
        category: "Integritas Akademik",
        options: [
          { key: "A", text: "Sebagai asisten bernalar (thinking copilot) untuk mengeksplorasi ide, bukan pengganti proses berpikir kritis" },
          { key: "B", text: "Sebagai pengganti total peran guru dan siswa dalam menyelesaikan seluruh tugas" },
          { key: "C", text: "Alat untuk menjiplak esai secara otomatis tanpa perlu memahami isinya" },
          { key: "D", text: "Mesin untuk mengerjakan ulangan secara rahasia tanpa ketahuan" },
        ],
        correctOption: "A",
        explanation: "AI harus diposisikan sebagai 'thinking copilot' yang memperkaya proses penalaran mandiri siswa, bukan sebagai alat penjiplakan yang merusak nalar kritis.",
        insightTip: "Petunjuk: Kecerdasan buatan mendukung manusia, bukan meniadakan proses belajar pribadi.",
      },
    ],
  },

  [QUIZ_KEYS.QUIZ_INTERMEDIATE_CH1]: {
    quizKey: QUIZ_KEYS.QUIZ_INTERMEDIATE_CH1,
    title: "Evaluasi Pemahaman Bab 1: Prinsip Dasar Media Sintetis & Deepfake",
    courseKey: "course-intermediate",
    moduleBadge: "Forensik Digital & Keamanan",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Teknologi komputasi apakah yang umum digunakan untuk menghasilkan sintesis wajah dan suara (deepfake) realistis?",
        points: 50,
        category: "Arsitektur Media Sintetis",
        options: [
          { key: "A", text: "Generative Adversarial Networks (GANs) dan Model Difusi" },
          { key: "B", text: "Sistem Manajemen Basis Data Relasional (RDBMS)" },
          { key: "C", text: "Kompresi File ZIP Standar" },
          { key: "D", text: "Protokol HyperText Transfer Protocol (HTTP)" },
        ],
        correctOption: "A",
        explanation: "GANs dan model difusi modern menggunakan jaringan generator dan diskriminator yang saling bersaing untuk menghasilkan citra dan audio sintetis yang sangat mirip aslinya.",
        insightTip: "Petunjuk: Perhatikan model generatif yang belajar dari jutaan dataset wajah manusia.",
      },
      {
        id: "q2",
        questionText: "Apa bahaya utama dari manipulasi kloning suara (voice cloning) berbasis AI pada rekayasa sosial?",
        points: 50,
        category: "Ancaman Rekayasa Sosial",
        options: [
          { key: "A", text: "Meningkatkan ukuran file audio menjadi terlalu besar" },
          { key: "B", text: "Digunakan penipu untuk meniru suara orang tua atau guru dalam skenario penipuan darurat finansial" },
          { key: "C", text: "Menghapus aplikasi pemutar musik di gawai" },
          { key: "D", text: "Mengubah nada dering ponsel secara acak" },
        ],
        correctOption: "B",
        explanation: "Kloning suara sering dimanfaatkan dalam penipuan vishing (voice phishing) karena korban cenderung percaya pada suara anggota keluarga yang dikenal.",
        insightTip: "Petunjuk: Rekayasa sosial menyasar psikologis kepanikan korban.",
      },
    ],
  },

  [QUIZ_KEYS.QUIZ_INTERMEDIATE_CH2]: {
    quizKey: QUIZ_KEYS.QUIZ_INTERMEDIATE_CH2,
    title: "Evaluasi Pemahaman Bab 2: Analisis Artefak Visual & Metode SIFT",
    courseKey: "course-intermediate",
    moduleBadge: "Forensik Digital & Keamanan",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Manakah ciri visual yang sering menjadi indikator kuat bahwa sebuah foto wajah merupakan hasil rekayasa AI (deepfake)?",
        points: 50,
        category: "Analisis Forensik Citra",
        options: [
          { key: "A", text: "Inkonsistensi pantulan cahaya pada kornea mata, tekstur kulit terlalu halus, dan kelainan bentuk daun telinga atau jari" },
          { key: "B", text: "Foto memiliki resolusi gambar yang sangat rendah" },
          { key: "C", text: "Foto berformat file PNG alih-alih JPG" },
          { key: "D", text: "Warna pakaian subjek berwarna merah atau biru tua" },
        ],
        correctOption: "A",
        explanation: "AI generatif sering kesulitan mereplikasi pantulan cahaya spekular yang identik pada kedua iris mata dan geometri mikro yang rumit seperti lipatan telinga dan tekstur pori-pori.",
        insightTip: "Petunjuk: Amati mata dan simetri pencahayaan subjek.",
      },
      {
        id: "q2",
        questionText: "Apa kepanjangan dan prinsip dari metode verifikasi fakta SIFT yang dikembangkan Stanford University?",
        points: 50,
        category: "Metodologi Cek Fakta",
        options: [
          { key: "A", text: "Stop, Investigate the source, Find better coverage, Trace claims to original context" },
          { key: "B", text: "Search, Install, Filter, Terminate" },
          { key: "C", text: "Send, Ignore, Follow, Trust" },
          { key: "D", text: "Save, Inspect, Forward, Tweet" },
        ],
        correctOption: "A",
        explanation: "SIFT (Stop, Investigate source, Find better coverage, Trace original context) adalah 4 gerakan lateral reading efektif untuk menguji keabsahan informasi digital.",
        insightTip: "Petunjuk: Metode SIFT menekankan penelusuran klaim ke sumber primer sebelum membagikan informasi.",
      },
    ],
  },

  [QUIZ_KEYS.QUIZ_INTERMEDIATE_CH3]: {
    quizKey: QUIZ_KEYS.QUIZ_INTERMEDIATE_CH3,
    title: "Evaluasi Pemahaman Bab 3: Inspeksi Enkripsi C2PA & Watermark SynthID",
    courseKey: "course-intermediate",
    moduleBadge: "Forensik Digital & Keamanan",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apa fungsi utama dari standar manifest kriptografi C2PA (Coalition for Content Provenance and Authenticity)?",
        points: 50,
        category: "Standar Metadata Otentikasi",
        options: [
          { key: "A", text: "Menyediakan jejak asal-usul (provenance) digital yang terenkripsi mengenai siapa, alat apa, dan kapan suatu media dibuat atau diedit" },
          { key: "B", text: "Mempercepat proses rendering video pada aplikasi editing" },
          { key: "C", text: "Menghapus metadata file agar ukuran gambar menjadi lebih ringan" },
          { key: "D", text: "Memblokir tangkapan layar (screenshot) pada layar ponsel" },
        ],
        correctOption: "A",
        explanation: "C2PA menyematkan manifest bersertifikat kriptografi pada file media untuk membuktikan apakah suatu konten asli tangkapan kamera atau hasil modifikasi model kecerdasan buatan.",
        insightTip: "Petunjuk: C2PA bertindak seperti 'label nutrisi dan paspor digital' bagi file media.",
      },
      {
        id: "q2",
        questionText: "Bagaimana teknologi watermark digital tak kasat mata seperti Google SynthID bekerja?",
        points: 50,
        category: "Watermark Digital AI",
        options: [
          { key: "A", text: "Menyematkan pola watermark imperseptibel langsung ke dalam piksel atau spektrogram audio tanpa merusak kualitas perseptual manusia" },
          { key: "B", text: "Menambahkan logo teks besar di bagian tengah gambar yang menutupi subjek" },
          { key: "C", text: "Mengubah ekstensi nama file secara otomatis menjadi format .ai" },
          { key: "D", text: "Mengunci file gambar dengan kata sandi khusus" },
        ],
        correctOption: "A",
        explanation: "SynthID menyematkan tanda pengenal digital langsung ke dalam struktur piksel gambar atau frekuensi audio sehingga tetap dapat dideteksi meskipun file dipotong (crop), dikompresi, atau difilter.",
        insightTip: "Petunjuk: Watermark imperseptibel tidak terlihat oleh mata manusia tetapi terdeteksi oleh perangkat lunak detektor.",
      },
    ],
  },

  "quiz-literasi-ai-dasar": {
    quizKey: "quiz-literasi-ai-dasar",
    title: "Kuis Komprehensif: Literasi AI Dasar",
    courseKey: "literasi-ai-dasar",
    moduleBadge: "Literasi Komprehensif",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apa yang dimaksud dengan Artificial Intelligence?",
        points: 40,
        category: "Konsep Dasar AI",
        options: [
          { key: "A", text: "Perangkat keras yang diprogram untuk menggantikan seluruh tenaga kerja manusia" },
          { key: "B", text: "Sistem komputer yang mampu meniru kecerdasan manusia (kemampuan belajar, bernalar, & koreksi mandiri)" },
          { key: "C", text: "Mesin pencari internet berbasis database statis" },
          { key: "D", text: "Bahasa pemrograman generasi terbaru untuk robot mekanik" },
        ],
        correctOption: "B",
        explanation: "AI adalah sistem komputasi yang meniru kecerdasan manusia seperti kemampuan belajar, bernalar, dan koreksi mandiri.",
        insightTip: "Petunjuk: Pahami hakikat kecerdasan komputasi versus kalkulasi statis.",
      },
      {
        id: "q2",
        questionText: "Manakah contoh pemanfaatan AI yang bertanggung jawab dalam lingkungan pendidikan?",
        points: 40,
        category: "Etika Penggunaan AI",
        options: [
          { key: "A", text: "Menggunakan AI sebagai asisten riset dan mencantumkan sumber sitasi dengan transparan" },
          { key: "B", text: "Meminta LLM menghasilkan esai lengkap dan langsung mengumpulkannya atas nama sendiri" },
          { key: "C", text: "Memasukkan seluruh data rekam medis siswa ke prompt publik tanpa izin" },
          { key: "D", text: "Mengabaikan validasi fakta hasil sintesis AI karena dianggap pasti akurat" },
        ],
        correctOption: "A",
        explanation: "Pemanfaatan AI yang beretika mencakup transparansi sumber sitasi tanpa mengambil alih pemikiran orisinal siswa.",
        insightTip: "Petunjuk: Kejujuran akademis adalah integritas mutlak.",
      },
      {
        id: "q3",
        questionText: "Apa dampak negatif jika menggunakan AI untuk membuat tugas tanpa membaca ulang?",
        points: 20,
        category: "Validasi Fakta",
        options: [
          { key: "A", text: "Kecepatan koneksi internet otomatis mengalami degradasi" },
          { key: "B", text: "Lisensi sistem operasi komputer akan langsung dicabut" },
          { key: "C", text: "Potensi plagiasi dan penyebaran informasi yang keliru/halusinasi" },
          { key: "D", text: "Komputer menjadi cepat panas" },
        ],
        correctOption: "C",
        explanation: "Siswa keliru memahami konsep halusinasi AI dengan kendala perangkat keras. Disarankan meninjau ulang Sub-bab 4: 'Etika & Keamanan Generatif AI'.",
        insightTip: "Petunjuk: Verifikasi mandiri melindungi dari kesalahan fatal halusinasi AI.",
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
  if (quizKey) {
    const matched = Object.values(STATIC_QUIZZES).find(
      (q) => q.quizKey === quizKey || quizKey.includes(q.quizKey) || q.quizKey.includes(quizKey)
    );
    if (matched) return matched;
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
    questions: STATIC_QUIZZES[QUIZ_KEYS.QUIZ_BEGINNER_CH2]?.questions.map((q) => ({
      id: q.id,
      question: q.questionText,
      options: q.options.map((opt) => opt.text),
      correctAnswer: q.options.find((opt) => opt.key === q.correctOption)?.text || "",
    })) || [],
  },
  [QUIZ_KEYS.QUIZ_BEGINNER_CH3]: {
    questions: STATIC_QUIZZES[QUIZ_KEYS.QUIZ_BEGINNER_CH3]?.questions.map((q) => ({
      id: q.id,
      question: q.questionText,
      options: q.options.map((opt) => opt.text),
      correctAnswer: q.options.find((opt) => opt.key === q.correctOption)?.text || "",
    })) || [],
  },
  [QUIZ_KEYS.QUIZ_BEGINNER_CH4]: {
    questions: STATIC_QUIZZES[QUIZ_KEYS.QUIZ_BEGINNER_CH4]?.questions.map((q) => ({
      id: q.id,
      question: q.questionText,
      options: q.options.map((opt) => opt.text),
      correctAnswer: q.options.find((opt) => opt.key === q.correctOption)?.text || "",
    })) || [],
  },
};
