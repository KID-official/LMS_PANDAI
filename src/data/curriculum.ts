/**
 * Official Curriculum Data (Multi-Level)
 * Client Curriculum by Chendri Irawan SN & Onno W. Purbo
 */

export interface SummaryCard {
  pointNumber: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageBadge?: string;
  imageAlt?: string;
  tip?: string;
}

export interface Chapter {
  key: string;
  chapterNumber: number;
  title: string;
  description: string;
  durationMinutes: number;
  minWatchSeconds: number;
  youtubeUrl: string;
  textContent: string;
  summaryCards?: SummaryCard[];
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
  LEVEL_1: 'course-level-1',
  LEVEL_2: 'course-level-2',
  LEVEL_3: 'course-level-3',
  // Backwards compatibility aliases
  BEGINNER: 'course-level-1',
  INTERMEDIATE: 'course-level-2',
} as const;

export const CHAPTER_KEYS = {
  LEVEL1_CH1: 'level1-ch-1',
  LEVEL1_CH2: 'level1-ch-2',
  LEVEL2_CH1: 'level2-ch-1',
  LEVEL2_CH2: 'level2-ch-2',
  LEVEL2_CH3: 'level2-ch-3',
  LEVEL3_CH1: 'level3-ch-1',
  LEVEL3_CH2: 'level3-ch-2',
  // Backwards compatibility aliases
  BEGINNER_CH1: 'level1-ch-1',
  BEGINNER_CH2: 'level1-ch-2',
  BEGINNER_CH3: 'level2-ch-1',
  BEGINNER_CH4: 'level2-ch-2',
  INTERMEDIATE_CH1: 'level2-ch-3',
  INTERMEDIATE_CH2: 'level3-ch-1',
  INTERMEDIATE_CH3: 'level3-ch-2',
} as const;

