export interface ArticleData {
  id: string;
  category: string;
  categoryColor: string;
  badgeTag: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  date: string;
  updateTime: string;
  readTime: string;
  views: string;
  doi: string;
  title: string;
  excerpt: string;
  image: string;
  imageCaption: string;
  imageExif: string;
  c2paId: string;
  tags: string[];
  keyTakeaways: string[];
  pullQuote?: {
    text: string;
    author: string;
    role: string;
  };
}

export const LEAD_ARTICLE: ArticleData = {
  id: 'lead',
  category: 'Liputan Khusus',
  categoryColor: 'bg-[#7F54F8] text-white',
  badgeTag: 'Forensik Digital 2026',
  author: 'Tim Litbang Pengmas UNAIR x AmosProduction',
  authorRole: 'Peneliti Utama Forensik Komputasi',
  authorAvatar: 'UA',
  date: '14 Oktober 2026',
  updateTime: 'Diperbarui 09:30 WIB',
  readTime: '8 menit baca',
  views: '3.840 kali dibaca',
  doi: '10.5281/zenodo.sfa-2026-c2pa',
  title: 'Terobosan Deteksi Deepfake Berbasis C2PA: Standar Baru Keamanan Konten Sekolah 2026',
  excerpt:
    'Inisiatif enkripsi metadata terbuka Coalition for Content Provenance and Authenticity (C2PA) mulai diterapkan pada platform pembelajaran nasional untuk membekali siswa SMP kemampuan verifikasi rekaman dan citra visual secara ilmiah.',
  image:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCPeiptoSn8t2O-_nMKe_zwFs5P812AbI7fF_3HvXBZDGP5_U1Bf2JHbLYIpFdNn3f62gxlUB5w_ELsFptGk1JSwz7SbwpqAh91iooO4JRaA2jAEhazNTXmhl4NXrXbTC-83VzWYHN_OSW38dF1LYXUre1BswWpwWI96i_vA4fd519vGMTCLlWXjgZTMN_YWchhceT0WDV3Q_jshOGxrNHmSw5XHJDjOYKHTInGy9HnEOv_RuJKViXE',
  imageCaption:
    'Siswa SMP mengamati anomali artefak bayangan dan metadata EXIF pada materi pengujian media sintetik di laboratorium multimedia SFA Learn. (Dok. Tim Litbang Pengmas UNAIR)',
  imageExif: 'ISO 200 • f/2.8 • 1/250s (Kamera Forensik Lab SFA)',
  c2paId: '#ID-8842-LAB',
  tags: ['#DeepfakeForensics', '#C2PA', '#LiterasiDigitalSMP', '#EtikaAI', '#SFAlearn'],
  keyTakeaways: [
    'Standar C2PA menyematkan manifest digital kriptografi anti-manipulasi langsung ke dalam berkas media sejak tombol rana kamera ditekan.',
    'Inspeksi mata telanjang tak lagi memadai karena generator difusi AI 2026 telah mengatasi galat anatomi jari, pantulan kornea, dan cacat tekstur kulit mikro.',
    'Alur praktis 4 langkah SIFT terbukti meningkatkan akurasi verifikasi siswa hingga 84,2% dalam uji klinis selama 3 pekan pengamatan.',
  ],
  pullQuote: {
    text: 'Literasi AI bukan sekadar melarang penggunaan alat, melainkan membentuk nalar kritis siswa agar tidak mudah terperdaya oleh distorsi informasi digital.',
    author: 'Dr. Alwan Hakim, M.Kom.',
    role: 'Kepala Laboratorium Forensik Digital UNAIR & Penasihat Riset SFA Learn',
  },
};

