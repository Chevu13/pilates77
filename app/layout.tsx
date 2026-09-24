import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const sans = Jost({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000"
  ),
  title: "Pilates Studio 77 Niš — Reformer Pilates i presoterapija",
  description:
    "Reformer Pilates i presoterapija u prijatnom, intimnom prostoru u Nišu. Sertifikovani STOTT instruktor. Dragiše Cvetkovića 18/9, Niš. Zakaži svoj termin online.",
  keywords: ["pilates Niš", "reformer pilates Niš", "presoterapija Niš", "Studio 77", "STOTT pilates"],
  openGraph: {
    title: "Pilates Studio 77 Niš",
    description: "Reformer Pilates i presoterapija u Nišu. Zakaži svoj termin online.",
    locale: "sr_RS",
    type: "website",
    images: [{ url: "/media/hero-poster.jpg", width: 720, height: 1280 }],
  },
  icons: { icon: "/media/logo-mark.png" },
};

export const viewport: Viewport = {
  themeColor: "#F6EFE8",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr-Latn" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {children}
      </body>
    </html>
  );
}
