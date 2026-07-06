import { loginAction } from "@/lib/admin/actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-primary items-center justify-center mb-4">
            <span className="text-primary-foreground text-xl font-bold">T</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Админ-панель</h1>
          <p className="text-sm text-muted-foreground mt-1">Turistcenter Kyrgyzstan</p>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
          <form action={loginAction} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Пароль
              </label>
              <input
                type="password"
                name="password"
                required
                placeholder="Введите пароль"
                className="w-full px-3 py-2.5 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                Неверный пароль. Попробуйте снова.
              </p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              Войти
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
