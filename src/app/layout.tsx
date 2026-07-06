import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://turistcenter.vercel.app"),
  title: {
    default: "Turistcenter — Туризм в Кыргызстане",
    template: "%s | Turistcenter",
  },
  description:
    "Откройте для себя Кыргызстан: интерактивная карта достопримечательностей, туры, отзывы туристов и ИИ-ассистент для планирования поездок.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Turistcenter",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
