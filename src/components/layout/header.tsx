import Link from "next/link";
import { Flower2 } from "lucide-react";
import { STORE } from "@/lib/constants";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bege/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Flower2 className="h-6 w-6 text-rosa transition-transform group-hover:rotate-12" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg text-rosa tracking-wide">
              {STORE.name}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              {STORE.tagline}
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="/sobre"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sobre
          </Link>
        </nav>
      </div>
    </header>
  );
}
