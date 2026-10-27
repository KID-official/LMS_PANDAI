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
 * Bank soal kuis statis kurikulum multi-level AI & Computational Thinking.
 */
export const STATIC_QUIZZES: Record<string, StaticQuiz> = {
  "quiz-level1-ch-1": {
    quizKey: "quiz-level1-ch-1",
    title: "Kuis Evaluasi: Bab 1 - Mengenal Kecerdasan Buatan (AI)",
    courseKey: "course-level-1",
    moduleBadge: "Level 1 - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Manakah pernyataan yang paling tepat membedakan cara kerja kecerdasan buatan (AI) dengan program komputer konvensional seperti kalkulator?",
        points: 35,
        category: "Konsep Dasar AI",
        options: [
          { key: "A", text: "Program konvensional dapat memperbaiki logikanya sendiri, sedangkan AI harus diprogram ulang manual." },
          { key: "B", text: "Kalkulator memerlukan koneksi internet untuk bekerja, sedangkan AI bekerja secara mandiri tanpa daya listrik." },
          { key: "C", text: "Program biasa hanya mengikuti instruksi tetap, sedangkan AI mampu belajar dari data untuk meningkatkan keputusannya." },
          { key: "D", text: "AI hanya mampu memproses angka matematika, sedangkan program biasa dapat mengenali emosi manusia." },
        ],
        correctOption: "C",
        explanation: "Kalkulator adalah representasi program biasa yang mengeksekusi instruksi kaku tanpa memahami arti data atau belajar dari kesalahan. Sebaliknya, sistem AI menggunakan data pelatihan untuk mengenali pola dan mengadaptasi perilakunya secara mandiri.",
        insightTip: "Fokuslah pada kata kunci 'belajar dari data dan beradaptasi' yang menjadi pembeda utama AI.",
      },
      {
        id: "q2",
        questionText: "Perhatikan infografis 'AI: Bukan Sekadar Teknologi, Tapi Penolong Manusia' berikut. Berdasarkan skema peran AI tersebut, fungsi apakah yang dijalankan oleh AI saat menganalisis rekaman rontgen untuk mendeteksi penyakit pasien secara presisi?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Utilisasi Sektoral AI
        imageUrl: "/images/materi/quiz-level1-ch1-q2.png",
        imageAlt: "Infografis ragam manfaat AI: Membantu Dokter, Belajar dari Data, Mengemudi Otomatis, dan Membantu Siswa Belajar",
        caseBadge: "Studi Kasus Visual: Utilisasi Sektoral AI",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Menggantikan peran seluruh apotek dan fasilitas rawat inap secara total." },
          { key: "B", text: "Membantu dokter mendeteksi penyakit lebih cepat melalui pemrosesan pola citra medis." },
          { key: "C", text: "Menjalankan tindakan operasi bedah secara otomatis tanpa izin tenaga medis." },
          { key: "D", text: "Menghapus riwayat rekam medis pasien guna menghemat ruang penyimpanan server." },
        ],
        correctOption: "B",
        explanation: "Sebagaimana digambarkan pada bagan manfaat AI di bidang medis, algoritma AI bertindak sebagai instrumen pembantu dokter dalam membaca pola anomali citra medis secara cepat dan akurat untuk penegakan diagnosis awal.",
        insightTip: "Perhatikan peran AI sebagai 'penolong' (asisten augmentatif), bukan pengganti mutlak tenaga profesional.",
      },
      {
        id: "q3",
        questionText: "Siapakah ilmuwan pelopor yang pada dekade 1950-an merumuskan pertanyaan fundamental 'Bisakah mesin berpikir?' yang menjadi tonggak awal lahirnya konsep kecerdasan buatan?",
        points: 30,
        category: "Sejarah Teknologi",
        options: [
          { key: "A", text: "Alan Turing" },
          { key: "B", text: "Thomas Edison" },
          { key: "C", text: "Leonardo da Vinci" },
          { key: "D", text: "Isaac Newton" },
        ],
        correctOption: "A",
        explanation: "Alan Turing adalah matematikawan dan ilmuwan komputer Inggris yang memperkenalkan konsep Turing Test pada era 1950-an melalui karya ilmiahnya mengenai kemungkinan mesin memiliki kapasitas berpikir menyerupai manusia.",
        insightTip: "Ingat nama ilmuwan yang merancang mesin pemecah kode Enigma dan menjadi bapak ilmu komputer modern.",
      },
    ],
  },
  "quiz-level1-ch-2": {
    quizKey: "quiz-level1-ch-2",
    title: "Kuis Evaluasi: Bab 2 - Berpikir Komputasional: Decomposition",
    courseKey: "course-level-1",
    moduleBadge: "Level 1 - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Dalam konteks berpikir komputasional, apakah tujuan utama dari penerapan teknik dekomposisi saat menghadapi masalah besar yang rumit?",
        points: 35,
        category: "Konsep Dekomposisi",
        options: [
          { key: "A", text: "Menggabungkan beberapa persoalan rumit menjadi satu tugas raksasa agar dapat diselesaikan serentak." },
          { key: "B", text: "Memecah persoalan kompleks menjadi bagian-bagian kecil yang lebih terstruktur dan mudah diselesaikan." },
          { key: "C", text: "Menghindari pekerjaan sulit dengan menyerahkan seluruh tanggung jawab kepada komputer." },
          { key: "D", text: "Menghafalkan seluruh langkah teknis secara acak tanpa membuat rancangan tertulis." },
        ],
        correctOption: "B",
        explanation: "Dekomposisi bertujuan mereduksi tingkat kerumitan suatu masalah dengan mengurainya menjadi sub-masalah independen yang lebih konkret, sehingga beban kerja menjadi lebih ringan dan terarah.",
        insightTip: "Pikirkan prinsip 'potong pizza': mengurai masalah menjadi bagian-bagian yang dapat dikelola secara realistis.",
      },
      {
        id: "q2",
        questionText: "Perhatikan diagram peta pikiran pembuatan mi instan berikut. Berdasarkan alur dekomposisi tersebut, manakah sub-tugas yang wajib dilakukan sebelum mi dapat dimasukkan ke dalam air rebusan?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Analisis Ketergantungan Sub-Tugas
        imageUrl: "/images/materi/quiz-level1-ch2-q2.png",
        imageAlt: "Mind map pembuatan mi instan yang memperlihatkan cabang: Ambil mi & bumbu, Rebus air, Masukkan mi ke air, Tiriskan mi, dan Campur bumbu",
        caseBadge: "Studi Kasus Visual: Analisis Ketergantungan Sub-Tugas",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Mencampurkan seluruh bumbu ke dalam mangkuk saji." },
          { key: "B", text: "Meniriskan mi yang masih mentah di atas saringan." },
          { key: "C", text: "Menyiapkan bahan mi/bumbu dan merebus air hingga mencapai titik didih." },
          { key: "D", text: "Menyajikan mi instan di atas meja makan keluarga." },
        ],
        correctOption: "C",
        explanation: "Berdasarkan diagram cabang dekomposisi pembuatan mi, proses merebus air dan menyiapkan bahan adalah prasyarat logika awal sebelum sub-tugas memasukkan mi ke dalam air mendidih dapat dieksekusi.",
        insightTip: "Perhatikan ketergantungan sekuensial alami antara cabang hulu (persiapan) dan cabang hilir (eksekusi).",
      },
      {
        id: "q3",
        questionText: "Sebuah tim siswa beranggotakan 4 orang ditugaskan membuat proyek video edukasi profil sekolah. Tindakan manakah yang paling mencerminkan implementasi dekomposisi dalam pembagian kerja kelompok?",
        points: 30,
        category: "Aplikasi Praktis",
        options: [
          { key: "A", text: "Membagi proyek menjadi modul naskah, pengambilan gambar, penyuntingan video, dan dokumentasi untuk dikerjakan masing-masing anggota." },
          { key: "B", text: "Menyuruh seluruh anggota berkumpul di depan satu laptop untuk mengedit video secara serentak." },
          { key: "C", text: "Membiarkan ketua kelompok mengerjakan seluruh video sementara anggota lain menunggu hasil jadi." },
          { key: "D", text: "Langsung mengunggah rekaman video mentah ke media sosial tanpa perencanaan naskah awal." },
        ],
        correctOption: "A",
        explanation: "Dekomposisi dalam manajemen tim terwujud melalui pemecahan proyek produksi video menjadi sub-tugas spesifik (penulisan naskah, perekaman, editing, dan publikasi) yang didelegasikan secara terkoordinasi.",
        insightTip: "Ciri khas dekomposisi kolaboratif adalah adanya pembagian fungsi kerja yang terdefinisi dan saling mendukung.",
      },
    ],
  },
  "quiz-level2-ch-1": {
    quizKey: "quiz-level2-ch-1",
    title: "Kuis Evaluasi: Bab 3 - Berpikir Komputasional: Pattern Recognition",
    courseKey: "course-level-2",
    moduleBadge: "Level 2 - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Jika data cuaca selama enam hari berturut-turut tercatat berulang dalam siklus: 'Hujan, Cerah, Mendung, Hujan, Cerah, Mendung', maka berdasarkan pengenalan pola, cuaca apakah yang paling logis terjadi pada hari ke-7 dan ke-8?",
        points: 35,
        category: "Penalaran Logika Pola",
        options: [
          { key: "A", text: "Mendung lalu Cerah" },
          { key: "B", text: "Cerah lalu Mendung" },
          { key: "C", text: "Hujan lalu Cerah" },
          { key: "D", text: "Hujan lalu Mendung" },
        ],
        correctOption: "C",
        explanation: "Siklus pola cuaca berulang setiap 3 hari: [Hujan (1), Cerah (2), Mendung (3)]. Hari ke-6 adalah 'Mendung' (ujung siklus kedua). Maka hari ke-7 kembali ke elemen pertama yaitu 'Hujan', dan hari ke-8 adalah 'Cerah'.",
        insightTip: "Tentukan panjang periode perulangan siklus data terlebih dahulu (panjang siklus = 3).",
      },
      {
        id: "q2",
        questionText: "Perhatikan bagan mind map Pattern Recognition berikut. Kategori manakah yang mengelompokkan pengamatan fenomena alam seperti pergantian musim, waktu, dan siklus cuaca harian?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Taksonomi Pengenalan Pola
        imageUrl: "/images/materi/quiz-level2-ch1-q2.png",
        imageAlt: "Mind map Pattern Recognition terbagi menjadi 3 cabang utama: Angka (+2, ganjil), Gambar (urutan bentuk), dan Alam & Kehidupan (cuaca, musim, waktu)",
        caseBadge: "Studi Kasus Visual: Taksonomi Pengenalan Pola",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Cabang Pola Gambar" },
          { key: "B", text: "Cabang Alam & Kehidupan" },
          { key: "C", text: "Cabang Barisan Aritmatika Angka" },
          { key: "D", text: "Cabang Bahasa dan Fonetik" },
        ],
        correctOption: "B",
        explanation: "Berdasarkan bagan klasifikasi, fenomena cuaca, pergantian musim, dan sirkulasi waktu dikelompokkan ke dalam cabang pengenalan pola 'Alam & Kehidupan'.",
        insightTip: "Perhatikan teks label pada simpul cabang paling kanan di dalam bagan konsep.",
      },
      {
        id: "q3",
        questionText: "Bagaimanakah sistem kecerdasan buatan (AI) pada kamera ponsel pintar memanfaatkan teknik pengenalan pola untuk membuka kunci keamanan perangkat?",
        points: 30,
        category: "Aplikasi Teknologi AI",
        options: [
          { key: "A", text: "Dengan merekam seluruh pembicaraan suara pengguna selama 24 jam secara diam-diam." },
          { key: "B", text: "Dengan menghafalkan nomor seri kartu SIM yang terpasang pada papan sirkuit induk ponsel." },
          { key: "C", text: "Dengan membandingkan suhu permukaan layar kaca dengan suhu tubuh manusia." },
          { key: "D", text: "Dengan mencocokkan matriks jarak geometris antar-fitur wajah (mata, hidung, bibir) terhadap data pola biometrik yang telah disimpan." },
        ],
        correctOption: "D",
        explanation: "Teknologi face recognition mengekstraksi keteraturan geometris spasial wajah pengguna menjadi data pola matematis, yang kemudian dicocokkan dengan profil pemilik yang tersimpan dalam sistem.",
        insightTip: "Cari opsi yang menjelaskan pengenalan keteraturan karakteristik fisik (fitur biometrik).",
      },
    ],
  },
  "quiz-level2-ch-2": {
    quizKey: "quiz-level2-ch-2",
    title: "Kuis Evaluasi: Bab 4 - Berpikir Komputasional: Abstraction",
    courseKey: "course-level-2",
    moduleBadge: "Level 2 - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Manakah tindakan di bawah ini yang paling tepat menggambarkan implementasi teknik abstraksi saat merancang peta rute evakuasi darurat kebakaran sekolah?",
        points: 35,
        category: "Konsep Abstraksi",
        options: [
          { key: "A", text: "Menggambar setiap motif ubin lantai, warna tirai jendela, dan letak pot tanaman di sepanjang koridor." },
          { key: "B", text: "Hanya menampilkan jalur lorong utama, tangga darurat, posisi pintu keluar, dan titik kumpul yang krusial." },
          { key: "C", text: "Menuliskan biografi lengkap arsitek dan daftar tukang yang membangun gedung sekolah." },
          { key: "D", text: "Mewarnai seluruh ruangan dengan gradasi cat minyak artistik agar tampak realistis." },
        ],
        correctOption: "B",
        explanation: "Abstraksi menitikberatkan pada penyaringan informasi esensial (lorong, pintu darurat, titik kumpul) dan membuang detail yang tidak relevan dengan penyelamatan (motif ubin, warna gorden) demi kemudahan pemahaman navigasi darurat.",
        insightTip: "Pilihlah opsi yang berfokus hanya pada 'inti fungsional' dan membuang ornamen dekoratif.",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta konsep Abstraksi berikut. Berdasarkan bagan tersebut, apakah hasil langsung yang diperoleh ketika kita berhasil fokus pada inti masalah dan mengabaikan detail yang tidak perlu?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Alur Efisiensi Abstraksi
        imageUrl: "/images/materi/quiz-level2-ch2-q2.png",
        imageAlt: "Peta konsep abstraksi: Menyederhanakan Masalah -> Fokus pada Inti & Abaikan Detail Tak Perlu -> Solusi Lebih Efisien -> Mudah Pahami Masalah -> Bisa untuk Masalah Lain",
        caseBadge: "Studi Kasus Visual: Alur Efisiensi Abstraksi",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Menghasilkan solusi yang lebih efisien dan mempermudah pemahaman masalah." },
          { key: "B", text: "Menyebabkan hilangnya seluruh data utama dalam sistem basis data." },
          { key: "C", text: "Membuat proses perancangan algoritma menjadi berulang tanpa henti." },
          { key: "D", text: "Menambah beban memori komputer karena detail data disimpan berulang kali." },
        ],
        correctOption: "A",
        explanation: "Bagan menunjukkan bahwa penyederhanaan masalah dengan fokus pada inti menghasilkan luaran 'Solusi Lebih Efisien', yang selanjutnya mempermudah pemahaman masalah dan memungkinkan generalisasi solusi untuk kasus lain.",
        insightTip: "Amati anak panah dari simpul proses tengah menuju kotak hasil di bawahnya.",
      },
      {
        id: "q3",
        questionText: "Saat seorang koki diminta membuat daftar belanja untuk resep 'Nasi Goreng Spesial', manakah kelompok entitas yang tereliminasi karena dianggap sebagai detail alat, bukan bahan belanjaan esensial?",
        points: 30,
        category: "Pemilahan Informasi",
        options: [
          { key: "A", text: "Beras, telur ayam, dan bumbu rempah" },
          { key: "B", text: "Minyak goreng, kecap manis, dan bawang merah" },
          { key: "C", text: "Wajan penggorengan, piring saji, dan sendok makan" },
          { key: "D", text: "Nasi putih, potongan daging ayam, dan garam dapur" },
        ],
        correctOption: "C",
        explanation: "Dalam konteks menyusun 'daftar belanja konsumsi', wajan, piring, dan sendok adalah perkakas wadah/alat bantu yang bukan merupakan komoditas bahan mentah yang harus dibeli berulang kali, sehingga perlu diabstraksikan keluar dari daftar.",
        insightTip: "Bedakan antara bahan konsumsi yang habis terpakai dengan peralatan operasional pendukung.",
      },
    ],
  },
  "quiz-level2-ch-3": {
    quizKey: "quiz-level2-ch-3",
    title: "Kuis Evaluasi: Bab 5 - Berpikir Komputasional: Algorithm Design",
    courseKey: "course-level-2",
    moduleBadge: "Level 2 - Bab 3",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Tiga kriteria utama yang wajib dipenuhi oleh sebuah rancangan algoritma komputasional yang berkualitas adalah...",
        points: 35,
        category: "Karakteristik Algoritma",
        options: [
          { key: "A", text: "Panjang, rumit, dan tidak terbatas langkahnya" },
          { key: "B", text: "Berupa kode mesin murni, acak, dan tanpa kondisi berhenti" },
          { key: "C", text: "Bergantung pada merek laptop, berbiaya mahal, dan rahasia" },
          { key: "D", text: "Jelas (tidak ambigu), terbatas (memiliki akhir), dan efektif (memberikan solusi tepat)" },
        ],
        correctOption: "D",
        explanation: "Buku materi mendefinisikan bahwa algoritma yang baik harus memiliki instruksi yang Jelas (mudah dipahami), Terbatas (finite/pasti berakhir), dan Efektif (menghasilkan penyelesaian masalah yang benar).",
        insightTip: "Algoritma tidak boleh berjalan tanpa henti (infinite loop) dan setiap langkah harus bermakna tunggal.",
      },
      {
        id: "q2",
        questionText: "Perhatikan flowchart pembuatan mi instan berikut. Apa yang harus dilakukan oleh sistem jika evaluasi kondisi pada simbol belah ketupat 'Air mendidih?' menghasilkan nilai keputusan 'Tidak' (Belum)?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Penelusuran Percabangan Flowchart
        imageUrl: "/images/materi/quiz-level2-ch3-q2.png",
        imageAlt: "Flowchart prosedur memasak mi instan dengan simbol terminator Mulai/Selesai, proses Rebus air, belah ketupat keputusan Air mendidih?, Masukkan mie, dan Tunggu 3 menit",
        caseBadge: "Studi Kasus Visual: Penelusuran Percabangan Flowchart",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Segera memasukkan mi mentah ke dalam panci dingin." },
          { key: "B", text: "Kembali menunggu dan merebus air hingga mencapai kondisi mendidih (looping)." },
          { key: "C", text: "Langsung menghentikan proses memasak dan menuju ke terminator 'Selesai'." },
          { key: "D", text: "Menaburkan bumbu mi instan ke atas kompor gas." },
        ],
        correctOption: "B",
        explanation: "Pada diagram alur, cabang keputusan 'Tidak' pada kondisi 'Air mendidih?' mengarahkan anak panah kembali ke proses pemanasan air (perulangan/looping) sampai kondisi air benar-benar mendidih terpenuhi ('Ya').",
        insightTip: "Telusuri arah garis panah yang keluar dari sisi alternatif 'Tidak/Belum'.",
      },
      {
        id: "q3",
        questionText: "Diberikan langkah-langkah acak: (1) Bilas tangan dengan air bersih mengalir, (2) Basahi tangan dengan air, (3) Keringkan dengan tisu/lap bersih, (4) Gosok seluruh bagian tangan dengan sabun. Urutan algoritma mencuci tangan yang paling logis dan benar adalah...",
        points: 30,
        category: "Urutan Logika Prosedural",
        options: [
          { key: "A", text: "(2) -> (4) -> (1) -> (3)" },
          { key: "B", text: "(4) -> (2) -> (3) -> (1)" },
          { key: "C", text: "(3) -> (1) -> (4) -> (2)" },
          { key: "D", text: "(1) -> (4) -> (2) -> (3)" },
        ],
        correctOption: "A",
        explanation: "Urutan higienis yang logis dimulai dari membasahi tangan dengan air (2), menggosok tangan memakai sabun hingga berbusa (4), membilas busa dan kotoran dengan air bersih (1), lalu mengeringkan tangan (3).",
        insightTip: "Sabun tidak dapat berbusa efektif tanpa air, dan tangan tidak dapat dikeringkan sebelum dibilas.",
      },
    ],
  },
  "quiz-level3-ch-1": {
    quizKey: "quiz-level3-ch-1",
    title: "Kuis Evaluasi: Bab 6 - Etika AI untuk Siswa SMP",
    courseKey: "course-level-3",
    moduleBadge: "Level 3 - Bab 1",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Jika sebuah sistem mobil tanpa awak (self-driving car) berbasis AI mengalami kecelakaan fatal di jalan raya, siapakah yang secara etika dan hukum harus memikul tanggung jawab atas peristiwa tersebut?",
        points: 35,
        category: "Akuntabilitas Hukum & Etika",
        options: [
          { key: "A", text: "Sistem operasi komputer dan prosesor AI di dalam mobil itu sendiri." },
          { key: "B", text: "Koneksi jaringan satelit internet yang menghubungkan mobil ke server." },
          { key: "C", text: "Manusia yang terlibat, meliputi pihak pengembang perangkat lunak, produsen, atau pemilik/pengguna mobil." },
          { key: "D", text: "Korban kecelakaan karena tidak menghindari laju kendaraan secara cepat." },
        ],
        correctOption: "C",
        explanation: "Prinsip akuntabilitas etika AI menegaskan bahwa kecerdasan buatan hanyalah alat buatan manusia yang tidak memiliki moral agency; tanggung jawab hukum dan etis mutlak dibebankan kepada entitas manusia (pengembang, produsen, atau operator).",
        insightTip: "Mesin tidak dapat dituntut secara hukum; manusia di balik teknologilah pemegang tanggung jawab mutlak.",
      },
      {
        id: "q2",
        questionText: "Perhatikan infografis 5 Pilar Etika AI berikut. Pilar manakah yang menuntut bahwa sistem AI pengenal wajah tidak boleh hanya akurat pada kelompok individu berkulit terang, melainkan harus adil dan setara bagi seluruh ras manusia?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Pemetaan Pilar Keadilan Algoritma
        imageUrl: "/images/materi/quiz-level3-ch1-q2.png",
        imageAlt: "Diagram cabang Etika AI dengan 5 ikon: Tanggung Jawab, Privasi, Bebas dari Bias (timbangan), Transparansi (kaca pembesar), dan Keamanan (tembok bata)",
        caseBadge: "Studi Kasus Visual: Pemetaan Pilar Keadilan Algoritma",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Pilar Keamanan" },
          { key: "B", text: "Pilar Bebas dari Bias (Fairness)" },
          { key: "C", text: "Pilar Transparansi" },
          { key: "D", text: "Pilar Kecepatan Komputasi" },
        ],
        correctOption: "B",
        explanation: "Pilar 'Bebas dari Bias' (disimbolkan dengan neraca timbangan yang seimbang) menuntut sistem AI dilatih menggunakan data representatif dan inklusif agar tidak mendiskriminasi ras, gender, atau kelompok tertentu.",
        insightTip: "Cari simbol timbangan keadilan yang merefleksikan perlakuan setara tanpa prasangka.",
      },
      {
        id: "q3",
        questionText: "Seorang siswa menggunakan aplikasi AI generatif untuk menuliskan seluruh isi esai tugas sekolah tanpa membaca maupun memahaminya, lalu mengklaim karya tersebut sebagai karangannya sendiri. Ditinjau dari etika digital, tindakan tersebut tidak etis karena...",
        points: 30,
        category: "Integritas Akademik",
        options: [
          { key: "A", text: "Aplikasi AI generatif membutuhkan biaya langganan yang mahal bagi pelajar." },
          { key: "B", text: "Komputer sekolah tidak memiliki memori penyimpanan yang cukup untuk menyimpan teks." },
          { key: "C", text: "Siswa tersebut memboroskan kuota internet sekolah untuk server asing." },
          { key: "D", text: "Merupakan bentuk kecurangan plagiasi yang meniadakan proses belajar mandiri dan melanggar kejujuran akademik." },
        ],
        correctOption: "D",
        explanation: "Pemanfaatan AI secara etis adalah sebagai mitra diskusi dan akselerator pemahaman. Mengambil alih karya AI secara utuh tanpa pemahaman personal merupakan pelanggaran integritas akademik dan mematikan nalar kritis siswa.",
        insightTip: "AI hadir untuk mengasah proses berpikir manusia, bukan untuk menggantikan proses belajar itu sendiri.",
      },
    ],
  },
  "quiz-level3-ch-2": {
    quizKey: "quiz-level3-ch-2",
    title: "Kuis Evaluasi: Bab 7 - Mengenal Domain .id",
    courseKey: "course-level-3",
    moduleBadge: "Level 3 - Bab 2",
    passingScore: 75,
    durationMinutes: 15,
    questions: [
      {
        id: "q1",
        questionText: "Apakah fungsi utama Domain Name System (DNS) dalam arsitektur jaringan internet global?",
        points: 35,
        category: "Arsitektur Internet",
        options: [
          { key: "A", text: "Menghapus situs web yang tidak memiliki izin operasional secara otomatis." },
          { key: "B", text: "Menerjemahkan alamat IP numerik yang rumit menjadi nama domain tekstual yang mudah diingat manusia." },
          { key: "C", text: "Mengunci perangkat komputer agar tidak dapat mengakses jaringan luar negeri." },
          { key: "D", text: "Mempercepat penurunan suhu fisik pada prosesor server pusat data." },
        ],
        correctOption: "B",
        explanation: "DNS berfungsi sebagai 'buku telepon' internet yang mentranslasikan alamat IP numerik (misal 103.x.x.x) menjadi nama domain yang mudah dieja dan diingat manusia seperti 'pandi.id' atau 'sekolahku.id'.",
        insightTip: "DNS menyederhanakan komunikasi antara mesin (berbasis angka) dengan manusia (berbasis kata).",
      },
      {
        id: "q2",
        questionText: "Perhatikan peta sebaran server registri PANDI berikut. Mengapa PANDI menempatkan puluhan server DNS Anycast di berbagai kota dalam negeri (seperti Jakarta, Surabaya, Bali) dan mancanegara (seperti Singapura, Tokyo, USA)?",
        points: 35,
        category: "Analisis Kasus Visual",
        // [MEDIA CONTEXT - QUIZ CASE STUDY]: Foto/Diagram kasus kuis | Tema: Studi Kasus Visual: Analisis Kesiapan Infrastruktur Siber
        imageUrl: "/images/materi/quiz-level3-ch2-q2.png",
        imageAlt: "Peta global dan nasional persebaran 44 DNS Server Anycast: 34 dioperasikan PANDI dan 10 oleh APNIC di berbagai belahan dunia",
        caseBadge: "Studi Kasus Visual: Analisis Kesiapan Infrastruktur Siber",
        caseResolution: "1080p",
        options: [
          { key: "A", text: "Agar domain .id hanya dapat diakses oleh warga negara yang tinggal di luar negeri." },
          { key: "B", text: "Untuk membatasi jumlah website yang boleh didaftarkan oleh masyarakat Indonesia." },
          { key: "C", text: "Guna menjamin kecepatan akses resolusi domain, ketersediaan tinggi, dan keandalan sistem dari gangguan bencana." },
          { key: "D", text: "Sebagai syarat mutlak untuk menaikkan tarif pajak internet tahunan di kawasan Asia Tenggara." },
        ],
        correctOption: "C",
        explanation: "Penyebaran simpul DNS Anycast di dalam dan luar negeri bertujuan memperpendek jarak respons (latensi rendah), memastikan redundansi jika salah satu server padam, dan menjaga keandalan akses domain .id secara global.",
        insightTip: "Jaringan terdistribusi Anycast dibuat untuk menjamin keandalan, stabilitas, dan kecepatan respon.",
      },
      {
        id: "q3",
        questionText: "Lembaga non-pemerintah multipemangku kepentingan yang secara resmi bertindak sebagai Registri Pengelola Nama Domain Tingkat Tinggi Indonesia (.id) adalah...",
        points: 30,
        category: "Kelembagaan Digital Nasional",
        options: [
          { key: "A", text: "PANDI (Pengelola Nama Domain Internet Indonesia)" },
          { key: "B", text: "UNESCO" },
          { key: "C", text: "NASA" },
          { key: "D", text: "Interpol Siber" },
        ],
        correctOption: "A",
        explanation: "PANDI (Pengelola Nama Domain Internet Indonesia) adalah organisasi resmi yang mengelola, memelihara, dan merumuskan kebijakan operasional nama domain tingkat tinggi berakhiran .id berdasarkan mandat redelegasi dari IANA sejak 2013.",
        insightTip: "PANDI adalah singkatan dari Pengelola Nama Domain Internet Indonesia.",
      },
    ],
  },
};

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
