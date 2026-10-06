# 📐 Diagram Sistem — LMS MVP Amos Production
### Versi 2.0 — Revisi 4 Aktor & Konten Statis

> [!NOTE]
> Dokumen ini mencakup 4 diagram utama yang telah diperbarui: **Use Case Diagram** (4 aktor), **Sequence Diagram** alur belajar siswa, **Activity Flowchart** alur Admin bulk import, dan **Flowchart** mekanisme Progress Lock.

---

## 1. Use Case Diagram

> Menggambarkan seluruh fitur yang dapat diakses oleh masing-masing dari **4 aktor** sistem.

```mermaid
flowchart TB
    subgraph AKTOR["🧑‍🤝‍🧑 Aktor Sistem"]
        G["👨‍🏫 Guru"]
        S["👨‍🎓 Siswa"]
        GS["🌐 Guest\n(Pengunjung Umum)"]
        SA["🛡️ Super Admin"]
    end

    subgraph GUEST_AREA["🌐 Akses Terbuka (Tanpa Login)"]
        UC_G1["Lihat Landing Page"]
        UC_G2["Lihat Knowledge Page\n(Artikel / Info AI)"]
    end

    subgraph SISWA_AREA["📱 Portal Siswa"]
        UC_S1["Login via NIS & Password"]
        UC_S2["Lihat Dashboard Kursus"]
        UC_S3["Baca Materi Teks & Tonton Video"]
        UC_S4["Kerjakan Kuis Pilihan Ganda"]
        UC_S5["Lihat Hasil & Nilai Kuis"]
        UC_S6["Lihat Progress Belajar\ndan Akses Bab Selanjutnya"]
        UC_S7["Unduh Sertifikat PDF"]
        UC_S8["Management Profile Siswa"]
    end

    subgraph GURU_AREA["🖥️ Portal Guru"]
        UC_T1["Login via NIP & Password"]
        UC_T2["CRUD Akun Siswa Manual\n(Tambah, Edit, Hapus)"]
        UC_T3["Pantau Progress Siswa\n(Laporan Nilai & Penyelesaian)"]
        UC_T4["Management Profile Guru"]
    end

    subgraph SUPERADMIN_AREA["🛡️ Portal Super Admin\n(Semua fitur Guru +)"]
        UC_SA1["Import Massal Siswa\n(Bulk CSV)"]
        UC_SA2["Import Massal Guru\n(Bulk CSV)"]
        UC_SA3["Kelola Akun Guru\n(CRUD)"]
    end

    GS --> UC_G1
    GS --> UC_G2

    S --> UC_S1
    S --> UC_S2
    S --> UC_S3
    S --> UC_S4
    S --> UC_S5
    S --> UC_S6
    S --> UC_S7
    S --> UC_S8

    G --> UC_T1
    G --> UC_T2
    G --> UC_T3
    G --> UC_T4

    SA --> UC_T1
    SA --> UC_T2
    SA --> UC_T3
    SA --> UC_T4
    SA --> UC_SA1
    SA --> UC_SA2
    SA --> UC_SA3
```

---

## 2. Sequence Diagram — Alur Belajar Siswa (End-to-End)

> Menggambarkan interaksi antara **Siswa**, **Browser/Client**, **Server (Next.js Server Actions)**, dan **Database** — dengan konten kursus & soal kuis yang bersifat **statis/hardcoded**.

