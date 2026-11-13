/**
 * Official Curriculum Data (Multi-Level: 4 Levels)
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
  AI_ROBOTIKA: 'ai-robotika',
  DEKOMPOSISI_POLA: 'dekomposisi-pola',
  ABSTRAKSI_ALGORITMA: 'abstraksi-algoritma',
  ETIKA_DIGITAL: 'etika-digital',
  // Backwards compatibility aliases
  LEVEL_1: 'ai-robotika',
  LEVEL_2: 'dekomposisi-pola',
  LEVEL_3: 'abstraksi-algoritma',
  LEVEL_4: 'etika-digital',
  BEGINNER: 'ai-robotika',
  INTERMEDIATE: 'dekomposisi-pola',
} as const;

export const CHAPTER_KEYS = {
  AIR_CH1: 'air-ch-1',
  AIR_CH2: 'air-ch-2',
  AIR_CH3: 'air-ch-3',
  DEK_CH1: 'dek-ch-1',
  DEK_CH2: 'dek-ch-2',
  DEK_CH3: 'dek-ch-3',
  ALG_CH1: 'alg-ch-1',
  ALG_CH2: 'alg-ch-2',
  ALG_CH3: 'alg-ch-3',
  ETIKA_CH1: 'etika-ch-1',
  ETIKA_CH2: 'etika-ch-2',
  ETIKA_CH3: 'etika-ch-3',
  // Backwards compatibility aliases
  LEVEL1_CH1: 'air-ch-1',
  LEVEL1_CH2: 'air-ch-2',
  LEVEL1_CH3: 'air-ch-3',
  LEVEL2_CH1: 'dek-ch-1',
  LEVEL2_CH2: 'dek-ch-2',
  LEVEL2_CH3: 'dek-ch-3',
  LEVEL3_CH1: 'alg-ch-1',
  LEVEL3_CH2: 'alg-ch-2',
  LEVEL3_CH3: 'alg-ch-3',
  LEVEL4_CH1: 'etika-ch-1',
  LEVEL4_CH2: 'etika-ch-2',
  LEVEL4_CH3: 'etika-ch-3',
  BEGINNER_CH1: 'air-ch-1',
  BEGINNER_CH2: 'air-ch-2',
  BEGINNER_CH3: 'air-ch-3',
  BEGINNER_CH4: 'dek-ch-1',
  INTERMEDIATE_CH1: 'dek-ch-2',
  INTERMEDIATE_CH2: 'dek-ch-3',
  INTERMEDIATE_CH3: 'alg-ch-1',
} as const;

export const COURSES_DATA: Course[] = [
  {
    key: 'ai-robotika',
    title: "Dasar Kecerdasan Buatan & Robotika Cerdas",
    tagline: "Membangun Pemahaman Esensial tentang Cara Mesin Berpikir, Belajar, dan Membantu Manusia",
    category: "Kecerdasan Buatan & Robotika",
    level: "Tingkat: Pengenalan",
    badge: "Sertifikasi Fondasi AI PANDAI 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Dasar Kecerdasan Buatan & Robotika Cerdas
    thumbnail: '/images/materi/thumb-level-1.jpg',
    description: "Kursus pengantar yang mengeksplorasi hakikat kecerdasan buatan, perbedaannya dengan program komputer konvensional, pemrosesan sensorik pada robot pintar, sejarah perkembangan AI sejak Alan Turing, hingga pemanfaatannya dalam kehidupan sehari-hari.",
    estimatedHours: 3,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'air-ch-1',
        chapterNumber: 1,
        title: "Hakikat Kecerdasan Buatan & Cara Mesin Belajar",
        description: "Memahami konsep kecerdasan buatan, perbedaannya dengan program statis, dan bagaimana data melatih mesin berpikir.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Hakikat Kecerdasan Buatan & Cara Mesin Belajar (Kok Bisa?)
        youtubeUrl: 'https://www.youtube.com/embed/_FcHPrRY5zg',
        textContent: "Kecerdasan Buatan atau Artificial Intelligence (AI) adalah bidang ilmu komputer yang berfokus pada pengembangan sistem cerdas yang mampu meniru cara berpikir, belajar, dan beradaptasi layaknya manusia[cite: 33, 34]. Sistem AI dirancang untuk memproses data masukan, mengenali karakteristik pola yang terkandung di dalamnya, dan mengambil keputusan secara mandiri[cite: 34]. Kemampuan adaptif inilah yang membedakan AI dengan teknologi komputasi terdahulu[cite: 34].\n\nPerbedaan utama antara program komputer biasa dan sistem AI terletak pada fleksibilitas operasionalnya[cite: 34]. Program biasa, seperti kalkulator elektronik, bekerja secara statis mengikuti deretan instruksi kaku tanpa memahami arti data yang diproses; kalkulator tidak akan pernah belajar dari kesalahan[cite: 34]. Sebaliknya, aplikasi berbasis AI seperti Google Translate terus belajar dari ribuan sampel teks multibahasa untuk memperbaiki kualitas dan keakuratan terjemahan dari waktu ke waktu[cite: 34, 37].\n\nMelalui kemampuan belajar dari data (machine learning), AI mampu memecahkan masalah non-linear yang tidak bisa diselesaikan dengan logika pemrograman biasa[cite: 34]. Komputer dengan AI dapat dilatih untuk mengenali wajah teman, memahami percakapan suara secara kontekstual, hingga mendeteksi anomali informasi digital secara otomatis[cite: 34]. Hal ini membuka babak baru di mana komputer tidak lagi hanya menjadi alat hitung, melainkan mitra berpikir manusia[cite: 34, 35].",
        hasQuiz: true,
        quizKey: 'quiz-air-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Karakter Adaptif AI vs Program Biasa",
            description: "Program biasa hanya mengeksekusi instruksi kaku yang telah ditentukan, sedangkan AI mampu belajar dari data masa lalu dan meningkatkan akurasinya secara berkelanjutan[cite: 34].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Matriks Komparasi (Karakter Adaptif AI vs Program Biasa)
            imageUrl: '/images/materi/level1-ch1-poin1.png',
            imageBadge: "Matriks Komparasi",
            imageAlt: "Tabel perbandingan alur kerja kalkulator statis versus aplikasi penerjemah AI yang adaptif",
            tip: "Ingat bahwa kemampuan utama AI terletak pada proses belajarnya dari data, bukan sekadar kecepatan menghitung[cite: 34, 36].",
          },
          {
            pointNumber: '02',
            title: "Analog Kalkulator vs Penerjemah Bahasa",
            description: "Kalkulator tidak pernah mengerti arti angka yang dihitung, sedangkan Google Translate memahami konteks kalimat melalui pola data kebahasaan[cite: 34].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Analogi Konseptual (Analog Kalkulator vs Penerjemah Bahasa)
            imageUrl: '/images/materi/level1-ch1-poin2.png',
            imageBadge: "Analogi Konseptual",
            imageAlt: "Ilustrasi kalkulator biasa bersanding dengan sistem AI penerjemah teks",
            tip: "Perhatikan bahwa sistem AI membutuhkan dataset yang melimpah untuk melatih akurasinya[cite: 34, 37].",
          },
          {
            pointNumber: '03',
            title: "Kapasitas Kognitif Mesin",
            description: "AI memungkinkan mesin mengenali gambar, mengerti suara manusia, dan mengambil keputusan logis berdasarkan pengalaman sebelumnya[cite: 34].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Kemampuan Kognitif (Kapasitas Kognitif Mesin)
            imageUrl: '/images/materi/level1-ch1-poin3.png',
            imageBadge: "Kemampuan Kognitif",
            imageAlt: "Diagram kemampuan AI dalam pengenalan visual, audio, dan inferensi keputusan",
            tip: "Gunakan kata kunci 'Melihat, Mendengar, dan Belajar' untuk mengingat kapabilitas dasar AI[cite: 34].",
          },
        ],
      },
      {
        key: 'air-ch-2',
        chapterNumber: 2,
        title: "AI Penolong Manusia & Ragam Penerapan Sektoral",
        description: "Menelaah implementasi AI di bidang medis, transportasi, pendidikan, dan alur pemrosesan sensorik pada robot pintar.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: AI Penolong Manusia & Ragam Penerapan Sektoral (kejarcita)
        youtubeUrl: 'https://www.youtube.com/embed/aZu72a5UV7s',
        textContent: "Kecerdasan Buatan telah bertransformasi dari eksperimen laboratorium menjadi penolong nyata yang mempermudah berbagai sektor kehidupan manusia[cite: 35]. Di dunia kesehatan, AI membantu dokter menganalisis citra medis seperti rontgen untuk mendeteksi penyakit lebih cepat dan akurat[cite: 35, 37]. Di bidang transportasi publik dan logistik, algoritma AI mengendalikan mobil tanpa sopir untuk memindai kondisi jalan raya serta menghindari potensi tabrakan secara waktu-nyata[cite: 35, 37].\n\nDi lingkungan pendidikan dan rumah pintar, AI beroperasi melalui asisten virtual seperti Siri, Alexa, atau Google Assistant[cite: 35, 37]. Sistem ini mendengarkan perintah suara melalui mikrofon, mengonversi gelombang suara analog menjadi format data digital, lalu menganalisis kata kerja aksi dan objek yang dituju[cite: 36]. Contohnya, pada robot pintar Ribo, perintah 'nyalakan lampu' diterjemahkan menjadi sinyal elektrik untuk mengaktifkan saklar ruangan[cite: 35, 36].\n\nAI dalam pendidikan juga bertindak sebagai asisten belajar mandiri yang mampu memahami ritme serta kebutuhan unik setiap peserta didik[cite: 35, 38]. Melalui pemanfaatan yang tepat, AI mempercepat pekerjaan, meminimalkan risiko human error, dan meningkatkan kualitas hidup masyarakat secara luas[cite: 35]. Namun, keberhasilan teknologi ini tetap bertumpu pada peran manusia yang mengarahkan dan mengendalikannya secara bijaksana[cite: 35, 105].",
        hasQuiz: true,
        quizKey: 'quiz-air-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Peran Augmentatif di Bidang Medis",
            description: "AI bertindak sebagai instrumen diagnostik yang mempercepat analisis data rontgen dan rekam medis pasien tanpa menggantikan peran dokter[cite: 35, 37].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: AI Medis (Peran Augmentatif di Bidang Medis)
            imageUrl: '/images/materi/level1-ch2-poin1.png',
            imageBadge: "AI Medis",
            imageAlt: "Ilustrasi dokter menggunakan tablet analisis AI untuk mendiagnosis hasil rontgen",
            tip: "AI berfungsi memperkuat (mengaugmentasi) keahlian tenaga ahli manusia[cite: 35].",
          },
          {
            pointNumber: '02',
            title: "Alur Konversi Suara Menjadi Tindakan",
            description: "Mikrofon menangkap suara, sistem mengonversinya ke data digital, mengekstraksi kata kunci perintah, dan memicu aksi perangkat fisik[cite: 36].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Pemrosesan Audio (Alur Konversi Suara Menjadi Tindakan)
            imageUrl: '/images/materi/level1-ch2-poin2.png',
            imageBadge: "Pemrosesan Audio",
            imageAlt: "Bagan tahapan pemrosesan suara pada robot pintar dari mikrofon hingga gerak mekanik",
            tip: "AI mengenali kata perintah sebagai 'aksi' dan kata benda sebagai 'target tindakan'[cite: 36].",
          },
          {
            pointNumber: '03',
            title: "Keselamatan dalam Transportasi Otonom",
            description: "Sensor kamera dan radar mobil otonom memproses kondisi lalu lintas secara konstan untuk mengambil keputusan berkendara yang aman[cite: 35, 37].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Sistem Otonom (Keselamatan dalam Transportasi Otonom)
            imageUrl: '/images/materi/level1-ch2-poin3.png',
            imageBadge: "Sistem Otonom",
            imageAlt: "Ilustrasi mobil otonom mendeteksi marka jalan dan pejalan kaki dengan sensor AI",
            tip: "Mobil otonom menggabungkan sensor penglihatan komputer dan logika prediksi keselamatan[cite: 35].",
          },
        ],
      },
      {
        key: 'air-ch-3',
        chapterNumber: 3,
        title: "Sejarah, Tokoh Pelopor, & Detektif AI di Lingkungan",
        description: "Menelusuri sejarah kelahiran AI sejak era Alan Turing, robotika klasik, hingga teknik mengidentifikasi AI di lingkungan sekitar.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Sejarah, Tokoh Pelopor (Alan Turing), & Detektif AI (Sepulang Sekolah)
        youtubeUrl: 'https://www.youtube.com/embed/vIJlJ_25yCA',
        textContent: "Gagasan mengenai mesin yang mampu berpikir telah dirintis jauh sebelum komputer elektronik modern diciptakan[cite: 39]. Pada tahun 1495, ilmuwan jenius Leonardo da Vinci merancang robot mekanik berkostum ksatria yang mampu duduk, berdiri, dan menggerakkan tangannya menggunakan sistem katrol mekanik[cite: 39]. Namun, fondasi teoritis AI modern baru dicetuskan pada dekade 1950-an ketika Alan Turing mengajukan pertanyaan legendaris: 'Bisakah mesin berpikir?'[cite: 39].\n\nIstilah 'Artificial Intelligence' secara resmi diikrarkan dalam konferensi Dartmouth College pada tahun 1956[cite: 39]. Sejak saat itu, AI berkembang pesat melintasi berbagai era: dari superkomputer Deep Blue milik IBM yang mengalahkan grandmaster catur dunia pada 1997, kehadiran robot humanoid Sophia yang mampu berdialog ekspresif, hingga ledakan model bahasa besar (LLM) seperti ChatGPT di era kontemporer[cite: 39].\n\nUntuk mengasah kepekaan teknologi, siswa diajak menjadi 'Detektif AI' dengan mengamati perangkat sehari-hari[cite: 40, 45]. Fitur filter kamera yang melacak kontur wajah, algoritma rekomendasi lagu pada aplikasi pemutar musik, serta kalkulasi rute tercepat pada Google Maps merupakan wujud nyata AI yang bekerja di sekitar kita tanpa kita sadari[cite: 40, 45]. Memahami sejarah dan manifestasi AI membangun kesadaran kritis bahwa teknologi selalu berevolusi mengikuti kebutuhan manusia[cite: 39, 45].",
        hasQuiz: true,
        quizKey: 'quiz-air-ch-3',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Pertanyaan Monumental Alan Turing (1950)",
            description: "Turing memelopori gagasan bahwa mesin dapat mengolah simbol dan informasi untuk meniru proses berpikir manusia[cite: 39].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Tonggak Sejarah (Pertanyaan Monumental Alan Turing (1950))
            imageUrl: '/images/materi/level1-ch3-poin1.png',
            imageBadge: "Tonggak Sejarah",
            imageAlt: "Sketsa Alan Turing dan rumusan pertanyaan filosofis tentang kecerdasan mesin",
            tip: "Turing Test adalah metode pengujian untuk melihat apakah mesin dapat menunjukkan kecerdasan setara manusia.",
          },
          {
            pointNumber: '02',
            title: "Evolusi dari Mekanik ke Komputasi Kognitif",
            description: "Perjalanan teknologi bergerak dari robot mekanik ksatria Leonardo da Vinci (1495) menuju model kognitif canggih seperti ChatGPT[cite: 39].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Garis Waktu Inovasi (Evolusi dari Mekanik ke Komputasi Kognitif)
            imageUrl: '/images/materi/level1-ch3-poin2.png',
            imageBadge: "Garis Waktu Inovasi",
            imageAlt: "Garis waktu evolusi kecerdasan mesin dari abad pertengahan hingga era kecerdasan generatif",
            tip: "Perkembangan daya komputasi perangkat keras menjadi pemicu utama lompatan kemampuan AI[cite: 39].",
          },
          {
            pointNumber: '03',
            title: "Metode Scavenger Hunt Detektif AI",
            description: "Mengidentifikasi teknologi cerdas di rumah dan sekolah dengan mencatat nama perangkat, input sensor yang digunakan, dan fungsi bantuannya[cite: 40, 45].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Aktivitas Lapangan (Metode Scavenger Hunt Detektif AI)
            imageUrl: '/images/materi/level1-ch3-poin3.png',
            imageBadge: "Aktivitas Lapangan",
            imageAlt: "Siswa menggunakan buku catatan untuk mengamati aplikasi peta dan kamera pintar di sekolah",
            tip: "Ciri khas perangkat ber-AI adalah adanya respon yang disesuaikan dengan masukan data spesifik pengguna[cite: 34, 45].",
          },
        ],
      },
    ],
  },
  {
    key: 'dekomposisi-pola',
    title: "Berpikir Komputasional: Dekomposisi & Pengenalan Pola",
    tagline: "Mengurai Masalah Kompleks dan Menemukan Keteraturan Data untuk Solusi Efektif",
    category: "Berpikir Komputasional",
    level: "Tingkat: Analisis Logika",
    badge: "Sertifikasi Logika Komputasi PANDAI 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Berpikir Komputasional: Dekomposisi & Pengenalan Pola
    thumbnail: '/images/materi/thumb-level-2.jpg',
    description: "Mempelajari dua pilar fundamental computational thinking: teknik dekomposisi untuk membedah tantangan besar menjadi unit terukur, visualisasi peta pikiran (mind mapping), serta pengenalan pola (pattern recognition) sebagai basis inferensi AI.",
    estimatedHours: 3.5,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'dek-ch-1',
        chapterNumber: 1,
        title: "Dekomposisi: Mengurai Kompleksitas Masalah",
        description: "Menerapkan prinsip 'potong pizza' dalam memecah persoalan besar menjadi sub-masalah kecil yang mudah diselesaikan.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Dekomposisi: Mengurai Kompleksitas Masalah (kejarcita)
        youtubeUrl: 'https://www.youtube.com/embed/jCb9fpPrxLc',
        textContent: "Dekomposisi (Decomposition) adalah keterampilan kognitif dalam computational thinking yang berfungsi untuk memecah masalah besar, rumit, atau membingungkan menjadi bagian-bagian kecil yang lebih mudah dipahami dan dikelola[cite: 47, 48]. Ketika dihadapkan pada target masif—seperti membuat aplikasi gim atau merapikan seluruh isi rumah—manusia cenderung merasa cemas jika melihat persoalan tersebut secara utuh sekaligus[cite: 47, 48].\n\nTeknik dekomposisi dapat dianalogikan dengan cara kita menikmati pizza[cite: 48, 53]. Kita mustahil menelan loyang pizza berukuran besar dalam satu gigitan; kita memotongnya menjadi beberapa irisan terukur agar mudah disantap satu per satu[cite: 53]. Dalam pembuatan gim edukasi, dekomposisi menguraikan proyek menjadi lima sub-tugas konkret: mendesain tampilan antarmuka, menyusun aturan skor, merancang tingkat kesulitan, menambahkan efek audio, dan melakukan pengujian program[cite: 48].\n\nSelain menyederhanakan masalah individu, dekomposisi merupakan kunci utama kolaborasi dalam tim[cite: 48]. Dengan membagi persoalan menjadi sub-tugas terpisah, setiap anggota kelompok dapat bekerja secara mandiri dan paralel sesuai keahliannya[cite: 48]. Koki profesional, insinyur jembatan, dan perancang perangkat lunak kelas dunia senantiasa memanfaatkan dekomposisi untuk mengeksekusi proyek besar secara terorganisir dan bebas stres[cite: 48, 52].",
        hasQuiz: true,
        quizKey: 'quiz-dek-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Prinsip Reduksi Beban Masalah",
            description: "Memecah persoalan besar menghilangkan rasa takut dan bingung, sehingga fokus perhatian tertuju pada penyelesaian unit masalah kecil[cite: 48].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Konsep Reduksi (Prinsip Reduksi Beban Masalah)
            imageUrl: '/images/materi/level2-ch1-poin1.png',
            imageBadge: "Konsep Reduksi",
            imageAlt: "Bagan masalah besar dipecah menjadi beberapa kotak sub-tugas kecil yang terhubung",
            tip: "Jangan langsung mengerjakan semua hal sekaligus; selesaikan satu sub-tugas kecil dengan tuntas terlebih dahulu[cite: 48, 53].",
          },
          {
            pointNumber: '02',
            title: "Efisiensi Pembagian Peran Kerja Tim",
            description: "Dekomposisi memungkinkan pembagian beban tugas yang jelas dan adil di antara anggota kelompok saat menjalankan proyek bersama[cite: 48, 56].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Manajemen Kolaborasi (Efisiensi Pembagian Peran Kerja Tim)
            imageUrl: '/images/materi/level2-ch1-poin2.png',
            imageBadge: "Manajemen Kolaborasi",
            imageAlt: "Ilustrasi anggota kelompok berbagi modul tugas proyek video sekolah",
            tip: "Pastikan batas awal dan akhir dari setiap sub-tugas disepakati bersama oleh tim[cite: 48].",
          },
          {
            pointNumber: '03',
            title: "Aplikasi Profesional Multidisiplin",
            description: "Insinyur merancang gedung per modul struktur dan koki menyiapkan hidangan per tahapan bahan sebelum menggabungkannya menjadi sajian utuh[cite: 52].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Aplikasi Nyata (Aplikasi Profesional Multidisiplin)
            imageUrl: '/images/materi/level2-ch1-poin3.png',
            imageBadge: "Aplikasi Nyata",
            imageAlt: "Koki menyiapkan bahan bumbu secara terpisah sebelum mulai memasak hidangan utama",
            tip: "Kerapian tahapan persiapan menentukan kelancaran hasil akhir sebuah proyek[cite: 48, 52].",
          },
        ],
      },
      {
        key: 'dek-ch-2',
        chapterNumber: 2,
        title: "Visualisasi Masalah & Pemodelan Mind Mapping",
        description: "Menyusun peta pikiran sistematis untuk merangkai langkah operasional sehari-hari dan membalik proses pemecahan masalah.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Visualisasi Masalah & Pemodelan Mind Mapping (kejarcita)
        youtubeUrl: 'https://www.youtube.com/embed/6nP_o0UwHZA',
        textContent: "Peta Pikiran (Mind Mapping) adalah sarana visual yang sangat ampuh untuk mengorganisasikan hasil dekomposisi masalah[cite: 52]. Otak manusia bekerja lebih optimal ketika menangkap keterkaitan grafis berbentuk percabangan dibandingkan membaca teks daftar yang panjang[cite: 52]. Dalam sebuah mind map, tujuan atau masalah utama diposisikan di lingkaran tengah, sementara langkah-langkah persiapan, eksekusi, dan evaluasi ditarik keluar menjadi cabang-cabang turunan yang terstruktur[cite: 52].\n\nSebagai ilustrasi, proses memasak mi instan dapat divisualisasikan menjadi lima simpul cabang utama: menyiapkan mi dan bumbu, merebus air, memasukkan mi, meniriskan kuah, dan mencampurkan bumbu penyedap[cite: 53]. Begitu pula dalam merencanakan kegiatan kompleks seperti pentas seni sekolah atau liburan keluarga, mind mapping memastikan tidak ada perlengkapan krusial yang terlewatkan[cite: 50, 55].\n\nSelain mengurai dari depan, siswa juga melatih logika komputasional melalui metode 'puzzle terbalik'[cite: 54]. Dengan membayangkan produk akhir yang sudah jadi lalu menelusuri mundur komponen pembentuknya, siswa melatih kepekaan logika kausalitas (sebab-akibat)[cite: 54]. Keterampilan visualisasi ini menjadi fondasi penting sebelum melangkah ke tahap penulisan logika algoritma formal[cite: 52, 90].",
        hasQuiz: true,
        quizKey: 'quiz-dek-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Struktur Cabang Hierarkis",
            description: "Menempatkan ide utama di poros pusat dan memancarkan cabang sub-tugas terorganisir untuk mempermudah pemahaman alur kerja[cite: 52].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Struktur Peta (Struktur Cabang Hierarkis)
            imageUrl: '/images/materi/level2-ch2-poin1.png',
            imageBadge: "Struktur Peta",
            imageAlt: "Bagan mind map cabang pohon menghubungkan topik utama ke sub-topik operasional",
            tip: "Gunakan warna dan ikon berbeda pada tiap cabang untuk memperkuat daya ingat visual[cite: 52].",
          },
          {
            pointNumber: '02',
            title: "Pemodelan Aktivitas Harian",
            description: "Aktivitas rutin seperti persiapan berangkat sekolah atau memasak mi instan dapat dibedah menjadi urutan aksi terukur tanpa celah[cite: 53, 54].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Alur Harian (Pemodelan Aktivitas Harian)
            imageUrl: '/images/materi/level2-ch2-poin2.png',
            imageBadge: "Alur Harian",
            imageAlt: "Diagram urutan langkah persiapan pagi hari dari bangun tidur hingga tiba di sekolah",
            tip: "Periksa kembali ketergantungan logika antar-langkah agar tidak ada proses yang tertukar[cite: 54].",
          },
          {
            pointNumber: '03',
            title: "Teknik Puzzle Rekayasa Terbalik",
            description: "Menganalisis sistem dari hasil akhir yang utuh kemudian menelusuri mundur potongan-potongan pembentuknya secara metodis[cite: 54].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Rekayasa Terbalik (Teknik Puzzle Rekayasa Terbalik)
            imageUrl: '/images/materi/level2-ch2-poin3.png',
            imageBadge: "Rekayasa Terbalik",
            imageAlt: "Ilustrasi puzzle gambar utuh yang diurai kembali menjadi kepingan-kepingan logis",
            tip: "Melihat hasil akhir membantu kita memahami fungsi setiap komponen kecil secara utuh[cite: 54].",
          },
        ],
      },
      {
        key: 'dek-ch-3',
        chapterNumber: 3,
        title: "Pattern Recognition: Keteraturan Data & Pondasi AI",
        description: "Mengidentifikasi kesamaan dan tren berulang dalam deret data, fenomena alam, serta kaitannya dengan sistem rekomendasi AI.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Pattern Recognition: Keteraturan Data & Pondasi AI (ana aulia)
        youtubeUrl: 'https://www.youtube.com/embed/PWy19pyabO4',
        textContent: "Pengenalan Pola (Pattern Recognition) adalah kemampuan untuk menemukan keteraturan, kesamaan karakteristik, atau tren berulang yang tersembunyi di dalam sekumpulan data[cite: 60, 61]. Tanpa disadari, otak manusia senantiasa mengenali pola setiap saat: menebak buah berikutnya pada barisan 'apel, jeruk, pisang', menikmati keselarasan rima dalam bait lagu, atau bersiap membawa payung saat mengamati pola langit mendung di sore hari[cite: 60, 61, 62].\n\nDalam sains komputasi dan kecerdasan buatan, pattern recognition merupakan mesin penggerak utama di balik kemampuan adaptif komputer[cite: 61]. Komputer tidak memiliki kesadaran emosional; ia belajar memahami dunia dengan mengidentifikasi pola data biner[cite: 34, 61]. Sebagai contoh, sistem pembuka kunci wajah (Face Recognition) bekerja dengan memetakan pola jarak matematis antara mata, hidung, dan garis rahang pengguna untuk dicocokkan dengan profil pemilik[cite: 62].\n\nKemampuan mengenali pola memberikan keunggulan prediktif yang sangat berharga[cite: 61]. Detektif kepolisian mencari pola waktu dan lokasi kejahatan untuk mengungkap pelaku kriminal, sementara dokter memeriksa pola gejala klinis untuk menegakkan diagnosis medis yang akurat[cite: 65]. Menguasai pengenalan pola melatih siswa berpikir logis, cepat menggeneralisasi aturan, dan memecahkan masalah berulang secara efisien[cite: 61].",
        hasQuiz: true,
        quizKey: 'quiz-dek-ch-3',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Identifikasi Siklus & Nilai Prediktif",
            description: "Mengenali keteraturan pada data masa lampau memungkinkan perumusan aturan logis untuk memperkirakan kejadian masa depan[cite: 61].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Logika Prediksi (Identifikasi Siklus & Nilai Prediktif)
            imageUrl: '/images/materi/level2-ch3-poin1.png',
            imageBadge: "Logika Prediksi",
            imageAlt: "Grafik pola cuaca mingguan yang menunjukkan keteraturan hujan di sore hari",
            tip: "Cari keteraturan interval waktu atau selisih tetap dalam barisan data[cite: 64].",
          },
          {
            pointNumber: '02',
            title: "Basis Pembelajaran Mesin (AI)",
            description: "AI mengenali tulisan tangan, suara vokal, dan wajah biometrik melalui pemindaian kemiripan matriks pola data secara cepat[cite: 61, 62].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Ekstraksi Pola AI (Basis Pembelajaran Mesin (AI))
            imageUrl: '/images/materi/level2-ch3-poin2.png',
            imageBadge: "Ekstraksi Pola AI",
            imageAlt: "Bagan visual pemindaian biometrik wajah oleh kamera pintar berbasis pola geometris",
            tip: "Semakin konsisten pola yang diberikan ke sistem AI, semakin tinggi ketepatan identifikasinya[cite: 61].",
          },
          {
            pointNumber: '03',
            title: "Penyelesaian Masalah Berulang",
            description: "Menemukan pola pada masalah yang sering muncul mencegah pemborosan energi karena solusi yang sama dapat langsung diterapkan[cite: 61].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Efisiensi Solusi (Penyelesaian Masalah Berulang)
            imageUrl: '/images/materi/level2-ch3-poin3.png',
            imageBadge: "Efisiensi Solusi",
            imageAlt: "Ilustrasi detektif mencocokkan jejak kasus kriminal berdasarkan kesamaan pola kejadian",
            tip: "Jika masalah baru memiliki pola yang mirip dengan masalah lama, adaptasi solusi lamamu[cite: 61].",
          },
        ],
      },
    ],
  },
  {
    key: 'abstraksi-algoritma',
    title: "Berpikir Komputasional: Abstraksi & Desain Algoritma",
    tagline: "Menyaring Inti Informasi dan Merancang Prosedur Solusi Sistematis",
    category: "Berpikir Komputasional",
    level: "Tingkat: Algoritma Praktis",
    badge: "Sertifikasi Algoritma Terapan PANDAI 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Berpikir Komputasional: Abstraksi & Desain Algoritma
    thumbnail: '/images/materi/thumb-level-3.jpg',
    description: "Mendalami teknik abstraksi untuk menyaring esensi data dan mengeliminasi detail periferal, serta merumuskan urutan solusi logis, terbatas, dan efektif menggunakan representasi flowchart dan pseudocode.",
    estimatedHours: 3.5,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'alg-ch-1',
        chapterNumber: 1,
        title: "Abstraksi: Menyaring Esensi & Eliminasi Detail",
        description: "Menerapkan prinsip 'mengupas apel' untuk berfokus pada informasi penting dan mengabaikan rincian yang tidak relevan.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Abstraksi: Menyaring Esensi & Eliminasi Detail (El Samah Channel)
        youtubeUrl: 'https://www.youtube.com/embed/hnVGeXmDh0Y',
        textContent: "Abstraksi (Abstraction) adalah pilar computational thinking yang berfokus pada pemilahan informasi: mengambil fakta dan data yang benar-benar esensial, serta mengabaikan detail periferal yang tidak relevan dengan tujuan pemecahan masalah[cite: 74, 75]. Dalam kehidupan sehari-hari, kita kerap terdistraksi oleh terlalu banyak rincian kecil yang mengaburkan gambaran besar (big picture) dari suatu persoalan[cite: 75].\n\nPrinsip abstraksi dapat diibaratkan seperti mengupas buah apel[cite: 79, 80]. Kita membuang kulit luar dan bijinya yang keras untuk mengambil bagian daging buahnya yang bermanfaat untuk dikonsumsi[cite: 79, 80]. Saat kita melihat peta kota atau peta rute navigasi Google Maps, kita tidak disajikan gambar setiap tiang listrik, warna cat genteng rumah, atau helai daun pohon di pinggir jalan; peta hanya menampilkan jalan utama, persimpangan, dan nama tempat penting agar pengguna dapat membaca arah dalam sekejap[cite: 75, 79].\n\nDalam rekayasa sistem perangkat lunak, abstraksi memungkinkan penyusunan antarmuka pengguna yang bersih dan mudah digunakan[cite: 75]. Pengguna aplikasi transportasi online cukup memilih titik jemput dan tujuan tanpa perlu dipusingkan oleh kerumitan baris kode sistem navigasi satelit di latar belakang[cite: 75]. Siswa yang menguasai abstraksi mampu meringkas materi bacaan panjang, merancang denah ruang fungsional, dan merumuskan model solusi yang efisien[cite: 75, 80, 81].",
        hasQuiz: true,
        quizKey: 'quiz-alg-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Fokus pada Gambaran Utama (Big Picture)",
            description: "Menyaring kebisingan detail yang tidak penting membantu kita memahami inti permasalahan secara jernih dan objektif[cite: 75].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Fokus Esensial (Fokus pada Gambaran Utama (Big Picture))
            imageUrl: '/images/materi/level3-ch1-poin1.png',
            imageBadge: "Fokus Esensial",
            imageAlt: "Bagan abstraksi informasi: memisahkan data esensial dari kumpulan detail yang tidak diperlukan",
            tip: "Tanyakan: 'Apakah detail ini mempengaruhi hasil akhir keputusan saya?' Jika tidak, abaikan[cite: 75].",
          },
          {
            pointNumber: '02',
            title: "Model Peta dan Denah Minimalis",
            description: "Peta navigasi hanya menampilkan nama jalan dan arah utama agar pembaca tidak tersesat oleh detail visual dekoratif[cite: 75, 79].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Model Minimalis (Model Peta dan Denah Minimalis)
            imageUrl: '/images/materi/level3-ch1-poin2.png',
            imageBadge: "Model Minimalis",
            imageAlt: "Perbandingan foto satelit jalanan penuh detail versus denah garis navigasi hasil abstraksi",
            tip: "Sederhana itu berdaya: semakin ringkas informasi yang disajikan, semakin cepat pemahamannya[cite: 82].",
          },
          {
            pointNumber: '03',
            title: "Generalisasi Solusi yang Dapat Dipakai Ulang",
            description: "Dengan membuang detail kasus yang spesifik, pola penyelesaian masalah dapat digeneralisasi untuk mengatasi persoalan serupa lainnya[cite: 75].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Generalisasi (Generalisasi Solusi yang Dapat Dipakai Ulang)
            imageUrl: '/images/materi/level3-ch1-poin3.png',
            imageBadge: "Generalisasi",
            imageAlt: "Skema satu formula model solusi yang dapat diterapkan ke beberapa skenario masalah berbeda",
            tip: "Temukan kerangka inti dari sebuah solusi agar kamu bisa memakainya kembali di masa depan[cite: 75].",
          },
        ],
      },
      {
        key: 'alg-ch-2',
        chapterNumber: 2,
        title: "Desain Algoritma: Karakteristik Solusi Runtut & Logis",
        description: "Menelaah sejarah penemu algoritma Al-Khawarizmi, arti penting urutan sekuensial, dan ciri-ciri algoritma yang bermutu.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Desain Algoritma & Notasi Flowchart (SWS Space)
        youtubeUrl: 'https://www.youtube.com/embed/u1huXRBkSbE',
        textContent: "Desain Algoritma (Algorithm Design) adalah keterampilan menyusun serangkaian langkah operasional yang terurut, logis, dan terencana untuk menyelesaikan masalah atau mencapai tujuan tertentu[cite: 88, 89]. Kata 'algoritma' berakar dari nama ilmuwan matematika Muslim legendaris abad ke-9, Muhammad ibn Musa al-Khwarizmi, penemu aljabar yang mengenalkan metode hitung sistematis[cite: 95]. Resep masakan, petunjuk perakitan mainan, dan rute belokan di Google Maps adalah wujud konkret algoritma dalam dunia nyata[cite: 90, 95].\n\nDalam dunia komputasi dan logika, urutan langkah adalah segalanya[cite: 89]. Jika langkah-langkah diacak atau dieksekusi di luar urutan rasional, hasil akhirnya pasti salah atau bahkan memicu masalah baru[cite: 89]. Sebagai ilustrasi, membuat nasi goreng menuntut kita menyalakan kompor dan memanaskan minyak sebelum menaruh bumbu; bila kita memasukkan nasi dan kecap ke atas wajan dingin tanpa menyalakan api kompor, nasi goreng tidak akan pernah matang[cite: 88, 89].\n\nSebuah algoritma yang baik wajib memenuhi tiga karakteristik esensial: Jelas (setiap instruksi mudah dipahami dan bermakna tunggal), Terbatas (memiliki titik akhir yang pasti dan tidak berputar tanpa batas), serta Efektif (mampu menyelesaikan persoalan dengan benar dan tepat sasaran)[cite: 89, 90]. Mempelajari desain algoritma membentuk pola pikir terstruktur yang esensial bagi pemrogram maupun pemecah masalah profesional[cite: 91, 98].",
        hasQuiz: true,
        quizKey: 'quiz-alg-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Ketepatan Urutan adalah Kunci",
            description: "Langkah yang terbolak-balik akan merusak hasil akhir solusi dan dapat menimbulkan kegagalan fatal pada sistem[cite: 89].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Sekuensial Logis (Ketepatan Urutan adalah Kunci)
            imageUrl: '/images/materi/level3-ch2-poin1.png',
            imageBadge: "Sekuensial Logis",
            imageAlt: "Bagan ilustrasi peringatan: kesalahan urutan langkah berakibat pada kegagalan hasil akhir",
            tip: "Selalu periksa hubungan sebab-akibat sebelum menetapkan urutan suatu tindakan[cite: 89].",
          },
          {
            pointNumber: '02',
            title: "Tiga Karakteristik Baku Algoritma",
            description: "Instruksi wajib bermakna eksplisit (Jelas), memiliki titik henti pasti (Terbatas), dan memberikan hasil yang tepat (Efektif)[cite: 89, 90].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Kriteria Baku (Tiga Karakteristik Baku Algoritma)
            imageUrl: '/images/materi/level3-ch2-poin2.png',
            imageBadge: "Kriteria Baku",
            imageAlt: "Infografis tiga pilar algoritma yang baik: Jelas, Terbatas, dan Efektif",
            tip: "Pastikan algoritma memiliki kondisi berhenti agar komputer tidak mengalami crash[cite: 89, 90].",
          },
          {
            pointNumber: '03',
            title: "Warisan Keilmuan Al-Khawarizmi",
            description: "Penamaan algoritma diabadikan dari nama ilmuwan matematika Al-Khawarizmi yang meletakkan dasar prosedur hitung terstruktur[cite: 95].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Tokoh Sejarah (Warisan Keilmuan Al-Khawarizmi)
            imageUrl: '/images/materi/level3-ch2-poin3.png',
            imageBadge: "Tokoh Sejarah",
            imageAlt: "Ilustrasi ilmuwan Al-Khawarizmi bersanding dengan naskah manuskrip matematika terstruktur",
            tip: "Algoritma bukan hanya kode komputer, melainkan cara berpikir teratur manusia[cite: 91].",
          },
        ],
      },
      {
        key: 'alg-ch-3',
        chapterNumber: 3,
        title: "Representasi Algoritma: Flowchart & Pseudocode",
        description: "Mempraktikkan visualisasi diagram alur dengan simbol standar dan penulisan kode semu (pseudocode) yang terstruktur.",
        durationMinutes: 25,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Logika Percabangan & Perulangan (Miokti Yessi)
        youtubeUrl: 'https://www.youtube.com/embed/yw1q5yjmBq0',
        textContent: "Untuk mengomunikasikan logika algoritma kepada sesama manusia maupun sebelum diterjemahkan menjadi kode program komputer, terdapat dua format representasi standar yang digunakan: Flowchart (Diagram Alur) dan Pseudocode (Kode Semu)[cite: 90]. Masing-masing memiliki keunggulan fungsional dalam mendokumentasikan alur berpikir secara transparan dan terstandarisasi[cite: 90].\n\nFlowchart menyajikan alur instruksi melalui simbol-simbol grafis baku yang dihubungkan dengan garis panah[cite: 90, 96]. Simbol oval (terminator) digunakan untuk menandai titik Mulai dan Selesai; simbol persegi panjang melambangkan proses aksi atau eksekusi operasional; sedangkan simbol belah ketupat (decision) digunakan untuk evaluasi keputusan bersyarat yang menghasilkan cabang 'Ya' atau 'Tidak'[cite: 94, 96]. Sebagai contoh, dalam flowchart memasak mi instan, belah ketupat mengevaluasi: 'Apakah air sudah mendidih?'; jika belum, alur panah berputar kembali merebus air[cite: 94, 97].\n\nPseudocode adalah penyajian algoritma menggunakan kalimat terstruktur menyerupai bahasa pemrograman komputer, namun tetap menggunakan bahasa manusia yang sederhana dan mudah dipahami[cite: 90]. Pseudocode tidak terikat pada aturan sintaks bahasa pemrograman tertentu (seperti Python atau C++), sehingga sangat efektif digunakan untuk merancang kerangka logika pemecahan masalah sebelum tahap pengodean yang sesungguhnya dimulai[cite: 90, 94].",
        hasQuiz: true,
        quizKey: 'quiz-alg-ch-3',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Simbol Notasi Grafis Flowchart",
            description: "Oval menandai awal/akhir, balok persegi untuk tindakan proses, dan belah ketupat untuk evaluasi keputusan bersyarat[cite: 94, 96].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Katalog Simbol (Simbol Notasi Grafis Flowchart)
            imageUrl: '/images/materi/level3-ch3-poin1.png',
            imageBadge: "Katalog Simbol",
            imageAlt: "Bagan simbol flowchart standar: terminator oval, persegi panjang proses, belah ketupat keputusan",
            tip: "Ingat bahwa simbol belah ketupat wajib memiliki minimal dua cabang jalur keluar: Ya dan Tidak[cite: 94, 97].",
          },
          {
            pointNumber: '02',
            title: "Logika Percabangan dan Perulangan",
            description: "Evaluasi kondisi pada belah ketupat menentukan apakah alur berlanjut ke langkah baru atau mengulang proses sebelumnya (looping)[cite: 94].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Logika Keputusan (Logika Percabangan dan Perulangan)
            imageUrl: '/images/materi/level3-ch3-poin2.png',
            imageBadge: "Logika Keputusan",
            imageAlt: "Diagram percabangan kondisi: jika kondisi terpenuhi lanjut ke langkah depan, jika belum berulang",
            tip: "Garis panah menunjukkan arah aliran eksekusi logika yang harus ditaati pembaca[cite: 94, 99].",
          },
          {
            pointNumber: '03',
            title: "Penulisan Terstruktur Pseudocode",
            description: "Menggunakan kata kerja tindakan ringkas (Mulai, Ambil, Jika-Maka, Selesai) yang merefleksikan alur instruksi komputer tanpa beban sintaks[cite: 90, 94].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Format Pseudocode (Penulisan Terstruktur Pseudocode)
            imageUrl: '/images/materi/level3-ch3-poin3.png',
            imageBadge: "Format Pseudocode",
            imageAlt: "Teks pseudocode terstruktur untuk prosedur mencuci tangan dan menyikat gigi",
            tip: "Gunakan indentasi spasi ke kanan untuk memperjelas perintah yang berada di dalam kondisi 'Jika'[cite: 101].",
          },
        ],
      },
    ],
  },
  {
    key: 'etika-digital',
    title: "Etika Kecerdasan Buatan & Kedaulatan Digital Indonesia",
    tagline: "Menjunjung Moralitas Siber, Menjaga Privasi, dan Mengenal Tata Kelola Domain .id",
    category: "Etika Siber & Tata Kelola Internet",
    level: "Tingkat: Literasi Digital",
    badge: "Sertifikasi Etika & Kedaulatan Siber PANDAI 2026",
    // [MEDIA CONTEXT - COVER]: Foto banner ilustrasi course | Tema: Etika Kecerdasan Buatan & Kedaulatan Digital Indonesia
    thumbnail: '/images/materi/thumb-level-4.jpg',
    description: "Menganalisis prinsip pertanggungjawaban dalam pemanfaatan AI, mitigasi ancaman manipulasi visual (deepfake), pencegahan bias algoritma, menjaga integritas akademik, serta menelaah tata kelola internet nasional melalui domain resmi .id dan peran kelembagaan PANDI.",
    estimatedHours: 3.5,
    instructorName: "Chendri Irawan SN & Onno W. Purbo",
    instructorRole: "Dosen & Pakar Teknologi ITTS",
    chapters: [
      {
        key: 'etika-ch-1',
        chapterNumber: 1,
        title: "Lima Pilar Etika Kecerdasan Buatan",
        description: "Mempelajari prinsip akuntabilitas manusia, perlindungan privasi data, bahaya bias algoritma, transparansi, dan keamanan sistem cerdas.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Dampak Positif & Negatif Teknologi AI (kejarcita)
        youtubeUrl: 'https://www.youtube.com/embed/xQ3Wg3ltbKQ',
        textContent: "Perkembangan kecerdasan buatan yang eksponensial menuntut landasan moral dan hukum yang kokoh agar teknologi tetap bermanfaat bagi peradaban manusia[cite: 104, 105]. Etika AI (AI Ethics) adalah seperangkat nilai, norma, dan prinsip yang memandu perancangan serta pengoperasian sistem cerdas agar adil, aman, dan dapat dipertanggungjawabkan[cite: 104, 105]. Tanpa kerangka etika, AI yang sangat canggih berpotensi menciptakan ketidakadilan sistemik dan mengancam hak-hak asasi individu[cite: 105].\n\nEtika AI bertumpu pada lima pilar fundamental: Tanggung Jawab (Responsibility), di mana manusia pembuat dan pengguna tetap menjadi pihak yang wajib bertanggung jawab secara moral dan hukum saat terjadi kesalahan[cite: 105]; Privasi Data (Data Privacy), kewajiban menjaga kerahasiaan data personal dan biometrik dari eksploitasi tanpa persetujuan[cite: 105]; Bebas dari Bias (Fairness), keharusan memastikan data latih AI bersifat inklusif agar tidak mendiskriminasi kelompok tertentu[cite: 105]; Transparansi (Transparency), hak manusia untuk mengetahui dan memahami alasan di balik keputusan yang diambil sistem[cite: 105]; serta Keamanan (Security), proteksi sistem dari penyalahgunaan kejahatan siber[cite: 105].\n\nIsu bias algoritma menjadi salah satu tantangan paling krusial[cite: 105]. Jika data latih yang diberikan tidak seimbang—misalnya sistem pengenal wajah yang hanya dilatih menggunakan sampel wajah orang berkulit terang—AI akan mengalami bias dan menghasilkan tingkat kesalahan tinggi saat mengidentifikasi individu dari ras lain[cite: 105]. Memahami kelima pilar ini membimbing siswa menjadi pengguna teknologi yang kritis, bertanggung jawab, dan berintegritas[cite: 106, 112].",
        hasQuiz: true,
        quizKey: 'quiz-etika-ch-1',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Akuntabilitas Berada pada Manusia",
            description: "AI hanyalah alat buatan manusia; pengembang perangkat lunak dan pengguna operatorlah yang memegang tanggung jawab moral serta hukum penuh[cite: 105, 112].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Human Responsibility (Akuntabilitas Berada pada Manusia)
            imageUrl: '/images/materi/level4-ch1-poin1.png',
            imageBadge: "Human Responsibility",
            imageAlt: "Bagan pertanggungjawaban etis menempatkan manusia sebagai pengambil keputusan utama di atas AI",
            tip: "Jangan pernah melemparkan tanggung jawab kesalahan tindakan kepada sistem kecerdasan buatan[cite: 105, 112].",
          },
          {
            pointNumber: '02',
            title: "Bahaya Bias Data Pelatihan",
            description: "Algoritma akan mereplikasi diskriminasi jika sampel data latih yang diberikan berat sebelah atau tidak mewakili keberagaman masyarakat[cite: 105, 112].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Keadilan Data (Bahaya Bias Data Pelatihan)
            imageUrl: '/images/materi/level4-ch1-poin2.png',
            imageBadge: "Keadilan Data",
            imageAlt: "Ilustrasi timbangan keadilan algoritma yang miring akibat dataset latih yang tidak seimbang",
            tip: "Selalu periksa apakah data yang digunakan untuk melatih sistem cerdas sudah cukup adil dan inklusif[cite: 105].",
          },
          {
            pointNumber: '03',
            title: "Hak atas Transparansi & Privasi",
            description: "Pengguna berhak meninjau alasan di balik keputusan otomatis mesin dan berhak menolak akses ilegal terhadap data pribadi mereka[cite: 105, 112].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Hak Asasi Digital (Hak atas Transparansi & Privasi)
            imageUrl: '/images/materi/level4-ch1-poin3.png',
            imageBadge: "Hak Asasi Digital",
            imageAlt: "Ikon gembok pelindung privasi data dan kaca pembesar transparansi keputusan algoritma",
            tip: "Waspadai aplikasi yang meminta izin akses berlebihan ke galeri foto dan lokasi perangkatmu[cite: 105, 106].",
          },
        ],
      },
      {
        key: 'etika-ch-2',
        chapterNumber: 2,
        title: "Integritas Digital: Deepfake, Echo Chamber, & Plagiasi",
        description: "Menganalisis dampak psikologis filter wajah, bahaya manipulasi video deepfake, fenomena echo chamber, dan etika tugas sekolah.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Keamanan Data Pribadi & Jejak Digital (AZAL)
        youtubeUrl: 'https://www.youtube.com/embed/lHIBT85FPvI',
        textContent: "Pemanfaatan AI dalam ekosistem digital media sosial membawa dampak psikologis dan sosial yang nyata bagi generasi muda[cite: 106, 107]. Penggunaan filter wajah berbasis AI yang mengubah bentuk mata, hidung, dan tekstur kulit dapat memicu distorsi persepsi diri bila siswa merasa tidak percaya diri dengan penampilan alaminya[cite: 106]. Lebih berbahaya lagi, teknologi AI kini dapat disalahgunakan untuk menciptakan rekayasa manipulasi citra dan suara realistis yang dikenal sebagai deepfake untuk menyebarkan fitnah dan hoaks publik[cite: 105, 112].\n\nDi sisi lain, algoritma kurasi konten pada platform video dan musik dapat memicu fenomena ruang gema (echo chamber)[cite: 107, 108, 114]. Ketika algoritma hanya menyajikan materi yang disukai pengguna secara terus-menerus, pandangan seseorang menjadi sempit dan terisolasi dari sudut pandang baru yang beragam[cite: 107, 108, 114]. Siswa perlu secara sadar melatih rasa ingin tahu terhadap berbagai sudut pandang agar tidak terjebak dalam gelembung informasi algoritma[cite: 107, 108].\n\nDalam kehidupan sekolah, kehadiran generative AI seperti ChatGPT menuntut komitmen integritas akademik yang tinggi[cite: 106, 109]. Menggunakan AI untuk mengerjakan seluruh tugas tanpa membaca, memahami, atau memikirkan isinya adalah tindakan plagiasi yang menumpulkan kemampuan berpikir kritis siswa[cite: 106, 109]. AI seharusnya difungsikan sebagai mitra diskusi konseptual dan teman bertukar pikiran, bukan alat untuk memalsukan proses belajar[cite: 106, 109].",
        hasQuiz: true,
        quizKey: 'quiz-etika-ch-2',
        summaryCards: [
          {
            pointNumber: '01',
            title: "Waspada Rekayasa Manipulasi Deepfake",
            description: "Video dan rekaman audio dapat dipalsukan secara sangat halus oleh AI; jangan mudah mempercayai informasi sensasional tanpa verifikasi sumber resmi[cite: 105, 112].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Deteksi Hoaks (Waspada Rekayasa Manipulasi Deepfake)
            imageUrl: '/images/materi/level4-ch2-poin1.png',
            imageBadge: "Deteksi Hoaks",
            imageAlt: "Ilustrasi perbandingan video asli versus rekayasa manipulasi wajah deepfake",
            tip: "Terapkan prinsip verifikasi: periksa konsistensi kedipan mata dan kejanggalan gerak bibir pada video mencurigakan.",
          },
          {
            pointNumber: '02',
            title: "Menghindari Jebakan Echo Chamber",
            description: "Algoritma media sosial membatasi rekomendasi pada hal yang Anda sukai saja; buka wawasan dengan mencari beragam topik alternatif[cite: 107, 108, 114].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Wawasan Terbuka (Menghindari Jebakan Echo Chamber)
            imageUrl: '/images/materi/level4-ch2-poin2.png',
            imageBadge: "Wawasan Terbuka",
            imageAlt: "Bagan gelembung echo chamber yang mengisolasi pengguna dari informasi dunia luar",
            tip: "Eksplorasi secara sengaja kanal dan topik baru agar seleramu tidak dikurung oleh algoritma[cite: 107].",
          },
          {
            pointNumber: '03',
            title: "Etika Pengerjaan Tugas Sekolah",
            description: "Jadikan AI sebagai sarana bertukar pikiran, bukan pengganti tugas berpikir mandiri agar kapasitas intelektualmu terus berkembang[cite: 106, 109].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Integritas Belajar (Etika Pengerjaan Tugas Sekolah)
            imageUrl: '/images/materi/level4-ch2-poin3.png',
            imageBadge: "Integritas Belajar",
            imageAlt: "Siswa berdiskusi dengan bantuan AI pada layar laptop sambil mencatat pemahamannya sendiri",
            tip: "Nilai sejati dari belajar adalah proses pemahamannya, bukan sekadar nilai di atas kertas[cite: 106, 109].",
          },
        ],
      },
      {
        key: 'etika-ch-3',
        chapterNumber: 3,
        title: "Identitas Digital & Tata Kelola Domain .id",
        description: "Mengenal sistem pengalamatan DNS, reputasi ekstensi kedaulatan .id, dan infrastruktur operasional PANDI di tingkat global.",
        durationMinutes: 20,
        minWatchSeconds: 5,
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Identitas Digital, IP Address & Domain DNS (Stockspace)
        youtubeUrl: 'https://www.youtube.com/embed/zQWNQXPi45I',
        textContent: "Jaringan internet menghubungkan miliaran perangkat di dunia menggunakan deretan angka biner unik yang disebut Internet Protocol (IP) Address[cite: 119]. Namun, karena memori manusia sulit mengingat kombinasi angka rumit, diciptakanlah Domain Name System (DNS) yang berfungsi menerjemahkan deretan alamat IP menjadi nama domain tekstual yang mudah diingat, layaknya nama kontak di ponsel[cite: 119]. Nama domain bertindak sebagai alamat domisili resmi sebuah situs web maupun surat elektronik (email)[cite: 119].\n\nEkstensi '.id' merupakan Country Code Top-Level Domain (ccTLD) yang menunjukkan identitas dan kedaulatan digital Indonesia di mata dunia[cite: 119]. Menggunakan domain .id mencerminkan kebanggaan nasional, memberikan rasa aman serta tingkat kepercayaan tinggi bagi pengguna, dan terikat dengan kepatuhan hukum Republik Indonesia[cite: 119]. Hingga akhir tahun 2024, domain .id telah tumbuh menjadi pengelola domain terbesar di Asia Tenggara dengan menembus 1,2 juta nama domain terdaftar[cite: 121].\n\nPengelolaan dan pemeliharaan domain .id diamanahkan kepada PANDI (Pengelola Nama Domain Internet Indonesia), organisasi multipemangku kepentingan yang menerima mandat redelegasi dari IANA sejak 2013[cite: 120, 121]. PANDI menjamin kestabilan dan keamanan ekosistem siber dengan mengoperasikan 44 server DNS Anycast yang tersebar di kota-kota besar Indonesia serta pusat internet mancanegara, sekaligus aktif mengawal forum tata kelola internet global seperti ICANN dan APTLD[cite: 120, 121, 122].",
        hasQuiz: true,
        quizKey: 'quiz-etika-ch-3',
        summaryCards: [
          {
            pointNumber: '01',
            title: "DNS sebagai Direktori Nama Internet",
            description: "Domain Name System menghubungkan manusia dengan server komputer dengan menerjemahkan alamat IP numerik menjadi nama yang mudah dibaca[cite: 119].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Sistem Pengalamatan (DNS sebagai Direktori Nama Internet)
            imageUrl: '/images/materi/level4-ch3-poin1.png',
            imageBadge: "Sistem Pengalamatan",
            imageAlt: "Bagan alur kerja DNS mengubah angka IP address rumit menjadi nama domain website",
            tip: "Tanpa DNS, kita harus mengetikkan deretan angka IP yang panjang setiap kali membuka website[cite: 119].",
          },
          {
            pointNumber: '02',
            title: "Kedaulatan & Kredibilitas Domain .id",
            description: "Domain .id merepresentasikan identitas resmi Indonesia dengan jaminan kepatuhan hukum dan kredibilitas terpercaya bagi institusi[cite: 119].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Identitas Bangsa (Kedaulatan & Kredibilitas Domain .id)
            imageUrl: '/images/materi/level4-ch3-poin2.png',
            imageBadge: "Identitas Bangsa",
            imageAlt: "Visual logo 3D domain .id berwarna merah putih di atas pemandangan kota modern",
            tip: "Domain .id membutuhkan verifikasi identitas resmi saat pendaftaran sehingga lebih aman dari situs penipuan[cite: 119, 120].",
          },
          {
            pointNumber: '03',
            title: "Keandalan Infrastruktur Global PANDI",
            description: "PANDI mengoperasikan puluhan server DNS Anycast terdistribusi di dalam dan luar negeri guna menjamin akses website yang cepat dan stabil[cite: 120, 121].",
            // [MEDIA CONTEXT - SUMMARY CARD]: Foto/Infografis/Bagan | Tema: Infrastruktur Server (Keandalan Infrastruktur Global PANDI)
            imageUrl: '/images/materi/level4-ch3-poin3.png',
            imageBadge: "Infrastruktur Server",
            imageAlt: "Peta dunia menunjukkan sebaran 44 server Anycast PANDI di Asia, Eropa, dan Amerika",
            tip: "PANDI adalah singkatan dari Pengelola Nama Domain Internet Indonesia[cite: 120, 121].",
          },
        ],
      },
    ],
  },
];

export const COURSE_KEY_ALIASES: Record<string, string> = {
  'course-level-1': 'ai-robotika',
  'course-level-2': 'dekomposisi-pola',
  'course-level-3': 'abstraksi-algoritma',
  'course-level-4': 'etika-digital',
  'course-beginner': 'ai-robotika',
  'course-intermediate': 'dekomposisi-pola',
  'literasi-ai-dasar': 'ai-robotika',
  'forensik-deepfake': 'dekomposisi-pola',
  'etika-keamanan-ai': 'etika-digital',
};

export const CHAPTER_KEY_ALIASES: Record<string, string> = {
  'level1-ch-1': 'air-ch-1',
  'level1-ch-2': 'air-ch-2',
  'level1-ch-3': 'air-ch-3',
  'level2-ch-1': 'dek-ch-1',
  'level2-ch-2': 'dek-ch-2',
  'level2-ch-3': 'dek-ch-3',
  'level3-ch-1': 'alg-ch-1',
  'level3-ch-2': 'alg-ch-2',
  'level3-ch-3': 'alg-ch-3',
  'level4-ch-1': 'etika-ch-1',
  'level4-ch-2': 'etika-ch-2',
  'level4-ch-3': 'etika-ch-3',
  'beginner-ch-1': 'air-ch-1',
  'beginner-ch-2': 'air-ch-2',
  'beginner-ch-3': 'air-ch-3',
  'beginner-ch-4': 'dek-ch-1',
  'intermediate-ch-1': 'dek-ch-2',
  'intermediate-ch-2': 'dek-ch-3',
  'intermediate-ch-3': 'alg-ch-1',
};

export function getAllCourses(): Course[] {
  return COURSES_DATA;
}

export function getCourseByKey(key: string): Course | undefined {
  const resolvedKey = COURSE_KEY_ALIASES[key] || key;
  return COURSES_DATA.find((c) => c.key === resolvedKey);
}

export function getChapterByKey(courseKey: string, chapterKey: string): Chapter | undefined {
  const course = getCourseByKey(courseKey);
  const resolvedChapterKey = CHAPTER_KEY_ALIASES[chapterKey] || chapterKey;
  return course?.chapters.find((ch) => ch.key === resolvedChapterKey);
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
  const resolvedChapterKey = CHAPTER_KEY_ALIASES[currentChapterKey] || currentChapterKey;
  const currentIndex = course.chapters.findIndex((ch) => ch.key === resolvedChapterKey);
  if (currentIndex === -1 || currentIndex >= course.chapters.length - 1) {
    return undefined;
  }
  return course.chapters[currentIndex + 1];
}

export function getPreviousChapter(courseKey: string, currentChapterKey: string): Chapter | undefined {
  const course = getCourseByKey(courseKey);
  if (!course) return undefined;
  const resolvedChapterKey = CHAPTER_KEY_ALIASES[currentChapterKey] || currentChapterKey;
  const currentIndex = course.chapters.findIndex((ch) => ch.key === resolvedChapterKey);
  if (currentIndex <= 0) {
    return undefined;
  }
  return course.chapters[currentIndex - 1];
}
