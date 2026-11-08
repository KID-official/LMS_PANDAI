import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const viewport: Viewport = {
  themeColor: "#2563EB",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXTAUTH_URL && !process.env.NEXTAUTH_URL.includes("localhost")
      ? process.env.NEXTAUTH_URL
      : "https://www.pandailearning.com"
  ),
  title: {
    default: "PANDAI LEARNING - Panduan Digital & Literasi AI Siswa",
    template: "%s | PANDAI LEARNING",
  },
  description:
    "Platform Pembelajaran Digital dan Literasi Kecerdasan Buatan (AI) Interaktif untuk Siswa & Pengajar. Pelajari modul etika AI, deteksi deepfake, dan raih sertifikat resmi terverifikasi.",
  applicationName: "PANDAI LEARNING",
  authors: [{ name: "PANDAI LEARNING Team" }],
  generator: "Next.js",
  keywords: [
    "PANDAI LEARNING",
    "LMS AI",
    "Literasi AI Siswa",
    "Panduan Digital & Literasi AI Siswa",
    "Belajar Kecerdasan Buatan",
    "Etika AI Siswa",
    "Deteksi Deepfake",
    "Sertifikat Digital Siswa",
    "E-Learning AI",
  ],
  creator: "PANDAI LEARNING",
  publisher: "PANDAI LEARNING",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.pandailearning.com",
    siteName: "PANDAI LEARNING",
    title: "PANDAI LEARNING - Panduan Digital & Literasi AI Siswa",
    description:
      "Platform edukasi interaktif panduan digital & literasi kecerdasan buatan untuk siswa. Lengkap dengan modul video adaptif, evaluasi kuis, dan e-sertifikat terverifikasi QR Code.",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "Logo PANDAI LEARNING - Panduan Digital & Literasi AI Siswa",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "PANDAI LEARNING - Panduan Digital & Literasi AI Siswa",
    description:
      "Platform edukasi interaktif panduan digital & literasi kecerdasan buatan untuk siswa. Lengkap dengan evaluasi kuis dan e-sertifikat terverifikasi QR Code.",
    images: ["/favicon.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={cn("font-sans", jakarta.variable)}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
