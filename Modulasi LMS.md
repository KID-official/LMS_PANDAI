# PRODUCT REQUIREMENTS DOCUMENT (PRD)

**Nama Proyek:** E-Learning Portal Literasi AI (AI for Junior High School)  
**Disiapkan Oleh:** Alwan Hakim Ramadhani - AmosProduction  
**Tanggal:** 1 Oktober 2026  
**Fase Proyek:** Tahap 1 (Minimum Viable Product - 5 Minggu)  

---

## 1. Ringkasan Eksekutif
Proyek ini bertujuan untuk membangun platform *Learning Management System (LMS)* Single-Tenant yang dirancang khusus untuk siswa SMP di area dengan infrastruktur jaringan terbatas. Berbeda dengan LMS sekolah pada umumnya, platform ini mengadopsi model *course-based* (seperti Coursera) yang berfokus menyajikan kurikulum khusus: **Literasi dan Etika Penggunaan Artificial Intelligence (AI) yang Bertanggung Jawab**. Sistem akan memandu siswa secara berurutan melalui materi video dan teks, mengevaluasi pemahaman mereka melalui kuis, dan secara otomatis menerbitkan sertifikat kelulusan berdasarkan level yang diselesaikan (misalnya: Beginner, Intermediate).

---

## 2. Objektif Proyek
- Menyediakan platform e-learning yang sangat ringan, *mobile-first*, dan mudah diakses oleh siswa menggunakan smartphone standar.
- Menciptakan alur pembelajaran sekuensial yang memastikan siswa menyelesaikan satu materi sebelum beralih ke materi berikutnya.
- Mengotomatisasi proses evaluasi (kuis) dan penerbitan sertifikat untuk meminimalisir beban kerja administratif guru.
- Menyelesaikan pengembangan dan deployment dalam tenggat waktu 5 minggu (MVP).

---

## 3. Target Pengguna (User Personas)
1. **Siswa SMP:** Pengguna utama. Mengakses platform untuk menonton video materi, membaca panduan, mengerjakan kuis, dan mengunduh sertifikat kelulusan.
2. **Guru:** Pantau progress belajar siswa, lakukan manajemen akun (CRUD) siswa secara manual, serta kelola profil pribadi (Management Profile).
3. **Super Admin:** Melakukan *import massal* (CSV/Excel) untuk data siswa dan guru, serta mengelola (CRUD) akun guru.
4. **Guest:** Mengakses platform publik (Landing Page & Knowledge Page) untuk membaca literasi statis tanpa harus login.

---

## 4. Ruang Lingkup & Fitur Utama (MVP)

### A. Portal Siswa (Frontend Interaktif)
- **Autentikasi Sederhana:** Login menggunakan NIS (Nomor Induk Siswa) dan password. Tidak ada pendaftaran mandiri (self-registration). Tersedia fitur *Management Profile Siswa* untuk mengubah data dan foto.
- **Dasbor Pembelajaran:** Menampilkan daftar level kursus AI (contoh: Literasi AI Dasar) beserta *progress bar* (persentase penyelesaian).
- **Pemutar Materi (Sequential Learning):** 
  - Halaman interaktif yang menampilkan embed video (sumber dari YouTube agar hemat bandwidth server) atau teks panduan etika AI.
  - Tombol **"Tandai Selesai"** yang akan membuka kunci (*unlock*) materi atau kuis di bab selanjutnya secara otomatis setelah kondisi durasi tonton minimum terpenuhi.
- **Modul Kuis Pilihan Ganda:** Sistem evaluasi di akhir setiap bab/level. Jika nilai mencapai *passing grade* (misal: 75), siswa dinyatakan lulus.
- **Klaim Sertifikat:** Tombol untuk mengunduh e-Sertifikat berformat PDF secara otomatis setelah siswa lulus kuis pada level tersebut.

### B. Portal Guru, Super Admin & Halaman Publik
- **Manajemen Pengguna:** Fitur CRUD data siswa manual yang dilakukan oleh Guru, dan *import data massal* via Excel/CSV yang dikhususkan bagi Super Admin.
- **Management Profile (Guru):** Fitur bagi guru untuk mengedit data pribadi, gelar akademik, institusi, kontak WhatsApp, dan foto profil.
- **Halaman Publik (Guest):** Akses *Landing Page* dan *Knowledge Page* yang berisi informasi statis edukatif tentang Literasi AI tanpa perlu membuat akun (login).
- **Monitoring Progres:** Tabel laporan visual bagi Guru untuk memantau sejauh mana persentase materi yang telah diselesaikan oleh masing-masing siswa beserta nilai ujian/kuis mereka.

