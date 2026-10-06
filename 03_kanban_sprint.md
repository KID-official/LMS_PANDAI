# 📋 Sprint Board Kanban — LMS MVP Amos Production
### Versi 2.0 | Timeline: 5 Minggu | Tim: 2 Fullstack Developer

> [!IMPORTANT]
> **Dev A** = Fokus infrastruktur, database, backend, server-side logic & security.
> **Dev B** = Fokus UI/UX, komponen frontend, halaman siswa, PDF & konten statis.
> Perubahan utama dari v1: Tidak ada CRUD kursus/kuis di admin. Konten kursus & soal kuis **hardcoded di codebase**. 4 aktor: Guest, Siswa, Guru, Super Admin.

---

## Perubahan Sprint dari Versi Sebelumnya

| Task Dihapus dari Sprint | Alasan |
|---|---|
| CRUD Kursus di admin | Konten kursus di-hardcode di `constants/curriculum.ts` |
| CRUD Bab & Embed YouTube di admin | Bab dan video URL di-hardcode |
| CRUD Bank Soal di admin | Soal kuis di-hardcode di `constants/quizzes.ts` |
| WYSIWYG Editor | Tidak diperlukan tanpa pengelolaan konten dinamis |
| Pengaturan passing grade admin | Nilai batas lulus di-hardcode (75) |

| Task Baru Ditambahkan | Alasan |
|---|---|
| Setup file `constants/curriculum.ts` | Mendefinisikan konten kursus statis |
| Setup file `constants/quizzes.ts` | Mendefinisikan soal & kunci jawaban statis (server-only) |
| Halaman Landing Page | Akses publik untuk Guest |
| Halaman Knowledge Page | Akses publik untuk Guest |
| CRUD Guru oleh Super Admin | Aktor baru Super Admin dengan fitur manajemen guru |
| Import massal Guru via CSV | Aktor Super Admin perlu import data guru |
| Profil Guru (tabel `teachers`) | Tabel profil baru untuk data lengkap guru |

---

## Legenda Status

| Ikon | Status |
|---|---|
| 🔲 | Belum Dimulai (Backlog) |
| 🔵 | In Progress |
| 🟡 | Review / PR |
| ✅ | Done & Merged |
| 🔴 | Blocked |

---

## 📅 MINGGU 1 — Setup, Fondasi & Konten Statis

> **Tujuan:** Infrastruktur siap, skema DB 6 tabel final, dan seluruh konten kursus + soal kuis sudah didefinisikan secara statis. Tim tidak ada yang idle.

### 🗂️ Backlog Minggu 1

| # | Kartu Task | Assignee | Estimasi | Dependensi |
|---|---|---|---|---|
| M1-01 | **Setup Monorepo Next.js App Router** | Dev A | 3 jam | — |
| M1-02 | **Konfigurasi Tailwind CSS + Shadcn UI** | Dev B | 3 jam | M1-01 |
| M1-03 | **Setup PostgreSQL di Supabase / Neon** | Dev A | 2 jam | — |
| M1-04 | **Konfigurasi Prisma ORM + koneksi DB** | Dev A | 2 jam | M1-03 |
| M1-05 | **Tulis `schema.prisma` (6 tabel: users, students, teachers, user_progress, user_quiz_scores, certificates)** | Dev A | 3 jam | M1-04 |
| M1-06 | **Jalankan `prisma migrate dev` & seed data dummy** | Dev A | 3 jam | M1-05 |
| M1-07 | **Setup NextAuth.js: credential provider (NIS untuk siswa, Email untuk guru/admin)** | Dev A | 5 jam | M1-05 |
| M1-08 | **Buat `constants/curriculum.ts` — definisi semua kursus & bab statis (chapter_key, judul, youtube_url, min_watch_seconds)** | Dev B | 4 jam | M1-01 |
| M1-09 | **Buat `constants/quizzes.ts` (SERVER-ONLY) — soal, opsi, & kunci jawaban per quiz_key** | Dev A | 4 jam | M1-01 |
| M1-10 | **Desain sistem layout: PublicLayout, StudentLayout, GuruLayout, SuperAdminLayout** | Dev B | 3 jam | M1-02 |
| M1-11 | **Setup Zustand store: video progress tracker & global UI state** | Dev B | 2 jam | M1-01 |

> **Total Estimasi Minggu 1:** Dev A ≈ 22 jam | Dev B ≈ 12 jam

