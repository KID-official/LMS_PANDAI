'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
  LayoutDashboard,
  BookOpen,
  Shapes,
  UserCog,
  GraduationCap,
  BarChart2,
  MessageSquare,
  Settings,
  Sparkles,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Users,
  FileSpreadsheet,
  UploadCloud,
  LucideProps,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  GURU_SIDEBAR_MENU,
  SUPERADMIN_SIDEBAR_MENU,
  GURU_ROUTES,
  SUPERADMIN_ROUTES,
} from '../navigation/routes';

/**
 * SidebarGuru & SuperAdmin
 *
 * Sidebar navigasi untuk portal guru dan super admin.
 * Mendukung:
 * - Menampilkan menu dinamis berdasarkan role (Guru vs Super Admin)
 * - Grup menu berlabel (LEARNING MANAGEMENT, USER ADMINISTRATION, APPLICATIONS)
 * - Active state dengan highlight violet
 * - Collapsed mode (icon-only) untuk ruang kerja lebih luas
 * - Mobile overlay mode
 */

// ── Icon Registry ────────────────────────────────────
type IconComponent = React.FC<LucideProps>;

const ICON_MAP: Record<string, IconComponent> = {
  LayoutDashboard,
  BookOpen,
  Shapes,
  UserCog,
  GraduationCap,
  BarChart2,
  MessageSquare,
  Settings,
  Users,
  FileSpreadsheet,
  UploadCloud,
};

// ── Component ────────────────────────────────────────
type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  userName?: string;
  userSubtitle?: string;
  userImage?: string | null;
  role?: string;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
};

export default function SidebarGuru({
  isOpen = true,
  onClose,
  userName = 'Guru Admin',
  userSubtitle = 'Pengmas UNAIR',
  userImage,
  role,
  isCollapsed: controlledCollapsed,
  onToggleCollapse,
}: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [internalCollapsed, setInternalCollapsed] = useState(false);

  const collapsed = controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const toggleCollapsed = onToggleCollapse ?? (() => setInternalCollapsed((v) => !v));

  const effectiveRole = role || session?.user?.role;
  const isSuperAdmin = effectiveRole === 'SUPER_ADMIN';
  const menuGroups = isSuperAdmin ? SUPERADMIN_SIDEBAR_MENU : GURU_SIDEBAR_MENU;
  const homeRoute = isSuperAdmin ? SUPERADMIN_ROUTES.DASHBOARD : GURU_ROUTES.DASHBOARD;

  // Inisial avatar
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

  const sidebarWidth = collapsed ? 72 : 288;

  return (
    <>
      {/* ── MOBILE BACKDROP ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      {/* ── SIDEBAR PANEL (Fixed on Desktop & Mobile) ── */}
      <aside
        role="navigation"
        aria-label="Navigasi portal"
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex h-screen flex-col bg-white transition-all duration-300 ease-in-out overscroll-contain',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        style={{
          width: sidebarWidth,
          borderRight: '1px solid #CAC3D8',
          boxShadow: '1px 0 8px rgba(0,0,0,0.04)',
        }}
      >
        {/* ── HEADER / LOGO ── */}
        <div
          className="flex h-16 shrink-0 items-center justify-between px-4"
          style={{ borderBottom: '1px solid #CAC3D8' }}
        >
          {/* Logo — hidden when collapsed */}
          <Link
            href={homeRoute}
            className={cn(
              'flex items-center gap-3 select-none transition-opacity',
              collapsed && 'opacity-0 pointer-events-none'
            )}
            tabIndex={collapsed ? -1 : 0}
            aria-label="PANDAI LEARNING (panduan digital & literasi AI siswa)"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: '#7F54F8' }}
              aria-hidden
            >
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </span>
            <span className="leading-none">
              <span
                className="block text-[15px] font-bold leading-tight"
                style={{ color: '#061B38', letterSpacing: '-0.2px' }}
              >
                PANDAI LEARNING
              </span>
              <span className="block text-[11px] font-semibold" style={{ color: '#7F54F8' }}>
                {isSuperAdmin ? 'Super Admin Portal' : 'panduan digital & literasi AI siswa'}
              </span>
            </span>
          </Link>

          {/* Collapsed icon — center */}
          {collapsed && (
            <Link
              href={homeRoute}
              className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl"
              style={{ background: '#7F54F8' }}
              aria-label="PANDAI LEARNING (panduan digital & literasi AI siswa)"
            >
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </Link>
          )}

          {/* Collapse toggle — desktop only */}
          <button
            className="hidden h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-[#F0F3FF] lg:flex cursor-pointer"
            style={{ color: '#7A7486' }}
            onClick={toggleCollapsed}
            aria-label={collapsed ? 'Perluas sidebar' : 'Ciutkan sidebar'}
          >
            {collapsed
              ? <ChevronRight className="h-4 w-4" aria-hidden />
              : <ChevronLeft  className="h-4 w-4" aria-hidden />
            }
          </button>
        </div>

        {/* ── MENU GROUPS ── */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Menu utama">
          {menuGroups.map((group) => (
            <div key={group.groupLabel} className="mb-4">
              {/* Group label — hidden when collapsed */}
              {!collapsed && (
                <p
                  className="mb-2 px-2 text-[11px] font-semibold tracking-[0.55px]"
                  style={{ color: '#7A7486' }}
                >
                  {group.groupLabel}
                </p>
              )}

              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                  const Icon = ICON_MAP[item.icon] ?? BookOpen;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors',
                          collapsed && 'justify-center px-0',
                          isActive
                            ? 'bg-[#7F54F8] text-white'
                            : 'text-[#494455] hover:bg-[#F0F3FF] hover:text-[#7F54F8]'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                        title={collapsed ? item.label : undefined}
                      >
                        <Icon className="h-4.5 w-4.5 shrink-0" aria-hidden />
                        {!collapsed && <span>{item.label}</span>}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── USER CARD (bottom) ── */}
        <div
          className="shrink-0 p-3"
          style={{ borderTop: '1px solid #CAC3D8' }}
        >
          <div
            className={cn(
              'flex items-center gap-2.5 rounded-xl p-3',
              collapsed && 'justify-center p-2'
            )}
            style={{ background: '#F0F3FF' }}
          >
            {/* Avatar */}
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white overflow-hidden"
              style={{ background: '#7F54F8' }}
              aria-hidden
            >
              {userImage ? (
                <img src={userImage} alt={userName} className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </span>

            {/* Name + subtitle */}
            {!collapsed && (
              <>
                <span className="min-w-0 flex-1 leading-none">
                  <span
                    className="block truncate text-[13px] font-semibold"
                    style={{ color: '#061B38' }}
                  >
                    {userName}
                  </span>
                  <span
                    className="block truncate text-[11px]"
                    style={{ color: '#7A7486' }}
                  >
                    {userSubtitle}
                  </span>
                </span>

                {/* More options */}
                <button
                  className="shrink-0 rounded-md p-1 transition-colors hover:bg-[#E8DEFF]"
                  style={{ color: '#7A7486' }}
                  aria-label="Opsi akun"
                >
                  <MoreVertical className="h-4 w-4" aria-hidden />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
