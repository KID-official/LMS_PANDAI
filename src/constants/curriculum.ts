/**
 * Global Constants & Keys for Curriculum System
 * Updated with Multi-Level AI & Computational Thinking Curriculum
 */

export const COURSE_KEYS = {
  LEVEL_1: "course-level-1",
  LEVEL_2: "course-level-2",
  LEVEL_3: "course-level-3",
  // Backwards compatibility aliases
  BEGINNER: "course-level-1",
  INTERMEDIATE: "course-level-2",
} as const;

export const CHAPTER_KEYS = {
  LEVEL1_CH1: "level1-ch-1",
  LEVEL1_CH2: "level1-ch-2",
  LEVEL2_CH1: "level2-ch-1",
  LEVEL2_CH2: "level2-ch-2",
  LEVEL2_CH3: "level2-ch-3",
  LEVEL3_CH1: "level3-ch-1",
  LEVEL3_CH2: "level3-ch-2",
  // Backwards compatibility aliases
  BEGINNER_CH1: "level1-ch-1",
  BEGINNER_CH2: "level1-ch-2",
  BEGINNER_CH3: "level2-ch-1",
  BEGINNER_CH4: "level2-ch-2",
  INTERMEDIATE_CH1: "level2-ch-3",
  INTERMEDIATE_CH2: "level3-ch-1",
  INTERMEDIATE_CH3: "level3-ch-2",
} as const;

export const QUIZ_KEYS = {
  QUIZ_LEVEL1_CH1: "quiz-level1-ch-1",
  QUIZ_LEVEL1_CH2: "quiz-level1-ch-2",
  QUIZ_LEVEL2_CH1: "quiz-level2-ch-1",
  QUIZ_LEVEL2_CH2: "quiz-level2-ch-2",
  QUIZ_LEVEL2_CH3: "quiz-level2-ch-3",
  QUIZ_LEVEL3_CH1: "quiz-level3-ch-1",
  QUIZ_LEVEL3_CH2: "quiz-level3-ch-2",
  // Backwards compatibility aliases
  QUIZ_BEGINNER_CH1: "quiz-level1-ch-1",
  QUIZ_BEGINNER_CH2: "quiz-level1-ch-2",
  QUIZ_BEGINNER_CH3: "quiz-level2-ch-1",
  QUIZ_BEGINNER_CH4: "quiz-level2-ch-2",
  QUIZ_INTERMEDIATE_CH1: "quiz-level2-ch-3",
  QUIZ_INTERMEDIATE_CH2: "quiz-level3-ch-1",
  QUIZ_INTERMEDIATE_CH3: "quiz-level3-ch-2",
} as const;

