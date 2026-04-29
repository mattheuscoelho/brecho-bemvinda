"use client";

import { formatWhatsAppLink } from "@/lib/utils";
import { STORE } from "@/lib/constants";

interface WhatsAppFabProps {
  whatsapp?: string;
}

export function WhatsAppFab({ whatsapp }: WhatsAppFabProps) {
  const phone = whatsapp || STORE.whatsapp;
  const message = `Olá! Vim pelo catálogo online do ${STORE.name} e gostaria de saber mais sobre as peças disponíveis 🌸`;

  return (
    <button
      onClick={() => window.open(formatWhatsAppLink(phone, message), "_blank")}
      aria-label="Falar no WhatsApp"
      className="whatsapp-fab-pulse fixed z-50 flex items-center justify-center rounded-full border-none cursor-pointer text-[26px] animate-bob hover:animate-none hover:scale-[1.15] transition-transform duration-300 max-md:bottom-5 max-md:right-5 max-md:w-[52px] max-md:h-[52px]"
      style={{
        bottom: "28px",
        right: "28px",
        width: "56px",
        height: "56px",
        background: "#25D366",
        boxShadow: "0 4px 18px rgba(37,211,102,0.45)",
      }}
    >
      💬
    </button>
  );
}