export const COURSES_DATA: Course[] = [
  {
    key: 'course-level-1',
    title: "Level 1: Dasar Kecerdasan Buatan & Dekomposisi Komputasional",
    tagline: "Membangun Fondasi Pemahaman AI dan Keterampilan Mengurai Masalah Kompleks",
    category: "Kecerdasan Buatan & Fondasi Komputasi",
    level: "Level 1: Pemula (Dasar)",
    badge: "Sertifikasi Fondasi AI & Logika SFA 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Level 1: Dasar Kecerdasan Buatan & Dekomposisi Komputasional
    thumbnail: '/images/materi/thumb-level-1.jpg',
    description: "Mempelajari esensi kecerdasan buatan, perbedaannya dengan program komputer konvensional, cara mesin belajar dari data, serta teknik dekomposisi masalah untuk menyederhanakan tugas-tugas rumit menjadi sub-tugas yang terstruktur.",
    estimatedHours: 3,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'level1-ch-1',
        chapterNumber: 1,
        title: "Mengenal Kecerdasan Buatan (Artificial Intelligence)",
        description: "Memahami definisi AI, sejarah kemunculannya, perbedaan program statis vs sistem adaptif, serta aplikasinya dalam kehidupan sehari-hari.",
        durationMinutes: 20,
        minWatchSeconds: 90,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Mengenal Kecerdasan Buatan (Artificial Intelligence)
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Kecerdasan Buatan (Artificial Intelligence/AI) adalah cabang ilmu komputer yang berfokus pada penciptaan mesin atau sistem perangkat lunak yang mampu meniru kemampuan kognitif manusia, seperti belajar dari pengalaman, memahami bahasa alami, mengenali pola visual, dan mengambil keputusan secara adaptif. Konsep ini pertama kali diinisiasi secara teoritis oleh Alan Turing pada tahun 1950 melalui pertanyaan monumental 'Bisakah mesin berpikir?', sebelum istilah Artificial Intelligence diresmikan dalam konferensi ilmiah pada tahun 1956.\n\nPerbedaan mendasar antara program komputer biasa dan kecerdasan buatan terletak pada fleksibilitas serta kemampuannya mengolah data. Program biasa, seperti kalkulator elektronik, bekerja secara deterministik berdasarkan instruksi baris kode kaku tanpa kemampuan berkembang; kalkulator tidak akan belajar dari kesalahan hitung pengguna. Sebaliknya, sistem AI memanfaatkan data historis dan algoritma pembelajaran mesin untuk mengenali pola laten, beradaptasi terhadap masukan baru, serta meningkatkan akurasi kinerjanya dari waktu ke waktu layaknya aplikasi Google Translate atau model asisten suara.\n\nDalam ekosistem modern, AI telah bertransformasi menjadi penolong manusia di berbagai sektor strategis. Pada bidang medis, AI memproses citra radiologi untuk membantu dokter mendiagnosis anomali jaringan lebih cepat dan presisi. Di sektor transportasi, algoritma penglihatan komputer mengendalikan kendaraan otonom untuk memindai rambu lalu lintas dan mencegah kecelakaan. Dengan memahami esensi AI, siswa diajak tidak hanya menjadi konsumen teknologi yang pasif, melainkan penjelajah digital yang kritis terhadap cara kerja mesin pintar.",
        hasQuiz: true,
        quizKey: 'quiz-level1-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Karakter Adaptif AI vs Program Biasa",
            description: "Program biasa hanya mengeksekusi instruksi baku yang kaku, sedangkan sistem AI memiliki kapasitas belajar dari data dan terus meningkatkan akurasi keputusannya.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Matriks Komparasi Sistem (Karakter Adaptif AI vs Program Biasa)
            imageUrl: '/images/materi/level1-ch1-poin1.png',
            imageBadge: "Matriks Komparasi Sistem",
            imageAlt: "Bagan perbandingan alur kerja kalkulator statis versus sistem AI adaptif",
            tip: "Ingat bahwa kunci utama AI adalah kemampuannya belajar dari data, bukan sekadar kecepatan menghitung.",
          },
          {
            pointNumber: '02',
            title: "Alur Pemrosesan Masukan Sensorik",
            description: "Sistem pintar seperti robot Ribo mengubah input suara via mikrofon menjadi sinyal digital, mengidentifikasi kata kunci aksi, dan memicu respon fisik secara akurat.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Diagram Pemrosesan Suara (Alur Pemrosesan Masukan Sensorik)
            imageUrl: '/images/materi/level1-ch1-poin2.png',
            imageBadge: "Diagram Pemrosesan Suara",
            imageAlt: "Diagram alir suara manusia dikonversi mikrofon menjadi data digital yang diproses AI",
            tip: "Setiap perintah suara selalu dipecah menjadi identifikasi aksi (kata kerja) dan target objek (kata benda).",
          },
          {
            pointNumber: '03',
            title: "Tonggak Sejarah & Utilisasi Multisektor",
            description: "Gagasan mesin berpikir Alan Turing (1950) kini berwujud nyata dalam dunia medis, asisten virtual, sistem kendali otonom, dan mesin penerjemah multibahasa.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Infografis Utilisasi AI (Tonggak Sejarah & Utilisasi Multisektor)
            imageUrl: '/images/materi/level1-ch1-poin3.png',
            imageBadge: "Infografis Utilisasi AI",
            imageAlt: "Infografis pemanfaatan AI di bidang kesehatan, transportasi, dan pendidikan",
            tip: "Perhatikan bahwa AI diciptakan sebagai amplifikasi kecerdasan manusia, bukan untuk menggantikan peran kemanusiaan seutuhnya.",
          },
        ],
      },
      {
        key: 'level1-ch-2',
        chapterNumber: 2,
        title: "Berpikir Komputasional: Decomposition (Mengurai Masalah)",
        description: "Menguasai keterampilan memecah persoalan besar dan kompleks menjadi sub-masalah kecil yang konkret dan dapat dikelola.",
        durationMinutes: 20,
        minWatchSeconds: 90,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Berpikir Komputasional: Decomposition (Mengurai Masalah)
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Berpikir Komputasional (Computational Thinking) merupakan metodologi pemecahan masalah sistematis yang diadopsi dari cara kerja ilmuwan komputer. Pilar fundamental pertamanya adalah Dekomposisi (Decomposition), yaitu teknik mental untuk memecah masalah besar, rumit, atau abstrak menjadi bagian-bagian kecil, terisolasi, dan terdefinisi dengan jelas sehingga jauh lebih mudah dianalisis, dirancang solusinya, dan diselesaikan secara bertahap.\n\nDalam realitas kehidupan sehari-hari, manusia kerap merasa kewalahan ketika berhadapan dengan target yang masif, seperti membersihkan seluruh rumah atau membuat sebuah aplikasi gim. Pendekatan dekomposisi mengajarkan analogi 'memotong pizza': sebuah pizza utuh mustahil ditelan sekaligus, namun dengan membaginya menjadi potongan-potongan terukur, kita dapat menikmatinya satu per satu tanpa hambatan. Ketika merancang proyek gim, dekomposisi membedah proyek tersebut menjadi perancangan antarmuka, penyusunan mekanik aturan, logika penilaian poin, integrasi efek audio, dan pengujian kesalahan teknis.\n\nSelain menyederhanakan beban kognitif individu, dekomposisi menjadi prasyarat mutlak dalam kolaborasi tim profesional. Ketika sebuah masalah telah terurai menjadi modul-modul independen, anggota tim dapat berbagi tugas secara paralel sesuai keahlian masing-masing. Koki kepala di restoran mewah, manajer proyek perangkat lunak, hingga arsitek bangunan bertingkat mengandalkan dekomposisi untuk mengorkestrasi pekerjaan besar menjadi eksekusi harian yang terukur dan bebas stres.",
        hasQuiz: true,
        quizKey: 'quiz-level1-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Prinsip Reduksi Kompleksitas Masalah",
            description: "Dekomposisi mereduksi kecemasan menghadapi tugas masif dengan membaginya menjadi unit terkecil yang memiliki batasan kerja jelas.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Hierarki Dekomposisi (Prinsip Reduksi Kompleksitas Masalah)
            imageUrl: '/images/materi/level1-ch2-poin1.png',
            imageBadge: "Hierarki Dekomposisi",
            imageAlt: "Bagan penguraian masalah besar menjadi beberapa sub-tugas terorganisir",
            tip: "Gunakan analogi 'potong pizza': jangan menelan masalah bulat-bulat, bagi menjadi irisan kecil yang realistis.",
          },
          {
            pointNumber: '02',
            title: "Distribusi Tugas Paralel dalam Tim",
            description: "Struktur modular hasil dekomposisi mempermudah pembagian tanggung jawab spesifik kepada setiap anggota tim kerja secara transparan.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Skema Kolaborasi Tim (Distribusi Tugas Paralel dalam Tim)
            imageUrl: '/images/materi/level1-ch2-poin2.png',
            imageBadge: "Skema Kolaborasi Tim",
            imageAlt: "Ilustrasi pembagian sub-tugas proyek kepada masing-masing anggota kelompok",
            tip: "Pastikan setiap sub-tugas memiliki penanggung jawab dan kriteria keberhasilan yang jelas.",
          },
          {
            pointNumber: '03',
            title: "Visualisasi Alur Menggunakan Mind Mapping",
            description: "Pemetaan pikiran berbasis cabang konsep mempermudah pelacakan keterkaitan antar sub-tugas dari persiapan awal hingga hasil akhir.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Peta Pikiran Operasional (Visualisasi Alur Menggunakan Mind Mapping)
            imageUrl: '/images/materi/level1-ch2-poin3.png',
            imageBadge: "Peta Pikiran Operasional",
            imageAlt: "Diagram mind map penguraian langkah memasak mi instan dari rebus air hingga penyajian",
            tip: "Tuliskan tujuan akhir di simpul utama, lalu tarik cabang untuk kategori persiapan, eksekusi, dan evaluasi.",
          },
        ],
      },
    ],
  },
  {
    key: 'course-level-2',
    title: "Level 2: Pola, Abstraksi, dan Desain Algoritma Komputasional",
    tagline: "Mengasah Kemahiran Menemukan Keteraturan Data, Reduksi Detail, dan Perancangan Alur Sistematis",
    category: "Berpikir Komputasional & Logika Pemrograman",
    level: "Level 2: Menengah",
    badge: "Sertifikasi Logika Komputasi Terapan SFA 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Level 2: Pola, Abstraksi, dan Desain Algoritma Komputasional
    thumbnail: '/images/materi/thumb-level-2.jpg',
    description: "Mengintegrasikan tiga pilar komputasional tingkat menengah: mengenali pola dan keteraturan data (pattern recognition), menyaring esensi informasi dengan membuang detail tak relevan (abstraction), serta merancang prosedur solusi logis bertahap melalui flowchart dan pseudocode (algorithm design).",
    estimatedHours: 4.5,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'level2-ch-1',
        chapterNumber: 1,
        title: "Pattern Recognition (Pengenalan Pola)",
        description: "Mengembangkan kemampuan mengidentifikasi kesamaan, keteraturan, dan tren berulang dalam kumpulan informasi untuk memprediksi hasil masa depan.",
        durationMinutes: 20,
        minWatchSeconds: 90,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Pattern Recognition (Pengenalan Pola)
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Pengenalan Pola (Pattern Recognition) adalah kemampuan kognitif dan algoritmik untuk mengidentifikasi kesamaan, keteraturan berulang, atau tren tren tertentu di dalam kumpulan data yang terlihat acak. Pola dapat berwujud barisan aritmatika dalam matematika, keselarasan ritme dalam melodi musik, pengulangan siklus cuaca harian, hingga kemiripan struktur wajah biologis. Ketika manusia mampu membaca pola, proses pengambilan keputusan menjadi jauh lebih cepat dan akurat.\n\nDalam arsitektur komputasi modern, pattern recognition bertindak sebagai fondasi utama di balik kecerdasan buatan dan machine learning. Komputer tidak dapat 'berpikir' secara filosofis, melainkan melakukan kalkulasi matematis terhadap jutaan sampel data untuk menemukan pola keteraturan. Misalnya, fitur pengenal wajah pada ponsel pintar mengidentifikasi pola jarak matematis antara mata, hidung, dan bibir pengguna untuk membuka kunci layar secara aman.\n\nKeterampilan mengenali pola memberikan keunggulan prediktif yang luar biasa. Dokter menganalisis pola kemunculan gejala klinis untuk mendiagnosis penyakit langka tanpa harus melakukan uji coba acak, sementara detektif forensik memeriksa kesamaan modus operandi untuk memecahkan kasus investigasi. Dengan melatih ketelitian pola, peserta didik mengasah insting analitis dalam melihat keteraturan tersembunyi di balik fenomena dunia digital dan alam semesta.",
        hasQuiz: true,
        quizKey: 'quiz-level2-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Identifikasi Keteraturan & Prediksi Masa Depan",
            description: "Mengenali pola berulang memungkinkan kita merumuskan aturan logis dan memperkirakan peristiwa selanjutnya sebelum terjadi.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Model Barisan & Prediksi (Identifikasi Keteraturan & Prediksi Masa Depan)
            imageUrl: '/images/materi/level2-ch1-poin1.png',
            imageBadge: "Model Barisan & Prediksi",
            imageAlt: "Ilustrasi pola barisan bentuk geometri berulang dan prediksi elemen berikutnya",
            tip: "Cari selisih atau pola perulangan terkecil yang konsisten di antara elemen data yang diberikan.",
          },
          {
            pointNumber: '02',
            title: "Pondasi Ekstraksi Fitur Machine Learning",
            description: "Sistem AI mengenali identitas visual, audio, dan bahasa melalui pencocokan matriks pola digital yang diekstrak dari dataset masif.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Ekstraksi Fitur Biometrik (Pondasi Ekstraksi Fitur Machine Learning)
            imageUrl: '/images/materi/level2-ch1-poin2.png',
            imageBadge: "Ekstraksi Fitur Biometrik",
            imageAlt: "Bagan sistem AI mendeteksi titik kontur wajah manusia menggunakan pengenalan pola",
            tip: "Semakin banyak sampel data pola yang dipelajari mesin, semakin tinggi akurasi prediksi yang dihasilkan.",
          },
          {
            pointNumber: '03',
            title: "Generalisasi Solusi pada Masalah Berulang",
            description: "Menemukan pola pada masalah yang sering muncul menghindarkan kita dari keharusan merancang solusi dari nol setiap saat.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Pola Siklus Alamiah (Generalisasi Solusi pada Masalah Berulang)
            imageUrl: '/images/materi/level2-ch1-poin3.png',
            imageBadge: "Pola Siklus Alamiah",
            imageAlt: "Infografis siklus cuaca mingguan yang membentuk pola prediksi hujan sore hari",
            tip: "Jika Anda menemukan masalah yang mirip dengan kasus lampau, terapkan modifikasi solusi dari pola sebelumnya.",
          },
        ],
      },
      {
        key: 'level2-ch-2',
        chapterNumber: 2,
        title: "Abstraction (Abstraksi)",
        description: "Menyaring informasi krusial dan mengeliminasi rincian yang tidak relevan guna menyusun representasi masalah yang efisien.",
        durationMinutes: 20,
        minWatchSeconds: 90,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Abstraction (Abstraksi)
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Abstraksi (Abstraction) adalah proses mental menyederhanakan suatu masalah atau sistem yang kompleks dengan berfokus secara eksklusif pada informasi esensial dan mengabaikan rincian atau detail teknis yang tidak relevan dengan tujuan pemecahan masalah. Kemampuan ini mencegah otak manusia maupun memori komputer dari 'kelebihan beban kognitif' akibat memproses data periferal yang tidak berdampak langsung terhadap hasil akhir.\n\nContoh paling elegan dari penerapan abstraksi adalah peta navigasi digital seperti Google Maps. Peta navigasi tidak menampilkan bentuk genteng setiap rumah, warna cat pagar, atau jumlah daun pada pepohonan di tepi jalan, melainkan hanya menampilkan garis jalan utama, arah belokan, nama kawasan, dan indikator kepadatan lalu lintas. Jika semua detail fisik digambarkan secara utuh, peta tersebut justru menjadi sangat rumit, lambat dimuat, dan membingungkan pengguna jalan.\n\nDalam rekayasa sistem perangkat lunak, abstraksi memungkinkan pembuatan antarmuka (interface) yang ramah pengguna. Pengemudi mobil cukup mengoperasikan pedal gas, rem, dan roda kemudi tanpa harus mengerti reaksi termodinamika di ruang bakar mesin silinder. Demikian pula siswa yang menguasai abstraksi akan mampu meringkas esensi cerita, menyusun daftar kebutuhan inti kegiatan, dan merumuskan model solusi matematika yang dapat digeneralisasi untuk berbagai permasalahan serupa.",
        hasQuiz: true,
        quizKey: 'quiz-level2-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Prinsip Penyaringan Esensi Informasi",
            description: "Abstraksi memisahkan inti permasalahan dari kebisingan detail, memungkinkan fokus penuh pada tujuan strategis pemecahan masalah.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Diagram Filtrasi Data (Prinsip Penyaringan Esensi Informasi)
            imageUrl: '/images/materi/level2-ch2-poin1.png',
            imageBadge: "Diagram Filtrasi Data",
            imageAlt: "Bagan penyaringan informasi yang menyisakan hanya data krusial untuk solusi",
            tip: "Tanyakan pada diri sendiri: 'Apakah informasi ini mutlak diperlukan untuk menyelesaikan target saat ini?'",
          },
          {
            pointNumber: '02',
            title: "Representasi Peta Model Minimalis",
            description: "Peta digital dan denah ruang mengabaikan ornamen visual kecil agar pengguna dapat menangkap navigasi arah dan fungsi ruang dalam hitungan detik.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Model Abstraksi Spasial (Representasi Peta Model Minimalis)
            imageUrl: '/images/materi/level2-ch2-poin2.png',
            imageBadge: "Model Abstraksi Spasial",
            imageAlt: "Perbandingan foto satelit penuh detail versus peta garis jalan hasil abstraksi",
            tip: "Desain yang baik bukanlah saat tidak ada lagi yang bisa ditambah, melainkan saat tidak ada lagi yang bisa dikurangi.",
          },
          {
            pointNumber: '03',
            title: "Generalisasi Solusi Universal",
            description: "Dengan mengeliminasi detail spesifik, model solusi yang diabstraksikan dapat dipakai ulang untuk menyelesaikan kasus lain yang polanya identik.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Skema Generalisasi (Generalisasi Solusi Universal)
            imageUrl: '/images/materi/level2-ch2-poin3.png',
            imageBadge: "Skema Generalisasi",
            imageAlt: "Ilustrasi model solusi tunggal yang dapat diaplikasikan ke berbagai konteks permasalahan",
            tip: "Bangun kerangka acuan umum terlebih dahulu sebelum memikirkan variasi kasus khusus.",
          },
        ],
      },
      {
        key: 'level2-ch-3',
        chapterNumber: 3,
        title: "Algorithm Design (Desain Algoritma)",
        description: "Menyusun rangkaian instruksi solusi bertahap yang runtut, terdefinisi jelas, berhingga, dan efektif melalui flowchart dan pseudocode.",
        durationMinutes: 25,
        minWatchSeconds: 100,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Algorithm Design (Desain Algoritma)
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Desain Algoritma (Algorithm Design) adalah fase perumusan solusi konkret berupa urutan instruksi langkah demi langkah yang logis, terstruktur, dan teratur untuk menyelesaikan suatu masalah atau menghasilkan luaran yang diinginkan. Istilah algoritma berakar dari nama ilmuwan matematika dan astronomi Muslim legendaris abad ke-9, Muhammad ibn Musa al-Khwarizmi. Dalam dunia logika komputer, urutan eksekusi langkah adalah segalanya; pembalikan urutan langkah akan membatalkan validitas hasil akhir secara fatal.\n\nSebuah algoritma yang bermutu wajib memenuhi tiga karakteristik esensial: Jelas (unambiguous), di mana setiap instruksi memiliki interpretasi tunggal dan tidak menimbulkan multi-tafsir; Terbatas (finite), yang memastikan bahwa algoritma memiliki kondisi berhenti pasti dan tidak terjebak dalam perulangan tanpa henti (infinite loop); serta Efektif (effective), di mana seluruh operasi yang diperintahkan benar-benar dapat dieksekusi secara rasional dan memberikan solusi tepat sasaran.\n\nDalam mendokumentasikan algoritma, terdapat dua instrumen utama yang lazim digunakan secara profesional. Flowchart (diagram alur) memanfaatkan simbol-simbol grafis terstandardisasi seperti terminator oval untuk status awal/akhir, balok persegi panjang untuk proses kalkulasi, dan belah ketupat untuk titik pengambilan keputusan bersyarat (decision branching). Sementara itu, Pseudocode menyajikan logika algoritma menggunakan bahasa manusia terstruktur yang menyerupai sintaks kode pemrograman tingkat tinggi tanpa terikat pada aturan gramatikal bahasa pemrograman tertentu.",
        hasQuiz: true,
        quizKey: 'quiz-level2-ch-3',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Tiga Karakteristik Baku Algoritma",
            description: "Instruksi wajib memiliki makna eksplisit yang jelas, proses yang pasti berujung selesai (terbatas), serta efektivitas capaian solusi.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Kriteria Baku Algoritma (Tiga Karakteristik Baku Algoritma)
            imageUrl: '/images/materi/level2-ch3-poin1.png',
            imageBadge: "Kriteria Baku Algoritma",
            imageAlt: "Infografis tiga pilar algoritma: Jelas, Terbatas, dan Efektif",
            tip: "Pastikan urutan tidak tertukar; kesalahan sekuensial adalah sumber utama kegagalan program (bug).",
          },
          {
            pointNumber: '02',
            title: "Standarisasi Notasi Grafis Flowchart",
            description: "Mengomunikasikan alur logika sistem secara visual melalui simbol terminator, kotak aksi operasional, dan belah ketupat evaluasi kondisi logis.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Katalog Simbol Flowchart (Standarisasi Notasi Grafis Flowchart)
            imageUrl: '/images/materi/level2-ch3-poin2.png',
            imageBadge: "Katalog Simbol Flowchart",
            imageAlt: "Bagan simbol flowchart standar: oval mulai/selesai, persegi proses, belah ketupat keputusan",
            tip: "Gunakan belah ketupat hanya saat terdapat percabangan logika 'Ya' atau 'Tidak'.",
          },
          {
            pointNumber: '03',
            title: "Formulasi Logika Berbasis Pseudocode",
            description: "Menuliskan rancangan algoritma dengan instruksi tekstual terstruktur yang menjembatani bahasa konseptual manusia menuju sintaks bahasa pemrograman.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Struktur Notasi Pseudocode (Formulasi Logika Berbasis Pseudocode)
            imageUrl: '/images/materi/level2-ch3-poin3.png',
            imageBadge: "Struktur Notasi Pseudocode",
            imageAlt: "Contoh penulisan pseudocode terstruktur untuk algoritma menyikat gigi secara runtut",
            tip: "Tuliskan pseudocode dengan indentasi yang rapi untuk merefleksikan blok percabangan dan perulangan.",
          },
        ],
      },
    ],
  },
  {
    key: 'course-level-3',
    title: "Level 3: Etika Kecerdasan Buatan & Ekosistem Digital Indonesia",
    tagline: "Menegakkan Moralitas Teknologi, Proteksi Privasi, dan Pemahaman Tata Kelola Domain .id",
    category: "Etika Siber & Tata Kelola Internet",
    level: "Level 3: Lanjutan (Mahir)",
    badge: "Sertifikasi Etika & Tata Kelola Digital SFA 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Level 3: Etika Kecerdasan Buatan & Ekosistem Digital Indonesia
    thumbnail: '/images/materi/thumb-level-3.jpg',
    description: "Menganalisis prinsip-prinsip etika kecerdasan buatan—mencakup tanggung jawab, privasi data, bias algoritma, transparansi keputusan, dan mitigasi kejahatan manipulasi informasi—serta menelaah tata kelola internet nasional melalui struktur domain resmi .id dan peran kelembagaan PANDI.",
    estimatedHours: 3.5,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'level3-ch-1',
        chapterNumber: 1,
        title: "Etika AI untuk Siswa: Tanggung Jawab, Privasi, dan Keadilan Algoritma",
        description: "Mempelajari lima pilar etika AI, bahaya bias data pelatihan, perlindungan privasi data pribadi, mitigasi manipulasi deepfake, serta integritas akademik.",
        durationMinutes: 25,
        minWatchSeconds: 100,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Etika AI untuk Siswa: Tanggung Jawab, Privasi, dan Keadilan Algoritma
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Seiring pesatnya adopsi kecerdasan buatan dalam ranah sosial dan akademik, pemahaman mengenai Etika AI (AI Ethics) menjadi kompetensi krusial yang mutlak dimiliki generasi muda. Etika AI adalah seperangkat norma, nilai filosofis, dan prinsip moral yang mengatur bagaimana sistem kecerdasan buatan dirancang, dilatih, dioperasikan, dan diawasi agar tetap selaras dengan harkat kemanusiaan, berkeadilan sosial, aman, serta tidak mendatangkan kerugian bagi individu maupun peradaban.\n\nKerangka etika kecerdasan buatan bertumpu pada lima pilar fundamental: Tanggung Jawab (Responsibility), yang menegaskan bahwa tanggung jawab moral dan hukum tetap berada di tangan pengembang dan pengguna manusia, bukan pada entitas mesin; Privasi Data (Data Privacy), yaitu keharusan melindungi data pribadi dan biometrik dari eksploitasi tanpa izin; Keadilan Bebas Bias (Fairness & Bias), yang menuntut dataset pelatihan bebas dari prasangka diskriminatif; Transparansi (Transparency), yaitu hak pengguna untuk memahami logika di balik keputusan sistem; serta Keamanan (Security), perlindungan terhadap manipulasi destruktif seperti konten palsu deepfake.\n\nDalam konteks interaksi pelajar, etika AI menuntut integritas dan kesadaran kritis. Penggunaan model bahasa besar seperti ChatGPT untuk menyelesaikan tugas sekolah wajib diposisikan sebagai mitra bertukar pikiran konseptual, bukan alat otomatisasi plagiasi yang menumpulkan kemampuan berpikir kritis. Siswa juga harus mewaspadai efek ruang gema (echo chamber) dan manipulasi citra tubuh akibat penggunaan filter wajah berlebihan di media sosial demi menjaga kesehatan mental dan etika digital yang sehat.",
        hasQuiz: true,
        quizKey: 'quiz-level3-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Akuntabilitas Manusia atas Keputusan AI",
            description: "Mesin dan algoritma hanyalah instrumen komputasi; kewajiban moral, etis, dan hukum mutlak melekat pada manusia pembuat dan penggunanya.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Pilar Akuntabilitas Human-in-the-Loop (Akuntabilitas Manusia atas Keputusan AI)
            imageUrl: '/images/materi/level3-ch1-poin1.png',
            imageBadge: "Pilar Akuntabilitas Human-in-the-Loop",
            imageAlt: "Bagan 5 pilar etika AI: tanggung jawab, privasi, bebas bias, transparansi, keamanan",
            tip: "Jangan pernah melemparkan kesalahan analisis atau tindakan ilegal kepada sistem AI.",
          },
          {
            pointNumber: '02',
            title: "Bias Dataset & Keadilan Algoritmik",
            description: "Jika data pelatihan bersifat timpang atau tidak representatif, AI akan mereplikasi diskriminasi sistemik dalam penilaian dan klasifikasinya.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Analisis Bias Data (Bias Dataset & Keadilan Algoritmik)
            imageUrl: '/images/materi/level3-ch1-poin2.png',
            imageBadge: "Analisis Bias Data",
            imageAlt: "Ilustrasi timbangan keadilan terganggu oleh dataset latih yang tidak seimbang",
            tip: "Kritisi setiap hasil rekomendasi otomatis mesin; periksa apakah sampel data yang digunakan sudah inklusif.",
          },
          {
            pointNumber: '03',
            title: "Integritas Privasi & Waspada Deepfake",
            description: "Batasi pemberian izin akses galeri foto pada aplikasi sembarangan dan selalu verifikasi keaslian rekaman audio-visual dari ancaman fabrikasi AI.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Proteksi Privasi Biometrik (Integritas Privasi & Waspada Deepfake)
            imageUrl: '/images/materi/level3-ch1-poin3.png',
            imageBadge: "Proteksi Privasi Biometrik",
            imageAlt: "Grafis perisai keamanan data pribadi terhadap ancaman rekayasa visual deepfake",
            tip: "Foto biometrik wajah Anda adalah data privat; jangan sembarangan mengunggahnya ke server yang tak jelas reputasinya.",
          },
        ],
      },
      {
        key: 'level3-ch-2',
        chapterNumber: 2,
        title: "Mengenal Identitas Digital & Tata Kelola Domain .id",
        description: "Memahami sistem penamaan domain internet, keunggulan domain berkode negara .id, regulasi kelembagaan PANDI, dan tata kelola internet global.",
        durationMinutes: 20,
        minWatchSeconds: 90,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Mengenal Identitas Digital & Tata Kelola Domain .id
        youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        textContent: "Internet global beroperasi menggunakan sistem pengalamatan berbasis deretan angka biner unik yang dikenal sebagai Internet Protocol (IP) Address. Namun, karena keterbatasan memori kognitif manusia dalam menghafal kombinasi numerik rumit, Domain Name System (DNS) hadir untuk memetakan IP address ke dalam Nama Domain tekstual yang intuitif dan bermakna. Nama domain berfungsi layaknya alamat domisili resmi sebuah entitas atau individu pada jaringan internet global.\n\nDalam hierarki sistem domain, ekstensi '.id' merupakan Country Code Top-Level Domain (ccTLD) yang merepresentasikan kedaulatan, identitas kultural, dan reputasi hukum Negara Kesatuan Republik Indonesia. Memanfaatkan domain .id memberikan kredibilitas tinggi bagi institusi pendidikan, korporasi, maupun portofolio personal pelajar karena terikat langsung dengan verifikasi identitas resmi. Hingga akhir tahun 2024, domain .id telah tumbuh menjadi pengelola domain terbesar di kawasan Asia Tenggara dengan menembus lebih dari 1,2 juta nama domain terdaftar.\n\nTata kelola nama domain nasional dioperasikan secara profesional oleh Pengelola Nama Domain Internet Indonesia (PANDI), sebuah perkumpulan multipemangku kepentingan yang menerima mandat redelegasi dari Internet Assigned Numbers Authority (IANA) sejak tahun 2013. PANDI memastikan kestabilan ekosistem digital nasional melalui pengoperasian 44 server DNS Anycast berkecepatan tinggi yang tersebar di dalam dan luar negeri, menegakkan kepatuhan terhadap regulasi perundang-undangan nasional, serta aktif mengawal forum tata kelola internet internasional seperti ICANN dan APTLD.",
        hasQuiz: true,
        quizKey: 'quiz-level3-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Sistem DNS sebagai Direktori Internet",
            description: "Domain Name System mentranslasikan deretan alamat IP angka yang rumit menjadi label nama yang mudah diakses dan diingat oleh manusia.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Skema Pemetaan DNS (Sistem DNS sebagai Direktori Internet)
            imageUrl: '/images/materi/level3-ch2-poin1.png',
            imageBadge: "Skema Pemetaan DNS",
            imageAlt: "Diagram pemetaan dari alamat numerik IP address menuju nama domain sekolahku.id",
            tip: "Nama domain adalah representasi alamat rumah digital Anda di seluruh dunia maya.",
          },
          {
            pointNumber: '02',
            title: "Kedaulatan & Keunggulan Domain .id",
            description: "Ekstensi ccTLD .id menegaskan identitas entitas Indonesia, memiliki kepatuhan hukum ketat, dan memberikan tingkat kepercayaan tinggi bagi pengguna lokal.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Identitas Digital Nasional (Kedaulatan & Keunggulan Domain .id)
            imageUrl: '/images/materi/level3-ch2-poin2.png',
            imageBadge: "Identitas Digital Nasional",
            imageAlt: "Logo 3D domain .id sebagai identitas resmi dan kedaulatan siber Indonesia",
            tip: "Menggunakan domain .id membuat alamat portofolio digital Anda dinilai lebih profesional dan kredibel.",
          },
          {
            pointNumber: '03',
            title: "Peran PANDI dalam Arsitektur DNS Global",
            description: "PANDI mengoperasikan puluhan simpul DNS Anycast di berbagai belahan dunia untuk menjamin kecepatan, ketersediaan, dan ketahanan siber domain nasional.",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Peta Infrastruktur DNS Anycast (Peran PANDI dalam Arsitektur DNS Global)
            imageUrl: '/images/materi/level3-ch2-poin3.png',
            imageBadge: "Peta Infrastruktur DNS Anycast",
            imageAlt: "Peta persebaran 44 server DNS Anycast PANDI di dalam negeri dan mancanegara",
            tip: "Sistem terdistribusi Anycast memastikan website tetap dapat dibuka cepat dari belahan dunia mana pun.",
          },
        ],
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

export function getNextChapter(courseKey: string, currentChapterKey: string): Chapter | undefined {
  const course = getCourseByKey(courseKey);
  if (!course) return undefined;
  const currentIndex = course.chapters.findIndex((ch) => ch.key === currentChapterKey);
  if (currentIndex === -1 || currentIndex >= course.chapters.length - 1) {
    return undefined;
  }
  return course.chapters[currentIndex + 1];
}

export function getPreviousChapter(courseKey: string, currentChapterKey: string): Chapter | undefined {
  const course = getCourseByKey(courseKey);
  if (!course) return undefined;
  const currentIndex = course.chapters.findIndex((ch) => ch.key === currentChapterKey);
  if (currentIndex <= 0) {
    return undefined;
  }
  return course.chapters[currentIndex - 1];
}
