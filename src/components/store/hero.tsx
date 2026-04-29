import { STORE } from "@/lib/constants";

interface HeroProps {
  whatsapp?: string;
}

const FlowerRosa = ({ style }: { style: React.CSSProperties }) => (
  <svg width="90" height="90" viewBox="0 0 90 90" style={{ position: "absolute", pointerEvents: "none", ...style }} className="animate-float">
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="45" cy="25" rx="15" ry="22" fill="#F2B8B0" transform={`rotate(${r},45,45)`} />
    ))}
    <circle cx="45" cy="45" r="12" fill="#F9D56E" />
  </svg>
);

const FlowerTeal = ({ style }: { style: React.CSSProperties }) => (
  <svg width="70" height="70" viewBox="0 0 70 70" style={{ position: "absolute", pointerEvents: "none", ...style }} className="animate-float-slow">
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="35" cy="18" rx="12" ry="17" fill="#7DC4B8" transform={`rotate(${r},35,35)`} />
    ))}
    <circle cx="35" cy="35" r="9" fill="#F9D56E" />
  </svg>
);

const FlowerSalmao = ({ style }: { style: React.CSSProperties }) => (
  <svg width="56" height="56" viewBox="0 0 56 56" style={{ position: "absolute", pointerEvents: "none", ...style }} className="animate-float">
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="28" cy="14" rx="9" ry="13" fill="#E8967A" transform={`rotate(${r},28,28)`} />
    ))}
    <circle cx="28" cy="28" r="7" fill="#F9D56E" />
  </svg>
);

const FlowerVerde = ({ style }: { style: React.CSSProperties }) => (
  <svg width="44" height="44" viewBox="0 0 44 44" style={{ position: "absolute", pointerEvents: "none", ...style }} className="animate-float-slow">
    {[0, 60, 120, 180, 240, 300].map((r) => (
      <ellipse key={r} cx="22" cy="11" rx="7" ry="10" fill="#A8C89A" transform={`rotate(${r},22,22)`} />
    ))}
    <circle cx="22" cy="22" r="6" fill="#F9D56E" />
  </svg>
);

const Sparkle = ({ size, style, color }: { size: number; style: React.CSSProperties; color: string }) => (
  <svg
    width={size} height={size} viewBox="0 0 20 20"
    style={{ position: "absolute", pointerEvents: "none", ...style }}
    className="animate-twinkle"
  >
    <path d="M10 0 L11.5 8.5 L20 10 L11.5 11.5 L10 20 L8.5 11.5 L0 10 L8.5 8.5 Z" fill={color} opacity="0.8" />
  </svg>
);

export function Hero({ whatsapp }: HeroProps) {
  const phone = (whatsapp || STORE.whatsapp).replace(/\D/g, "");

  return (
    <>
      {/* ── Hero Desktop ── */}
      <section
        className="relative overflow-hidden flex items-center justify-center max-md:hidden"
        style={{ background: "#FAF0E8", minHeight: "420px", padding: "60px 56px" }}
      >
        {/* Blobs decorativos */}
        <div className="blob" style={{ width: 400, height: 320, top: -120, left: -100, background: "#F2B8B0", opacity: 0.42 }} />
        <div className="blob" style={{ width: 300, height: 240, bottom: -80, right: -60, background: "#7DC4B8", opacity: 0.28, borderRadius: "40% 60% 30% 70%/60% 40% 70% 30%" }} />
        <div className="blob" style={{ width: 220, height: 180, top: -30, right: 180, background: "#E8967A", opacity: 0.2, borderRadius: "60% 40% 50% 50%/40% 60% 50% 50%" }} />

        {/* Flores */}
        <FlowerRosa style={{ top: 12, left: 50, opacity: 0.75 }} />
        <FlowerTeal style={{ bottom: 8, left: 180, opacity: 0.65 }} />
        <FlowerSalmao style={{ top: 22, right: 110, opacity: 0.8 }} />
        <FlowerVerde style={{ bottom: 14, right: 190, opacity: 0.6 }} />

        {/* Sparkles */}
        <Sparkle size={14} style={{ top: 38, left: 290 }} color="#E87A8C" />
        <Sparkle size={10} style={{ top: 70, right: 280 }} color="#7DC4B8" />
        <Sparkle size={8} style={{ bottom: 36, left: 380 }} color="#E8967A" />
        <Sparkle size={16} style={{ top: 16, right: 370 }} color="#F2B8B0" />

        {/* Conteúdo */}
        <div className="relative z-10 text-center" style={{ maxWidth: "560px" }}>
          <p className="font-display italic text-[13px] text-[#b08880] uppercase tracking-[3px] mb-[14px]">
            primavera · 2026
          </p>
          <h1 className="font-display text-[68px] text-escuro font-normal" style={{ lineHeight: 0.95, letterSpacing: "-1px" }}>
            Peças únicas
          </h1>
          <p className="font-script text-[56px] text-rosa" style={{ lineHeight: 1.1, margin: "4px 0 10px" }}>
            com história
          </p>
          <p className="font-body text-[14px] text-[#8a6a60] leading-[1.7] mb-[26px]">
            Moda vintage selecionada com carinho<br />no coração do Centro.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="#catalogo"
              className="font-body text-[13px] font-bold text-white px-7 py-[11px] rounded-[26px] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.97]"
              style={{
                background: "#E87A8C",
                boxShadow: "0 4px 16px rgba(232,122,140,0.3)",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              Explorar o acervo
            </a>
            <a
              href={`https://wa.me/${phone}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-[13px] font-bold text-rosa px-7 py-[11px] rounded-[26px] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.03] hover:bg-rosa hover:text-white active:scale-[0.97]"
              style={{
                background: "#fff",
                border: "1.5px solid #E87A8C",
                transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
              }}
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Hero Card Mobile ── */}
      <div
        className="hidden max-md:block mx-[14px] mt-3 mb-5 rounded-2xl overflow-hidden relative"
        style={{ background: "linear-gradient(135deg, #F2B8B0, #E8967A)", padding: "24px 20px" }}
      >
        <svg
          width="60" height="60" viewBox="0 0 60 60"
          className="animate-float"
          style={{ position: "absolute", top: -8, right: 8, opacity: 0.45, pointerEvents: "none" }}
        >
          {[0, 60, 120, 180, 240, 300].map((r) => (
            <ellipse key={r} cx="30" cy="14" rx="10" ry="15" fill="#fff" transform={`rotate(${r},30,30)`} />
          ))}
          <circle cx="30" cy="30" r="8" fill="#F9D56E" />
        </svg>

        <div className="relative z-10">
          <p className="font-script text-[28px] text-white leading-snug">
            Peças únicas<br />esperando por você ✦
          </p>
          <p className="font-body text-[11px] text-[#6a2a24] mt-2">
            {STORE.address} · {STORE.hours.split(",")[1]?.trim() || STORE.hours}
          </p>
          <a
            href={`https://wa.me/${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-[14px] bg-white text-rosa font-body font-bold text-[12px] px-5 py-2 rounded-[20px] no-underline transition-all duration-200 hover:scale-[1.05]"
          >
            💬 Falar no WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
