import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { logoutAction } from "@/lib/admin/actions";
import { Star, MapPin, Map, LogOut, LayoutDashboard } from "lucide-react";

export const metadata = { title: "Админ — Turistcenter" };

const navLinks = [
  { href: "/admin/reviews", label: "Отзывы", icon: Star },
  { href: "/admin/places", label: "Места", icon: MapPin },
  { href: "/admin/tours", label: "Туры", icon: Map },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAuth = session?.value === "admin-ok";

  if (!isAuth) redirect("/admin/login");

  return (
    <div className="min-h-screen flex" style={{ background: "#f8f9fa", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Sidebar */}
      <aside className="w-52 shrink-0 flex flex-col" style={{ background: "#fff", borderRight: "1px solid #e5e7eb" }}>
        {/* Logo */}
        <div className="px-4 py-4" style={{ borderBottom: "1px solid #e5e7eb" }}>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold" style={{ background: "#0f766e" }}>
              T
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "#111827", lineHeight: 1 }}>Turistcenter</p>
              <p className="text-xs mt-0.5" style={{ color: "#6b7280" }}>Панель управления</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 space-y-0.5">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
              style={{ color: "#374151" }}
            >
              <Icon className="h-4 w-4 shrink-0" style={{ color: "#9ca3af" }} />
              {label}
            </Link>
          ))}
        </nav>

        {/* Footer nav */}
        <div className="px-3 py-3" style={{ borderTop: "1px solid #e5e7eb" }}>
          <Link
            href="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-colors mb-0.5"
            style={{ color: "#6b7280" }}
          >
            ← На сайт
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm w-full transition-colors"
              style={{ color: "#6b7280" }}
            >
              <LogOut className="h-4 w-4 shrink-0" />
              Выйти
            </button>
          </form>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
