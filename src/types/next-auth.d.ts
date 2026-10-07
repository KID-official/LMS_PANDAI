/**
 * next-auth.d.ts
 * Type augmentation untuk next-auth agar session.user mendukung
 * field custom: id, role, identifier (sesuai schema Prisma LMS-KID).
 */
import type { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
      identifier: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    identifier: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    identifier: string;
  }
}
