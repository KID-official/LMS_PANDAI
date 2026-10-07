import Link from 'next/link';
import { PUBLIC_ROUTES, FOOTER_LINKS } from '../navigation/routes';

/**
 * Footer
 *
 * Footer universal — digunakan pada halaman publik/guest.
 * Layout tiga kolom:
 *  - Kiri  : logo + tagline
 *  - Tengah: copyright
 *  - Kanan : link-link footer (Pusat Bantuan, Kebijakan Privasi, Panduan Siswa)
 *
 * Design reference: DesignReferences/Footer.png
 * Design token: design.md § Color Tokens
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full border-t"
      style={{
        background: '#FFFFFF',
        borderColor: '#CAC3D8',
      }}
      role="contentinfo"
    >
      <div
        className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5
                    md:flex-row md:justify-between md:gap-0"
      >
        {/* ── LEFT : Logo + tagline ── */}
        <Link
          href={PUBLIC_ROUTES.HOME}
          className="flex items-center gap-2.5 select-none"
          aria-label="SFA Learn – halaman utama"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
            style={{ background: '#7F54F8' }}
            aria-hidden
          >
            <span className="text-[13px] font-bold text-white">S</span>
          </span>

          <span className="text-[13px] font-bold" style={{ color: '#061B38' }}>
            SFA Learn
          </span>

          <span
            className="hidden text-[13px] font-normal before:mx-2 before:content-['•'] sm:inline"
            style={{ color: '#7A7486' }}
          >
            Sekolah Masa Depan
          </span>
        </Link>

        {/* ── CENTER : Copyright ── */}
        <p className="text-center text-[12px]" style={{ color: '#7A7486' }}>
          &copy; {currentYear} SFA Learn Student Portal. Hak Cipta Dilindungi.
        </p>

        {/* ── RIGHT : Footer links ── */}
        <nav aria-label="Tautan footer" className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium transition-colors hover:text-[#7F54F8]"
              style={{ color: '#494455' }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
