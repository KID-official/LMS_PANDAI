/**
 * Global Constants & Keys for Curriculum System
 * Updated with Multi-Thematic AI & Computational Thinking Curriculum
 */

export const COURSE_KEYS = {
  AI_ROBOTIKA: "ai-robotika",
  DEKOMPOSISI_POLA: "dekomposisi-pola",
  ABSTRAKSI_ALGORITMA: "abstraksi-algoritma",
  ETIKA_DIGITAL: "etika-digital",
  // Backwards compatibility aliases
  LEVEL_1: "ai-robotika",
  LEVEL_2: "dekomposisi-pola",
  LEVEL_3: "abstraksi-algoritma",
  LEVEL_4: "etika-digital",
  BEGINNER: "ai-robotika",
  INTERMEDIATE: "dekomposisi-pola",
} as const;

export const CHAPTER_KEYS = {
  AIR_CH1: "air-ch-1",
  AIR_CH2: "air-ch-2",
  AIR_CH3: "air-ch-3",
  DEK_CH1: "dek-ch-1",
  DEK_CH2: "dek-ch-2",
  DEK_CH3: "dek-ch-3",
  ALG_CH1: "alg-ch-1",
  ALG_CH2: "alg-ch-2",
  ALG_CH3: "alg-ch-3",
  ETIKA_CH1: "etika-ch-1",
  ETIKA_CH2: "etika-ch-2",
  ETIKA_CH3: "etika-ch-3",
  // Backwards compatibility aliases
  LEVEL1_CH1: "air-ch-1",
  LEVEL1_CH2: "air-ch-2",
  LEVEL1_CH3: "air-ch-3",
  LEVEL2_CH1: "dek-ch-1",
  LEVEL2_CH2: "dek-ch-2",
  LEVEL2_CH3: "dek-ch-3",
  LEVEL3_CH1: "alg-ch-1",
  LEVEL3_CH2: "alg-ch-2",
  LEVEL3_CH3: "alg-ch-3",
  LEVEL4_CH1: "etika-ch-1",
  LEVEL4_CH2: "etika-ch-2",
  LEVEL4_CH3: "etika-ch-3",
  BEGINNER_CH1: "air-ch-1",
  BEGINNER_CH2: "air-ch-2",
  BEGINNER_CH3: "air-ch-3",
  BEGINNER_CH4: "dek-ch-1",
  INTERMEDIATE_CH1: "dek-ch-2",
  INTERMEDIATE_CH2: "dek-ch-3",
  INTERMEDIATE_CH3: "alg-ch-1",
} as const;

export const QUIZ_KEYS = {
  QUIZ_AIR_CH1: "quiz-air-ch-1",
  QUIZ_AIR_CH2: "quiz-air-ch-2",
  QUIZ_AIR_CH3: "quiz-air-ch-3",
  QUIZ_DEK_CH1: "quiz-dek-ch-1",
  QUIZ_DEK_CH2: "quiz-dek-ch-2",
  QUIZ_DEK_CH3: "quiz-dek-ch-3",
  QUIZ_ALG_CH1: "quiz-alg-ch-1",
  QUIZ_ALG_CH2: "quiz-alg-ch-2",
  QUIZ_ALG_CH3: "quiz-alg-ch-3",
  QUIZ_ETIKA_CH1: "quiz-etika-ch-1",
  QUIZ_ETIKA_CH2: "quiz-etika-ch-2",
  QUIZ_ETIKA_CH3: "quiz-etika-ch-3",
  // Backwards compatibility aliases
  QUIZ_LEVEL1_CH1: "quiz-air-ch-1",
  QUIZ_LEVEL1_CH2: "quiz-air-ch-2",
  QUIZ_LEVEL1_CH3: "quiz-air-ch-3",
  QUIZ_LEVEL2_CH1: "quiz-dek-ch-1",
  QUIZ_LEVEL2_CH2: "quiz-dek-ch-2",
  QUIZ_LEVEL2_CH3: "quiz-dek-ch-3",
  QUIZ_LEVEL3_CH1: "quiz-alg-ch-1",
  QUIZ_LEVEL3_CH2: "quiz-alg-ch-2",
  QUIZ_LEVEL3_CH3: "quiz-alg-ch-3",
  QUIZ_LEVEL4_CH1: "quiz-etika-ch-1",
  QUIZ_LEVEL4_CH2: "quiz-etika-ch-2",
  QUIZ_LEVEL4_CH3: "quiz-etika-ch-3",
  QUIZ_BEGINNER_CH1: "quiz-air-ch-1",
  QUIZ_BEGINNER_CH2: "quiz-air-ch-2",
  QUIZ_BEGINNER_CH3: "quiz-air-ch-3",
  QUIZ_BEGINNER_CH4: "quiz-dek-ch-1",
  QUIZ_INTERMEDIATE_CH1: "quiz-dek-ch-2",
  QUIZ_INTERMEDIATE_CH2: "quiz-dek-ch-3",
  QUIZ_INTERMEDIATE_CH3: "quiz-alg-ch-1",
} as const;

