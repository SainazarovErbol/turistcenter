import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";
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
  robots: { index: true, follow: true },
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "ru" | "en" | "ky")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
