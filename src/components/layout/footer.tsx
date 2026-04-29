import { STORE } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="flex flex-col items-center gap-4 px-14 py-8 text-center max-md:px-5 max-md:py-6"
      style={{ background: "#2A1A16" }}
    >
      {/* Wordmark */}
      <div className="flex flex-col items-center">
        <span className="font-display text-[12px] uppercase tracking-[2px] text-[#b08880] leading-none">
          Brechó
        </span>
        <span className="font-script text-[30px] text-rosa-claro leading-none" style={{ lineHeight: 1.1 }}>
          Bemvinda Poesia
        </span>
        <span className="font-display italic text-[12px] text-[#b08880] leading-none" style={{ marginTop: "2px" }}>
          & Cia.
        </span>
      </div>

      {/* Endereço e horário */}
      <p className="font-body text-[12px] text-[#b08880] leading-relaxed">
        {STORE.address}<br />
        {STORE.hours}
      </p>

      {/* Badges de pagamento */}
      <div className="flex flex-wrap justify-center gap-2">
        {["Cartão de Crédito", "Débito", "Pix"].map((method) => (
          <span
            key={method}
            className="text-[11px] text-[#d4a898] px-[14px] py-[5px] rounded-xl border transition-all duration-200 hover:-translate-y-0.5 cursor-default"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            {method}
          </span>
        ))}
      </div>
    </footer>
  );
}
