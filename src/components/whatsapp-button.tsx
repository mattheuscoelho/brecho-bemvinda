"use client";

import { formatWhatsAppLink } from "@/lib/utils";
import { STORE } from "@/lib/constants";

interface WhatsAppButtonProps {
  productName: string;
  price?: number;
  phone?: string;
  className?: string;
}

export function WhatsAppButton({ productName, price, phone, className }: WhatsAppButtonProps) {
  const whatsapp = phone || STORE.whatsapp;
  const priceFormatted = price
    ? new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price / 100)
    : null;
  const message = `Olá! Vi o catálogo do ${STORE.name} e tenho interesse na peça *${productName}*${priceFormatted ? ` (${priceFormatted})` : ""}. Ainda está disponível?`;

  return (
    <a
      href={formatWhatsAppLink(whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 font-body text-[14px] font-bold text-white rounded-[26px] px-7 py-[13px] no-underline transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] active:scale-[0.97] ${className ?? ""}`}
      style={{
        background: "#E87A8C",
        boxShadow: "0 4px 16px rgba(232,122,140,0.3)",
        transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      💬 Tenho interesse
    </a>
  );
}
