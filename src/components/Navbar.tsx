"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { Menu, X, Map } from "lucide-react";
import { Button } from "@/components/ui/button";

const locales = [
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
  { code: "ky", label: "KY" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t("map"), href: "/#map" as const },
    { label: t("places"), href: "/places" as const },
    { label: t("tours"), href: "/tours" as const },
    { label: t("reviews"), href: "/#reviews" as const },
  ];

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Map className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              TuristCenter
              <span className="text-primary">.kg</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 border border-border rounded-lg p-0.5">
              {locales.map(({ code, label }) => (
                <button
                  key={code}
                  onClick={() => switchLocale(code)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    locale === code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <Button size="sm">{t("plan")}</Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t("menu")}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {/* Mobile locale switcher */}
          <div className="flex gap-1 pt-2 px-3">
            {locales.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => { switchLocale(code); setMenuOpen(false); }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors border ${
                  locale === code
                    ? "bg-primary text-primary-foreground border-primary"
                    : "text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="pt-2">
            <Button size="sm" className="w-full">{t("plan")}</Button>
          </div>
        </div>
      )}
    </header>
  );
}
