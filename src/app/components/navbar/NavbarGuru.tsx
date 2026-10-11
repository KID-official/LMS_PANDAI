'use client';

import { useState } from 'react';
import { Search, Bell, Globe, ChevronDown, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { signOut, useSession } from 'next-auth/react';

/**
 * NavbarGuru
 *
 * Top-bar untuk area portal guru.
 * Berisi: search bar di kiri, language switcher + notifikasi + user info di kanan.
 *
 * Design reference: DesignReferences/Navbar Guru.png
 * Design token: design.md § Color Tokens & Components → Navigation
 *
 * Props:
 * - onMobileMenuToggle: callback untuk toggle sidebar di mobile
 */

type Props = {
  onMobileMenuToggle?: () => void;
  userImage?: string | null;
  userName?: string;
  userEmail?: string;
};

const LANGUAGES = [
  { code: 'id', label: 'ID' },
  { code: 'en', label: 'EN' },
] as const;

type LangCode = 'id' | 'en';

export default function NavbarGuru({
  onMobileMenuToggle,
  userImage: propImage,
  userName: propName,
  userEmail: propEmail,
}: Props) {
  const { data: session } = useSession();
  const [lang, setLang] = useState<LangCode>('id');
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifCount] = useState(3); // placeholder — ganti dengan data real

  const userName  = propName ?? session?.user?.name  ?? 'Guru Admin';
  const userEmail = propEmail ?? session?.user?.email ?? 'Pengmas UNAIR';
  const userImage = propImage ?? session?.user?.image ?? null;

  // Inisial avatar dari nama
  const initials = userName
    .split(' ')
    .slice(0, 2)
    .map((w: string) => w[0])
    .join('')
    .toUpperCase();

  return (
    <header
      className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b px-6"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
        borderColor: '#CAC3D8',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
      }}
    >

      {/* ── SEARCH BAR ── */}
      <div className="flex flex-1 items-center gap-3">
        {/* Mobile hamburger – hanya muncul saat sidebar tersembunyi */}
        <button
          className="mr-1 flex h-8 w-8 items-center justify-center rounded-lg lg:hidden"
          style={{ color: '#494455' }}
          onClick={onMobileMenuToggle}
          aria-label="Toggle sidebar"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
            <rect y="3" width="18" height="1.5" rx="0.75" fill="currentColor" />
            <rect y="8.25" width="18" height="1.5" rx="0.75" fill="currentColor" />
            <rect y="13.5" width="18" height="1.5" rx="0.75" fill="currentColor" />
          </svg>
        </button>

        {/* Search input */}
        <label
          className="relative flex max-w-lg flex-1 items-center rounded-lg"
          style={{ background: '#F0F3FF' }}
          aria-label="Cari apapun"
        >
          <Search
            className="absolute left-3 h-4 w-4 flex-shrink-0"
            style={{ color: '#7A7486' }}
            aria-hidden
          />
          <input
            type="search"
            placeholder="Search anything..."
            className="h-10 w-full rounded-lg bg-transparent pl-9 pr-4 text-[13px] outline-none"
            style={{ color: '#494455' }}
          />
        </label>
      </div>

      {/* ── RIGHT CONTROLS ── */}
      <div className="ml-4 flex shrink-0 items-center gap-2">

        {/* Language Switcher */}
        <div className="relative">
          <button
            className="flex h-9 items-center gap-1 rounded-lg px-3 text-[13px] font-semibold transition-colors hover:bg-[#F0F3FF]"
            style={{ color: '#494455' }}
            onClick={() => { setLangOpen((v) => !v); setProfileOpen(false); }}
            aria-expanded={langOpen}
            aria-haspopup="listbox"
            aria-label="Pilih bahasa"
          >
            <Globe className="h-4 w-4" style={{ color: '#7A7486' }} aria-hidden />
            <span>{lang.toUpperCase()}</span>
            <ChevronDown
              className={cn('h-3.5 w-3.5 transition-transform', langOpen && 'rotate-180')}
              style={{ color: '#7A7486' }}
              aria-hidden
            />
          </button>

          {langOpen && (
            <ul
              role="listbox"
              aria-label="Daftar bahasa"
              className="absolute right-0 top-full z-50 mt-1 min-w-[80px] overflow-hidden rounded-lg bg-white py-1 shadow-md"
              style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.10)', border: '1px solid #CAC3D8' }}
            >
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    role="option"
                    aria-selected={lang === l.code}
                    className={cn(
                      'w-full px-4 py-2 text-left text-[13px] font-semibold transition-colors hover:bg-[#F0F3FF]',
                      lang === l.code ? 'text-[#7F54F8]' : 'text-[#494455]'
                    )}
                    onClick={() => { setLang(l.code as LangCode); setLangOpen(false); }}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Notification Bell */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-[#F0F3FF]"
          style={{ color: '#494455' }}
          aria-label={`${notifCount} notifikasi`}
        >
          <Bell className="h-4.5 w-4.5" aria-hidden />
          {notifCount > 0 && (
            <span
              className="absolute right-1.5 top-1.5 flex h-4 min-w-[16px] items-center justify-center rounded-full px-0.5 text-[10px] font-bold text-white"
              style={{ background: '#BA1A1A' }}
              aria-hidden
            >
              {notifCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <div className="relative">
          <button
            className="flex h-9 items-center gap-2.5 rounded-lg px-2 transition-colors hover:bg-[#F0F3FF]"
            onClick={() => { setProfileOpen((v) => !v); setLangOpen(false); }}
            aria-expanded={profileOpen}
            aria-haspopup="menu"
            aria-label="Menu profil pengguna"
          >
            {/* Avatar */}
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold text-white overflow-hidden"
              style={{ background: '#7F54F8' }}
              aria-hidden
            >
              {userImage ? (
                <img src={userImage} alt={userName} className="h-full w-full object-cover" />
              ) : (
                initials
              )}
            </span>

            {/* Name & institution */}
            <span className="hidden flex-col text-left leading-none sm:flex">
              <span className="text-[13px] font-semibold" style={{ color: '#061B38' }}>
                {userName}
              </span>
              <span className="text-[11px]" style={{ color: '#7A7486' }}>
                {userEmail}
              </span>
            </span>
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-1 w-44 overflow-hidden rounded-lg bg-white py-1 shadow-md"
              style={{ boxShadow: '0 4px 6px -1px rgba(0,0,0,0.10)', border: '1px solid #CAC3D8' }}
            >
              <button
                role="menuitem"
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-[13px] text-[#BA1A1A] transition-colors hover:bg-[#FFDAD6]"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                <LogOut className="h-4 w-4" aria-hidden />
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
