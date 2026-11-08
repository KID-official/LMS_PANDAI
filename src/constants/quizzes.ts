export { QUIZ_KEYS } from "./curriculum";

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
 * Bank soal kuis statis kurikulum multi-level (4 Levels) AI & Computational Thinking.
 */
export const STATIC_QUIZZES: Record<string, StaticQuiz> = {
  "quiz-air-ch-1": {
    quizKey: "quiz-air-ch-1",
    title: "Evaluasi Bab 1: Hakikat Kecerdasan Buatan",
    courseKey: "ai-robotika",
    moduleBadge: "Fondasi AI - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Manakah pernyataan yang paling tepat membedakan karakteristik utama antara kecerdasan buatan (AI) dengan program komputer biasa seperti kalkulator[cite: 34]?",
        points: 35,
        category: "Konsep AI vs Program Biasa",
        options: [
          { key: "A", text: "Program biasa hanya mengikuti instruksi tetap, sedangkan AI mampu belajar dari data dan beradaptasi[cite: 34]." },
          { key: "B", text: "Kalkulator dapat memperbaiki rumus perhitungan sendiri jika terjadi galat[cite: 34]." },
          { key: "C", text: "AI hanya dapat beroperasi jika ada pengguna yang mengetikkan perintah kode secara terus-menerus." },
          { key: "D", text: "Program biasa memiliki kemampuan memahami pola kebiasaan manusia[cite: 34]." },
        ],
        correctOption: "A",
        explanation: "Berdasarkan materi buku teks, program biasa bekerja secara kaku berdasarkan instruksi yang telah ditetapkan tanpa kemampuan belajar, sedangkan AI memiliki kemampuan belajar dari data masa lalu dan memperbaiki keputusannya[cite: 34, 36].",
        insightTip: "Fokus pada karakteristik fleksibilitas dan kemampuan belajar dari data yang dimiliki oleh AI[cite: 34].",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta konsep Kecerdasan Buatan berikut. Berdasarkan skema tersebut, elemen apakah yang diadaptasi oleh sistem komputer pada AI sehingga memiliki kemampuan untuk belajar dan memecahkan masalah layaknya manusia[cite: 33]?",
        points: 35,
        category: "Analisis Visual Peta Konsep",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Analisis Peta Konsep AI
        imageUrl: "/images/materi/quiz-level1-ch1-q2.png",
        imageAlt: "Peta konsep yang memperlihatkan hubungan Kecerdasan Buatan dengan Robot, Otak Manusia, dan Komputer dalam aspek Belajar, Memecahkan Masalah, dan Adaptasi",
        caseBadge: "Studi Kasus Visual: Analisis Peta Konsep AI",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Sistem permesinan mobil sport." },
          { key: "B", text: "Cara kerja kognitif otak manusia dalam belajar dan adaptasi[cite: 33]." },
          { key: "C", text: "Struktur kabel fisik pada stop kontak rumah tangga." },
          { key: "D", text: "Rangkaian roda gigi mekanik jam analog[cite: 38]." },
        ],
        correctOption: "B",
        explanation: "Peta konsep secara eksplisit memperlihatkan hubungan analogis antara kecerdasan buatan, sistem komputer, dan cara kerja otak manusia yang memiliki kapasitas untuk belajar, memecahkan masalah, dan beradaptasi[cite: 33].",
        insightTip: "Amati simpul gambar otak manusia dan cabang keterampilan di bagian bawah diagram[cite: 33].",
      },
      {
        id: "q3",
        questionText: "Mengapa aplikasi Google Translate dikategorikan sebagai teknologi AI, sedangkan kalkulator digital dikategorikan sebagai program komputer biasa[cite: 34]?",
        points: 30,
        category: "Komparasi Aplikasi",
        options: [
          { key: "A", text: "Karena kalkulator membutuhkan baterai lebih banyak dibanding aplikasi ponsel." },
          { key: "B", text: "Karena Google Translate dapat belajar dari jutaan data kebahasaan dan terus memperbaiki hasil terjemahannya[cite: 34, 37]." },
          { key: "C", text: "Karena kalkulator tidak bisa digunakan untuk menghitung angka perkalian rumit." },
          { key: "D", text: "Karena Google Translate diciptakan oleh perusahaan otomotif terkemuka." },
        ],
        correctOption: "B",
        explanation: "Google Translate merupakan implementasi AI karena memanfaatkan pembelajaran mesin untuk mengenali pola bahasa dari kumpulan data besar, berbeda dengan kalkulator yang semata mengeksekusi instruksi hitung tetap[cite: 34, 37].",
        insightTip: "Perhatikan bagaimana Google Translate terus menyempurnakan hasil terjemahan dari waktu ke waktu[cite: 34, 37].",
      },
    ],
  },
  "quiz-air-ch-2": {
    quizKey: "quiz-air-ch-2",
    title: "Evaluasi Bab 2: Pemanfaatan AI Lintas Sektor",
    courseKey: "ai-robotika",
    moduleBadge: "Fondasi AI - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Dalam ilustrasi Dito dan robot Ribo, bagaimanakah alur yang dilalui oleh sistem robot setelah Dito mengucapkan perintah 'Ribo, nyalakan lampu!'[cite: 35, 36]?",
        points: 35,
        category: "Alur Pemrosesan Sensorik",
        options: [
          { key: "A", text: "Robot langsung menyalakan lampu tanpa memproses kata-kata yang diucapkan." },
          { key: "B", text: "Mikrofon menangkap suara, diubah ke bentuk digital, dianalisis maksud kata aksinya oleh AI, lalu saklar diaktifkan[cite: 36]." },
          { key: "C", text: "Robot menggerakkan lengan untuk menekan tombol lampu secara acak tanpa sensor[cite: 36]." },
          { key: "D", text: "Sensor panas tubuh robot bereaksi terhadap keberadaan Dito di ruang tamu." },
        ],
        correctOption: "B",
        explanation: "Robot Ribo memanfaatkan mikrofon sebagai sensor pendengar, mengonversi audio ke sinyal digital, mengidentifikasi kata kunci aksi ('nyalakan') dan objek ('lampu') menggunakan AI, lalu mengirim sinyal ke pengontrol saklar[cite: 36].",
        insightTip: "Perhatikan urutan sensor penangkap masukan -> konversi digital -> analisis arti kata -> eksekusi aksi[cite: 36].",
      },
      {
        id: "q2",
        questionText: "Perhatikan gambar infografis 'AI: Bukan Sekadar Teknologi, Tapi Penolong Manusia' berikut. Manakah peran AI yang tepat dalam mendukung keselamatan di sektor transportasi jalan raya[cite: 35]?",
        points: 35,
        category: "Analisis Visual Manfaat AI",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Sektor Utilisasi AI
        imageUrl: "/images/materi/quiz-level1-ch2-q2.png",
        imageAlt: "Infografis ragam peran AI: Belajar dari Data, Membantu Dokter, Mengemudi Otomatis, Membantu Siswa Belajar, dan Mengatur Rumah Pintar",
        caseBadge: "Studi Kasus Visual: Sektor Utilisasi AI",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Menggantikan peran seluruh polisi lalu lintas di setiap perempatan." },
          { key: "B", text: "Menyalakan sirene mobil secara otomatis tanpa kendali pengguna." },
          { key: "C", text: "Mengemudi secara otomatis dengan memindai rute jalan untuk mencegah kecelakaan lalu lintas[cite: 35, 37]." },
          { key: "D", text: "Menentukan warna bodi mobil yang paling diminati pembeli[cite: 43]." },
        ],
        correctOption: "C",
        explanation: "Pada infografis, ikon mobil bertajuk 'Mengemudi Otomatis' merefleksikan peran AI dalam menganalisis kondisi rute dan hambatan jalan raya untuk mencegah terjadinya tabrakan[cite: 35, 37].",
        insightTip: "Amati simbol kendaraan di baris atas infografis dan teks keterangan di bawahnya[cite: 35].",
      },
      {
        id: "q3",
        questionText: "Bagaimanakah teknologi AI membantu tenaga medis profesional dalam menangani pasien di rumah sakit[cite: 35, 37]?",
        points: 30,
        category: "Penerapan Medis",
        options: [
          { key: "A", text: "Mengambil alih seluruh tugas dokter tanpa perlu konsultasi klinis." },
          { key: "B", text: "Menghapus rekam medis pasien agar memori komputer rumah sakit tidak penuh." },
          { key: "C", text: "Menganalisis hasil rontgen dan data klinis untuk mendeteksi penyakit lebih dini dan akurat[cite: 35, 37]." },
          { key: "D", text: "Membuat resep obat herbal secara sembarangan di internet." },
        ],
        correctOption: "C",
        explanation: "Dalam bidang kedokteran, algoritma AI dimanfaatkan sebagai alat bantu untuk memindai citra medis (seperti hasil rontgen) secara presisi guna mempercepat penegakan diagnosis penyakit[cite: 35, 37].",
        insightTip: "Ingat bahwa AI bertindak sebagai asisten pembantu dokter, bukan pengganti mutlak tenaga manusia[cite: 35, 37].",
      },
    ],
  },
  "quiz-air-ch-3": {
    quizKey: "quiz-air-ch-3",
    title: "Evaluasi Bab 3: Sejarah & Detektif AI",
    courseKey: "ai-robotika",
    moduleBadge: "Fondasi AI - Bab 3",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Siapakah ilmuwan pionir yang pada tahun 1950-an merumuskan pertanyaan mendasar 'Bisakah mesin berpikir?' yang menjadi tonggak kelahiran AI modern[cite: 39, 43]?",
        points: 35,
        category: "Sejarah Tokoh Komputer",
        options: [
          { key: "A", text: "Albert Einstein" },
          { key: "B", text: "Alan Turing[cite: 39, 43]" },
          { key: "C", text: "Leonardo da Vinci[cite: 39]" },
          { key: "D", text: "Thomas Alva Edison[cite: 43]" },
        ],
        correctOption: "B",
        explanation: "Alan Turing adalah tokoh sains komputer asal Inggris yang mengajukan gagasan awal mengenai kecerdasan mesin pada dekade 1950-an melalui konsep yang kini dikenal sebagai Turing Test[cite: 39, 43].",
        insightTip: "Ingat nama ilmuwan pemecah kode sandi yang meletakkan dasar teori kecerdasan buatan modern[cite: 39, 43].",
      },
      {
        id: "q2",
        questionText: "Perhatikan gambar robot pintar yang menyapa Roni berikut. Manakah kapabilitas kecerdasan buatan yang sedang dioperasikan oleh robot tersebut untuk mengenali temannya[cite: 34]?",
        points: 35,
        category: "Analisis Visual Deteksi Wajah",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Computer Vision & Sapaan Otomatis
        imageUrl: "/images/materi/quiz-level1-ch3-q2.png",
        imageAlt: "Ilustrasi robot pintar menyapa 'Hello, Roni!' dengan sensor kamera mendeteksi kotak kontur wajah Roni",
        caseBadge: "Studi Kasus Visual: Computer Vision & Sapaan Otomatis",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Sensor pengukur suhu udara ruangan." },
          { key: "B", text: "Pengenalan visual fitur wajah (face recognition) dan sintesis suara[cite: 34]." },
          { key: "C", text: "Penimbangan berat badan Roni secara otomatis." },
          { key: "D", text: "Pengukuran tinggi badan menggunakan sensor inframerah dinding." },
        ],
        correctOption: "B",
        explanation: "Gambar mengilustrasikan fungsi computer vision di mana kamera robot memindai kontur wajah seseorang, mencocokkannya dengan database nama 'Roni', lalu menyapanya melalui pengeras suara[cite: 34].",
        insightTip: "Perhatikan kotak garis putus-putus pembingkai wajah Roni pada gambar[cite: 34].",
      },
      {
        id: "q3",
        questionText: "Dalam kegiatan 'Tantangan AI Scavenger Hunt' di sekolah, manakah dari perangkat berikut yang BUKAN merupakan contoh penerapan AI[cite: 38, 40]?",
        points: 30,
        category: "Identifikasi Perangkat",
        options: [
          { key: "A", text: "Kamera smartphone yang otomatis mendeteksi senyuman dan fokus wajah[cite: 38]." },
          { key: "B", text: "Jam tangan analog berjarum mekanik yang digerakkan baterai pegas[cite: 38]." },
          { key: "C", text: "Google Maps yang menyarankan jalan alternatif saat terjadi kemacetan[cite: 41]." },
          { key: "D", text: "Aplikasi penerjemah percakapan suara secara langsung[cite: 34, 37]." },
        ],
        correctOption: "B",
        explanation: "Jam tangan analog adalah instrumen mekanis murni yang bergerak mengikuti gerak roda gigi dan tidak memiliki komponen komputasi atau kemampuan belajar dari data[cite: 38].",
        insightTip: "Cari benda yang tidak memproses data atau tidak memiliki kemampuan adaptasi[cite: 34, 38].",
      },
    ],
  },
  "quiz-dek-ch-1": {
    quizKey: "quiz-dek-ch-1",
    title: "Evaluasi Bab 1: Konsep Dasar Dekomposisi",
    courseKey: "dekomposisi-pola",
    moduleBadge: "Pemecahan Masalah - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apakah yang dimaksud dengan teknik Dekomposisi (Decomposition) dalam kerangka berpikir komputasional[cite: 47, 48, 56]?",
        points: 35,
        category: "Definisi Dekomposisi",
        options: [
          { key: "A", text: "Menggabungkan semua persoalan kecil menjadi satu masalah rumit[cite: 56]." },
          { key: "B", text: "Menghafalkan semua langkah penyelesaian tanpa menuliskannya di buku catatan[cite: 56]." },
          { key: "C", text: "Memecah suatu masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan[cite: 48, 56]." },
          { key: "D", text: "Menghapus masalah yang sulit dan hanya mengerjakan tugas yang mudah[cite: 48]." },
        ],
        correctOption: "C",
        explanation: "Dekomposisi adalah proses analitis membagi permasalahan yang kompleks menjadi sub-komponen terukur agar dapat dituntaskan langkah demi langkah secara sistematis[cite: 48, 56].",
        insightTip: "Ingat prinsip menyederhanakan masalah besar menjadi potongan-potongan kecil[cite: 48, 53].",
      },
      {
        id: "q2",
        questionText: "Perhatikan infografis 'Mengapa Decomposition Itu Penting?' berikut. Manakah manfaat dekomposisi yang berkaitan langsung dengan kerja kolaborasi dalam kelompok[cite: 48]?",
        points: 35,
        category: "Analisis Visual Manfaat Dekomposisi",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Manfaat Kolaboratif Dekomposisi
        imageUrl: "/images/materi/quiz-level2-ch1-q2.png",
        imageAlt: "Infografis 4 manfaat dekomposisi: Menyederhanakan masalah, Fokus menyelesaikan bagian demi bagian, Melihat hubungan antar bagian, dan Bekerja sama dalam tim",
        caseBadge: "Studi Kasus Visual: Manfaat Kolaboratif Dekomposisi",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Memungkinkan setiap anggota tim mengerjakan satu bagian sub-tugas yang terpisah secara paralel[cite: 48]." },
          { key: "B", text: "Menyerahkan seluruh beban pekerjaan kepada ketua kelompok[cite: 48]." },
          { key: "C", text: "Menghilangkan kebutuhan berkomunikasi antar-anggota kelompok[cite: 48]." },
          { key: "D", text: "Membuat tugas terasa lebih membingungkan dan menakutkan[cite: 48]." },
        ],
        correctOption: "A",
        explanation: "Pada bagian pojok kanan bawah infografis, manfaat 'Bekerja sama dalam tim' menjelaskan bahwa dekomposisi mempermudah pembagian tugas sehingga anggota kelompok dapat menuntaskan modulnya masing-masing[cite: 48].",
        insightTip: "Perhatikan ilustrasi orang bersalaman di bagian kanan bawah infografis[cite: 48].",
      },
      {
        id: "q3",
        questionText: "Seorang siswa ingin membuat aplikasi gim sederhana. Manakah uraian sub-tugas dekomposisi yang paling tepat dan terstruktur[cite: 48]?",
        points: 30,
        category: "Aplikasi Dekomposisi Proyek",
        options: [
          { key: "A", text: "Langsung mengunggah file ke Google Play Store tanpa merancang aturan gim." },
          { key: "B", text: "Mendesain tampilan, membuat aturan permainan, menyusun sistem skor, menambah audio, dan menguji kerja gim[cite: 48]." },
          { key: "C", text: "Menonton video gim orang lain selama seharian penuh." },
          { key: "D", text: "Membeli perangkat komputer tercanggih tanpa memikirkan isi gim yang akan dibuat." },
        ],
        correctOption: "B",
        explanation: "Buku materi menjelaskan bahwa pembuatan gim diurai menjadi: (1) mendesain tampilan awal, (2) membuat aturan, (3) menyusun skor/level, (4) menambahkan suara, dan (5) menguji hasilnya[cite: 48].",
        insightTip: "Pilih jawaban yang memecah proyek secara komprehensif dari perancangan hingga pengujian[cite: 48].",
      },
    ],
  },
  "quiz-dek-ch-2": {
    quizKey: "quiz-dek-ch-2",
    title: "Evaluasi Bab 2: Visualisasi Masalah & Mind Mapping",
    courseKey: "dekomposisi-pola",
    moduleBadge: "Pemecahan Masalah - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Mengapa penggunaan diagram peta pikiran (mind map) sangat dianjurkan dalam menguraikan masalah yang rumit[cite: 52]?",
        points: 35,
        category: "Fungsi Mind Mapping",
        options: [
          { key: "A", text: "Karena mind map menghabiskan banyak warna spidol di kelas." },
          { key: "B", text: "Karena struktur visual cabang mempermudah otak melihat hubungan antara topik utama dengan sub-tugas kecil[cite: 48, 52]." },
          { key: "C", text: "Agar kita tidak perlu menyelesaikan tugas sekolah sama sekali." },
          { key: "D", text: "Karena mind map hanya boleh digambar oleh guru seni rupa." },
        ],
        correctOption: "B",
        explanation: "Mind mapping memvisualisasikan cara kerja otak dengan mengaitkan satu gagasan pusat ke cabang-cabang sub-tugas, sehingga struktur masalah terlihat lebih runtut dan jelas[cite: 52].",
        insightTip: "Bayangkan cabang pohon yang menghubungkan batang inti dengan ranting-ranting kecil[cite: 52].",
      },
      {
        id: "q2",
        questionText: "Perhatikan mind map penguraian langkah 'Membuat Mi Instan' berikut. Langkah manakah yang secara logis harus dilakukan tepat sebelum menyiramkan bumbu pada mi goreng[cite: 53]?",
        points: 35,
        category: "Analisis Visual Mind Map",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Alur Mind Mapping
        imageUrl: "/images/materi/quiz-level2-ch2-q2.png",
        imageAlt: "Peta pikiran membuat mi instan dengan cabang: Ambil mi & bumbu, Rebus air, Masukkan mi ke air, Tiriskan mi, dan Campur bumbu",
        caseBadge: "Studi Kasus Visual: Alur Mind Mapping",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Mengambil mi dari lemari makanan[cite: 53]." },
          { key: "B", text: "Meniriskan mi dari air rebusan panas[cite: 53]." },
          { key: "C", text: "Merebus air di dalam panci hingga mendidih[cite: 53]." },
          { key: "D", text: "Membeli piring dan sendok baru ke supermarket." },
        ],
        correctOption: "B",
        explanation: "Sesuai urutan cabang mind map di buku, untuk mi goreng, langkah 'Tiriskan mi' dilakukan tepat sebelum langkah akhir 'Campur bumbu' dilaksanakan[cite: 53].",
        insightTip: "Telusuri urutan cabang mind map searah jarum jam dari simpul rebus air[cite: 53].",
      },
      {
        id: "q3",
        questionText: "Dalam latihan aktivitas 'Puzzle Terbalik', keterampilan berpikir apakah yang sedang dilatih saat siswa diminta menjelaskan cara memecah gambar utuh menjadi kepingan teracak[cite: 54]?",
        points: 30,
        category: "Logika Komputasional",
        options: [
          { key: "A", text: "Menghafal nama pelukis gambar tersebut." },
          { key: "B", text: "Melupakan bentuk asli dari gambar awal[cite: 58]." },
          { key: "C", text: "Memahami proses sebab-akibat dengan menelusuri mundur komponen pembentuk sistem[cite: 54, 57]." },
          { key: "D", text: "Menggambar pemandangan alam bebas tanpa batas." },
        ],
        correctOption: "C",
        explanation: "Aktivitas puzzle terbalik melatih cara berpikir dekomposisi dua arah: bagaimana merakit potongan menjadi utuh dan bagaimana membedah kesatuan sistem menjadi unit-unit pembentuknya[cite: 54, 57].",
        insightTip: "Membalik proses membantu kita memahami bagaimana suatu sistem dirancang dari awal[cite: 54].",
      },
    ],
  },
  "quiz-dek-ch-3": {
    quizKey: "quiz-dek-ch-3",
    title: "Evaluasi Bab 3: Pengenalan Pola & AI",
    courseKey: "dekomposisi-pola",
    moduleBadge: "Pemecahan Masalah - Bab 3",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Perhatikan barisan urutan data cuaca selama 6 hari berikut: Hujan, Cerah, Mendung, Hujan, Cerah, Mendung. Berdasarkan analisis keteraturan pola, cuaca apakah yang kemungkinan besar akan terjadi pada hari ke-7 dan hari ke-8[cite: 63, 64]?",
        points: 35,
        category: "Penalaran Pola Berulang",
        options: [
          { key: "A", text: "Mendung, lalu Cerah." },
          { key: "B", text: "Hujan, lalu Cerah[cite: 64]." },
          { key: "C", text: "Cerah, lalu Hujan." },
          { key: "D", text: "Mendung, lalu Hujan." },
        ],
        correctOption: "B",
        explanation: "Pola tersebut berulang setiap 3 hari: (1) Hujan, (2) Cerah, (3) Mendung. Karena hari ke-6 adalah Mendung, maka siklus berulang kembali ke awal: hari ke-7 adalah Hujan dan hari ke-8 adalah Cerah[cite: 64].",
        insightTip: "Tentukan panjang kelompok pola perulangan sebelum menebak urutan lanjutan[cite: 64].",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta pikiran 'Pattern Recognition' berikut. Manakah contoh penerapan pengenalan pola yang dikategorikan ke dalam cabang 'Alam & Kehidupan'[cite: 66]?",
        points: 35,
        category: "Analisis Visual Taksonomi Pola",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Klasifikasi Pola
        imageUrl: "/images/materi/quiz-level2-ch3-q2.png",
        imageAlt: "Bagan mind mapping Pattern Recognition yang terbagi atas tiga cabang: Angka, Gambar, serta Alam & Kehidupan",
        caseBadge: "Studi Kasus Visual: Klasifikasi Pola",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Barisan deret angka ganjil dan bilangan kelipatan dua[cite: 66]." },
          { key: "B", text: "Keteraturan siklus cuaca, pergantian musim, dan waktu harian[cite: 66]." },
          { key: "C", text: "Urutan bentuk segitiga dan belah ketupat berwarna[cite: 64, 66]." },
          { key: "D", text: "Kumpulan kode baris bahasa pemrograman komputer[cite: 90]." },
        ],
        correctOption: "B",
        explanation: "Pada bagan mind map, cabang 'Alam & Kehidupan' membawahi contoh pola alamiah seperti perubahan cuaca, musim, dan rotasi waktu[cite: 66].",
        insightTip: "Perhatikan kotak teks yang menggantung pada cabang paling kanan di diagram[cite: 66].",
      },
      {
        id: "q3",
        questionText: "Bagaimanakah teknologi AI pada fitur pembuka kunci wajah (Face Recognition) memanfaatkan prinsip pengenalan pola[cite: 61, 62]?",
        points: 30,
        category: "Penerapan Pola pada AI",
        options: [
          { key: "A", text: "Dengan mencatat berat badan pengguna ponsel secara berkala." },
          { key: "B", text: "Dengan memindai dan mencocokkan matriks pola geometris fitur wajah (mata, hidung, bibir) terhadap data pemilik[cite: 61, 62]." },
          { key: "C", text: "Dengan mendengarkan detak jantung pengguna melalui mikrofon." },
          { key: "D", text: "Dengan menebak nama pengguna secara acak." },
        ],
        correctOption: "B",
        explanation: "AI pengenal wajah mengekstraksi jarak dan bentuk fitur wajah sebagai pola matematis yang kemudian diverifikasi terhadap data pemilik perangkat[cite: 61, 62].",
        insightTip: "Ingat bahwa AI mengonversi gambar visual wajah menjadi pola angka untuk dicocokkan[cite: 61, 62].",
      },
    ],
  },
  "quiz-alg-ch-1": {
    quizKey: "quiz-alg-ch-1",
    title: "Evaluasi Bab 1: Konsep Abstraksi Komputasional",
    courseKey: "abstraksi-algoritma",
    moduleBadge: "Desain Solusi - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apakah inti utama dari teknik Abstraksi (Abstraction) saat menyelesaikan sebuah permasalahan[cite: 74, 75, 83]?",
        points: 35,
        category: "Definisi Abstraksi",
        options: [
          { key: "A", text: "Menggambar seluruh detail objek tanpa ada bagian yang terlewat[cite: 82]." },
          { key: "B", text: "Fokus pada informasi yang paling penting dan mengabaikan detail yang tidak relevan[cite: 74, 75, 83]." },
          { key: "C", text: "Menyembunyikan informasi penting agar tidak diketahui orang lain[cite: 83]." },
          { key: "D", text: "Menghafal seluruh baris kode komputer tanpa memahami tujuannya." },
        ],
        correctOption: "B",
        explanation: "Abstraksi adalah proses penyaringan cerdas untuk mengambil fakta-fakta esensial yang diperlukan dalam mencapai solusi dan membuang rincian yang tidak berdampak langsung[cite: 74, 75, 83].",
        insightTip: "Ingat analogi mengupas apel: buang kulitnya, ambil daging buahnya[cite: 79, 80].",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta konsep Abstraksi berikut. Berdasarkan bagan tersebut, apakah hasil yang diperoleh saat kita berhasil fokus pada inti masalah dan mengabaikan detail yang tidak perlu[cite: 74]?",
        points: 35,
        category: "Analisis Visual Peta Konsep Abstraksi",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Alur Efisiensi Abstraksi
        imageUrl: "/images/materi/quiz-level3-ch1-q2.png",
        imageAlt: "Peta konsep yang menghubungkan Menyederhanakan Masalah, Fokus pada Inti, Abaikan Detail Tak Perlu, menuju Solusi Lebih Efisien",
        caseBadge: "Studi Kasus Visual: Alur Efisiensi Abstraksi",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Masalah menjadi jauh lebih rumit dan membingungkan[cite: 75]." },
          { key: "B", text: "Terciptanya solusi yang lebih efisien dan mempermudah pemahaman masalah[cite: 74]." },
          { key: "C", text: "Hilangnya data utama yang diperlukan dalam perhitungan[cite: 83]." },
          { key: "D", text: "Penambahan waktu kerja hingga berhari-hari lamanya." },
        ],
        correctOption: "B",
        explanation: "Peta konsep menunjukkan bahwa penyaringan informasi esensial bermuara pada 'Solusi Lebih Efisien' yang membantu kita memahami masalah lebih cepat dan menghasilkan solusi yang dapat diterapkan pada kasus lain[cite: 74].",
        insightTip: "Perhatikan kotak hasil yang ditunjuk oleh panah di bagian tengah diagram[cite: 74].",
      },
      {
        id: "q3",
        questionText: "Saat seorang siswa diminta menggambar denah darurat ruang kelas, tindakan manakah yang paling mencerminkan penerapan abstraksi[cite: 78, 81]?",
        points: 30,
        category: "Penerapan Abstraksi",
        options: [
          { key: "A", text: "Menggambar detail motif taplak meja dan merek stop kontak listrik[cite: 78]." },
          { key: "B", text: "Menggambar posisi pintu keluar, lorong bangku, dan arah evakuasi secara jelas[cite: 78, 81]." },
          { key: "C", text: "Mewarnai seluruh lantai dengan gradasi warna cat minyak yang tebal." },
          { key: "D", text: "Menghitung jumlah baut yang menempel pada setiap kursi kelas." },
        ],
        correctOption: "B",
        explanation: "Denah ruang darurat menitikberatkan pada fungsi evakuasi (letak pintu, jalur evakuasi), sehingga ornamen dekoratif seperti motif taplak meja harus diabstraksikan keluar[cite: 78, 81].",
        insightTip: "Utamakan fungsi utama denah: membantu orang menemukan jalan keluar dengan cepat[cite: 78, 81].",
      },
    ],
  },
  "quiz-alg-ch-2": {
    quizKey: "quiz-alg-ch-2",
    title: "Evaluasi Bab 2: Ciri & Karakteristik Algoritma",
    courseKey: "abstraksi-algoritma",
    moduleBadge: "Desain Solusi - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Tiga karakteristik fundamental yang wajib dipenuhi oleh sebuah algoritma yang baik adalah[cite: 89, 90, 99]...",
        points: 35,
        category: "Karakteristik Algoritma",
        options: [
          { key: "A", text: "Rumit, tanpa batas langkah, dan sulit dibaca[cite: 99]." },
          { key: "B", text: "Jelas (tidak ambigu), terbatas (memiliki akhir), dan efektif (menghasilkan solusi tepat)[cite: 89, 90, 99]." },
          { key: "C", text: "Ditulis dalam bahasa Inggris kuno dan harus sangat panjang[cite: 99]." },
          { key: "D", text: "Hanya boleh dijalankan pada komputer buatan pabrik tertentu." },
        ],
        correctOption: "B",
        explanation: "Buku materi mendefinisikan tiga syarat utama algoritma: Jelas (instruksi mudah dipahami), Terbatas (harus memiliki titik akhir penyelesaian), dan Efektif (memberikan hasil yang benar)[cite: 89, 90, 99].",
        insightTip: "Algoritma tidak boleh berjalan selamanya tanpa akhir dan maknanya harus tunggal[cite: 89, 90].",
      },
      {
        id: "q2",
        questionText: "Perhatikan infografis 'Urutan adalah Segalanya' berikut. Apakah akibat yang dapat ditimbulkan jika langkah-langkah dalam suatu algoritma disusun secara tidak berurutan[cite: 89]?",
        points: 35,
        category: "Analisis Visual Urutan Algoritma",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Risiko Urutan Algoritma
        imageUrl: "/images/materi/quiz-level3-ch2-q2.png",
        imageAlt: "Infografis peringatan bahwa urutan salah dapat menyebabkan hasil akhir salah, masalah tidak terselesaikan, atau menimbulkan masalah baru",
        caseBadge: "Studi Kasus Visual: Risiko Urutan Algoritma",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Hasil akhirnya bisa salah, masalah tidak selesai, atau timbul masalah baru[cite: 89]." },
          { key: "B", text: "Komputer otomatis menyelesaikan masalah tanpa kendala[cite: 99]." },
          { key: "C", text: "Hasil akhir selalu benar meskipun langkah diacak bebas[cite: 98, 99]." },
          { key: "D", text: "Kecepatan pemrosesan komputer bertambah sepuluh kali lipat." },
        ],
        correctOption: "A",
        explanation: "Infografis menegaskan bahwa kesalahan urutan dapat merusak hasil akhir, membuat masalah gagal terselesaikan, bahkan memicu masalah baru (seperti nasi goreng yang tidak matang karena api belum dinyalakan)[cite: 89].",
        insightTip: "Perhatikan tanda seru bahaya dan tiga poin dampak pada gambar infografis[cite: 89].",
      },
      {
        id: "q3",
        questionText: "Istilah kata 'algoritma' secara historis diadaptasi dari nama seorang matematikawan Muslim terkemuka, yaitu[cite: 95]...",
        points: 30,
        category: "Sejarah Algoritma",
        options: [
          { key: "A", text: "Ibnu Sina" },
          { key: "B", text: "Al-Khawarizmi[cite: 95]" },
          { key: "C", text: "Al-Farabi" },
          { key: "D", text: "Ibnu Khaldun" },
        ],
        correctOption: "B",
        explanation: "Kata 'algoritma' berasal dari nama Al-Khawarizmi, ilmuwan Persia abad ke-9 yang menulis risalah sistematis mengenai aljabar dan tata cara hitung langkah demi langkah[cite: 95].",
        insightTip: "Cari nama matematikawan yang dikenal sebagai bapak aljabar[cite: 95].",
      },
    ],
  },
  "quiz-alg-ch-3": {
    quizKey: "quiz-alg-ch-3",
    title: "Evaluasi Bab 3: Flowchart & Pseudocode",
    courseKey: "abstraksi-algoritma",
    moduleBadge: "Desain Solusi - Bab 3",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Dalam standar bagan alir (flowchart), simbol apakah yang digunakan untuk menunjukkan pengambilan keputusan atau evaluasi kondisi bersyarat[cite: 96, 98]?",
        points: 35,
        category: "Simbol Notasi Flowchart",
        options: [
          { key: "A", text: "Simbol oval (terminator)[cite: 96]." },
          { key: "B", text: "Simbol persegi panjang (proses)[cite: 96]." },
          { key: "C", text: "Simbol belah ketupat (decision)[cite: 94, 96]." },
          { key: "D", text: "Simbol lingkaran kecil (konektor)." },
        ],
        correctOption: "C",
        explanation: "Simbol belah ketupat melambangkan titik keputusan bersyarat yang mengevaluasi pertanyaan logika untuk menentukan arah alur selanjutnya (Ya atau Tidak)[cite: 94, 96].",
        insightTip: "Bentuk belah ketupat selalu memiliki dua atau lebih garis panah jalur keluar[cite: 94, 97].",
      },
      {
        id: "q2",
        questionText: "Perhatikan bagan alur flowchart pembuatan mi instan berikut. Apa yang terjadi pada alur proses jika kondisi 'Air mendidih?' bernilai 'Tidak'[cite: 94]?",
        points: 35,
        category: "Analisis Visual Logika Flowchart",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Evaluasi Percabangan Flowchart
        imageUrl: "/images/materi/quiz-level3-ch3-q2.png",
        imageAlt: "Flowchart prosedur merebus mi instan dengan terminator Mulai/Selesai, proses Rebus air, belah ketupat Air mendidih?, Masukkan mie, dan Tunggu 3 menit",
        caseBadge: "Studi Kasus Visual: Evaluasi Percabangan Flowchart",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Sistem langsung menuju ke simbol 'Selesai' dan mi disajikan[cite: 94]." },
          { key: "B", text: "Alur berputar kembali menunggu proses 'Rebus air' hingga mendidih (looping)[cite: 94]." },
          { key: "C", text: "Mi dimasukkan seketika ke dalam panci yang masih dingin[cite: 94]." },
          { key: "D", text: "Kompor gas dimatikan secara mendadak." },
        ],
        correctOption: "B",
        explanation: "Cabang garis 'Tidak' pada simbol belah ketupat mengarahkan kembali panah ke tahapan proses merebus air, menciptakan siklus perulangan hingga air benar-benar mendidih ('Ya')[cite: 94].",
        insightTip: "Ikuti arah panah yang keluar dari label keputusan 'Tidak'[cite: 94].",
      },
      {
        id: "q3",
        questionText: "Manakah susunan pseudocode yang paling tepat dan logis untuk kegiatan mencuci tangan[cite: 93, 94]?",
        points: 30,
        category: "Penyusunan Pseudocode",
        options: [
          { key: "A", text: "Mulai -> Keringkan tangan -> Bilas air -> Gosok sabun -> Selesai[cite: 93]." },
          { key: "B", text: "Mulai -> Basahi tangan -> Gosok sabun -> Bilas air bersih -> Keringkan tangan -> Selesai[cite: 93, 94]." },
          { key: "C", text: "Mulai -> Gosok sabun -> Keringkan tangan -> Basahi tangan -> Selesai[cite: 93]." },
          { key: "D", text: "Mulai -> Bilas air -> Keringkan tangan -> Beri sabun -> Selesai[cite: 93]." },
        ],
        correctOption: "B",
        explanation: "Urutan higienis yang logis adalah membasahi tangan dengan air, menggosoknya dengan sabun, membilasnya dengan air mengalir, lalu mengeringkannya hingga tuntas[cite: 93, 94].",
        insightTip: "Perhatikan syarat fungsional: sabun membutuhkan air untuk berbusa sebelum dibilas[cite: 93, 94].",
      },
    ],
  },
  "quiz-etika-ch-1": {
    quizKey: "quiz-etika-ch-1",
    title: "Evaluasi Bab 1: Lima Pilar Etika AI",
    courseKey: "etika-digital",
    moduleBadge: "Etika & Tata Kelola - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Jika sebuah mobil otonom berteknologi AI menabrak pejalan kaki akibat salah mendeteksi marka jalan, siapakah yang harus bertanggung jawab secara etika dan hukum[cite: 105, 113]?",
        points: 35,
        category: "Akuntabilitas Hukum & Etika",
        options: [
          { key: "A", text: "Mesin mobil dan algoritma komputer itu sendiri[cite: 113]." },
          { key: "B", text: "Manusia yang terlibat, meliputi pengembang sistem dan penggunanya[cite: 105, 113]." },
          { key: "C", text: "Koneksi jaringan satelit internet yang melintas di udara." },
          { key: "D", text: "Tidak ada yang bertanggung jawab karena terjadi secara otomatis[cite: 112, 113]." },
        ],
        correctOption: "B",
        explanation: "Prinsip etika AI menegaskan bahwa kecerdasan buatan hanyalah instrumen alat; tanggung jawab moral dan hukum mutlak melekat pada pihak manusia (pengembang kode maupun pengguna)[cite: 105, 113].",
        insightTip: "Komputer tidak memiliki status hukum atau kesadaran moral; manusialah pengambil keputusan[cite: 105, 112].",
      },
      {
        id: "q2",
        questionText: "Perhatikan diagram infografis 5 Pilar Etika AI berikut. Pilar manakah yang menuntut bahwa sistem AI tidak boleh membeda-bedakan atau merugikan suatu kelompok masyarakat akibat dataset latih yang timpang[cite: 104, 105, 109]?",
        points: 35,
        category: "Analisis Visual Pilar Etika AI",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Pilar Keadilan Algoritma
        imageUrl: "/images/materi/quiz-level4-ch1-q2.png",
        imageAlt: "Bagan Etika AI yang memperlihatkan 5 pilar: Tanggung Jawab, Privasi, Bebas dari Bias, Transparansi, dan Keamanan",
        caseBadge: "Studi Kasus Visual: Pilar Keadilan Algoritma",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Pilar Kecepatan Komputasi." },
          { key: "B", text: "Pilar Bebas dari Bias (Fairness)[cite: 105, 109]." },
          { key: "C", text: "Pilar Transparansi[cite: 105, 109]." },
          { key: "D", text: "Pilar Penyimpanan Data." },
        ],
        correctOption: "B",
        explanation: "Pilar 'Bebas dari Bias' yang dilambangkan dengan timbangan seimbang memastikan bahwa sistem AI adil dan tidak memihak, sehingga tidak merugikan kelompok minoritas atau kelompok tertentu[cite: 105, 109].",
        insightTip: "Perhatikan lambang neraca timbangan keadilan pada diagram infografis[cite: 109].",
      },
      {
        id: "q3",
        questionText: "Mengapa sebuah aplikasi filter foto wajah yang meminta izin akses ke seluruh kontak dan galeri pribadi ponsel dapat berpotensi melanggar privasi pengguna[cite: 105, 106, 113]?",
        points: 30,
        category: "Privasi Data Digital",
        options: [
          { key: "A", text: "Karena aplikasi tersebut akan membuat memori baterai ponsel cepat habis." },
          { key: "B", text: "Karena foto dan data kontak dapat disalahgunakan atau dijual ke pihak ketiga tanpa persetujuan[cite: 105, 106]." },
          { key: "C", text: "Karena filter wajah tidak dapat berfungsi di luar ruangan ber-AC." },
          { key: "D", text: "Karena foto pengguna otomatis terhapus dari ponsel seketika." },
        ],
        correctOption: "B",
        explanation: "Akses galeri dan kontak yang tidak relevan dengan fungsi inti aplikasi membuka celah pengumpulan data biometrik secara ilegal yang mengancam privasi individu[cite: 105, 106, 113].",
        insightTip: "Hati-hati terhadap aplikasi yang meminta hak akses lebih dari yang dibutuhkannya[cite: 105, 106].",
      },
    ],
  },
  "quiz-etika-ch-2": {
    quizKey: "quiz-etika-ch-2",
    title: "Evaluasi Bab 2: Integritas Digital & Mitigasi Risiko AI",
    courseKey: "etika-digital",
    moduleBadge: "Etika & Tata Kelola - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apakah risiko psikologis dan sosial dari fenomena ruang gema (echo chamber) yang diciptakan oleh algoritma media sosial[cite: 107, 108, 114]?",
        points: 35,
        category: "Dampak Sosial Algoritma",
        options: [
          { key: "A", text: "Membuat pengguna selalu mendapatkan rekomendasi video pelajaran sains terbaru." },
          { key: "B", text: "Membuat pola pikir pengguna menyempit karena hanya disajikan opini dan konten yang disukainya saja[cite: 107, 108, 114]." },
          { key: "C", text: "Meningkatkan daya tahan layar kaca smartphone terhadap goresan." },
          { key: "D", text: "Menghapus akun media sosial secara otomatis setelah 30 hari." },
        ],
        correctOption: "B",
        explanation: "Echo chamber menjebak pengguna dalam gelembung informasi homogen yang memperkuat bias pribadi dan menutup ruang untuk memahami perspektif yang berbeda[cite: 107, 108, 114].",
        insightTip: "Echo chamber ibarat berada di ruang gema yang hanya memantulkan suara kita sendiri[cite: 107, 108].",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta pikiran Etika AI berikut. Manakah cabang isu etis yang berkaitan dengan dampak manipulasi visual (deepfake) dan ancaman penyebaran berita bohong[cite: 104, 105]?",
        points: 35,
        category: "Analisis Visual Risiko Keamanan AI",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Mitigasi Keamanan Siber
        imageUrl: "/images/materi/quiz-level4-ch2-q2.png",
        imageAlt: "Peta pikiran Etika AI dengan cabang: Tanggung Jawab, Privasi, Bias, Keamanan, dan Dampak Sosial",
        caseBadge: "Studi Kasus Visual: Mitigasi Keamanan Siber",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Cabang Keamanan (Security)[cite: 104, 105]." },
          { key: "B", text: "Cabang Peningkatan Kecepatan Komputer." },
          { key: "C", text: "Cabang Penghematan Daya Baterai." },
          { key: "D", text: "Cabang Desain Tata Ruang Kamar." },
        ],
        correctOption: "A",
        explanation: "Penyalahgunaan AI untuk menciptakan konten hoaks dan manipulasi video deepfake diklasifikasikan ke dalam cabang ancaman 'Keamanan' (Security)[cite: 104, 105].",
        insightTip: "Perhatikan kotak berlabel Keamanan pada sisi kiri bawah diagram konsep[cite: 104].",
      },
      {
        id: "q3",
        questionText: "Seorang siswa menyuruh AI generatif menuliskan seluruh isi tugas makalah sekolahnya tanpa membaca ulang, lalu mengumpulkannya kepada guru. Tindakan tersebut dinilai tidak etis karena[cite: 108, 109, 111]...",
        points: 30,
        category: "Integritas Akademik",
        options: [
          { key: "A", text: "Komputer guru tidak bisa membuka file teks buatan AI." },
          { key: "B", text: "Tindakan tersebut merupakan bentuk plagiasi yang menghilangkan proses belajar dan nalar kritis siswa[cite: 108, 109]." },
          { key: "C", text: "Aplikasi AI selalu mengenakan biaya cetak kertas mahal." },
          { key: "D", text: "Siswa tersebut memboroskan daya listrik sekolah." },
        ],
        correctOption: "B",
        explanation: "Etika akademik menuntut kejujuran proses belajar; mencontek langsung dari AI tanpa keterlibatan pemikiran pribadi adalah bentuk plagiasi yang menumpulkan kemampuan intelektual siswa[cite: 108, 109].",
        insightTip: "AI hadir sebagai mitra berdiskusi, bukan joki tugas pengganti proses belajar[cite: 108, 109].",
      },
    ],
  },
  "quiz-etika-ch-3": {
    quizKey: "quiz-etika-ch-3",
    title: "Evaluasi Bab 3: Tata Kelola Domain .id",
    courseKey: "etika-digital",
    moduleBadge: "Etika & Tata Kelola - Bab 3",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apakah fungsi utama Domain Name System (DNS) dalam jaringan internet dunia[cite: 119]?",
        points: 35,
        category: "Arsitektur Internet",
        options: [
          { key: "A", text: "Menghapus situs web yang tidak membayar pajak bulanan secara otomatis." },
          { key: "B", text: "Menerjemahkan deretan alamat IP numerik rumit menjadi nama domain teks yang mudah diingat manusia[cite: 119]." },
          { key: "C", text: "Mempercepat daya putar kipas pendingin pada komputer server." },
          { key: "D", text: "Mengunci akses internet pengguna dari luar negeri." },
        ],
        correctOption: "B",
        explanation: "DNS bertindak seperti direktori kontak telepon yang mentranslasikan alamat IP angka biner (misal 103.x.x.x) menjadi nama yang bermakna seperti 'sekolahku.id'[cite: 119].",
        insightTip: "DNS memudahkan manusia agar tidak perlu menghafalkan rangkaian angka IP yang panjang[cite: 119].",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta persebaran infrastruktur registri PANDI berikut. Mengapa PANDI mengoperasikan total 44 server DNS Anycast di dalam dan luar negeri[cite: 120]?",
        points: 35,
        category: "Analisis Visual Infrastruktur DNS",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Analisis Kesiapan Server Nasional
        imageUrl: "/images/materi/quiz-level4-ch3-q2.png",
        imageAlt: "Peta global sebaran 44 server DNS Anycast PANDI: node dalam negeri (Jakarta, Surabaya, Bali, dll) dan luar negeri (USA, Singapura, dll)",
        caseBadge: "Studi Kasus Visual: Analisis Kesiapan Server Nasional",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Untuk membatasi agar website .id hanya dapat dibuka dari wilayah Tangerang Selatan." },
          { key: "B", text: "Untuk menjamin kecepatan akses resolusi nama domain, ketersediaan tinggi, dan keandalan sistem dari bencana[cite: 120, 121]." },
          { key: "C", text: "Sebagai syarat mutlak untuk menutup jaringan internet di luar pulau Jawa[cite: 120]." },
          { key: "D", text: "Guna menaikkan biaya kuota data internet bagi siswa SMP." },
        ],
        correctOption: "B",
        explanation: "Penyebaran node DNS Anycast di berbagai kota dalam negeri dan luar negeri menjamin kecepatan perutean, latensi rendah, serta redundansi sistem cadangan saat terjadi gangguan server pusat[cite: 120, 121].",
        insightTip: "Distribusi server bertujuan menjaga keandalan dan kecepatan akses website di mana pun pengguna berada[cite: 120, 121].",
      },
      {
        id: "q3",
        questionText: "Apakah nama lembaga resmi di Indonesia yang bertindak sebagai pengelola dan perumus kebijakan nama domain berkode negara '.id'[cite: 120, 121]?",
        points: 30,
        category: "Kelembagaan Siber Nasional",
        options: [
          { key: "A", text: "PANDI (Pengelola Nama Domain Internet Indonesia)[cite: 120, 121]" },
          { key: "B", text: "APNIC Regional Pasifik[cite: 120]" },
          { key: "C", text: "UNESCO Pendidikan PBB" },
          { key: "D", text: "Interpol Asia Tenggara" },
        ],
        correctOption: "A",
        explanation: "PANDI adalah organisasi nirlaba berbasis multipemangku kepentingan yang mengemban mandat resmi mengelola registri domain tingkat tinggi Indonesia (.id)[cite: 120, 121].",
        insightTip: "Singkatan PANDI mewakili pengelola nama domain internet di Indonesia[cite: 120, 121].",
      },
    ],
  },
};

