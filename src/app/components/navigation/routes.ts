/**
 * routes.ts
 * Centralized routing configuration untuk seluruh navigasi LMS-KID.
 * Ubah di sini saja jika ingin menyesuaikan path atau label menu.
 */

// ─────────────────────────────────────────────
// PUBLIC / GUEST ROUTES
// ─────────────────────────────────────────────
export const PUBLIC_ROUTES = {
  HOME: '/',
  KNOWLEDGE: '/knowledge',
  ABOUT: '/about',
  COURSES: '/courses',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
} as const;

// ─────────────────────────────────────────────
// GURU ROUTES
// ─────────────────────────────────────────────
export const GURU_ROUTES = {
  DASHBOARD: '/guru/dashboard',
  COURSES: '/guru/courses',
  CATEGORIES: '/guru/categories',
  INSTRUCTORS: '/guru/instructors',
  STUDENTS: '/guru/students',
  REPORTS: '/guru/reports',
  MESSAGES: '/guru/messages',
  SETTINGS: '/guru/settings',
} as const;

// ─────────────────────────────────────────────
// STUDENT ROUTES
// ─────────────────────────────────────────────
export const STUDENT_ROUTES = {
  DASHBOARD: '/student/dashboard',
  MY_COURSES: '/student/courses',
  PROFILE: '/student/profile',
} as const;

// ─────────────────────────────────────────────
// SUPERADMIN ROUTES
// ─────────────────────────────────────────────
export const SUPERADMIN_ROUTES = {
  DASHBOARD: '/superadmin/dashboard',
} as const;

// ─────────────────────────────────────────────
// SIDEBAR MENU DEFINITIONS — GURU
// ─────────────────────────────────────────────
export type SidebarMenuItem = {
  label: string;
  href: string;
  icon: string; // nama ikon Lucide
};

export type SidebarMenuGroup = {
  groupLabel: string;
  items: SidebarMenuItem[];
};

export const GURU_SIDEBAR_MENU: SidebarMenuGroup[] = [
  {
    groupLabel: 'OVERVIEW',
    items: [
      { label: 'Dashboard', href: GURU_ROUTES.DASHBOARD, icon: 'LayoutDashboard' },
    ],
  },
  {
    groupLabel: 'LEARNING MANAGEMENT',
    items: [
      { label: 'Courses',      href: GURU_ROUTES.COURSES,      icon: 'BookOpen' },
      { label: 'Categories',   href: GURU_ROUTES.CATEGORIES,   icon: 'Shapes' },
      { label: 'Instructors',  href: GURU_ROUTES.INSTRUCTORS,  icon: 'UserCog' },
      { label: 'Students',     href: GURU_ROUTES.STUDENTS,     icon: 'GraduationCap' },
    ],
  },
  {
    groupLabel: 'APPLICATIONS',
    items: [
      { label: 'Reports',   href: GURU_ROUTES.REPORTS,   icon: 'BarChart2' },
      { label: 'Messages',  href: GURU_ROUTES.MESSAGES,  icon: 'MessageSquare' },
      { label: 'Settings',  href: GURU_ROUTES.SETTINGS,  icon: 'Settings' },
    ],
  },
];

// ─────────────────────────────────────────────
// NAVBAR GUEST LINKS
// ─────────────────────────────────────────────
export type NavLink = {
  label: string;
  href: string;
};

export const GUEST_NAV_LINKS: NavLink[] = [
  { label: 'Beranda',           href: PUBLIC_ROUTES.HOME },
  { label: 'Pusat Pengetahuan', href: PUBLIC_ROUTES.KNOWLEDGE },
  { label: 'Kursus',            href: PUBLIC_ROUTES.COURSES },
  { label: 'Tentang',           href: PUBLIC_ROUTES.ABOUT },
  { label: 'Kontak',            href: PUBLIC_ROUTES.CONTACT },
];

// ─────────────────────────────────────────────
// FOOTER LINKS
// ─────────────────────────────────────────────
export const FOOTER_LINKS: NavLink[] = [
  { label: 'Pusat Bantuan',     href: '/help' },
  { label: 'Kebijakan Privasi', href: '/privacy' },
  { label: 'Panduan Siswa',     href: '/guide' },
];
