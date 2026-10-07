'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Eye,
  ChevronLeft,
  ChevronRight,
  Mail,
  Lock,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
} from 'lucide-react';
import Link from 'next/link';

interface Article {
  id: string;
  category: string;
  categoryColor: string;
  author: string;
  date: string;
  title: string;
  excerpt: string;
  views: string;
  image: string;
  tags: string[];
}

const ALL_ARTICLES: Article[] = [
  {
    id: '1',
    category: 'Eksperimen Lab',
    categoryColor: 'text-[#7F54F8]',
    author: 'Dr. Rizal Pratama',
    date: '12 Okt 2026',
    title: 'Uji Komparasi 5 Alat Detektor Teks AI Gratis: Seberapa Akurat untuk Tugas Bahasa Indonesia?',
    excerpt: 'Pengujian blind-test pada 150 esai siswa menunjukkan tingkat positif palsu (false-positive) hingga 23% pada teks berstruktur formal klasik.',
    views: '4.8k dilihat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJBLjGlN82fQ34oRqwKhOPsVmJGqHzcvGi45UIB6Ak_sdkFHvs3OXfPQfM-mhSptUyXi0JAfYJeSDGrUyHuKsITyYV7dwyvtRuKP_NUFkE9jRDUpLKKBkTX_KUkb-KmCBytg29Go1IQVzsLYm8C_PEXxNgASP0edo4vWMiPO2W_C9s1EG55jnxU9E92cr0kKE1agKEOoP4y7SfIS8rTbtCHPjBC0uWoHldlH1iYDzWOu4t8Fz_W-UZ',
    tags: ['Forensik Digital', 'Tutorial Praktis'],
  },
  {
    id: '2',
    category: 'Privasi & Keamanan',
    categoryColor: 'text-red-500',
    author: 'Anisa Putri, M.Kom',
    date: '10 Okt 2026',
    title: 'Etika Data Pribadi: Jangan Pernah Mengunggah Foto KTP atau Wajah Teman ke Model AI Publik',
    excerpt: 'Penjelasan mendalam tentang bagaimana platform pembuat avatar AI menyerap data wajah ke dalam dataset latihan permanen tanpa klausul penghapusan.',
    views: '6.1k dilihat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC64OF8HGI-zMJfiV8s4OqOm4s5vQhx5y7vQGh_tarNizcvKJ8080e4nUtoeNE85tlKTYVPYCbEBJQSoWrxC4F_37lyVvk_y78iiId17bqxxaXjZsc6qsmyS9zFZvHfDTzpVdwYbeOcEiyHVwTOJD2umpv7QQsvQIfsT7iN9YKiHCU0Zuvo-0z1GDizT7H9qFg569-bu9lmyphGODIw2UuqloGdlqX4jHbzYX-k0QHzXJkPKHvDVV7d',
    tags: ['Etika & Regulasi'],
  },
  {
    id: '3',
    category: 'Teknologi & Forensik',
    categoryColor: 'text-[#00685F]',
    author: 'Fajar Ramadhan',
    date: '08 Okt 2026',
    title: "Mengenal 'Watermarking' Gambar Sintetis: Cara Kerja SynthID & Metadata C2PA",
    excerpt: 'Bagaimana algoritma mampu menyisipkan tanda tangan tak kasatmata ke dalam piksel citra kecerdasan buatan bahkan setelah gambar dikompresi berulang kali.',
    views: '3.9k dilihat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzKhjzPGxnp6xEiSEV982YyIAYDcOHCEj02GeYu_1vKxlgnhh4T2w1X8twkUFGas774QGVD6cm3OwqtM9nrBVwddM-Uu2mUe5G_8FMx25y2G7NcHZ-3Ra0QYX_kqUqY7K-xJlNV8Bx469iYxKttl_6Kk5LdWFVZ7pCjetHR7g08UZCuXF5lQwIr3Yf-oL7hYMNqZk99xeTSBjbV-FqThhLuj-7if3LtB_8lNbaraTe2MikVWqr6GfM',
    tags: ['Forensik Digital'],
  },
  {
    id: '4',
    category: 'Wawancara & Opini',
    categoryColor: 'text-[#3A4BD4]',
    author: 'Redaksi SFA Learn',
    date: '05 Okt 2026',
    title: 'Wawancara Eksklusif: Membangun Literasi Digital Kritis Sejak Dini di Daerah 3T',
    excerpt: 'Perjalanan para relawan pengajar di Maluku Tenggara mengenalkan konsep penalaran algoritma tanpa harus bergantung pada koneksi internet cepat 24 jam.',
    views: '5.2k dilihat',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBAqagCidfNqK_iVB-hnjZcBQEItHiHk9_Dx7r-ixibccW7P2w6YdiuF5KmRDKDDSP7hL-TWIrEfiWw4IW2XIg3eRbpSgx15REI6JZqdYGWEgEG63swrIHzqh0if9FyBdOJd_TpxwDwsJTNPxa_TfYHW6rkUrywVSC2VHnn4nEQ4YOv-HiEVP-ZkYaZjyJ69hWLwV7d-6qzDDAH6mwD6_440vMefL92h7KMPIVRj7XUjfOJ76qdMuRo',
    tags: ['Panduan Siswa & Guru', 'Riset & Opini'],
  },
];