#### ✅ Acceptance Criteria Minggu 1
- [ ] `npx prisma studio` menampilkan 6 tabel tanpa error.
- [ ] Login via NIS (siswa) dan email (guru) menghasilkan session berbeda berdasarkan role.
- [ ] File `curriculum.ts` berisi minimal 2 kursus dengan masing-masing minimal 3 bab.
- [ ] File `quizzes.ts` (server-only, tidak di `/app` atau `/components`) berisi soal dengan kunci jawaban.
- [ ] Seed data: 1 super_admin, 2 guru, 10 siswa dummy tersedia di DB.

---

## 📅 MINGGU 2 — Halaman Publik (Guest) & Portal Guru

> **Tujuan:** Guest bisa mengakses landing page & knowledge page. Guru bisa login, mengelola akun siswa, dan melihat laporan progress.

### 🗂️ Backlog Minggu 2

| # | Kartu Task | Assignee | Estimasi | Dependensi |
|---|---|---|---|---|
| M2-01 | **Landing Page — Hero, deskripsi LMS, CTA login (Mobile-First)** | Dev B | 5 jam | M1-10 |
| M2-02 | **Knowledge Page — Artikel/informasi statis tentang AI (konten hardcode)** | Dev B | 4 jam | M1-10 |
| M2-03 | **Navbar Publik — Logo, menu, tombol Login** | Dev B | 2 jam | M2-01 |
| M2-04 | **Halaman Login Siswa (NIS + Password, Mobile-First, validasi error)** | Dev B | 3 jam | M1-07 |
| M2-05 | **Halaman Login Guru & Super Admin (Email + Password)** | Dev B | 3 jam | M1-07 |
| M2-06 | **Middleware proteksi rute: /siswa/** hanya role SISWA, /guru/** hanya GURU & SUPER_ADMIN** | Dev A | 4 jam | M1-07 |
| M2-07 | **Dashboard Guru: Statistik ringkas (total siswa, % kelulusan rata-rata)** | Dev B | 4 jam | M2-06 |
| M2-08 | **Server Action: Hitung statistik dashboard guru dari DB** | Dev A | 3 jam | M1-05 |
| M2-09 | **Halaman CRUD Siswa — Tambah manual (form: NIS, Nama, Kelas, Semester, Foto)** | Dev B | 5 jam | M2-06 |
| M2-10 | **Server Action: Create/Update/Delete siswa (users + students sekaligus)** | Dev A | 4 jam | M1-05 |
| M2-11 | **Halaman Daftar Siswa — Tabel dengan search & filter kelas** | Dev B | 4 jam | M2-09 |

> **Total Estimasi Minggu 2:** Dev A ≈ 11 jam | Dev B ≈ 30 jam

#### ✅ Acceptance Criteria Minggu 2
- [ ] Guest dapat mengakses Landing Page & Knowledge Page tanpa login.
- [ ] Siswa yang mengakses `/guru` langsung di-redirect ke halaman login.
- [ ] Guru dapat login, melihat dashboard, dan menambah 1 siswa baru via form.
- [ ] Guru dapat melihat daftar siswa dengan fitur search by NIS/Nama.
- [ ] Foto profil siswa dapat diupload dan tampil di daftar siswa.

---

## 📅 MINGGU 3 — Portal Siswa & Sistem Progress

> **Tujuan:** Siswa bisa mengakses kursus dari konten statis, menonton video, dan sistem progress lock berfungsi penuh.

### 🗂️ Backlog Minggu 3

| # | Kartu Task | Assignee | Estimasi | Dependensi |
|---|---|---|---|---|
| M3-01 | **Dashboard Siswa: Kartu kursus dari `curriculum.ts` + progress bar %** | Dev B | 5 jam | M1-08 |
| M3-02 | **Server Action: Fetch progress siswa & kalkulasi % per kursus** | Dev A | 4 jam | M1-05, M1-08 |
| M3-03 | **Halaman Daftar Bab: Render dari curriculum statis + status lock/unlock** | Dev B | 5 jam | M3-02 |
| M3-04 | **Server Action: Tentukan bab mana yang unlock berdasarkan user_progress & user_quiz_scores** | Dev A | 4 jam | M1-05, M1-08 |
| M3-05 | **Halaman Player Bab: YouTube embed (react-player) + materi teks statis** | Dev B | 5 jam | M3-03 |
| M3-06 | **Zustand: Timer akumulasi `watch_seconds` + trigger munculnya tombol "Tandai Selesai"** | Dev B | 4 jam | M3-05 |
| M3-07 | **Server Action: `markChapterComplete(chapterKey)` — UPSERT user_progress** | Dev A | 3 jam | M1-05 |
| M3-08 | **Halaman Profil Siswa: Tampil NIS, Nama, Kelas, Foto** | Dev B | 3 jam | M2-04 |
| M3-09 | **Optimasi Mobile: Skeleton loading, lazy load react-player, Suspense boundary** | Dev A & B | 4 jam | M3-05 |

> **Total Estimasi Minggu 3:** Dev A ≈ 15 jam | Dev B ≈ 22 jam

#### ✅ Acceptance Criteria Minggu 3
- [ ] Dashboard siswa menampilkan persentase progress yang akurat dari DB.
- [ ] Bab ke-2 terkunci jika bab ke-1 belum selesai & kuis bab-1 belum lulus.
- [ ] Tombol "Tandai Selesai" hanya muncul setelah `min_watch_seconds` terpenuhi (dikontrol Zustand).
- [ ] Halaman player tampil baik di layar 360px (Android low-end) tanpa layout rusak.
- [ ] Skeleton loading muncul selama data fetching.

---

## 📅 MINGGU 4 — Kuis, Auto-Grading, Sertifikat & Super Admin

> **Tujuan:** Kuis statis berfungsi dengan grading aman di server. Sertifikat PDF bisa diunduh. Super Admin dapat import massal dan kelola guru.

### 🗂️ Backlog Minggu 4

| # | Kartu Task | Assignee | Estimasi | Dependensi |
|---|---|---|---|---|
| M4-01 | **Halaman Kuis: Render soal dari `quizzes.ts` (tanpa kunci jawaban ke client)** | Dev B | 5 jam | M1-09 |
| M4-02 | **Server Action: `submitQuiz(quizKey, answers[])` — grading di server, simpan ke DB** | Dev A | 6 jam | M1-09, M1-05 |
| M4-03 | **Halaman Hasil Kuis: Tampil skor, status lulus/gagal, sisa attempt, tombol ulangi** | Dev B | 4 jam | M4-02 |
| M4-04 | **Server Action: `claimCertificate(courseKey)` — validasi semua selesai & lulus, generate serial** | Dev A | 5 jam | M4-02 |
| M4-05 | **Template Sertifikat PDF dengan `@react-pdf/renderer` (nama, kursus, nilai, nomor seri, tanggal, logo)** | Dev B | 6 jam | M4-04 |
| M4-06 | **Portal Super Admin: Dashboard + CRUD Guru (Tambah, Edit, Hapus)** | Dev B | 5 jam | M1-07, M2-06 |
| M4-07 | **Server Action: Create/Update/Delete guru (users + teachers sekaligus)** | Dev A | 4 jam | M1-05 |
| M4-08 | **Server Action: Bulk Import Siswa via CSV (parse, validasi NIS duplikat, bcrypt, createMany)** | Dev A | 6 jam | M1-05 |
| M4-09 | **UI Upload CSV Siswa: Dropzone, preview tabel, laporan hasil import** | Dev B | 5 jam | M4-08 |
| M4-10 | **Server Action: Bulk Import Guru via CSV (parse, validasi NIP/Email duplikat, createMany)** | Dev A | 4 jam | M1-05 |
| M4-11 | **UI Upload CSV Guru: Dropzone, preview tabel, laporan hasil import** | Dev B | 4 jam | M4-10 |
| M4-12 | **Halaman Laporan Progress: Tabel nilai & % penyelesaian per siswa per kursus (Guru & Super Admin)** | Dev A | 5 jam | M4-02 |

> **Total Estimasi Minggu 4:** Dev A ≈ 30 jam | Dev B ≈ 29 jam

> [!WARNING]
> Minggu 4 adalah minggu paling padat. Jika timeline mepet, prioritaskan M4-01 s/d M4-05 (kuis & sertifikat) dan M4-08 s/d M4-09 (bulk import siswa). Fitur guru (M4-06, M4-07, M4-10, M4-11) bisa digeser ke Minggu 5 jika perlu.

#### ✅ Acceptance Criteria Minggu 4
- [ ] Siswa mengerjakan kuis dan skor tersimpan di database.
- [ ] Kunci jawaban **tidak pernah** terekspos di browser (cek Network tab DevTools).
- [ ] Sertifikat PDF ter-generate dengan nama, kursus, nilai, nomor seri, dan tanggal.
- [ ] Super Admin dapat import 20 siswa sekaligus via CSV tanpa error.
- [ ] Guru dapat melihat tabel nilai & progress semua siswa.

---

## 📅 MINGGU 5 — Testing, Bug Fix, Polish & Deployment

> **Tujuan:** Semua fitur MVP stabil, performa di jaringan lambat teruji, dan aplikasi live di Vercel production.

### 🗂️ Backlog Minggu 5

| # | Kartu Task | Assignee | Estimasi | Dependensi |
|---|---|---|---|---|
| M5-01 | **E2E Test Alur Siswa: Login → Video → Tandai Selesai → Kuis → Sertifikat** | Dev A & B | 5 jam | Semua M4 |
| M5-02 | **E2E Test Alur Guru: Login → Tambah Siswa → Pantau Progress** | Dev A & B | 3 jam | Semua M4 |
| M5-03 | **E2E Test Alur Super Admin: Login → Import CSV → Kelola Guru** | Dev A & B | 3 jam | Semua M4 |
| M5-04 | **Simulasi Jaringan Lambat (3G Throttle): Cek LCP, CLS via Chrome DevTools** | Dev B | 4 jam | M5-01 |
| M5-05 | **Optimasi: Tambah `loading.tsx`, `error.tsx`, Suspense untuk semua halaman siswa** | Dev B | 3 jam | M5-04 |
| M5-06 | **Security Audit: Proteksi rute middleware, validasi input Server Actions, cek `quizzes.ts` tidak leak** | Dev A | 4 jam | M5-01 |
| M5-07 | **Setup Environment Variables di Vercel (DATABASE_URL, NEXTAUTH_SECRET, dll)** | Dev A | 2 jam | M5-01 |
| M5-08 | **Deploy ke Vercel + konfigurasi domain custom (jika ada)** | Dev A | 3 jam | M5-07 |
| M5-09 | **UI Polish: Konsistensi warna, tipografi, spacing, empty state, error state** | Dev B | 4 jam | M5-05 |
| M5-10 | **Buat Panduan Penggunaan Admin/Guru (PDF atau halaman `/help` statis)** | Dev A & B | 3 jam | M5-08 |

> **Total Estimasi Minggu 5:** Dev A ≈ 15 jam | Dev B ≈ 19 jam

#### ✅ Acceptance Criteria Minggu 5 (Definition of Done MVP)
- [ ] Tidak ada error fatal di Console saat alur normal semua aktor dijalankan.
- [ ] Lighthouse Mobile Score: Performance > 60, Accessibility > 85.
- [ ] Aplikasi live dan dapat diakses melalui URL Vercel.
- [ ] Data production: 10 siswa dummy, 2 guru, 2 kursus tersedia.
- [ ] File `quizzes.ts` **tidak ter-bundle** ke client (verifikasi via `next build` output).
- [ ] Dokumen panduan admin tersedia.

---

## Ringkasan Beban Kerja

| Minggu | Dev A | Dev B | Total Tim |
|---|---|---|---|
| Minggu 1 | 22 jam | 12 jam | 34 jam |
| Minggu 2 | 11 jam | 30 jam | 41 jam |
| Minggu 3 | 15 jam | 22 jam | 37 jam |
| Minggu 4 | 30 jam | 29 jam | 59 jam |
| Minggu 5 | 15 jam | 19 jam | 34 jam |
| **Total** | **93 jam** | **112 jam** | **205 jam** |

> [!TIP]
> Minggu 4 sangat padat (~59 jam total tim). Pertimbangkan untuk mulai beberapa task M4 di akhir Minggu 3 jika Minggu 3 selesai lebih awal, atau geser task import guru ke Minggu 5.

---

## Panduan Prioritas Jika Ada Keterlambatan

Urutan fitur yang **tidak boleh dikompromikan** untuk MVP:

| Prioritas | Fitur | Risiko jika Skip |
|---|---|---|
| 🔴 P0 | Login Siswa & Guru | Fatal — sistem tidak bisa dipakai |
| 🔴 P0 | Tonton Video + Progress Lock | Inti pembelajaran |
| 🔴 P0 | Kuis + Auto-Grading (server-side) | Validasi kompetensi siswa |
| 🔴 P0 | Sertifikat PDF | Output utama yang dijanjikan |
| 🔴 P0 | Landing Page + Knowledge Page | Akses publik (branding) |
| 🟡 P1 | Import CSV Siswa | Bisa diganti input manual sementara |
| 🟡 P1 | Laporan Progress Guru | Bisa diganti Prisma Studio sementara |
| 🟢 P2 | Import CSV Guru | Bisa diinput manual |
| 🟢 P2 | CRUD Guru oleh Super Admin | Bisa pakai Prisma Studio |
| 🟢 P2 | Foto Profil Siswa/Guru | Kosongkan dulu, tidak kritis |

---

*Revisi v2 — 4 Oktober 2025. Dokumen ini siap dikonversi ke Trello Board dengan kolom: Backlog → In Progress → Review → Done, dan label warna per aktor (Merah=Siswa, Biru=Guru, Ungu=Super Admin, Hijau=Guest/Publik).*
