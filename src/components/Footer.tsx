import { Link } from "@/i18n/navigation";
import { Map, Mail, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("footer");

  const links: Record<string, string[]> = {
    [t("destinations")]: t.raw("destinationLinks") as string[],
    [t("forTourists")]: t.raw("touristLinks") as string[],
    [t("platform")]: t.raw("platformLinks") as string[],
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Map className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-base font-semibold">
                TuristCenter<span className="text-primary">.kg</span>
              </span>
            </Link>
            <p className="text-sm text-background/60 leading-relaxed mb-5">{t("description")}</p>
            <div className="flex gap-3">
              {["Instagram", "Telegram"].map((name) => (
                <a key={name} href="#" className="flex h-8 items-center justify-center rounded-lg bg-background/10 hover:bg-background/20 transition-colors px-3">
                  <span className="text-xs text-background/70 font-medium">{name}</span>
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-background mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm text-background/60 hover:text-background transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-5">
            <a href="mailto:info@turistcenter.kg" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
              <Mail className="h-3.5 w-3.5" />
              info@turistcenter.kg
            </a>
            <a href="tel:+996700000000" className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors">
              <Phone className="h-3.5 w-3.5" />
              +996 700 000 000
            </a>
          </div>
          <p className="text-xs text-background/40">{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