export const CURRICULUM = [
  {
    key: "course-level-1",
    title: "Level 1: Dasar Kecerdasan Buatan & Dekomposisi Komputasional",
    description: "Mempelajari esensi kecerdasan buatan, perbedaannya dengan program komputer konvensional, cara mesin belajar dari data, serta teknik dekomposisi masalah untuk menyederhanakan tugas-tugas rumit menjadi sub-tugas yang terstruktur.",
    chapters: [
      {
        key: "level1-ch-1",
        title: "Mengenal Kecerdasan Buatan (Artificial Intelligence)",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Mengenal Kecerdasan Buatan (Artificial Intelligence)
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Kecerdasan Buatan (Artificial Intelligence/AI) adalah cabang ilmu komputer yang berfokus pada penciptaan mesin atau sistem perangkat lunak yang mampu meniru kemampuan kognitif manusia, seperti belajar dari pengalaman, memahami bahasa alami, mengenali pola visual, dan mengambil keputusan secara adaptif. Konsep ini pertama kali diinisiasi secara teoritis oleh Alan Turing pada tahun 1950 melalui pertanyaan monumental 'Bisakah mesin berpikir?', sebelum istilah Artificial Intelligence diresmikan dalam konferensi ilmiah pada tahun 1956.  Perbedaan mendasar antara program komputer biasa dan kecerdasan buatan terletak pada fleksibilitas serta kemampuannya mengolah data. Program biasa, seperti kalkulator elektronik, bekerja secara deterministik berdasarkan instruksi baris kode kaku tanpa kemampuan berkembang; kalkulator tidak akan belajar dari kesalahan hitung pengguna. Sebaliknya, sistem AI memanfaatkan data historis dan algoritma pembelajaran mesin untuk mengenali pola laten, beradaptasi terhadap masukan baru, serta meningkatkan akurasi kinerjanya dari waktu ke waktu layaknya aplikasi Google Translate atau model asisten suara.  Dalam ekosistem modern, AI telah bertransformasi menjadi penolong manusia di berbagai sektor strategis. Pada bidang medis, AI memproses citra radiologi untuk membantu dokter mendiagnosis anomali jaringan lebih cepat dan presisi. Di sektor transportasi, algoritma penglihatan komputer mengendalikan kendaraan otonom untuk memindai rambu lalu lintas dan mencegah kecelakaan. Dengan memahami esensi AI, siswa diajak tidak hanya menjadi konsumen teknologi yang pasif, melainkan penjelajah digital yang kritis terhadap cara kerja mesin pintar.",
        min_watch_seconds: 90,
        quiz_key: "quiz-level1-ch-1",
      },
      {
        key: "level1-ch-2",
        title: "Berpikir Komputasional: Decomposition (Mengurai Masalah)",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Berpikir Komputasional: Decomposition (Mengurai Masalah)
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Berpikir Komputasional (Computational Thinking) merupakan metodologi pemecahan masalah sistematis yang diadopsi dari cara kerja ilmuwan komputer. Pilar fundamental pertamanya adalah Dekomposisi (Decomposition), yaitu teknik mental untuk memecah masalah besar, rumit, atau abstrak menjadi bagian-bagian kecil, terisolasi, dan terdefinisi dengan jelas sehingga jauh lebih mudah dianalisis, dirancang solusinya, dan diselesaikan secara bertahap.  Dalam realitas kehidupan sehari-hari, manusia kerap merasa kewalahan ketika berhadapan dengan target yang masif, seperti membersihkan seluruh rumah atau membuat sebuah aplikasi gim. Pendekatan dekomposisi mengajarkan analogi 'memotong pizza': sebuah pizza utuh mustahil ditelan sekaligus, namun dengan membaginya menjadi potongan-potongan terukur, kita dapat menikmatinya satu per satu tanpa hambatan. Ketika merancang proyek gim, dekomposisi membedah proyek tersebut menjadi perancangan antarmuka, penyusunan mekanik aturan, logika penilaian poin, integrasi efek audio, dan pengujian kesalahan teknis.  Selain menyederhanakan beban kognitif individu, dekomposisi menjadi prasyarat mutlak dalam kolaborasi tim profesional. Ketika sebuah masalah telah terurai menjadi modul-modul independen, anggota tim dapat berbagi tugas secara paralel sesuai keahlian masing-masing. Koki kepala di restoran mewah, manajer proyek perangkat lunak, hingga arsitek bangunan bertingkat mengandalkan dekomposisi untuk mengorkestrasi pekerjaan besar menjadi eksekusi harian yang terukur dan bebas stres.",
        min_watch_seconds: 90,
        quiz_key: "quiz-level1-ch-2",
      },
    ],
  },
  {
    key: "course-level-2",
    title: "Level 2: Pola, Abstraksi, dan Desain Algoritma Komputasional",
    description: "Mengintegrasikan tiga pilar komputasional tingkat menengah: mengenali pola dan keteraturan data (pattern recognition), menyaring esensi informasi dengan membuang detail tak relevan (abstraction), serta merancang prosedur solusi logis bertahap melalui flowchart dan pseudocode (algorithm design).",
    chapters: [
      {
        key: "level2-ch-1",
        title: "Pattern Recognition (Pengenalan Pola)",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Pattern Recognition (Pengenalan Pola)
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Pengenalan Pola (Pattern Recognition) adalah kemampuan kognitif dan algoritmik untuk mengidentifikasi kesamaan, keteraturan berulang, atau tren tren tertentu di dalam kumpulan data yang terlihat acak. Pola dapat berwujud barisan aritmatika dalam matematika, keselarasan ritme dalam melodi musik, pengulangan siklus cuaca harian, hingga kemiripan struktur wajah biologis. Ketika manusia mampu membaca pola, proses pengambilan keputusan menjadi jauh lebih cepat dan akurat.  Dalam arsitektur komputasi modern, pattern recognition bertindak sebagai fondasi utama di balik kecerdasan buatan dan machine learning. Komputer tidak dapat 'berpikir' secara filosofis, melainkan melakukan kalkulasi matematis terhadap jutaan sampel data untuk menemukan pola keteraturan. Misalnya, fitur pengenal wajah pada ponsel pintar mengidentifikasi pola jarak matematis antara mata, hidung, dan bibir pengguna untuk membuka kunci layar secara aman.  Keterampilan mengenali pola memberikan keunggulan prediktif yang luar biasa. Dokter menganalisis pola kemunculan gejala klinis untuk mendiagnosis penyakit langka tanpa harus melakukan uji coba acak, sementara detektif forensik memeriksa kesamaan modus operandi untuk memecahkan kasus investigasi. Dengan melatih ketelitian pola, peserta didik mengasah insting analitis dalam melihat keteraturan tersembunyi di balik fenomena dunia digital dan alam semesta.",
        min_watch_seconds: 90,
        quiz_key: "quiz-level2-ch-1",
      },
      {
        key: "level2-ch-2",
        title: "Abstraction (Abstraksi)",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Abstraction (Abstraksi)
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Abstraksi (Abstraction) adalah proses mental menyederhanakan suatu masalah atau sistem yang kompleks dengan berfokus secara eksklusif pada informasi esensial dan mengabaikan rincian atau detail teknis yang tidak relevan dengan tujuan pemecahan masalah. Kemampuan ini mencegah otak manusia maupun memori komputer dari 'kelebihan beban kognitif' akibat memproses data periferal yang tidak berdampak langsung terhadap hasil akhir.  Contoh paling elegan dari penerapan abstraksi adalah peta navigasi digital seperti Google Maps. Peta navigasi tidak menampilkan bentuk genteng setiap rumah, warna cat pagar, atau jumlah daun pada pepohonan di tepi jalan, melainkan hanya menampilkan garis jalan utama, arah belokan, nama kawasan, dan indikator kepadatan lalu lintas. Jika semua detail fisik digambarkan secara utuh, peta tersebut justru menjadi sangat rumit, lambat dimuat, dan membingungkan pengguna jalan.  Dalam rekayasa sistem perangkat lunak, abstraksi memungkinkan pembuatan antarmuka (interface) yang ramah pengguna. Pengemudi mobil cukup mengoperasikan pedal gas, rem, dan roda kemudi tanpa harus mengerti reaksi termodinamika di ruang bakar mesin silinder. Demikian pula siswa yang menguasai abstraksi akan mampu meringkas esensi cerita, menyusun daftar kebutuhan inti kegiatan, dan merumuskan model solusi matematika yang dapat digeneralisasi untuk berbagai permasalahan serupa.",
        min_watch_seconds: 90,
        quiz_key: "quiz-level2-ch-2",
      },
      {
        key: "level2-ch-3",
        title: "Algorithm Design (Desain Algoritma)",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Algorithm Design (Desain Algoritma)
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Desain Algoritma (Algorithm Design) adalah fase perumusan solusi konkret berupa urutan instruksi langkah demi langkah yang logis, terstruktur, dan teratur untuk menyelesaikan suatu masalah atau menghasilkan luaran yang diinginkan. Istilah algoritma berakar dari nama ilmuwan matematika dan astronomi Muslim legendaris abad ke-9, Muhammad ibn Musa al-Khwarizmi. Dalam dunia logika komputer, urutan eksekusi langkah adalah segalanya; pembalikan urutan langkah akan membatalkan validitas hasil akhir secara fatal.  Sebuah algoritma yang bermutu wajib memenuhi tiga karakteristik esensial: Jelas (unambiguous), di mana setiap instruksi memiliki interpretasi tunggal dan tidak menimbulkan multi-tafsir; Terbatas (finite), yang memastikan bahwa algoritma memiliki kondisi berhenti pasti dan tidak terjebak dalam perulangan tanpa henti (infinite loop); serta Efektif (effective), di mana seluruh operasi yang diperintahkan benar-benar dapat dieksekusi secara rasional dan memberikan solusi tepat sasaran.  Dalam mendokumentasikan algoritma, terdapat dua instrumen utama yang lazim digunakan secara profesional. Flowchart (diagram alur) memanfaatkan simbol-simbol grafis terstandardisasi seperti terminator oval untuk status awal/akhir, balok persegi panjang untuk proses kalkulasi, dan belah ketupat untuk titik pengambilan keputusan bersyarat (decision branching). Sementara itu, Pseudocode menyajikan logika algoritma menggunakan bahasa manusia terstruktur yang menyerupai sintaks kode pemrograman tingkat tinggi tanpa terikat pada aturan gramatikal bahasa pemrograman tertentu.",
        min_watch_seconds: 100,
        quiz_key: "quiz-level2-ch-3",
      },
    ],
  },
  {
    key: "course-level-3",
    title: "Level 3: Etika Kecerdasan Buatan & Ekosistem Digital Indonesia",
    description: "Menganalisis prinsip-prinsip etika kecerdasan buatan—mencakup tanggung jawab, privasi data, bias algoritma, transparansi keputusan, dan mitigasi kejahatan manipulasi informasi—serta menelaah tata kelola internet nasional melalui struktur domain resmi .id dan peran kelembagaan PANDI.",
    chapters: [
      {
        key: "level3-ch-1",
        title: "Etika AI untuk Siswa: Tanggung Jawab, Privasi, dan Keadilan Algoritma",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Etika AI untuk Siswa: Tanggung Jawab, Privasi, dan Keadilan Algoritma
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Seiring pesatnya adopsi kecerdasan buatan dalam ranah sosial dan akademik, pemahaman mengenai Etika AI (AI Ethics) menjadi kompetensi krusial yang mutlak dimiliki generasi muda. Etika AI adalah seperangkat norma, nilai filosofis, dan prinsip moral yang mengatur bagaimana sistem kecerdasan buatan dirancang, dilatih, dioperasikan, dan diawasi agar tetap selaras dengan harkat kemanusiaan, berkeadilan sosial, aman, serta tidak mendatangkan kerugian bagi individu maupun peradaban.  Kerangka etika kecerdasan buatan bertumpu pada lima pilar fundamental: Tanggung Jawab (Responsibility), yang menegaskan bahwa tanggung jawab moral dan hukum tetap berada di tangan pengembang dan pengguna manusia, bukan pada entitas mesin; Privasi Data (Data Privacy), yaitu keharusan melindungi data pribadi dan biometrik dari eksploitasi tanpa izin; Keadilan Bebas Bias (Fairness & Bias), yang menuntut dataset pelatihan bebas dari prasangka diskriminatif; Transparansi (Transparency), yaitu hak pengguna untuk memahami logika di balik keputusan sistem; serta Keamanan (Security), perlindungan terhadap manipulasi destruktif seperti konten palsu deepfake.  Dalam konteks interaksi pelajar, etika AI menuntut integritas dan kesadaran kritis. Penggunaan model bahasa besar seperti ChatGPT untuk menyelesaikan tugas sekolah wajib diposisikan sebagai mitra bertukar pikiran konseptual, bukan alat otomatisasi plagiasi yang menumpulkan kemampuan berpikir kritis. Siswa juga harus mewaspadai efek ruang gema (echo chamber) dan manipulasi citra tubuh akibat penggunaan filter wajah berlebihan di media sosial demi menjaga kesehatan mental dan etika digital yang sehat.",
        min_watch_seconds: 100,
        quiz_key: "quiz-level3-ch-1",
      },
      {
        key: "level3-ch-2",
        title: "Mengenal Identitas Digital & Tata Kelola Domain .id",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Mengenal Identitas Digital & Tata Kelola Domain .id
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Internet global beroperasi menggunakan sistem pengalamatan berbasis deretan angka biner unik yang dikenal sebagai Internet Protocol (IP) Address. Namun, karena keterbatasan memori kognitif manusia dalam menghafal kombinasi numerik rumit, Domain Name System (DNS) hadir untuk memetakan IP address ke dalam Nama Domain tekstual yang intuitif dan bermakna. Nama domain berfungsi layaknya alamat domisili resmi sebuah entitas atau individu pada jaringan internet global.  Dalam hierarki sistem domain, ekstensi '.id' merupakan Country Code Top-Level Domain (ccTLD) yang merepresentasikan kedaulatan, identitas kultural, dan reputasi hukum Negara Kesatuan Republik Indonesia. Memanfaatkan domain .id memberikan kredibilitas tinggi bagi institusi pendidikan, korporasi, maupun portofolio personal pelajar karena terikat langsung dengan verifikasi identitas resmi. Hingga akhir tahun 2024, domain .id telah tumbuh menjadi pengelola domain terbesar di kawasan Asia Tenggara dengan menembus lebih dari 1,2 juta nama domain terdaftar.  Tata kelola nama domain nasional dioperasikan secara profesional oleh Pengelola Nama Domain Internet Indonesia (PANDI), sebuah perkumpulan multipemangku kepentingan yang menerima mandat redelegasi dari Internet Assigned Numbers Authority (IANA) sejak tahun 2013. PANDI memastikan kestabilan ekosistem digital nasional melalui pengoperasian 44 server DNS Anycast berkecepatan tinggi yang tersebar di dalam dan luar negeri, menegakkan kepatuhan terhadap regulasi perundang-undangan nasional, serta aktif mengawal forum tata kelola internet internasional seperti ICANN dan APTLD.",
        min_watch_seconds: 90,
        quiz_key: "quiz-level3-ch-2",
      },
    ],
  },
];
