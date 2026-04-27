"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Flower2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BACKOFF_SECONDS = [0, 0, 0, 10, 30, 60]; // após 3 falhas: 10s, 30s, 60s

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [failures, setFailures] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cooldown <= 0) return;
    cooldownRef.current = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) {
          clearInterval(cooldownRef.current!);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(cooldownRef.current!);
  }, [cooldown]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cooldown > 0) return;
    setError("");
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      const newFailures = failures + 1;
      setFailures(newFailures);
      const wait = BACKOFF_SECONDS[Math.min(newFailures, BACKOFF_SECONDS.length - 1)];
      if (wait > 0) {
        setCooldown(wait);
        setError(`Muitas tentativas. Aguarde ${wait}s antes de tentar novamente.`);
      } else {
        setError("Email ou senha incorretos.");
      }
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bege px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Flower2 className="mx-auto mb-3 h-8 w-8 text-rosa" />
          <h1 className="font-display text-xl text-foreground">Painel Admin</h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Acesso restrito à administração da loja
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            autoComplete="email"
          />

          <Input
            id="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            autoComplete="current-password"
          />

          {error && (
            <p className="text-sm text-destructive text-center">{error}</p>
          )}

          <Button type="submit" disabled={loading || cooldown > 0} className="mt-2">
            {loading ? "Entrando..." : cooldown > 0 ? `Aguarde ${cooldown}s` : "Entrar"}
          </Button>
        </form>
      </div>
    </div>
  );
}
