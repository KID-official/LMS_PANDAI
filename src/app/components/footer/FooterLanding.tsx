import Link from 'next/link';

export function FooterLanding() {
  const linksUtama = [
    { label: 'Pusat Pengetahuan', href: '/knowledge' },
    { label: 'Program Unggulan', href: '#' },
    { label: 'Portal LMS', href: '/login' },
  ];

  const linksTataKelola = [
    { label: 'Kebijakan Privasi', href: '#' },
    { label: 'Pedoman Etik AI', href: '#' },
    { label: 'Syarat & Ketentuan', href: '#' },
  ];

  return (
    <footer className="w-full bg-white border-t border-outline/30 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo & Description */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-[15px] font-bold text-white shadow-sm">
                PL
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-bold leading-tight text-heading">
                  PANDAI LEARNING
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  Inisiatif Pengmas Universitas Airlangga
                </span>
              </div>
            </div>
            <p className="text-[13px] text-body leading-relaxed max-w-md">
              Platform akselerasi literasi kecerdasan buatan terpadu untuk pendidik, mahasiswa, dan sivitas akademika Universitas Airlangga dan komunitas pembelajar Indonesia.
            </p>
          </div>

          {/* Tautan Utama */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-bold text-heading">Tautan Utama</h4>
            <ul className="flex flex-col gap-3">
              {linksUtama.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-body hover:text-primary transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tata Kelola */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-bold text-heading">Tata Kelola</h4>
            <ul className="flex flex-col gap-3">
              {linksTataKelola.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[13px] text-body hover:text-primary transition-colors duration-150">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-outline/30 pt-8 text-[12px] text-muted-foreground">
          <p>© {new Date().getFullYear()} PANDAI LEARNING. Pengabdian Kepada Masyarakat (Pengmas) Universitas Airlangga. Hak cipta dilindungi.</p>
          <p className="font-semibold text-heading">Surabaya, Jawa Timur, Indonesia</p>
        </div>
      </div>
    </footer>
  );
}