const CURATOR_PICKS = [
  { rank: '1', title: 'Panduan Menulis Prompt Akademik Tanpa Terjebak Pelanggaran Integritas', readers: '14.2k pembaca' },
  { rank: '2', title: 'Daftar 12 Aplikasi Ekstensi Browser Berbahaya yang Mengklaim AI Gratis', readers: '9.8k pembaca' },
  { rank: '3', title: 'Buku Saku Guru: Menilai Tugas Siswa di Era Generasi Mesin Penerjemah Cerdas', readers: '8.1k pembaca' },
  { rank: '4', title: 'Cara Menyimpan Log Percakapan AI Sebagai Lampiran Bukti Riset Mandiri', readers: '6.4k pembaca' },
];

const FACTS = [
  'Lebih dari 78% foto sintetis yang beredar di grup percakapan keluarga gagal lolos uji analisis bayangan konsisten (shadow vector mismatch). Melatih mata memeriksa arah datangnya cahaya adalah langkah paling sederhana membedakan foto asli dari hasil rekayasa generator gambar!',
  'Model GPT-3 dilatih menggunakan sekitar 570 GB data teks, setara dengan lebih dari 5 juta buku novel lengkap yang jika ditumpuk bisa mencapai ketinggian 30 kilometer — atau 3x tinggi Gunung Everest!',
  'Serangan deepfake terhadap pemimpin perusahaan menggunakan kloning suara AI meningkat 350% pada 2025. Hanya dengan 3 detik rekaman suara asli, sistem AI modern dapat mensintesis percakapan berdurasi jam yang hampir tidak bisa dibedakan secara manual.',
];

interface EditorialGridSectionProps {
  selectedCategory: string;
  searchQuery: string;
}