export const QUIZ_KEY_ALIASES: Record<string, string> = {
  "quiz-level1-ch-1": "quiz-air-ch-1",
  "quiz-level1-ch-2": "quiz-air-ch-2",
  "quiz-level1-ch-3": "quiz-air-ch-3",
  "quiz-level2-ch-1": "quiz-dek-ch-1",
  "quiz-level2-ch-2": "quiz-dek-ch-2",
  "quiz-level2-ch-3": "quiz-dek-ch-3",
  "quiz-level3-ch-1": "quiz-alg-ch-1",
  "quiz-level3-ch-2": "quiz-alg-ch-2",
  "quiz-level3-ch-3": "quiz-alg-ch-3",
  "quiz-level4-ch-1": "quiz-etika-ch-1",
  "quiz-level4-ch-2": "quiz-etika-ch-2",
  "quiz-level4-ch-3": "quiz-etika-ch-3",
  "quiz-beginner-ch-1": "quiz-air-ch-1",
  "quiz-beginner-ch-2": "quiz-air-ch-2",
  "quiz-beginner-ch-3": "quiz-air-ch-3",
  "quiz-beginner-ch-4": "quiz-dek-ch-1",
  "quiz-intermediate-ch-1": "quiz-dek-ch-2",
  "quiz-intermediate-ch-2": "quiz-dek-ch-3",
  "quiz-intermediate-ch-3": "quiz-alg-ch-1",
};

export function getStaticQuiz(quizKey?: string): StaticQuiz {
  if (quizKey) {
    const resolvedKey = QUIZ_KEY_ALIASES[quizKey] || quizKey;
    if (STATIC_QUIZZES[resolvedKey]) {
      return STATIC_QUIZZES[resolvedKey];
    }
  }
  if (quizKey) {
    const matched = Object.values(STATIC_QUIZZES).find(
      (q) => q.quizKey === quizKey || quizKey.includes(q.quizKey) || q.quizKey.includes(quizKey)
    );
    if (matched) return matched;
  }
  return Object.values(STATIC_QUIZZES)[0];
}

// Backwards compatibility helper untuk komponen yang mengonsumsi format QUIZZES
export const QUIZZES = Object.fromEntries(
  Object.entries(STATIC_QUIZZES).map(([key, quiz]) => [
    key,
    {
      questions: quiz.questions.map((q) => ({
        id: q.id,
        question: q.questionText,
        options: q.options.map((opt) => opt.text),
        correctAnswer: q.options.find((opt) => opt.key === q.correctOption)?.text || "",
      })),
    },
  ])
);
