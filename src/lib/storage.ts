import fs from 'fs/promises';
import path from 'path';

/**
 * Storage Service (Local Storage)
 * 
 * Modul penyimpanan file avatar secara lokal di folder `public/uploads/avatars`.
 * 
 * ─────────────────────────────────────────────────────────────────────────────
 * PANDUAN MENGALIHKAN KE SUPABASE STORAGE SAAT DEPLOYMENT:
 * 1. Install package Supabase:
 *    npm install @supabase/supabase-js
 * 
 * 2. Pasang variabel environment di .env:
 *    NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
 *    SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
 *    SUPABASE_AVATARS_BUCKET="avatars"
 * 
 * 3. Anda cukup menambahkan upload ke Supabase Client di fungsi uploadAvatar:
 *    import { createClient } from '@supabase/supabase-js';
 *    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
 *    await supabase.storage.from('avatars').upload(filename, buffer, { contentType: file.type });
 * ─────────────────────────────────────────────────────────────────────────────
 */

export interface UploadResult {
  url: string;
  filename: string;
}

const LOCAL_UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'avatars');

export async function uploadAvatar(file: File, prefix = 'avatar'): Promise<UploadResult> {
  // 1. Validasi Ukuran (Maksimal 2MB sesuai ketentuan)
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

  // 3. Simpan ke Direktori Lokal public/uploads/avatars
  await fs.mkdir(LOCAL_UPLOAD_DIR, { recursive: true });

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = path.join(LOCAL_UPLOAD_DIR, filename);

  await fs.writeFile(filePath, buffer);

  const publicUrl = `/uploads/avatars/${filename}`;

  return {
    url: publicUrl,
    filename,
  };
}
