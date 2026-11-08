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
      className="w-full border-t border-[#EAE8F2] bg-white"
      role="contentinfo"
    >
      <div
        className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-6
                    md:flex-row md:justify-between md:gap-0"
      >
        {/* ── LEFT : Logo + tagline ── */}
        <Link
          href={PUBLIC_ROUTES.HOME}
          className="flex items-center gap-2.5 select-none"
          aria-label="PANDAI LEARNING – halaman utama"
        >
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#7950F2]"
            aria-hidden
          >
            <span className="text-[13px] font-bold text-white">P</span>
          </span>

          <span className="text-[13px] font-bold text-[#172554]">
            PANDAI LEARNING
          </span>

          <span
            className="hidden text-[13px] font-normal before:mx-2 before:content-['•'] sm:inline text-[#7B8198]"
          >
            Sekolah Masa Depan
          </span>
        </Link>

        {/* ── CENTER : Copyright ── */}
        <p className="text-center text-[12px] text-[#7B8198]">
          &copy; {currentYear} PANDAI LEARNING (panduan digital & literasi AI siswa). Hak Cipta Dilindungi.
        </p>

        {/* ── RIGHT : Footer links ── */}
        <nav aria-label="Tautan footer" className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-[#7B8198] transition-colors hover:text-[#7950F2]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
