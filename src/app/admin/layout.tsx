import Link from "next/link";
import { Eye, Settings } from "lucide-react";
import { AdminLogout } from "./logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ background: "#f5ede8" }}>
      {/* Top bar escura */}
      <header
        className="sticky top-0 z-40"
        style={{ background: "#2A1A16" }}
      >
        <div className="relative flex items-center justify-center px-5" style={{ minHeight: 80, padding: "20px 20px" }}>
          {/* Wordmark centralizado */}
          <Link href="/admin" className="flex flex-col items-center">
            <span className="font-display text-[13px] uppercase tracking-[2px] text-[#b08880] leading-none">
              Brechó
            </span>
            <span className="font-script text-[32px] text-rosa" style={{ lineHeight: 1 }}>
              Bemvinda Poesia
            </span>
            <span className="font-display italic text-[13px] text-[#b08880] leading-none" style={{ marginTop: "2px" }}>
              & Cia.
            </span>
          </Link>

          {/* Botões de ação */}
          <div className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-white/10"
              aria-label="Ver loja"
            >
              <Eye className="h-4 w-4" style={{ color: "#d4a898" }} />
            </Link>
            <Link
              href="/admin/configuracoes"
              className="flex items-center justify-center w-9 h-9 rounded-full transition-colors hover:bg-white/10"
              aria-label="Configurações"
            >
              <Settings className="h-4 w-4" style={{ color: "#d4a898" }} />
            </Link>
            <div
              className="flex items-center px-3 py-1.5 rounded-full text-[12px] font-body text-[#d4a898] cursor-pointer transition-colors hover:bg-white/15"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <AdminLogout />
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-6 py-8">{children}</main>
    </div>
  );
}