```mermaid
sequenceDiagram
    actor Siswa
    participant Browser as 📱 Browser (Client)
    participant Server as 🖥️ Next.js Server
    participant DB as 🗄️ Database (PostgreSQL)
    participant Static as 📦 Konten Statis (Kode)

    rect rgb(230, 240, 255)
        Note over Siswa,Static: FASE 1 — Autentikasi
        Siswa->>Browser: Input NIS + Password
        Browser->>Server: POST Server Action: signIn(nis, password)
        Server->>DB: Query users WHERE identifier = NIS
        DB-->>Server: User record (+ relasi students)
        Server->>Server: Verify bcrypt hash
        alt Kredensial valid & is_active = true
            Server-->>Browser: Set session cookie (NextAuth)
            Browser-->>Siswa: Redirect ke Dashboard Kursus
        else Kredensial tidak valid / akun nonaktif
            Server-->>Browser: Error: "NIS atau Password salah"
            Browser-->>Siswa: Tampil pesan error
        end
    end

    rect rgb(230, 255, 235)
        Note over Siswa,Static: FASE 2 — Dashboard & Akses Kursus
        Siswa->>Browser: Buka Dashboard
        Browser->>Server: GET /dashboard (Server Component)
        Server->>Static: Ambil daftar kursus & bab (dari constants/curriculum.ts)
        Static-->>Server: Data kursus statis (title, deskripsi, chapter_keys[])
        Server->>DB: Query user_progress WHERE user_id (semua chapter_keys)
        DB-->>Server: Status selesai per chapter_key
        Server->>Server: Kalkulasi persentase progress per kursus
        Server-->>Browser: Render dashboard dengan progress bar %
        Browser-->>Siswa: Tampil kartu kursus + % progress
    end

    rect rgb(255, 248, 230)
        Note over Siswa,Static: FASE 3 — Tonton Video & Selesaikan Bab
        Siswa->>Browser: Klik bab yang tersedia
        Browser->>Server: GET /course/[courseKey]/chapter/[chapterKey]
        Server->>Static: Ambil data bab (youtube_url, materi_teks, min_watch_seconds)
        Static-->>Server: Data bab statis
        Server->>DB: Query user_progress untuk chapter_key ini
        DB-->>Server: Status & watch_seconds saat ini
        Server-->>Browser: Render halaman Player + materi teks
        Browser-->>Siswa: Tampil video YouTube (react-player) + teks materi
        Browser->>Browser: Zustand mulai akumulasi watch_seconds
        Note over Browser: Timer berjalan hingga min_watch_seconds terpenuhi
        Browser-->>Siswa: Tombol "Tandai Bab Selesai" muncul
        Siswa->>Browser: Klik "Tandai Bab Selesai"
        Browser->>Server: POST Server Action: markChapterComplete(chapterKey)
        Server->>DB: UPSERT user_progress SET is_completed=true
        DB-->>Server: OK
        Server-->>Browser: Revalidate, tampil tombol "Mulai Kuis"
    end

    rect rgb(255, 230, 230)
        Note over Siswa,Static: FASE 4 — Kuis Statis & Auto-Grading
        Siswa->>Browser: Klik "Mulai Kuis"
        Browser->>Server: GET /course/[courseKey]/chapter/[chapterKey]/quiz
        Server->>Static: Ambil soal kuis (dari constants/quizzes.ts) TANPA kunci jawaban
        Static-->>Server: Array soal + opsi (is_correct TIDAK dikirim ke client)
        Server-->>Browser: Render form kuis (soal + pilihan ganda saja)
        Browser-->>Siswa: Tampil soal pilihan ganda
        Siswa->>Browser: Pilih semua jawaban & submit
        Browser->>Server: POST Server Action: submitQuiz(quizKey, answers[])
        Server->>Static: Ambil kunci jawaban dari server-side constants
        Static-->>Server: Array jawaban benar
        Server->>Server: Hitung skor = (benar / total) × 100
        Server->>DB: INSERT user_quiz_scores (score, is_passed, answers_snapshot)
        DB-->>Server: Score record tersimpan
        alt Skor >= 75 (passing grade)
            Server-->>Browser: is_passed=true
            Browser-->>Siswa: "🎉 Selamat! Nilai kamu [X]. Klaim Sertifikat?"
        else Skor < 75
            Server-->>Browser: is_passed=false, sisa attempt
            Browser-->>Siswa: "Nilai [X]. Ulangi Kuis? (Sisa: N percobaan)"
        end
    end

    rect rgb(240, 230, 255)
        Note over Siswa,Static: FASE 5 — Klaim & Unduh Sertifikat
        Siswa->>Browser: Klik "Klaim Sertifikat"
        Browser->>Server: POST Server Action: claimCertificate(courseKey)
        Server->>DB: Validasi: semua chapter_key selesai & semua quiz_key lulus
        DB-->>Server: Validasi OK
        Server->>Server: Generate serial_number = AMOS-2025-XXXXX
        Server->>DB: INSERT certificates (serial_number, final_score, issued_at)
        DB-->>Server: Certificate record
        Server-->>Browser: Data sertifikat (nama siswa, kursus, nilai, nomor seri)
        Browser->>Browser: Render PDF via @react-pdf/renderer (client-side)
        Browser-->>Siswa: Dialog unduh sertifikat PDF 🎓
    end
```

---

## 3. Activity Flowchart — Alur Super Admin: Import Massal (Siswa & Guru)

> Super Admin dapat mengimpor banyak akun siswa **dan** guru sekaligus melalui CSV.

