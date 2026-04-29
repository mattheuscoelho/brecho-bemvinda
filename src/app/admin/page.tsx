import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { getAllProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { DeleteProductButton } from "./delete-button";
import { ToggleSoldButton } from "./toggle-sold-button";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";
import type { AdminLog } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Painel Admin" };

const ACTION_LABELS: Record<string, string> = {
  create_product: "Produto criado",
  update_product: "Produto editado",
  delete_product: "Produto excluído",
  update_settings: "Configurações salvas",
};

async function getRecentLogs(): Promise<AdminLog[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("admin_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);
  return (data as AdminLog[]) ?? [];
}

export default async function AdminPage() {
  const [products, logs] = await Promise.all([getAllProducts(), getRecentLogs()]);

  const total = products.length;
  const available = products.filter((p) => p.status === "available").length;
  const sold = products.filter((p) => p.status === "sold").length;

  return (
    <div className="mx-auto max-w-7xl">

      {/* ── Cards de resumo ── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total de peças", value: total, color: "#E87A8C" },
          { label: "Disponíveis", value: available, color: "#7DC4B8" },
          { label: "Vendidas", value: sold, color: "#E8967A" },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-2xl p-6 flex flex-col items-center text-center"
            style={{
              background: "#fff",
              boxShadow: "0 2px 10px rgba(180,100,80,0.07)",
              animation: `slide-up 0.4s ease-out ${i * 60}ms both`,
            }}
          >
            <span className="font-display text-[40px] font-normal leading-none" style={{ color: stat.color }}>
              {stat.value}
            </span>
            <span className="font-body text-[13px] text-[#b08880] mt-2">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── Header acervo ── */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-display text-[22px] text-foreground">Acervo</h1>
        <Link
          href="/admin/novo"
          className="flex items-center gap-2 px-5 py-2.5 rounded-[26px] font-body text-[14px] font-bold text-white no-underline transition-all duration-200 hover:scale-[1.05]"
          style={{ background: "#E87A8C", boxShadow: "0 4px 16px rgba(232,122,140,0.3)" }}
        >
          <Plus className="h-4 w-4" />
          Nova peça
        </Link>
      </div>

      {/* ── Lista de produtos ── */}
      {products.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#f0e4dc] bg-white p-16 text-center">
          <span className="text-[48px] block mb-4">🌸</span>
          <p className="font-display italic text-[16px] text-[#c4a898]">
            Nenhuma peça cadastrada ainda
          </p>
          <Link href="/admin/novo" className="mt-4 inline-block">
            <span className="font-body text-[14px] text-rosa underline">Cadastrar primeira peça</span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => {
            const category = product.categories as { name: string; slug: string } | null;
            const isSold = product.status === "sold";
            const isReserved = product.status === "reserved";
            const coverImage = product.product_images
              .slice()
              .sort((a, b) => a.display_order - b.display_order)[0]?.url ?? null;

            return (
              <div
                key={product.id}
                className="flex items-stretch rounded-2xl bg-white overflow-hidden"
                style={{
                  boxShadow: "0 2px 10px rgba(180,100,80,0.07)",
                  opacity: isSold ? 0.75 : 1,
                }}
              >
                {/* Thumbnail */}
                <div className="relative shrink-0 w-24 h-24 self-center m-3 rounded-xl overflow-hidden">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{
                        background: "repeating-linear-gradient(135deg,#f5e8e0 0,#f5e8e0 5px,#ede0d8 5px,#ede0d8 10px)",
                      }}
                    >
                      <span className="text-2xl">🌸</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 py-4 pr-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-display text-[16px] text-foreground leading-snug">
                      {product.name}
                    </p>
                    {isSold && (
                      <span
                        className="font-body text-[11px] px-2.5 py-0.5 rounded-full shrink-0"
                        style={{ background: "#f0e4dc", color: "#8a6a60" }}
                      >
                        Vendida
                      </span>
                    )}
                    {isReserved && (
                      <span
                        className="font-body text-[11px] px-2.5 py-0.5 rounded-full shrink-0"
                        style={{ background: "#fde8d8", color: "#c06030" }}
                      >
                        Reservada
                      </span>
                    )}
                  </div>

                  {category && (
                    <p className="font-body text-[11px] uppercase tracking-[1px] text-verde-agua font-bold mt-1">
                      {category.name}
                    </p>
                  )}

                  <p className="font-script text-[22px] text-rosa mt-1">
                    {formatPrice(product.price)}
                  </p>
                </div>

                {/* Ações */}
                <div
                  className="flex flex-col shrink-0 self-stretch border-l"
                  style={{ borderColor: "#f0e4dc", minWidth: 52 }}
                >
                  {/* Editar */}
                  <Link
                    href={`/admin/editar/${product.id}`}
                    className="flex-1 flex items-center justify-center text-[18px] transition-colors hover:bg-[#fef0f3] no-underline"
                    aria-label="Editar"
                    title="Editar"
                  >
                    ✏️
                  </Link>

                  <div className="w-full h-px" style={{ background: "#f0e4dc" }} />

                  {/* Marcar vendida / desfazer */}
                  <ToggleSoldButton
                    productId={product.id}
                    productName={product.name}
                    isSold={isSold}
                  />

                  <div className="w-full h-px" style={{ background: "#f0e4dc" }} />

                  {/* Excluir */}
                  <div className="flex-1 flex items-center justify-center">
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Atividade recente ── */}
      {logs.length > 0 && (
        <div className="mt-10">
          <h2 className="font-body text-[13px] font-semibold text-[#b08880] uppercase tracking-[1px] mb-3">
            Atividade recente
          </h2>
          <div className="rounded-2xl bg-white overflow-hidden" style={{ boxShadow: "0 2px 10px rgba(180,100,80,0.07)" }}>
            {logs.map((log, i) => (
              <div
                key={log.id}
                className="flex items-center justify-between px-5 py-3.5 text-[13px]"
                style={{ borderTop: i > 0 ? "1px solid #f0e4dc" : "none" }}
              >
                <span className="text-foreground">
                  {ACTION_LABELS[log.action] ?? log.action}
                  {log.entity_name && (
                    <span className="ml-1.5 text-[#b08880]">— {log.entity_name}</span>
                  )}
                </span>
                <span className="text-[#b08880]/60 shrink-0 ml-4 text-[12px]">
                  {new Date(log.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAB + */}
      <Link
        href="/admin/novo"
        className="fixed bottom-7 right-6 flex items-center justify-center rounded-full text-white text-[28px] no-underline transition-all duration-300 hover:scale-[1.12] hover:rotate-90 z-50"
        style={{
          width: 58,
          height: 58,
          background: "#E87A8C",
          boxShadow: "0 4px 20px rgba(232,122,140,0.4)",
        }}
        aria-label="Nova peça"
      >
        +
      </Link>
    </div>
  );
}
