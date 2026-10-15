'use server';

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getCourseByKey, Course } from '@/data/curriculum';

export interface StudentCertificateResult {
  success: boolean;
  isEligible?: boolean;
  error?: string;
  certificate?: {
    id: string;
    serialNumber: string;
    finalScore: number;
    issuedAt: string; // ISO string for client serialization
    courseKey: string;
  };
  student?: {
    fullName: string;
    nis: string;
    className: string;
    semester: string;
    imageUrl?: string | null;
  };
  course?: {
    key: string;
    title: string;
    tagline: string;
    category: string;
    instructorName: string;
    instructorRole: string;
  };
  verificationUrl?: string;
  progressSummary?: {
    completedChapters: number;
    totalChapters: number;
    averageQuizScore: number;
  };
}

export interface PublicVerificationResult {
  isValid: boolean;
  message?: string;
  serialNumber?: string;
  studentName?: string;
  studentNis?: string;
  className?: string;
  courseTitle?: string;
  instructorName?: string;
  issuedAt?: string;
  finalScore?: number;
  verificationUrl?: string;
}

/**
 * Normalizes courseKey to handle potential aliases (e.g. 'literasi-ai-dasar' vs 'course-beginner').
 */
function resolveCourse(courseKey: string): Course | undefined {
  let course = getCourseByKey(courseKey);
  if (!course) {
    if (courseKey === 'literasi-ai-dasar' || courseKey === 'etika-keamanan-ai') {
      course = getCourseByKey('course-beginner');
    }
  }
  return course;
}

/**
 * Server action to get (or claim) a student's course completion certificate.
 */
export async function getStudentCertificateAction(
  courseKey: string
): Promise<StudentCertificateResult> {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return {
        success: false,
        isEligible: false,
        error: 'Sesi belajar tidak ditemukan. Silakan masuk sebagai siswa.',
      };
    }

    const userId = session.user.id;
    const course = resolveCourse(courseKey);

    if (!course) {
      return {
        success: false,
        isEligible: false,
        error: 'Data kurikulum kursus tidak ditemukan.',
      };
    }

    // 1. Ambil profil siswa
    const student = await prisma.student.findUnique({
      where: { user_id: userId },
    });

    // 2. Cek apakah sertifikat sudah pernah diterbitkan sebelumnya
    let certificate = await prisma.certificate.findUnique({
      where: {
        user_id_course_key: {
          user_id: userId,
          course_key: course.key,
        },
      },
    });

    // Cek fallback jika tersimpan dengan alias lama (misal: 'literasi-ai-dasar')
    if (!certificate && course.key === 'course-beginner') {
      certificate = await prisma.certificate.findUnique({
        where: {
          user_id_course_key: {
            user_id: userId,
            course_key: 'literasi-ai-dasar',
          },
        },
      });
    }

    // 3. Ambil data progres pembelajaran siswa untuk kursus ini
    const courseChapterKeys = course.chapters.map((ch) => ch.key);
    const userProgress = await prisma.userProgress.findMany({
      where: {
        user_id: userId,
        chapter_key: { in: courseChapterKeys },
      },
    });

    const completedChaptersCount = userProgress.filter((p) => p.is_completed).length;
    const totalChaptersCount = course.chapters.length;
    const isAllChaptersCompleted =
      totalChaptersCount > 0 && completedChaptersCount >= totalChaptersCount;

    // 4. Ambil rata-rata nilai kuis siswa
    const quizRecords = await prisma.userQuizScore.findMany({
      where: { user_id: userId },
    });

    // Filter kuis yang terkait dengan kursus ini
    const courseQuizKeys = course.chapters
      .filter((ch) => ch.hasQuiz && ch.quizKey)
      .map((ch) => ch.quizKey as string);

    const relevantQuizScores = quizRecords.filter((q) =>
      courseQuizKeys.length > 0 ? courseQuizKeys.includes(q.quiz_key) : true
    );

    let averageQuizScore = 85;
    if (relevantQuizScores.length > 0) {
      const sum = relevantQuizScores.reduce((acc, curr) => acc + curr.score, 0);
      averageQuizScore = Math.round(sum / relevantQuizScores.length);
    } else if (quizRecords.length > 0) {
      const sum = quizRecords.reduce((acc, curr) => acc + curr.score, 0);
      averageQuizScore = Math.round(sum / quizRecords.length);
    }

    // 5. Jika sertifikat belum ada: cek kelayakan
    if (!certificate) {
      if (!isAllChaptersCompleted) {
        return {
          success: false,
          isEligible: false,
          error: `Anda belum menyelesaikan seluruh modul pembelajaran (${completedChaptersCount}/${totalChaptersCount} modul selesai). Selesaikan materi untuk membuka sertifikat.`,
          progressSummary: {
            completedChapters: completedChaptersCount,
            totalChapters: totalChaptersCount,
            averageQuizScore,
          },
          course: {
            key: course.key,
            title: course.title,
            tagline: course.tagline,
            category: course.category,
            instructorName: course.instructorName,
            instructorRole: course.instructorRole,
          },
        };
      }

      // Generate nomor seri unik resmi format: AMOS-2026-XXXXX-AI
      const randomFiveDigits = Math.floor(10000 + Math.random() * 90000);
      const generatedSerial = `AMOS-2026-${randomFiveDigits}-AI`;

      certificate = await prisma.certificate.create({
        data: {
          user_id: userId,
          course_key: course.key,
          serial_number: generatedSerial,
          final_score: Math.max(averageQuizScore, 75),
        },
      });
    }

    const verificationUrl = `/verify/${certificate.serial_number}`;

    return {
      success: true,
      isEligible: true,
      certificate: {
        id: certificate.id,
        serialNumber: certificate.serial_number,
        finalScore: certificate.final_score,
        issuedAt: certificate.issued_at.toISOString(),
        courseKey: certificate.course_key,
      },
      student: {
        fullName: student?.full_name || session.user.name || 'Siswa Berprestasi',
        nis: student?.nis || session.user.identifier || '-',
        className: student?.class_name || 'X TKJ A',
        semester: student?.semester || 'Ganjil 2026/2027',
        imageUrl: student?.image_url,
      },
      course: {
        key: course.key,
        title: course.title,
        tagline: course.tagline,
        category: course.category,
        instructorName: course.instructorName,
        instructorRole: course.instructorRole,
      },
      verificationUrl,
      progressSummary: {
        completedChapters: completedChaptersCount,
        totalChapters: totalChaptersCount,
        averageQuizScore,
      },
    };
  } catch (error) {
    console.error('Error in getStudentCertificateAction:', error);
    return {
      success: false,
      isEligible: false,
      error: 'Terjadi kesalahan sistem saat memproses sertifikat.',
    };
  }
}

