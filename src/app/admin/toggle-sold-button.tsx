"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { logAdminAction } from "@/lib/data/admin-logs";

interface ToggleSoldButtonProps {
  productId: string;
  productName: string;
  isSold: boolean;
}

export function ToggleSoldButton({ productId, productName, isSold }: ToggleSoldButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const supabase = createClient();
    const newStatus = isSold ? "available" : "sold";

    const { error } = await supabase
      .from("products")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", productId);

    if (!error) {
      await logAdminAction({
        action: "update_product",
        entity_type: "product",
        entity_id: productId,
        entity_name: productName,
      });
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      aria-label={isSold ? "Marcar como disponível" : "Marcar como vendida"}
      title={isSold ? "Desfazer venda" : "Marcar como vendida"}
      className="flex-1 flex items-center justify-center px-4 text-[18px] transition-colors disabled:opacity-40 cursor-pointer border-none bg-transparent"
      style={{ minHeight: 44 }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = isSold ? "#fce8e4" : "#e0f0ee";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
      }}
    >
      {loading ? "…" : isSold ? "↩️" : "✅"}
    </button>
  );
}
