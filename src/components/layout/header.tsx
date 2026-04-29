import Link from "next/link";

export function Header() {
  return (
    <header
      className="sticky top-0 z-40 border-b border-[#f0e4dc] backdrop-blur-sm"
      style={{ background: "#fff8f4" }}
    >
      <nav className="flex items-center justify-between px-14 py-[18px] max-md:px-5 max-md:py-3">
        {/* Esquerda */}
        <Link
          href="/"
          className="nav-link-underline font-display text-[13px] uppercase tracking-[2px] text-[#b08880] hover:text-rosa transition-colors max-md:hidden"
        >
          Catálogo
        </Link>

        {/* Wordmark centralizado */}
        <div className="flex flex-col items-center">
          <span
            className="font-display text-[10px] uppercase tracking-[2.5px] text-[#b08880] leading-none"
            style={{ marginBottom: "2px" }}
          >
            Brechó
          </span>
          <Link
            href="/"
            className="font-script text-[32px] text-rosa leading-none hover:text-[#e06478] transition-colors max-md:text-[26px]"
            style={{ lineHeight: 0.9 }}
          >
            Bemvinda Poesia
          </Link>
          <span
            className="font-display italic text-[10px] uppercase tracking-[3px] text-[#b08880] leading-none"
            style={{ marginTop: "3px" }}
          >
            & Cia.
          </span>
        </div>

        {/* Direita */}
        <Link
          href="/sobre"
          className="nav-link-underline font-display text-[13px] uppercase tracking-[2px] text-[#b08880] hover:text-rosa transition-colors max-md:hidden"
        >
          Sobre nós
        </Link>

        {/* Mobile: espaço vazio para balancear o wordmark */}
        <div className="hidden max-md:block w-[72px]" />
      </nav>
    </header>
  );
}
