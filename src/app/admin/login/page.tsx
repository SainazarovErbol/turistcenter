import { loginAction } from "@/lib/admin/actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#f8f9fa", fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <div className="w-full max-w-xs">
        {/* Logo */}
        <div className="text-center mb-8">
          <div
            className="inline-flex w-11 h-11 rounded-xl items-center justify-center mb-3 text-white font-bold text-lg"
            style={{ background: "#0f766e" }}
          >
            T
          </div>
          <h1 className="text-xl font-semibold" style={{ color: "#111827" }}>
            Панель управления
          </h1>
          <p className="text-sm mt-1" style={{ color: "#6b7280" }}>
            Turistcenter Kyrgyzstan
          </p>
        </div>

        {/* Form */}
        <div
          className="rounded-2xl p-6"
          style={{ background: "#fff", border: "1px solid #e5e7eb", boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
        >
          <form action={loginAction} className="space-y-4">
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: "#374151" }}
              >
                Пароль
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                autoFocus
                className="w-full px-3 py-2.5 text-sm rounded-lg outline-none transition-shadow"
                style={{
                  border: "1px solid #d1d5db",
                  background: "#fff",
                  color: "#111827",
                }}
              />
            </div>

            {error && (
              <p
                className="text-sm px-3 py-2 rounded-lg"
                style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
              >
                Неверный пароль
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 text-sm font-medium rounded-lg text-white transition-opacity hover:opacity-90"
              style={{ background: "#0f766e" }}
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