---

## 5. Persyaratan Non-Fungsional
- **Mobile-First UI/UX:** Mengingat target pengguna di desa mayoritas menggunakan smartphone, antarmuka dirancang dengan navigasi ramah jari dan tata letak responsif terhadap layar kecil.
- **Optimasi Bandwidth:** Platform tidak akan menyimpan file video secara lokal di server. Semua materi video di-hosting di YouTube dan di-embed ke dalam sistem.
- **Performa Cepat:** Konten kursus akan disajikan sebagian besar secara statis (*hardcoded* pada sistem) dan memanfaatkan *Server-Side Rendering* (SSR) untuk mengurangi *lag* pada koneksi lambat.

---

## 6. Spesifikasi Teknologi (Tech Stack)
Amos Production menggunakan pendekatan *Full-Stack JavaScript/TypeScript* dalam arsitektur Monorepo untuk memastikan kecepatan *development* dan biaya maintenance server yang sangat rendah:
- **UI/UX Prototyping:** Figma (wireframing & desain visual).
- **Framework Utama (Full-Stack):** Next.js 14+ (App Router & Server Actions).
- **Styling & UI Library:** Tailwind CSS dipadukan dengan komponen UI Shadcn (atau Mantine).
- **Database & ORM:** PostgreSQL (via Supabase / Neon) dipadukan dengan Prisma ORM (hanya 6 tabel utama).
- **Generator PDF (Sertifikat):** `@react-pdf/renderer` untuk men-generate sertifikat dinamis instan di sistem.
- **State Management:** Zustand (melacak progress bar video secara real-time di sisi klien).
- **Hosting & Deployment:** Vercel (infrastruktur *serverless* stabil, biaya minim/gratis).

---

## 7. Timeline Eksekusi Proyek (5 Minggu)

| Minggu | Fase Pekerjaan | Output / Deliverables |
|:---:|---|---|
| **Minggu 1** | **Perencanaan & Desain Visual:** Diskusi *flow* pembelajaran, penyusunan arsitektur 6 tabel database, dan desain antarmuka. | Wireframe & UI Mockup Figma disetujui klien. |
| **Minggu 2** | **Infrastruktur & Portal Guru:** Setup Next.js, PostgreSQL & Prisma ORM, *schema* 6 tabel, dan *coding* antarmuka Panel Admin (CRUD Siswa & Profil Guru). | Dasbor Admin fungsional dengan antarmuka custom. |
| **Minggu 3** | **Portal Siswa & Player Materi:** Pembuatan halaman login, dasbor utama siswa, pemutar video YouTube *embed*, dan sinkronisasi Server Actions. | Portal siswa siap menampilkan modul pembelajaran dari konten statis. |
| **Minggu 4** | **Sistem Kuis, Progres & Sertifikat:** Pembuatan logika validasi kuis, pengaman *progress bar* agar tidak bisa di-*skip*, dan integrasi *generate* PDF Sertifikat. | MVP fungsional (alur belajar dari awal hingga sertifikat). |
| **Minggu 5** | **Testing, Bug Fixing & Handover:** Pengujian deployment di Vercel, simulasi jaringan lambat, uji coba smartphone, dan pelatihan sistem ke klien. | Sistem *Live*, penyerahan akses, aplikasi siap digunakan. |

---

## 8. Asumsi & Batasan (Out of Scope)
Untuk menjaga agar proyek selesai dalam 5 minggu dan anggaran tetap efisien, batasan berikut diberlakukan pada fase MVP:
1. **Hardcoded Content:** Materi kursus, daftar bab, dan bank soal kuis (beserta kunci jawaban) bersifat statis (*hardcoded* di *source code* sistem untuk menghemat beban database, hanya menggunakan 6 tabel). **Tidak ada** *User Interface* (UI) khusus bagi admin untuk membuat/mengubah materi atau soal secara mandiri melalui *dashboard*.
2. **Tidak ada sistem upload file:** Tidak ada fitur pengumpulan tugas (*upload file* besar) dari siswa. Evaluasi murni 100% otomatis menggunakan Kuis Pilihan Ganda.
3. **Tidak ada fitur kolaborasi:** Tidak ada percakapan langsung (*live chat*) atau forum diskusi antar siswa dan guru.
4. **Tanpa AI backend aktual:** Tidak ada integrasi *Machine Learning* aktual pada backend (kata "AI" merujuk pada kurikulum/topik materinya, bukan teknologinya).
5. **Template Sertifikat Baku:** Desain sertifikat menggunakan satu buah template baku. Hanya nama siswa, kursus, tanggal, dan nomor seri yang digenerate secara dinamis.
