/**
 * src/app/components/index.ts
 *
 * Master barrel export untuk seluruh reusable component LMS-KID.
 * Import dari sini agar path tidak perlu diubah satu per satu
 * jika ada perubahan lokasi file komponen.
 *
 * Contoh penggunaan:
 *   import { NavbarGuest, Footer }  from '@/app/components';
 *   import { NavbarGuru, SidebarGuru } from '@/app/components';
 */

// ── Navigation ──────────────────────────────────────────
export * from './navbar';
export * from './sidebar';
export * from './footer';
export * from './landing';

// ── Routes (untuk keperluan navigasi terprogram) ────────
export * from './navigation/routes';
