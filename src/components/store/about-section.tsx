interface AboutSectionProps {
  bio?: string;
  address?: string;
  hours?: string;
  payment?: string;
}

export function AboutSection({ bio, address, hours, payment }: AboutSectionProps) {
  const paymentMethods = payment?.split(",").map((s) => s.trim()).filter(Boolean) || [
    "Cartão de Crédito",
    "Débito",
    "Pix",
  ];

  return (
    <section
      className="relative overflow-hidden flex flex-col md:flex-row gap-14 items-center justify-center text-center px-14 py-14 max-md:px-5 max-md:py-8 max-md:gap-6"
      style={{ background: "#7DC4B8" }}
    >
      {/* Blob decorativo */}
      <div
        className="blob"
        style={{ width: 260, height: 200, top: -70, right: -40, background: "#fff", opacity: 0.15 }}
      />

      {/* Flor decorativa */}
      <svg
        width="60" height="60" viewBox="0 0 60 60"
        className="animate-float-slow"
        style={{ position: "absolute", top: 10, right: 52, opacity: 0.45, pointerEvents: "none" }}
      >
        {[0, 60, 120, 180, 240, 300].map((r) => (
          <ellipse key={r} cx="30" cy="14" rx="10" ry="15" fill="#fff" transform={`rotate(${r},30,30)`} />
        ))}
        <circle cx="30" cy="30" r="8" fill="#F9D56E" />
      </svg>

      <div className="relative z-10 flex-1">
        <p className="font-script text-[42px] text-white mb-[14px] max-md:text-[34px]">
          Sobre a loja
        </p>
        <p
          className="font-body text-[14px] text-[#1a4a44] leading-[1.8] mx-auto"
          style={{ maxWidth: "520px" }}
        >
          {bio ||
            "Inaugurado em março de 2026, o Brechó Bemvinda Poesia e Cia. nasceu do amor por peças únicas, com personalidade e história. Acreditamos que moda sustentável pode ser sofisticada e acessível — cada peça é escolhida com muito carinho."}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-6 max-md:gap-5">
          <div className="group text-center">
            <p className="font-display text-[32px] text-white font-semibold transition-transform duration-300 group-hover:scale-[1.15]" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
              200+
            </p>
            <p className="font-body text-[11px] text-[#1a4a44] mt-0.5">peças no acervo</p>
          </div>
          <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="group text-center">
            <p className="font-display text-[32px] text-white font-semibold transition-transform duration-300 group-hover:scale-[1.15]" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
              2026
            </p>
            <p className="font-body text-[11px] text-[#1a4a44] mt-0.5">inauguração</p>
          </div>
          <div className="w-px self-stretch" style={{ background: "rgba(255,255,255,0.3)" }} />
          <div className="group text-center">
            <p className="font-display text-[32px] text-white font-semibold transition-transform duration-300 group-hover:scale-[1.15]" style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}>
              3×
            </p>
            <p className="font-body text-[11px] text-[#1a4a44] mt-0.5">no cartão</p>
          </div>
        </div>
      </div>
    </section>
  );
}