/**
 * Public action to verify certificate authenticity by serial number (no login required).
 */
export async function verifyCertificatePublicAction(
  serialNumber: string
): Promise<PublicVerificationResult> {
  try {
    if (!serialNumber || !serialNumber.trim()) {
      return {
        isValid: false,
        message: 'Nomor seri sertifikat tidak boleh kosong.',
      };
    }

    const cleanSerial = serialNumber.trim();

    const cert = await prisma.certificate.findUnique({
      where: {
        serial_number: cleanSerial,
      },
      include: {
        user: {
          include: {
            student: true,
            teacher: true,
          },
        },
      },
    });

    if (!cert) {
      return {
        isValid: false,
        message: `Nomor seri ${cleanSerial} tidak ditemukan dalam pangkalan data verifikasi resmi UNAIR & SFA Learn.`,
      };
    }

    const course = resolveCourse(cert.course_key);
    const student = cert.user?.student;
    const studentName =
      student?.full_name ||
      cert.user?.teacher?.full_name_with_title ||
      cert.user?.identifier ||
      'Siswa';

    return {
      isValid: true,
      serialNumber: cert.serial_number,
      studentName,
      studentNis: student?.nis || '-',
      className: student?.class_name || 'Siswa Terdaftar',
      courseTitle: course?.title || 'Literasi & Etika Kecerdasan Buatan',
      instructorName: course?.instructorName || 'Dr. Alwan Hakim, M.Kom.',
      issuedAt: cert.issued_at.toISOString(),
      finalScore: cert.final_score,
      verificationUrl: `/verify/${cert.serial_number}`,
    };
  } catch (error) {
    console.error('Error in verifyCertificatePublicAction:', error);
    return {
      isValid: false,
      message: 'Gagal memverifikasi sertifikat karena gangguan server.',
    };
  }
}