export const EditorialGridSection: React.FC<EditorialGridSectionProps> = ({
  selectedCategory,
  searchQuery,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [factIndex, setFactIndex] = useState(0);
  const [currentPage] = useState(1);

  const filteredArticles = ALL_ARTICLES.filter((art) => {
    const matchesCategory =
      selectedCategory === 'Semua Berita' || art.tags.includes(selectedCategory);
    const matchesSearch =
      searchQuery === '' ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 pb-16 bg-[#F9F9FF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Left 8 cols — Editorial Grid & Pagination */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {/* Sort Header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-xl font-bold text-[#061B38]">Warta & Riset Terbaru</h2>
            <div className="flex items-center gap-2 text-xs text-[#7A7486]">
              <span>Urutkan:</span>
              <select className="bg-[#F0F3FF] text-[#061B38] text-xs font-semibold rounded-lg px-2 py-1.5 focus:outline-none cursor-pointer border border-[#CAC3D8]/40">
                <option>Paling Relevan</option>
                <option>Terbaru</option>
                <option>Paling Banyak Dibaca</option>
              </select>
            </div>
          </div>

          {/* Articles 2x2 Grid */}
          {filteredArticles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-3">
              <span className="text-4xl">🔍</span>
              <p className="text-sm font-semibold text-[#7A7486]">
                Tidak ada artikel ditemukan untuk pencarian ini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredArticles.map((art) => (
                <article
                  key={art.id}
                  className="rounded-2xl bg-white border border-[#CAC3D8]/30 shadow-subtle overflow-hidden flex flex-col justify-between group hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className={`absolute top-3 left-3 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm ${art.categoryColor} text-xs font-bold shadow-sm`}>
                      {art.category}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-xs text-[#7A7486]">
                        <span>{art.author}</span>
                        <span>•</span>
                        <span>{art.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug">
                        {art.title}
                      </h3>
                      <p className="text-xs text-[#494455] line-clamp-2 leading-relaxed">{art.excerpt}</p>
                    </div>
                    <div className="pt-2 border-t border-[#F0F3FF] flex items-center justify-between text-xs text-[#7A7486]">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        {art.views}
                      </span>
                      <a href="#" className="text-[#7F54F8] font-bold hover:underline">
                        Baca Analisis
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="p-4 rounded-xl bg-white border border-[#CAC3D8]/30 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#7A7486]">
              Menampilkan <strong className="text-[#061B38]">1 – {filteredArticles.length}</strong> dari{' '}
              <strong className="text-[#061B38]">48</strong> artikel terverifikasi
            </span>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-lg bg-[#F0F3FF] text-[#7A7486] flex items-center justify-center hover:bg-[#E7EEFF] transition-colors disabled:opacity-40" disabled={currentPage === 1}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-colors ${
                    p === currentPage
                      ? 'bg-[#7F54F8] text-white'
                      : 'bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38]'
                  }`}
                >
                  {p}
                </button>
              ))}
              <span className="px-2 text-[#7A7486] text-xs">...</span>
              <button className="w-9 h-9 rounded-lg bg-[#F0F3FF] hover:bg-[#E7EEFF] text-[#061B38] text-xs font-bold transition-colors">
                12
              </button>
              <button className="w-9 h-9 rounded-lg bg-[#F0F3FF] text-[#061B38] flex items-center justify-center hover:bg-[#E7EEFF] transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 4 cols — Sidebar Widgets */}
        <aside className="lg:col-span-4 flex flex-col gap-6">

          {/* Widget 1: Buletin Mingguan AI */}
          <div className="p-5 rounded-2xl bg-white border border-[#CAC3D8]/30 shadow-subtle flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E8DEFF] flex items-center justify-center text-[#7F54F8]">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#061B38]">Buletin Mingguan AI</h3>
                <p className="text-xs text-[#7A7486]">Rangkuman etika & kurikulum tiap Senin</p>
              </div>
            </div>
            <p className="text-xs text-[#494455] leading-relaxed">
              Dapatkan kurasi 5 artikel pilihan dewan riset langsung ke kotak masuk guru dan siswa setiap minggu pagi.
            </p>
            {subscribed ? (
              <div className="flex items-center justify-center py-2 rounded-xl bg-[#89F5E7]/30 text-[#00685F] text-xs font-bold gap-2">
                <Award className="w-4 h-4" />
                Terima kasih! Konfirmasi email dikirimkan.
              </div>
            ) : (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email) setSubscribed(true);
                }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@sekolah.sch.id"
                  className="h-10 px-4 bg-[#F0F3FF] text-[#061B38] placeholder:text-[#7A7486] text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F54F8]/30 transition"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Langganan Gratis
                </button>
              </form>
            )}
            <span className="text-xs text-[#7A7486] flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Privasi terlindungi. Bebas spam, berhenti kapan saja.
            </span>
          </div>

          {/* Widget 2: Fakta Kilat AI */}
          <div className="p-5 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/30 shadow-subtle flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="px-3 py-0.5 rounded-full bg-[#DFE0FF] text-[#1E31BF] text-xs font-bold">
                FAKTA KILAT AI
              </span>
              <Lightbulb className="w-5 h-5 text-[#3A4BD4]" />
            </div>
            <h4 className="text-sm font-bold text-[#061B38]">Tahukah Anda?</h4>
            <p className="text-xs text-[#494455] leading-relaxed min-h-[72px]">
              {FACTS[factIndex]}
            </p>
            <div className="pt-1 flex items-center justify-between text-xs">
              <span className="text-[#7A7486]">Sumber: SFA Research Lab 2026</span>
              <button
                className="text-[#7F54F8] font-bold hover:underline flex items-center gap-1 transition-colors"
                onClick={() => setFactIndex((i) => (i + 1) % FACTS.length)}
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Fakta Lain
              </button>
            </div>
          </div>

          {/* Widget 3: Pilihan Kurator Riset */}
          <div className="p-5 rounded-2xl bg-white border border-[#CAC3D8]/30 shadow-subtle flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#061B38]">Pilihan Kurator Riset</h3>
              <span className="text-xs font-bold text-[#7F54F8]">Terpopuler</span>
            </div>
            <div className="flex flex-col gap-2">
              {CURATOR_PICKS.map((pick) => (
                <a
                  key={pick.rank}
                  href="#"
                  className="flex items-start gap-3 group py-1.5"
                >
                  <span className="w-6 h-6 rounded-md bg-[#F0F3FF] text-[#061B38] text-xs font-bold flex items-center justify-center shrink-0 group-hover:bg-[#7F54F8] group-hover:text-white transition-colors">
                    {pick.rank}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-[#061B38] group-hover:text-[#7F54F8] transition-colors leading-snug line-clamp-2">
                      {pick.title}
                    </span>
                    <span className="text-xs text-[#7A7486] mt-0.5">{pick.readers}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Widget 4: LMS Course Promo */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#7F54F8] to-[#3A4BD4] text-white shadow-md flex flex-col justify-between gap-5 relative overflow-hidden">
            {/* Decorative blob */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="flex flex-col gap-2 z-10">
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold self-start">
                PROGRAM LMS SISWA (UI-04D)
              </span>
              <h3 className="text-base font-bold leading-tight mt-1">
                Ingin Praktik Forensik Visual Langsung?
              </h3>
              <p className="text-xs text-white/90 leading-relaxed mt-1">
                Ikuti kursus sertifikasi interaktif &quot;Etika & Keamanan AI Siswa&quot;. Dilengkapi simulator uji deepfake dan latihan analisis metadata foto.
              </p>
            </div>
            <div className="flex flex-col gap-2 z-10">
              <div className="flex items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <Award className="w-3.5 h-3.5" />
                  Sertifikat Resmi
                </span>
                <span>•</span>
                <span>4 Modul Praktikum</span>
              </div>
              <Link
                href="/login"
                className="h-10 px-4 bg-white text-[#7F54F8] hover:bg-[#F0F3FF] text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm group/cta"
              >
                <span>Mulai Belajar Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover/cta:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </aside>
      </div>
    </section>
  );
};
