import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Вхід для адміністраторів — UFO STEAM HUB" },
      {
        name: "description",
        content: "Службова сторінка входу для команди UFO STEAM HUB до списку реєстрацій.",
      },
      { property: "og:title", content: "Вхід для адміністраторів — UFO STEAM HUB" },
      { property: "og:description", content: "Службова сторінка входу команди UFO STEAM HUB." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin/demo-day" });
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin/demo-day" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/auth" },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/admin/demo-day" });
        else toast.success("Перевірте пошту, щоб підтвердити акаунт.");
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ufo-cream px-4 py-20">
      <div className="w-full max-w-sm rounded-3xl border-2 border-primary/10 bg-background p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-primary">Вхід для команди</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Доступ до списку реєстрацій UFO DEMO DAY.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <Input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            required
            minLength={6}
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {mode === "signin" ? "Увійти" : "Створити акаунт"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-sm text-primary underline-offset-4 hover:underline"
        >
          {mode === "signin" ? "Немає акаунта? Зареєструватись" : "Уже маю акаунт — увійти"}
        </button>
      </div>
    </main>
  );
}
