import { STORE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
          <div className="flex items-center gap-2">
            <span className="text-rosa-claro text-lg leading-none select-none" aria-hidden>✿</span>
            <span className="font-script text-lg text-rosa">
              {STORE.name}
            </span>
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            <p>{STORE.address}</p>
            <p>{STORE.hours}</p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} {STORE.name}. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
