"use client";

import { MessageCircle } from "lucide-react";
import { formatWhatsAppLink } from "@/lib/utils";
import { STORE } from "@/lib/constants";
import { Button } from "./ui/button";

interface WhatsAppButtonProps {
  productName: string;
  phone?: string;
  className?: string;
}

export function WhatsAppButton({ productName, phone, className }: WhatsAppButtonProps) {
  const whatsapp = phone || STORE.whatsapp;
  const message = `Olá! Tenho interesse na peça "${productName}" que vi no catálogo da ${STORE.name}. Ainda está disponível?`;

  return (
    <Button
      variant="primary"
      size="lg"
      className={className}
      onClick={() => window.open(formatWhatsAppLink(whatsapp, message), "_blank")}
    >
      <MessageCircle className="h-5 w-5" />
      Tenho interesse
    </Button>
  );
}
