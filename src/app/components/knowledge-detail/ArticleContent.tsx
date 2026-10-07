'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Brain,
  Quote,
  Scale,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Send,
  ThumbsUp,
  CornerDownRight,
  BookOpen,
  Mail,
} from 'lucide-react';
import { ArticleData } from '@/data/articles';

interface ArticleContentProps {
  article: ArticleData;
  fontSizeClass: string;
}

interface CommentItem {
  id: string;
  name: string;
  role: string;
  badge: string;
  time: string;
  avatar: string;
  avatarBg: string;
  content: string;
  likes: number;
}

const INITIAL_COMMENTS: CommentItem[] = [
  {
    id: 'c1',
    name: 'Raka Hermawan, S.Pd.',
    role: 'Guru Informatika SMPN 1 Surabaya',
    badge: 'Fasilitator Lab',
    time: '2 jam lalu',
    avatar: 'RH',
    avatarBg: 'bg-[#5566EE] text-white',
    content:
      'Kami sudah menguji coba modul ini pada 3 kelas siswa kelas 8. Siswa sangat antusias ketika membedah rantai hash foto yang diunduh dari medsos. Kendala minor saat ini adalah smartphone siswa lama belum memiliki sensor kamera dengan hardware chip C2PA bawaan.',
    likes: 24,
  },
  {
    id: 'c2',
    name: 'Nadia Azzahra',
    role: 'Siswa Kelas 9 • Lab Forensik Muda SFA',
    badge: 'Duta Literasi',
    time: '5 jam lalu',
    avatar: 'NA',
    avatarBg: 'bg-[#7F54F8] text-white',
    content:
      'Langkah SIFT yang paling membantu buat saya adalah poin pertama: "Stop". Dulu sering reflek kirim ke grup WhatsApp kelas kalau ada gambar aneh, sekarang cek dulu di portal forensik SFA.',
    likes: 41,
  },
];

