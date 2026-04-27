import Link from "next/link";
import { Flower2, Settings } from "lucide-react";
import { STORE } from "@/lib/constants";
import { AdminLogout } from "./logout-button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-bege">
      {/* Header admin — compacto, mobile-first */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <Flower2 className="h-5 w-5 text-rosa" />
            <span className="font-display text-sm text-rosa">Painel</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/configuracoes"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Configurações"
            >
              <Settings className="h-4 w-4" />
            </Link>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Ver loja
            </Link>
            <AdminLogout />
          </div>
        </div>
      </header>

      <main className="flex-1 px-4 py-6">{children}</main>
    </div>
  );
}
