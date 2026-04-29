"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const BACKOFF_SECONDS = [0, 0, 0, 10, 30, 60];

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
        if (s <= 1) { clearInterval(cooldownRef.current!); return 0; }
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
        setError(`Muitas tentativas. Aguarde ${wait}s.`);
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
    <div
      className="flex min-h-dvh items-center justify-center px-4"
      style={{ background: "#FAF0E8" }}
    >
      <div className="w-full max-w-sm">
        {/* Wordmark */}
        <div className="mb-10 text-center flex flex-col items-center">
          <span className="font-display text-[10px] uppercase tracking-[2.5px] text-[#b08880] leading-none">
            Brechó
          </span>
          <span className="font-script text-[40px] text-rosa leading-none" style={{ lineHeight: 0.9 }}>
            Bemvinda Poesia
          </span>
          <span className="font-display italic text-[10px] text-[#b08880] leading-none mt-1">
            & Cia.
          </span>
          <p className="mt-4 font-body text-[12px] text-[#b08880]">
            Acesso restrito à administração
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-body text-[12px] font-semibold text-[#8a6a60] uppercase tracking-[0.5px]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl border font-body text-[14px] text-foreground placeholder:text-[#b08880]/60 outline-none transition-all focus:border-rosa"
              style={{ background: "#fff", borderColor: "#f0e4dc" }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-body text-[12px] font-semibold text-[#8a6a60] uppercase tracking-[0.5px]">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl border font-body text-[14px] text-foreground placeholder:text-[#b08880]/60 outline-none transition-all focus:border-rosa"
              style={{ background: "#fff", borderColor: "#f0e4dc" }}
            />
          </div>

          {error && (
            <p className="font-body text-[13px] text-destructive text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || cooldown > 0}
            className="mt-2 w-full py-3 rounded-[26px] font-body text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer border-none"
            style={{
              background: "#E87A8C",
              boxShadow: "0 4px 16px rgba(232,122,140,0.3)",
            }}
          >
            {loading ? "Entrando..." : cooldown > 0 ? `Aguarde ${cooldown}s` : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