export const ALL_ARTICLES: ArticleData[] = [
  {
    id: '1',
    category: 'Eksperimen Lab',
    categoryColor: 'bg-[#E8DEFF] text-[#7F54F8]',
    badgeTag: 'Uji Akurasi 2026',
    author: 'Dr. Rizal Pratama',
    authorRole: 'Dosen Komputer Vokasi UNAIR',
    authorAvatar: 'RP',
    date: '12 Oktober 2026',
    updateTime: 'Diperbarui 14:15 WIB',
    readTime: '6 menit baca',
    views: '4.820 kali dibaca',
    doi: '10.5281/zenodo.sfa-2026-detector',
    title: 'Uji Komparasi 5 Alat Detektor Teks AI Gratis: Seberapa Akurat untuk Tugas Bahasa Indonesia?',
    excerpt:
      'Pengujian blind-test pada 150 esai siswa menunjukkan tingkat positif palsu (false-positive) hingga 23% pada teks berstruktur formal klasik.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJBLjGlN82fQ34oRqwKhOPsVmJGqHzcvGi45UIB6Ak_sdkFHvs3OXfPQfM-mhSptUyXi0JAfYJeSDGrUyHuKsITyYV7dwyvtRuKP_NUFkE9jRDUpLKKBkTX_KUkb-KmCBytg29Go1IQVzsLYm8C_PEXxNgASP0edo4vWMiPO2W_C9s1EG55jnxU9E92cr0kKE1agKEOoP4y7SfIS8rTbtCHPjBC0uWoHldlH1iYDzWOu4t8Fz_W-UZ',
    imageCaption:
      'Tampilan antarmuka pengujian komparasi algoritma NLP detektor teks AI pada laboratorium komputasi SFA Learn.',
    imageExif: 'Node JS v20.12 • Python 3.11 • Model Classifier v4.2',
    c2paId: '#ID-9912-EXP',
    tags: ['#DetektorAI', '#TugasSekolah', '#FalsePositive', '#BahasaIndonesia'],
    keyTakeaways: [
      'Alat detektor berbasis n-gram sering mengklasifikasikan tulisan formal siswa sebagai buatan AI.',
      'Diperlukan pendekatan penilaian berbasis log riwayat revisi dokumen daripada mempercayai persentase skor tunggal.',
      'Siswa perlu mengerti bagaimana algoritma prediksi kata bekerja.',
    ],
  },
  {
    id: '2',
    category: 'Privasi & Keamanan',
    categoryColor: 'bg-[#FFDAD6] text-[#BA1A1A]',
    badgeTag: 'Panduan Keamanan',
    author: 'Anisa Putri, M.Kom',
    authorRole: 'Spesialis Keamanan Siber Sekolah',
    authorAvatar: 'AP',
    date: '10 Oktober 2026',
    updateTime: 'Diperbarui 11:00 WIB',
    readTime: '5 menit baca',
    views: '6.140 kali dibaca',
    doi: '10.5281/zenodo.sfa-2026-privacy',
    title: 'Etika Data Pribadi: Jangan Pernah Mengunggah Foto KTP atau Wajah Teman ke Model AI Publik',
    excerpt:
      'Penjelasan mendalam tentang bagaimana platform pembuat avatar AI menyerap data wajah ke dalam dataset latihan permanen tanpa klausul penghapusan.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC64OF8HGI-zMJfiV8s4OqOm4s5vQhx5y7vQGh_tarNizcvKJ8080e4nUtoeNE85tlKTYVPYCbEBJQSoWrxC4F_37lyVvk_y78iiId17bqxxaXjZsc6qsmyS9zFZvHfDTzpVdwYbeOcEiyHVwTOJD2umpv7QQsvQIfsT7iN9YKiHCU0Zuvo-0z1GDizT7H9qFg569-bu9lmyphGODIw2UuqloGdlqX4jHbzYX-k0QHzXJkPKHvDVV7d',
    imageCaption:
      'Ilustrasi proteksi data biometrik wajah dan enkripsi identitas pribadi pada ruang kelas digital.',
    imageExif: 'AES-256 Bit • Zero-Knowledge Proof Protocol',
    c2paId: '#ID-7731-SEC',
    tags: ['#PrivasiWajah', '#AvatarAI', '#DataSekolah', '#KeamananSiber'],
    keyTakeaways: [
      'Foto yang diunggah ke generator avatar dapat dimanfaatkan untuk pelatihan model pengenalan wajah tanpa izin.',
      'Sekolah wajib melarang pencantuman data identitas sensitif pada prompt AI publik.',
      'Gunakan fitur anonimisasi sebelum membagikan dataset latihan.',
    ],
  },
  {
    id: '3',
    category: 'Teknologi & Forensik',
    categoryColor: 'bg-[#89F5E7]/50 text-[#00685F]',
    badgeTag: 'Metode SynthID',
    author: 'Fajar Ramadhan',
    authorRole: 'Peneliti Citra Komputasi',
    authorAvatar: 'FR',
    date: '08 Oktober 2026',
    updateTime: 'Diperbarui 16:45 WIB',
    readTime: '7 menit baca',
    views: '3.910 kali dibaca',
    doi: '10.5281/zenodo.sfa-2026-[#3]',
    title: "Mengenal 'Watermarking' Gambar Sintetis: Cara Kerja SynthID & Metadata C2PA",
    excerpt:
      'Bagaimana algoritma mampu menyisipkan tanda tangan tak kasatmata ke dalam piksel citra kecerdasan buatan bahkan setelah gambar dikompresi berulang kali.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKhjzPGxnp6xEiSEV982YyIAYDcOHCEj02GeYu_1vKxlgnhh4T2w1X8twkUFGas774QGVD6cm3OwqtM9nrBVwddM-Uu2mUe5G_8FMx25y2G7NcHZ-3Ra0QYX_kqUqY7K-xJlNV8Bx469iYxKttl_6Kk5LdWFVZ7pCjetHR7g08UZCuXF5lQwIr3Yf-oL7hYMNqZk99xeTSBjbV-FqThhLuj-7if3LtB_8lNbaraTe2MikVWqr6GfM',
    imageCaption:
      'Visualisasi pola watermark piksel mikroskopis yang disisipkan ke dalam citra sintetis.',
    imageExif: 'SynthID Frequency Domain Inspector v2.1',
    c2paId: '#ID-5510-WMK',
    tags: ['#SynthID', '#Watermark', '#ForensikCitra', '#C2PA'],
    keyTakeaways: [
      'Watermarking frekuensi tidak merusak visual tetapi terbaca oleh perangkat lunak inspeksi.',
      'Tanda tangan tetap bertahan meski gambar di-crop atau dikompresi di WhatsApp.',
      'Penting bagi siswa mengenali simbol verifikasi pada platform media terpercaya.',
    ],
  },
  {
    id: '4',
    category: 'Wawancara & Opini',
    categoryColor: 'bg-[#DFE0FF] text-[#3A4BD4]',
    badgeTag: 'Kajian 3T',
    author: 'Redaksi SFA Learn',
    authorRole: 'Tim Jurnalisme Literasi AI',
    authorAvatar: 'SL',
    date: '05 Oktober 2026',
    updateTime: 'Diperbarui 08:20 WIB',
    readTime: '6 menit baca',
    views: '5.230 kali dibaca',
    doi: '10.5281/zenodo.sfa-2026-[#4]',
    title: 'Wawancara Eksklusif: Membangun Literasi Digital Kritis Sejak Dini di Daerah 3T',
    excerpt:
      'Perjalanan para relawan pengajar di Maluku Tenggara mengenalkan konsep penalaran algoritma tanpa harus bergantung pada koneksi internet cepat 24 jam.',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBAqagCidfNqK_iVB-hnjZcBQEItHiHk9_Dx7r-ixibccW7P2w6YdiuF5KmRDKDDSP7hL-TWIrEfiWw4IW2XIg3eRbpSgx15REI6JZqdYGWEgEG63swrIHzqh0if9FyBdOJd_TpxwDwsJTNPxa_TfYHW6rkUrywVSC2VHnn4nEQ4YOv-HiEVP-ZkYaZjyJ69hWLwV7d-6qzDDAH6mwD6_440vMefL92h7KMPIVRj7XUjfOJ76qdMuRo',
    imageCaption:
      'Kegiatan belajar pemikiran komputasional unplugged di sekolah menengah Maluku Tenggara.',
    imageExif: 'Dokumentasi Lapangan Pengmas UNAIR 2026',
    c2paId: '#ID-3301-3T',
    tags: ['#Daerah3T', '#LiterasiDigital', '#UnpluggedCS', '#PengmasUNAIR'],
    keyTakeaways: [
      'Literasi AI dapat diajarkan melalui logika kognitif tanpa harus selalu memakai komputer.',
      'Permainan papan simulasi algoritma membantu siswa mengerti cara kerja filter berita.',
      'Kesenjangan infrastruktur diatasi dengan bahan ajar cetak berbasis skenario kehidupan.',
    ],
  },
];

export function getArticleById(id: string): ArticleData {
  if (id === 'lead') return LEAD_ARTICLE;
  const found = ALL_ARTICLES.find((item) => item.id === id);
  return found || LEAD_ARTICLE;
}