export const ArticleContent: React.FC<ArticleContentProps> = ({
  article,
  fontSizeClass,
}) => {
  const [comments, setComments] = useState<CommentItem[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const created: CommentItem = {
      id: `c_${Date.now()}`,
      name: 'Pengunjung Terverifikasi',
      role: 'Praktisi Literasi Digital',
      badge: 'Anggota SFA',
      time: 'Baru saja',
      avatar: 'PT',
      avatarBg: 'bg-[#00685F] text-white',
      content: newComment.trim(),
      likes: 1,
    };

    setComments([created, ...comments]);
    setNewComment('');
  };

  const handleLike = (id: string) => {
    setLikedComments((prev) => {
      const isAlreadyLiked = prev[id];
      setComments((list) =>
        list.map((c) =>
          c.id === id ? { ...c, likes: c.likes + (isAlreadyLiked ? -1 : 1) } : c
        )
      );
      return { ...prev, [id]: !isAlreadyLiked };
    });
  };

  return (
    <article
      id="articleContent"
      className={`lg:col-span-8 flex flex-col gap-8 lg:gap-10 text-[#061B38] leading-relaxed ${fontSizeClass}`}
    >
      {/* Key Takeaways Section */}
      <section className="p-6 rounded-2xl bg-[#F0F3FF] border border-[#CAC3D8]/40 shadow-subtle flex flex-col gap-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#7F54F8] font-bold text-base">
          <Brain className="w-5 h-5 text-[#7F54F8]" />
          <span>Poin Kunci Riset (Key Takeaways)</span>
        </div>
        <p className="text-xs sm:text-sm text-[#494455] leading-relaxed">
          Rangkuman eksekutif hasil uji coba lapangan kurikulum keamanan media sintetik SFA Learn di 12 sekolah menengah:
        </p>
        <ul className="flex flex-col gap-2.5 mt-1 text-xs sm:text-sm">
          {article.keyTakeaways.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-[#E8DEFF] text-[#7F54F8] flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {index + 1}
              </span>
              <span className="text-[#061B38] leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 1: Urgensi Literasi */}
      <section id="urgensi-literasi" className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#061B38] tracking-tight">
          Mengapa Literasi Deteksi Sintetis Mendesak untuk Siswa SMP?
        </h2>
        <p className="text-[#494455]">
          Di era ledakan model generatif multimodal, batas antara rekaman faktual dokumenter dan rekayasa komputer telah memudar hingga level piksel sub-mikron. Jika pada tahun 2023 siswa dapat dengan mudah mengenali distorsi tangan berjemari enam atau distorsi teks latar belakang, model difusi generasi 2026 telah merekonstruksi koherensi ruang 3D secara sempurna.
        </p>
        <p className="text-[#494455]">
          Fenomena ini membuka kerentanan serius di lingkungan sekolah. Potensi perundungan siber (cyberbullying) dengan foto rekayasa wajah, disinformasi menjelang pemilihan ketua OSIS, hingga manipulasi bukti tugas daring kian marak terjadi tanpa perlindungan sistemik.
        </p>

        {/* Pull Quote */}
        {article.pullQuote && (
          <figure className="my-3 p-6 rounded-2xl bg-[#DFE8FF]/60 border-l-4 border-[#7F54F8] shadow-subtle relative">
            <Quote className="w-10 h-10 text-[#7F54F8]/20 absolute top-3 right-4 pointer-events-none" />
            <blockquote className="text-base sm:text-lg text-[#061B38] leading-snug italic font-semibold">
              &quot;{article.pullQuote.text}&quot;
            </blockquote>
            <figcaption className="mt-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#7F54F8] text-white flex items-center justify-center font-bold text-xs">
                AH
              </div>
              <div className="flex flex-col">
                <cite className="not-italic font-bold text-xs sm:text-sm text-[#061B38]">
                  {article.pullQuote.author}
                </cite>
                <span className="text-xs text-[#7A7486]">{article.pullQuote.role}</span>
              </div>
            </figcaption>
          </figure>
        )}

        <p className="text-[#494455]">
          Oleh sebab itu, modul literasi digital perlu bergeser dari sekadar &quot;mengamati kejanggalan visual&quot; menjadi pemahaman forensik terstruktur melalui sertifikat asal-usul (provenance verification).
        </p>
      </section>

      {/* Section 2: Cara Kerja C2PA */}
      <section id="cara-kerja-c2pa" className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#061B38] tracking-tight">
          Memahami Cara Kerja Sertifikasi Konten C2PA
        </h2>
        <p className="text-[#494455]">
          Koalisi C2PA (Coalition for Content Provenance and Authenticity) mendesain protokol standar terbuka yang mengikatkan riwayat digital secara kriptografis (cryptographic binding). Saat citra dipotret atau dibuat oleh AI, sistem menandatangani sertifikat digital yang memuat metadata esensial: perangkat penangkap, tanggal pembuatan, koordinat asal, serta setiap perangkat lunak pengubah (editing software) yang menyentuh berkas tersebut.
        </p>

        {/* Graphic Comparison Box */}
        <div className="p-6 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col gap-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h3 className="text-sm font-bold text-[#061B38] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#3A4BD4]" />
              Komparasi Arsitektur Forensik Digital 2026
            </h3>
            <span className="text-xs text-[#7A7486]">Standar ISO/IEC 17025 Compliant</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Otentik C2PA */}
            <div className="p-4 rounded-xl bg-[#F0F3FF] flex flex-col gap-3 border border-[#89F5E7]/50">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#89F5E7] text-[#00201D] text-xs font-bold">
                  Citra Otentik Terverifikasi
                </span>
                <CheckCircle2 className="w-5 h-5 text-[#00685F]" />
              </div>
              <ul className="flex flex-col gap-2 text-xs text-[#494455]">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Hash Integrity:</span>
                  <span>Tersambung rantai SHA-256 tanpa deviasi tanda tangan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Signing Authority:</span>
                  <span>Kamera perangkat keras bersertifikat (Hardware Root).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Riwayat Edit:</span>
                  <span>Audit trail tercatat (cropping, color balance transparan).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Indeks Resiko:</span>
                  <span className="text-[#00685F] font-bold">Rendah / Lulus Otentikasi</span>
                </li>
              </ul>
            </div>

            {/* Card 2: Deepfake / Sintetik */}
            <div className="p-4 rounded-xl bg-[#FFDAD6]/40 flex flex-col gap-3 border border-[#FFDAD6]">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#FFDAD6] text-[#93000A] text-xs font-bold">
                  Media Sintetik / Manipulasi
                </span>
                <AlertTriangle className="w-5 h-5 text-[#BA1A1A]" />
              </div>
              <ul className="flex flex-col gap-2 text-xs text-[#494455]">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Hash Integrity:</span>
                  <span>Broken manifest signature atau metadata kosong (stripped EXIF).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Signing Authority:</span>
                  <span>Model generator tak terdaftar atau emulator virtual anonim.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Riwayat Edit:</span>
                  <span>Inpainting berulang tanpa log otorisasi digital.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-[#061B38] shrink-0 min-w-[100px]">Indeks Resiko:</span>
                  <span className="text-[#BA1A1A] font-bold">Tinggi / Potensi Rekayasa</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Mini Data Visualization */}
          <div className="pt-2 flex flex-col gap-2">
            <span className="text-xs font-bold text-[#061B38]">
              Tingkat Ketahanan Uji Forensik Siswa Setelah Menggunakan Modul C2PA (N=420 Siswa):
            </span>
            <div className="w-full bg-[#E7EEFF] rounded-full h-3 flex overflow-hidden">
              <div className="bg-[#7F54F8] h-full" style={{ width: '84.2%' }} title="Deteksi Berhasil (84.2%)" />
              <div className="bg-[#DFE0FF] h-full" style={{ width: '10.5%' }} title="Perlu Verifikasi Lanjutan (10.5%)" />
              <div className="bg-[#BA1A1A]/70 h-full" style={{ width: '5.3%' }} title="Gagal Identifikasi (5.3%)" />
            </div>
            <div className="flex items-center justify-between text-xs text-[#7A7486] flex-wrap gap-2">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#7F54F8]" /> 84.2% Sukses Deteksi Mandiri</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#DFE0FF]" /> 10.5% Perlu Bantuan Guru</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A]/70" /> 5.3% Luput</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inline Secondary Media */}
      <figure className="w-full my-2 flex flex-col gap-2">
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#E7EEFF] aspect-[21/9] max-h-72 shadow-subtle border border-[#CAC3D8]/30">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUzbFRXuHqB9LZqeUPSJMF2dJf3xa_lVXVJ67rcuI7zdEiJofyW9E_4oWfl9u_-BGEH_QZF0Y6Coc6WrExUvoGM_84_e8DDG2Jo6qK-rl_vGSjr9DAOTEE4Ris3GCLFZsE4z4vlbMZrUgwSf_teT23BDtzg31r2RoFyJyOcL9e9x7ojsgtaN0p7qVJeR5aLm_a9xAdykRobPlUjl38QKZR7HuOrRSF64wOQGrl-i5saLSJ1M3sSswj"
            alt="Antarmuka aplikasi verifikator mandiri SFA Learn"
            fill
            unoptimized
            className="object-cover"
          />
        </div>
        <figcaption className="text-xs text-[#7A7486] text-center">
          Antarmuka aplikasi verifikator mandiri yang disematkan langsung pada Portal Siswa SFA Learn.
        </figcaption>
      </figure>

      {/* Section 3: SIFT Method */}
      <section id="metode-sift" className="flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[#061B38] tracking-tight">
          4 Langkah Cepat Cek Fakta Visual: Metode SIFT Sekolah
        </h2>
        <p className="text-[#494455]">
          Teknologi kriptografi membutuhkan pendampingan sikap mental kritis. Oleh sebab itu, program pengabdian masyarakat merumuskan adaptasi praktis metode SIFT (Stop, Investigate, Find, Trace) yang mudah diingat dan diterapkan oleh siswa saat berselancar di media sosial:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-[#F0F3FF] flex flex-col gap-1.5 shadow-subtle border border-[#CAC3D8]/30">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#7F54F8] text-white font-bold text-sm flex items-center justify-center">S</span>
              <h4 className="text-sm font-bold text-[#061B38]">1. Stop</h4>
            </div>
            <p className="text-xs text-[#494455] leading-relaxed">
              Tahan jari dari langsung membagikan ulang, menyukai, atau bereaksi emosional saat melihat foto dramatis yang memicu kegaduhan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F0F3FF] flex flex-col gap-1.5 shadow-subtle border border-[#CAC3D8]/30">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#3A4BD4] text-white font-bold text-sm flex items-center justify-center">I</span>
              <h4 className="text-sm font-bold text-[#061B38]">2. Investigate</h4>
            </div>
            <p className="text-xs text-[#494455] leading-relaxed">
              Cek kredibilitas akun pembuat konten. Apakah akun terverifikasi? Apakah terafiliasi dengan lembaga jurnalistik atau institusi resmi?
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F0F3FF] flex flex-col gap-1.5 shadow-subtle border border-[#CAC3D8]/30">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#00685F] text-white font-bold text-sm flex items-center justify-center">F</span>
              <h4 className="text-sm font-bold text-[#061B38]">3. Find Better</h4>
            </div>
            <p className="text-xs text-[#494455] leading-relaxed">
              Cari liputan pembanding dari media berita bereputasi. Jika peristiwa besar tidak dimuat media tepercaya, patut diduga sebagai konten palsu.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F0F3FF] flex flex-col gap-1.5 shadow-subtle border border-[#CAC3D8]/30">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#6636DE] text-white font-bold text-sm flex items-center justify-center">T</span>
              <h4 className="text-sm font-bold text-[#061B38]">4. Trace Origin</h4>
            </div>
            <p className="text-xs text-[#494455] leading-relaxed">
              Lacak klaim hingga ke konteks aslinya menggunakan mesin pencari gambar terbalik (reverse image search) dan inspektur manifest C2PA.
            </p>
          </div>
        </div>
      </section>

      {/* Topic Hashtags */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#CAC3D8]/30">
        <span className="text-xs font-bold text-[#494455] mr-1">Topik Terkait:</span>
        {article.tags.map((tag) => (
          <a
            key={tag}
            href="#"
            className="px-3 py-1 rounded-full bg-[#E7EEFF] hover:bg-[#E8DEFF] text-[#061B38] hover:text-[#5010C8] text-xs font-semibold transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>

      {/* Author Bio Card */}
      <div className="p-6 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-[#7F54F8] text-white font-bold text-lg flex items-center justify-center shrink-0">
          {article.authorAvatar}
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-sm font-bold text-[#061B38]">{article.author}</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#E8DEFF] text-[#5010C8] text-xs font-bold">
              Riset Terbuka 2026
            </span>
          </div>
          <p className="text-xs text-[#494455] leading-relaxed">
            Kolaborasi lintas disiplin antara akademisi ilmu komputer, psikologi kognitif, dan praktisi media digital yang berfokus pada kurikulum literasi kecerdasan buatan bagi generasi muda di Asia Tenggara.
          </p>
          <div className="flex items-center gap-4 pt-1 text-xs font-bold text-[#7F54F8]">
            <a href="#" className="hover:underline flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" /> Lihat Semua Publikasi (18 Makalah)
            </a>
            <span className="text-[#CAC3D8]">•</span>
            <a href="#" className="hover:underline flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Kontak Koresponden
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next Article Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <Link
          href="/knowledge/1"
          className="p-4 rounded-2xl bg-[#F0F3FF] hover:bg-[#E7EEFF] transition-all flex flex-col gap-1 text-left group border border-[#CAC3D8]/30"
        >
          <span className="text-xs text-[#7A7486] font-medium flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform text-[#7F54F8]" />
            Artikel Sebelumnya
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#061B38] line-clamp-2 leading-snug">
            Uji Komparasi 5 Alat Detektor Teks AI Gratis untuk Bahasa Indonesia
          </span>
        </Link>
        <Link
          href="/knowledge/2"
          className="p-4 rounded-2xl bg-[#F0F3FF] hover:bg-[#E7EEFF] transition-all flex flex-col gap-1 text-right group border border-[#CAC3D8]/30"
        >
          <span className="text-xs text-[#7A7486] font-medium flex items-center justify-end gap-1">
            Artikel Selanjutnya
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#7F54F8]" />
          </span>
          <span className="text-xs sm:text-sm font-bold text-[#061B38] line-clamp-2 leading-snug">
            Etika Data Pribadi: Jangan Mengunggah Foto Biometrik ke AI Publik
          </span>
        </Link>
      </div>

      {/* Discussion & Academic Comments Section */}
      <section className="mt-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#7F54F8]" />
            <h3 className="text-base font-bold text-[#061B38]">
              Ruang Diskusi & Ulasan Akademik
            </h3>
          </div>
          <span className="text-xs font-semibold text-[#7A7486]">
            {comments.length} Diskusi Terverifikasi
          </span>
        </div>

        {/* Comment Input Box */}
        <form
          onSubmit={handleAddComment}
          className="p-4 rounded-2xl bg-white border border-[#CAC3D8]/40 shadow-subtle flex flex-col gap-3"
        >
          <span className="text-xs font-bold text-[#061B38]">
            Tulis Tanggapan atau Pertanyaan Kajian:
          </span>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            placeholder="Bagikan pengalaman penerapan di sekolah Anda atau tanyakan metodologi riset kepada tim penyusun..."
            className="w-full p-3 bg-[#F0F3FF] text-[#061B38] placeholder:text-[#7A7486] text-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-[#7F54F8]/30 transition resize-none"
          />
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs text-[#7A7486]">
              Komentar akan dimoderasi oleh tim kurator SFA.
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-[#7F54F8] hover:bg-[#6636DE] text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" /> Kirim Ulasan
            </button>
          </div>
        </form>

        {/* Comments List */}
        <div className="flex flex-col gap-3">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="p-4 rounded-2xl bg-white border border-[#CAC3D8]/30 shadow-subtle flex flex-col gap-2"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-full ${comment.avatarBg} flex items-center justify-center text-xs font-bold`}
                  >
                    {comment.avatar}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#061B38]">{comment.name}</span>
                    <span className="text-[11px] text-[#7A7486]">
                      {comment.role} • {comment.time}
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded bg-[#F0F3FF] text-[#494455] text-[11px] font-semibold">
                  {comment.badge}
                </span>
              </div>

              <p className="text-xs text-[#061B38] leading-relaxed">{comment.content}</p>

              <div className="flex items-center gap-4 text-xs text-[#7A7486] pt-1">
                <button
                  type="button"
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 font-semibold transition-colors ${
                    likedComments[comment.id] ? 'text-[#7F54F8]' : 'hover:text-[#7F54F8]'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${likedComments[comment.id] ? 'fill-[#7F54F8]' : ''}`} />
                  <span>{comment.likes} Setuju</span>
                </button>
                <button
                  type="button"
                  className="hover:text-[#7F54F8] flex items-center gap-1 font-semibold transition-colors"
                >
                  <CornerDownRight className="w-3.5 h-3.5" />
                  <span>Balas Diskusi</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