export const CURRICULUM = [
  {
    key: "ai-robotika",
    title: "Dasar Kecerdasan Buatan & Robotika Cerdas",
    description: "Kursus pengantar yang mengeksplorasi hakikat kecerdasan buatan, perbedaannya dengan program komputer konvensional, pemrosesan sensorik pada robot pintar, sejarah perkembangan AI sejak Alan Turing, hingga pemanfaatannya dalam kehidupan sehari-hari.",
    chapters: [
      {
        key: "air-ch-1",
        title: "Hakikat Kecerdasan Buatan & Cara Mesin Belajar",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Hakikat Kecerdasan Buatan & Cara Mesin Belajar
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Kecerdasan Buatan atau Artificial Intelligence (AI) adalah bidang ilmu komputer yang berfokus pada pengembangan sistem cerdas yang mampu meniru cara berpikir, belajar, dan beradaptasi layaknya manusia[cite: 33, 34]. Sistem AI dirancang untuk memproses data masukan, mengenali karakteristik pola yang terkandung di dalamnya, dan mengambil keputusan secara mandiri[cite: 34]. Kemampuan adaptif inilah yang membedakan AI dengan teknologi komputasi terdahulu[cite: 34].  Perbedaan utama antara program komputer biasa dan sistem AI terletak pada fleksibilitas operasionalnya[cite: 34]. Program biasa, seperti kalkulator elektronik, bekerja secara statis mengikuti deretan instruksi kaku tanpa memahami arti data yang diproses; kalkulator tidak akan pernah belajar dari kesalahan[cite: 34]. Sebaliknya, aplikasi berbasis AI seperti Google Translate terus belajar dari ribuan sampel teks multibahasa untuk memperbaiki kualitas dan keakuratan terjemahan dari waktu ke waktu[cite: 34, 37].  Melalui kemampuan belajar dari data (machine learning), AI mampu memecahkan masalah non-linear yang tidak bisa diselesaikan dengan logika pemrograman biasa[cite: 34]. Komputer dengan AI dapat dilatih untuk mengenali wajah teman, memahami percakapan suara secara kontekstual, hingga mendeteksi anomali informasi digital secara otomatis[cite: 34]. Hal ini membuka babak baru di mana komputer tidak lagi hanya menjadi alat hitung, melainkan mitra berpikir manusia[cite: 34, 35].",
        min_watch_seconds: 90,
        quiz_key: "quiz-air-ch-1",
      },
      {
        key: "air-ch-2",
        title: "AI Penolong Manusia & Ragam Penerapan Sektoral",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: AI Penolong Manusia & Ragam Penerapan Sektoral
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Kecerdasan Buatan telah bertransformasi dari eksperimen laboratorium menjadi penolong nyata yang mempermudah berbagai sektor kehidupan manusia[cite: 35]. Di dunia kesehatan, AI membantu dokter menganalisis citra medis seperti rontgen untuk mendeteksi penyakit lebih cepat dan akurat[cite: 35, 37]. Di bidang transportasi publik dan logistik, algoritma AI mengendalikan mobil tanpa sopir untuk memindai kondisi jalan raya serta menghindari potensi tabrakan secara waktu-nyata[cite: 35, 37].  Di lingkungan pendidikan dan rumah pintar, AI beroperasi melalui asisten virtual seperti Siri, Alexa, atau Google Assistant[cite: 35, 37]. Sistem ini mendengarkan perintah suara melalui mikrofon, mengonversi gelombang suara analog menjadi format data digital, lalu menganalisis kata kerja aksi dan objek yang dituju[cite: 36]. Contohnya, pada robot pintar Ribo, perintah 'nyalakan lampu' diterjemahkan menjadi sinyal elektrik untuk mengaktifkan saklar ruangan[cite: 35, 36].  AI dalam pendidikan juga bertindak sebagai asisten belajar mandiri yang mampu memahami ritme serta kebutuhan unik setiap peserta didik[cite: 35, 38]. Melalui pemanfaatan yang tepat, AI mempercepat pekerjaan, meminimalkan risiko human error, dan meningkatkan kualitas hidup masyarakat secara luas[cite: 35]. Namun, keberhasilan teknologi ini tetap bertumpu pada peran manusia yang mengarahkan dan mengendalikannya secara bijaksana[cite: 35, 105].",
        min_watch_seconds: 90,
        quiz_key: "quiz-air-ch-2",
      },
      {
        key: "air-ch-3",
        title: "Sejarah, Tokoh Pelopor, & Detektif AI di Lingkungan",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Sejarah, Tokoh Pelopor, & Detektif AI di Lingkungan
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Gagasan mengenai mesin yang mampu berpikir telah dirintis jauh sebelum komputer elektronik modern diciptakan[cite: 39]. Pada tahun 1495, ilmuwan jenius Leonardo da Vinci merancang robot mekanik berkostum ksatria yang mampu duduk, berdiri, dan menggerakkan tangannya menggunakan sistem katrol mekanik[cite: 39]. Namun, fondasi teoritis AI modern baru dicetuskan pada dekade 1950-an ketika Alan Turing mengajukan pertanyaan legendaris: 'Bisakah mesin berpikir?'[cite: 39].  Istilah 'Artificial Intelligence' secara resmi diikrarkan dalam konferensi Dartmouth College pada tahun 1956[cite: 39]. Sejak saat itu, AI berkembang pesat melintasi berbagai era: dari superkomputer Deep Blue milik IBM yang mengalahkan grandmaster catur dunia pada 1997, kehadiran robot humanoid Sophia yang mampu berdialog ekspresif, hingga ledakan model bahasa besar (LLM) seperti ChatGPT di era kontemporer[cite: 39].  Untuk mengasah kepekaan teknologi, siswa diajak menjadi 'Detektif AI' dengan mengamati perangkat sehari-hari[cite: 40, 45]. Fitur filter kamera yang melacak kontur wajah, algoritma rekomendasi lagu pada aplikasi pemutar musik, serta kalkulasi rute tercepat pada Google Maps merupakan wujud nyata AI yang bekerja di sekitar kita tanpa kita sadari[cite: 40, 45]. Memahami sejarah dan manifestasi AI membangun kesadaran kritis bahwa teknologi selalu berevolusi mengikuti kebutuhan manusia[cite: 39, 45].",
        min_watch_seconds: 90,
        quiz_key: "quiz-air-ch-3",
      },
    ],
  },
  {
    key: "dekomposisi-pola",
    title: "Berpikir Komputasional: Dekomposisi & Pengenalan Pola",
    description: "Mempelajari dua pilar fundamental computational thinking: teknik dekomposisi untuk membedah tantangan besar menjadi unit terukur, visualisasi peta pikiran (mind mapping), serta pengenalan pola (pattern recognition) sebagai basis inferensi AI.",
    chapters: [
      {
        key: "dek-ch-1",
        title: "Dekomposisi: Mengurai Kompleksitas Masalah",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Dekomposisi: Mengurai Kompleksitas Masalah
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Dekomposisi (Decomposition) adalah keterampilan kognitif dalam computational thinking yang berfungsi untuk memecah masalah besar, rumit, atau membingungkan menjadi bagian-bagian kecil yang lebih mudah dipahami dan dikelola[cite: 47, 48]. Ketika dihadapkan pada target masif—seperti membuat aplikasi gim atau merapikan seluruh isi rumah—manusia cenderung merasa cemas jika melihat persoalan tersebut secara utuh sekaligus[cite: 47, 48].  Teknik dekomposisi dapat dianalogikan dengan cara kita menikmati pizza[cite: 48, 53]. Kita mustahil menelan loyang pizza berukuran besar dalam satu gigitan; kita memotongnya menjadi beberapa irisan terukur agar mudah disantap satu per satu[cite: 53]. Dalam pembuatan gim edukasi, dekomposisi menguraikan proyek menjadi lima sub-tugas konkret: mendesain tampilan antarmuka, menyusun aturan skor, merancang tingkat kesulitan, menambahkan efek audio, dan melakukan pengujian program[cite: 48].  Selain menyederhanakan masalah individu, dekomposisi merupakan kunci utama kolaborasi dalam tim[cite: 48]. Dengan membagi persoalan menjadi sub-tugas terpisah, setiap anggota kelompok dapat bekerja secara mandiri dan paralel sesuai keahliannya[cite: 48]. Koki profesional, insinyur jembatan, dan perancang perangkat lunak kelas dunia senantiasa memanfaatkan dekomposisi untuk mengeksekusi proyek besar secara terorganisir dan bebas stres[cite: 48, 52].",
        min_watch_seconds: 90,
        quiz_key: "quiz-dek-ch-1",
      },
      {
        key: "dek-ch-2",
        title: "Visualisasi Masalah & Pemodelan Mind Mapping",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Visualisasi Masalah & Pemodelan Mind Mapping
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Peta Pikiran (Mind Mapping) adalah sarana visual yang sangat ampuh untuk mengorganisasikan hasil dekomposisi masalah[cite: 52]. Otak manusia bekerja lebih optimal ketika menangkap keterkaitan grafis berbentuk percabangan dibandingkan membaca teks daftar yang panjang[cite: 52]. Dalam sebuah mind map, tujuan atau masalah utama diposisikan di lingkaran tengah, sementara langkah-langkah persiapan, eksekusi, dan evaluasi ditarik keluar menjadi cabang-cabang turunan yang terstruktur[cite: 52].  Sebagai ilustrasi, proses memasak mi instan dapat divisualisasikan menjadi lima simpul cabang utama: menyiapkan mi dan bumbu, merebus air, memasukkan mi, meniriskan kuah, dan mencampurkan bumbu penyedap[cite: 53]. Begitu pula dalam merencanakan kegiatan kompleks seperti pentas seni sekolah atau liburan keluarga, mind mapping memastikan tidak ada perlengkapan krusial yang terlewatkan[cite: 50, 55].  Selain mengurai dari depan, siswa juga melatih logika komputasional melalui metode 'puzzle terbalik'[cite: 54]. Dengan membayangkan produk akhir yang sudah jadi lalu menelusuri mundur komponen pembentuknya, siswa melatih kepekaan logika kausalitas (sebab-akibat)[cite: 54]. Keterampilan visualisasi ini menjadi fondasi penting sebelum melangkah ke tahap penulisan logika algoritma formal[cite: 52, 90].",
        min_watch_seconds: 90,
        quiz_key: "quiz-dek-ch-2",
      },
      {
        key: "dek-ch-3",
        title: "Pattern Recognition: Keteraturan Data & Pondasi AI",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Pattern Recognition: Keteraturan Data & Pondasi AI
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Pengenalan Pola (Pattern Recognition) adalah kemampuan untuk menemukan keteraturan, kesamaan karakteristik, atau tren berulang yang tersembunyi di dalam sekumpulan data[cite: 60, 61]. Tanpa disadari, otak manusia senantiasa mengenali pola setiap saat: menebak buah berikutnya pada barisan 'apel, jeruk, pisang', menikmati keselarasan rima dalam bait lagu, atau bersiap membawa payung saat mengamati pola langit mendung di sore hari[cite: 60, 61, 62].  Dalam sains komputasi dan kecerdasan buatan, pattern recognition merupakan mesin penggerak utama di balik kemampuan adaptif komputer[cite: 61]. Komputer tidak memiliki kesadaran emosional; ia belajar memahami dunia dengan mengidentifikasi pola data biner[cite: 34, 61]. Sebagai contoh, sistem pembuka kunci wajah (Face Recognition) bekerja dengan memetakan pola jarak matematis antara mata, hidung, dan garis rahang pengguna untuk dicocokkan dengan profil pemilik[cite: 62].  Kemampuan mengenali pola memberikan keunggulan prediktif yang sangat berharga[cite: 61]. Detektif kepolisian mencari pola waktu dan lokasi kejahatan untuk mengungkap pelaku kriminal, sementara dokter memeriksa pola gejala klinis untuk menegakkan diagnosis medis yang akurat[cite: 65]. Menguasai pengenalan pola melatih siswa berpikir logis, cepat menggeneralisasi aturan, dan memecahkan masalah berulang secara efisien[cite: 61].",
        min_watch_seconds: 90,
        quiz_key: "quiz-dek-ch-3",
      },
    ],
  },
  {
    key: "abstraksi-algoritma",
    title: "Berpikir Komputasional: Abstraksi & Desain Algoritma",
    description: "Mendalami teknik abstraksi untuk menyaring esensi data dan mengeliminasi detail periferal, serta merumuskan urutan solusi logis, terbatas, dan efektif menggunakan representasi flowchart dan pseudocode.",
    chapters: [
      {
        key: "alg-ch-1",
        title: "Abstraksi: Menyaring Esensi & Eliminasi Detail",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Abstraksi: Menyaring Esensi & Eliminasi Detail
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Abstraksi (Abstraction) adalah pilar computational thinking yang berfokus pada pemilahan informasi: mengambil fakta dan data yang benar-benar esensial, serta mengabaikan detail periferal yang tidak relevan dengan tujuan pemecahan masalah[cite: 74, 75]. Dalam kehidupan sehari-hari, kita kerap terdistraksi oleh terlalu banyak rincian kecil yang mengaburkan gambaran besar (big picture) dari suatu persoalan[cite: 75].  Prinsip abstraksi dapat diibaratkan seperti mengupas buah apel[cite: 79, 80]. Kita membuang kulit luar dan bijinya yang keras untuk mengambil bagian daging buahnya yang bermanfaat untuk dikonsumsi[cite: 79, 80]. Saat kita melihat peta kota atau peta rute navigasi Google Maps, kita tidak disajikan gambar setiap tiang listrik, warna cat genteng rumah, atau helai daun pohon di pinggir jalan; peta hanya menampilkan jalan utama, persimpangan, dan nama tempat penting agar pengguna dapat membaca arah dalam sekejap[cite: 75, 79].  Dalam rekayasa sistem perangkat lunak, abstraksi memungkinkan penyusunan antarmuka pengguna yang bersih dan mudah digunakan[cite: 75]. Pengguna aplikasi transportasi online cukup memilih titik jemput dan tujuan tanpa perlu dipusingkan oleh kerumitan baris kode sistem navigasi satelit di latar belakang[cite: 75]. Siswa yang menguasai abstraksi mampu meringkas materi bacaan panjang, merancang denah ruang fungsional, dan merumuskan model solusi yang efisien[cite: 75, 80, 81].",
        min_watch_seconds: 90,
        quiz_key: "quiz-alg-ch-1",
      },
      {
        key: "alg-ch-2",
        title: "Desain Algoritma: Karakteristik Solusi Runtut & Logis",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Desain Algoritma: Karakteristik Solusi Runtut & Logis
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Desain Algoritma (Algorithm Design) adalah keterampilan menyusun serangkaian langkah operasional yang terurut, logis, dan terencana untuk menyelesaikan masalah atau mencapai tujuan tertentu[cite: 88, 89]. Kata 'algoritma' berakar dari nama ilmuwan matematika Muslim legendaris abad ke-9, Muhammad ibn Musa al-Khwarizmi, penemu aljabar yang mengenalkan metode hitung sistematis[cite: 95]. Resep masakan, petunjuk perakitan mainan, dan rute belokan di Google Maps adalah wujud konkret algoritma dalam dunia nyata[cite: 90, 95].  Dalam dunia komputasi dan logika, urutan langkah adalah segalanya[cite: 89]. Jika langkah-langkah diacak atau dieksekusi di luar urutan rasional, hasil akhirnya pasti salah atau bahkan memicu masalah baru[cite: 89]. Sebagai ilustrasi, membuat nasi goreng menuntut kita menyalakan kompor dan memanaskan minyak sebelum menaruh bumbu; bila kita memasukkan nasi dan kecap ke atas wajan dingin tanpa menyalakan api kompor, nasi goreng tidak akan pernah matang[cite: 88, 89].  Sebuah algoritma yang baik wajib memenuhi tiga karakteristik esensial: Jelas (setiap instruksi mudah dipahami dan bermakna tunggal), Terbatas (memiliki titik akhir yang pasti dan tidak berputar tanpa batas), serta Efektif (mampu menyelesaikan persoalan dengan benar dan tepat sasaran)[cite: 89, 90]. Mempelajari desain algoritma membentuk pola pikir terstruktur yang esensial bagi pemrogram maupun pemecah masalah profesional[cite: 91, 98].",
        min_watch_seconds: 90,
        quiz_key: "quiz-alg-ch-2",
      },
      {
        key: "alg-ch-3",
        title: "Representasi Algoritma: Flowchart & Pseudocode",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Representasi Algoritma: Flowchart & Pseudocode
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Untuk mengomunikasikan logika algoritma kepada sesama manusia maupun sebelum diterjemahkan menjadi kode program komputer, terdapat dua format representasi standar yang digunakan: Flowchart (Diagram Alur) dan Pseudocode (Kode Semu)[cite: 90]. Masing-masing memiliki keunggulan fungsional dalam mendokumentasikan alur berpikir secara transparan dan terstandarisasi[cite: 90].  Flowchart menyajikan alur instruksi melalui simbol-simbol grafis baku yang dihubungkan dengan garis panah[cite: 90, 96]. Simbol oval (terminator) digunakan untuk menandai titik Mulai dan Selesai; simbol persegi panjang melambangkan proses aksi atau eksekusi operasional; sedangkan simbol belah ketupat (decision) digunakan untuk evaluasi keputusan bersyarat yang menghasilkan cabang 'Ya' atau 'Tidak'[cite: 94, 96]. Sebagai contoh, dalam flowchart memasak mi instan, belah ketupat mengevaluasi: 'Apakah air sudah mendidih?'; jika belum, alur panah berputar kembali merebus air[cite: 94, 97].  Pseudocode adalah penyajian algoritma menggunakan kalimat terstruktur menyerupai bahasa pemrograman komputer, namun tetap menggunakan bahasa manusia yang sederhana dan mudah dipahami[cite: 90]. Pseudocode tidak terikat pada aturan sintaks bahasa pemrograman tertentu (seperti Python atau C++), sehingga sangat efektif digunakan untuk merancang kerangka logika pemecahan masalah sebelum tahap pengodean yang sesungguhnya dimulai[cite: 90, 94].",
        min_watch_seconds: 100,
        quiz_key: "quiz-alg-ch-3",
      },
    ],
  },
  {
    key: "etika-digital",
    title: "Etika Kecerdasan Buatan & Kedaulatan Digital Indonesia",
    description: "Menganalisis prinsip pertanggungjawaban dalam pemanfaatan AI, mitigasi ancaman manipulasi visual (deepfake), pencegahan bias algoritma, menjaga integritas akademik, serta menelaah tata kelola internet nasional melalui domain resmi .id dan peran kelembagaan PANDI.",
    chapters: [
      {
        key: "etika-ch-1",
        title: "Lima Pilar Etika Kecerdasan Buatan",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Lima Pilar Etika Kecerdasan Buatan
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Perkembangan kecerdasan buatan yang eksponensial menuntut landasan moral dan hukum yang kokoh agar teknologi tetap bermanfaat bagi peradaban manusia[cite: 104, 105]. Etika AI (AI Ethics) adalah seperangkat nilai, norma, dan prinsip yang memandu perancangan serta pengoperasian sistem cerdas agar adil, aman, dan dapat dipertanggungjawabkan[cite: 104, 105]. Tanpa kerangka etika, AI yang sangat canggih berpotensi menciptakan ketidakadilan sistemik dan mengancam hak-hak asasi individu[cite: 105].  Etika AI bertumpu pada lima pilar fundamental: Tanggung Jawab (Responsibility), di mana manusia pembuat dan pengguna tetap menjadi pihak yang wajib bertanggung jawab secara moral dan hukum saat terjadi kesalahan[cite: 105]; Privasi Data (Data Privacy), kewajiban menjaga kerahasiaan data personal dan biometrik dari eksploitasi tanpa persetujuan[cite: 105]; Bebas dari Bias (Fairness), keharusan memastikan data latih AI bersifat inklusif agar tidak mendiskriminasi kelompok tertentu[cite: 105]; Transparansi (Transparency), hak manusia untuk mengetahui dan memahami alasan di balik keputusan yang diambil sistem[cite: 105]; serta Keamanan (Security), proteksi sistem dari penyalahgunaan kejahatan siber[cite: 105].  Isu bias algoritma menjadi salah satu tantangan paling krusial[cite: 105]. Jika data latih yang diberikan tidak seimbang—misalnya sistem pengenal wajah yang hanya dilatih menggunakan sampel wajah orang berkulit terang—AI akan mengalami bias dan menghasilkan tingkat kesalahan tinggi saat mengidentifikasi individu dari ras lain[cite: 105]. Memahami kelima pilar ini membimbing siswa menjadi pengguna teknologi yang kritis, bertanggung jawab, dan berintegritas[cite: 106, 112].",
        min_watch_seconds: 90,
        quiz_key: "quiz-etika-ch-1",
      },
      {
        key: "etika-ch-2",
        title: "Integritas Digital: Deepfake, Echo Chamber, & Plagiasi",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Integritas Digital: Deepfake, Echo Chamber, & Plagiasi
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Pemanfaatan AI dalam ekosistem digital media sosial membawa dampak psikologis dan sosial yang nyata bagi generasi muda[cite: 106, 107]. Penggunaan filter wajah berbasis AI yang mengubah bentuk mata, hidung, dan tekstur kulit dapat memicu distorsi persepsi diri bila siswa merasa tidak percaya diri dengan penampilan alaminya[cite: 106]. Lebih berbahaya lagi, teknologi AI kini dapat disalahgunakan untuk menciptakan rekayasa manipulasi citra dan suara realistis yang dikenal sebagai deepfake untuk menyebarkan fitnah dan hoaks publik[cite: 105, 112].  Di sisi lain, algoritma kurasi konten pada platform video dan musik dapat memicu fenomena ruang gema (echo chamber)[cite: 107, 108, 114]. Ketika algoritma hanya menyajikan materi yang disukai pengguna secara terus-menerus, pandangan seseorang menjadi sempit dan terisolasi dari sudut pandang baru yang beragam[cite: 107, 108, 114]. Siswa perlu secara sadar melatih rasa ingin tahu terhadap berbagai sudut pandang agar tidak terjebak dalam gelembung informasi algoritma[cite: 107, 108].  Dalam kehidupan sekolah, kehadiran generative AI seperti ChatGPT menuntut komitmen integritas akademik yang tinggi[cite: 106, 109]. Menggunakan AI untuk mengerjakan seluruh tugas tanpa membaca, memahami, atau memikirkan isinya adalah tindakan plagiasi yang menumpulkan kemampuan berpikir kritis siswa[cite: 106, 109]. AI seharusnya difungsikan sebagai mitra diskusi konseptual dan teman bertukar pikiran, bukan alat untuk memalsukan proses belajar[cite: 106, 109].",
        min_watch_seconds: 90,
        quiz_key: "quiz-etika-ch-2",
      },
      {
        key: "etika-ch-3",
        title: "Identitas Digital & Tata Kelola Domain .id",
        // [MEDIA CONTEXT - VIDEO]: Video pembelajaran YouTube | Tema: Identitas Digital & Tata Kelola Domain .id
        youtube_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "Jaringan internet menghubungkan miliaran perangkat di dunia menggunakan deretan angka biner unik yang disebut Internet Protocol (IP) Address[cite: 119]. Namun, karena memori manusia sulit mengingat kombinasi angka rumit, diciptakanlah Domain Name System (DNS) yang berfungsi menerjemahkan deretan alamat IP menjadi nama domain tekstual yang mudah diingat, layaknya nama kontak di ponsel[cite: 119]. Nama domain bertindak sebagai alamat domisili resmi sebuah situs web maupun surat elektronik (email)[cite: 119].  Ekstensi '.id' merupakan Country Code Top-Level Domain (ccTLD) yang menunjukkan identitas dan kedaulatan digital Indonesia di mata dunia[cite: 119]. Menggunakan domain .id mencerminkan kebanggaan nasional, memberikan rasa aman serta tingkat kepercayaan tinggi bagi pengguna, dan terikat dengan kepatuhan hukum Republik Indonesia[cite: 119]. Hingga akhir tahun 2024, domain .id telah tumbuh menjadi pengelola domain terbesar di Asia Tenggara dengan menembus 1,2 juta nama domain terdaftar[cite: 121].  Pengelolaan dan pemeliharaan domain .id diamanahkan kepada PANDI (Pengelola Nama Domain Internet Indonesia), organisasi multipemangku kepentingan yang menerima mandat redelegasi dari IANA sejak 2013[cite: 120, 121]. PANDI menjamin kestabilan dan keamanan ekosistem siber dengan mengoperasikan 44 server DNS Anycast yang tersebar di kota-kota besar Indonesia serta pusat internet mancanegara, sekaligus aktif mengawal forum tata kelola internet global seperti ICANN dan APTLD[cite: 120, 121, 122].",
        min_watch_seconds: 90,
        quiz_key: "quiz-etika-ch-3",
      },
    ],
  },
];
