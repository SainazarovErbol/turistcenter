import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import "mapbox-gl/dist/mapbox-gl.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turistcenter.kg"),
  title: {
    default: "TuristCenter.kg — Путешествия по Кыргызстану",
    template: "%s — TuristCenter.kg",
  },
  description:
    "Откройте красоту Кыргызстана: интерактивная карта достопримечательностей, лучшие туры, отзывы туристов.",
  keywords: "Кыргызстан, туризм, Иссык-Куль, туры, достопримечательности, путешествия",
  openGraph: {
    title: "TuristCenter.kg — Путешествия по Кыргызстану",
    description: "Интерактивная карта, лучшие туры и достопримечательности Кыргызстана",
    url: "https://turistcenter.kg",
    siteName: "TuristCenter.kg",
    locale: "ru_RU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TuristCenter.kg",
    description: "Путешествия по Кыргызстану",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
