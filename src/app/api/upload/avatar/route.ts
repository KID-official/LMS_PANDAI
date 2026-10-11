import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { uploadAvatar } from '@/lib/storage';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized. Harap login terlebih dahulu.' }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'File gambar tidak ditemukan.' }, { status: 400 });
    }

    const prefix = session.user.role ? session.user.role.toLowerCase() : 'user';
    const result = await uploadAvatar(file, prefix);

    return NextResponse.json({
      success: true,
      url: result.url,
      filename: result.filename,
    });
  } catch (error: any) {
    console.error('Error saat upload avatar:', error);
    return NextResponse.json(
      { error: error?.message || 'Gagal mengunggah foto profil.' },
      { status: 500 }
    );
  }
}