```mermaid
flowchart TD
    A([▶ Super Admin Login]) --> B{Import siapa?}

    B -- Siswa --> CS[Unduh Template CSV Siswa\nKolom: NIS, Nama, Kelas, Semester, Password]
    B -- Guru --> CG[Unduh Template CSV Guru\nKolom: NIP/NIDN, Nama+Gelar, Email, Jabatan, Institusi, WA]

    CS --> E[Isi & Upload CSV Siswa]
    CG --> F[Isi & Upload CSV Guru]

    E --> VS{Validasi Format\n& Kolom CSV}
    F --> VG{Validasi Format\n& Kolom CSV}

    VS -- ❌ Format salah --> GS[Tampil error:\nKolom tidak sesuai]
    VG -- ❌ Format salah --> GG[Tampil error:\nKolom tidak sesuai]
    GS --> E
    GG --> F

    VS -- ✅ Valid --> DS{Cek duplikat NIS\ndi database}
    VG -- ✅ Valid --> DG{Cek duplikat NIP/NIDN\n& Email di database}

    DS -- ❌ Ada duplikat --> RS[Laporan per baris:\nBaris X NIS sudah ada]
    DG -- ❌ Ada duplikat --> RG[Laporan per baris:\nBaris X NIP/Email sudah ada]

    RS --> JS{Pilih aksi?}
    RG --> JG{Pilih aksi?}

    JS -- Skip baris error --> HS
    JS -- Batalkan --> B
    JG -- Skip baris error --> HG
    JG -- Batalkan --> B

    DS -- ✅ Tidak ada duplikat --> HS[Hash semua password\nvia bcrypt]
    DG -- ✅ Tidak ada duplikat --> HG[Hash semua password\nvia bcrypt]

    HS --> IS[Bulk INSERT:\ntabel users + students]
    HG --> IG[Bulk INSERT:\ntabel users + teachers]

    IS --> OS[Tampil ringkasan:\nX siswa berhasil, Y gagal]
    IG --> OG[Tampil ringkasan:\nX guru berhasil, Y gagal]

    OS --> P[Super Admin distribusikan\nNIS + Password Awal ke Siswa]
    OG --> Q[Super Admin distribusikan\nNIP + Password Awal ke Guru]

    P --> Z([✅ Selesai])
    Q --> Z
```

---

## 4. Flowchart — Mekanisme Progress Lock Bab (Konten Statis)

> Logika kapan siswa boleh mengakses bab berikutnya berdasarkan kunci statis dari `constants/curriculum.ts`.

```mermaid
flowchart TD
    A([Siswa Buka Daftar Bab]) --> B{Apakah bab pertama\ndalam kursus?}
    B -- Ya --> C[✅ Bab terbuka langsung]
    B -- Tidak --> D{Cek user_progress\nbab sebelumnya\ndi database}
    D -- is_completed = false --> E[🔒 Bab Terkunci\nSelesaikan bab sebelumnya terlebih dahulu]
    D -- is_completed = true --> F{Cek user_quiz_scores\nkuis bab sebelumnya}
    F -- Belum ada / is_passed = false --> G[🔒 Bab Terkunci\nLulus kuis bab sebelumnya dulu]
    F -- is_passed = true --> C
    C --> H[Siswa tonton video & baca materi]
    H --> I{watch_seconds >=\nmin_watch_seconds?}
    I -- Belum --> J[Tombol Tandai Selesai\n🚫 Disembunyikan]
    J --> H
    I -- Ya --> K[✅ Tombol Tandai Selesai Muncul]
    K --> L[Siswa klik Tandai Selesai]
    L --> M[Server Action:\nUPSERT user_progress\nchapter_key + is_completed = true]
    M --> N{Ada kuis\nuntuk bab ini?}
    N -- Ya --> O[Tampil tombol\nMulai Kuis]
    N -- Tidak --> P[Langsung unlock\nbab berikutnya]
```

---

## Ringkasan Hak Akses Per Aktor

| Fitur | 🌐 Guest | 👨‍🎓 Siswa | 👨‍🏫 Guru | 🛡️ Super Admin |
|---|:---:|:---:|:---:|:---:|
| Landing Page | ✅ | ✅ | ✅ | ✅ |
| Knowledge Page | ✅ | ✅ | ✅ | ✅ |
| Login | — | ✅ NIS | ✅ **NIP** | ✅ NIP |
| Dashboard Kursus | — | ✅ | — | — |
| Baca Materi & Video | — | ✅ | — | — |
| Kerjakan Kuis | — | ✅ | — | — |
| Lihat Hasil Kuis | — | ✅ | — | — |
| Lihat Progress & Akses Bab Selanjutnya | — | ✅ | — | — |
| Unduh Sertifikat PDF | — | ✅ | — | — |
| Management Profile Siswa | — | ✅ | — | — |
| Pantau Progress Siswa | — | — | ✅ | ✅ |
| CRUD Siswa Manual | — | — | ✅ | ✅ |
| Management Profile Guru | — | — | ✅ | ✅ |
| Kelola Akun Guru | — | — | — | ✅ |
| Import Massal Siswa CSV | — | — | — | ✅ |
| Import Massal Guru CSV | — | — | — | ✅ |

---

*Revisi v3 — 5 Oktober 2025. Diagram ini menjadi acuan tim developer sebelum memasuki fase coding (Minggu 2).*


---

*Revisi v2 — 4 Oktober 2025. Diagram ini menjadi acuan tim developer sebelum memasuki fase coding (Minggu 2).*
