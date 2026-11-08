import fs from 'fs/promises';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

/**
 * Storage Service (Neon Object Storage / S3-compatible + Local Disk Fallback)
 * 
 * Terintegrasi penuh dengan Neon Object Storage di region ap-southeast-1 (Singapura).
 * Menggunakan kredensial AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, dan AWS_ENDPOINT_URL_S3
 * yang secara otomatis disediakan oleh Neon CLI ('neon deploy').
 */

export interface UploadResult {
  url: string;
  filename: string;
}

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'avatars');

function getS3Client(): { s3: S3Client; endpoint: string; bucket: string } | null {
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  const region = process.env.AWS_REGION || 'ap-southeast-1';
  const bucket = process.env.NEON_STORAGE_BUCKET || 'pandai-learning';

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    return null;
  }

  const s3 = new S3Client({
    endpoint,
    region,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
    forcePathStyle: true, // Wajib true untuk Neon Object Storage (path-style addressing)
  });

  return { s3, endpoint, bucket };
}

export async function uploadAvatar(file: File, prefix = 'avatar'): Promise<UploadResult> {
  // 1. Validasi Ukuran (Maksimal 2MB sesuai ketentuan LMS)
  const MAX_SIZE = 2 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error('Ukuran file maksimal 2MB.');
  }

  // 2. Validasi Tipe MIME
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Format file harus berupa JPG, PNG, atau WEBP.');
  }

  const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const filename = `${prefix}-${timestamp}-${randomStr}.${extension}`;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 3. Simpan ke Neon Object Storage (Bucket Public Read) jika konfigurasi tersedia
  const s3Config = getS3Client();
  if (s3Config) {
    const key = `avatars/${filename}`;
    await s3Config.s3.send(
      new PutObjectCommand({
        Bucket: s3Config.bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    const publicUrl = `${s3Config.endpoint.replace(/\/$/, '')}/${s3Config.bucket}/${key}`;
    return {
      url: publicUrl,
      filename,
    };
  }

  // Fallback: Simpan ke Direktori Lokal public/uploads/avatars (Development Offline)
  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });
  const filePath = path.join(LOCAL_UPLOAD_DIR, filename);
  await fs.writeFile(filePath, buffer);

  const publicUrl = `/uploads/avatars/${filename}`;
  return {
    url: publicUrl,
    filename,
  };
}
