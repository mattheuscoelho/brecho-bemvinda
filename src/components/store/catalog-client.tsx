"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { formatWhatsAppLink } from "@/lib/utils";
import { STORE } from "@/lib/constants";

interface ProductImage {
  id: string;
  url: string;
  display_order: number;
}

interface Category {
  name: string;
  slug: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  status: string;
  size?: string | null;
  categories: Category | null;
  product_images: ProductImage[];
}

interface CatalogClientProps {
  products: Product[];
  categories: Array<{ id: string; name: string; slug: string }>;
  whatsapp?: string;
}

export function CatalogClient({ products, categories, whatsapp }: CatalogClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("Todos");

  const availableCategories = categories.filter((cat) =>
    products.some(
      (p) => p.status === "available" && p.categories?.slug === cat.slug
    )
  );

  const filtered =
    activeCategory === "Todos"
      ? products
      : products.filter((p) => p.categories?.name === activeCategory);

  const phone = whatsapp || STORE.whatsapp;

  function whatsappLink(productName: string, price: number) {
    const priceFormatted = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(price / 100);
    const message = `Olá! Vi o catálogo do ${STORE.name} e tenho interesse na peça *${productName}* (${priceFormatted}). Ainda está disponível?`;
    return formatWhatsAppLink(phone, message);
  }

  return (
    <div id="catalogo">
      {/* ── Filter bar ── */}
      <div
        className="flex items-center gap-2 px-14 py-[14px] max-md:px-4 max-md:py-3 max-md:overflow-x-auto max-md:flex-nowrap filter-scroll"
        style={{ background: "#F2B8B0", justifyContent: "center" }}
      >
        {["Todos", ...availableCategories.map((c) => c.name)].map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="shrink-0 px-[18px] py-[6px] rounded-[20px] border-[1.5px] font-body text-[12px] font-bold tracking-[0.3px] transition-all duration-200 max-md:px-[14px] cursor-pointer"
              style={{
                background: isActive ? "#E87A8C" : "transparent",
                color: isActive ? "#fff" : "#6a2a24",
                borderColor: isActive ? "#E87A8C" : "transparent",
                boxShadow: isActive ? "0 3px 10px rgba(232,122,140,0.35)" : "none",
                transform: isActive ? "scale(1.05)" : "scale(1)",
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Product grid ── */}
      <div
        className="grid grid-cols-2 gap-[10px] bg-transparent px-[14px] pb-6 md:grid-cols-3 md:gap-px md:bg-[#ddd0c8] md:px-0 md:pb-0 lg:grid-cols-4"
      >

        {filtered.length === 0 ? (
          <div className="col-span-4 flex flex-col items-center justify-center gap-3 py-20 bg-card">
            <span className="text-4xl">🌸</span>
            <p className="font-display italic text-[16px] text-[#c4a898]">
              Nenhuma peça nessa categoria ainda
            </p>
          </div>
        ) : (
          filtered.map((product) => {
            const isSold = product.status === "sold";
            const isReserved = product.status === "reserved";
            const coverImage = product.product_images
              .slice()
              .sort((a, b) => a.display_order - b.display_order)[0]?.url ?? null;

            return (
              <div
                key={product.id}
                className="product-card-wrapper relative bg-card overflow-hidden cursor-pointer transition-all duration-300 max-md:rounded-xl max-md:shadow-sm"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {/* Imagem */}
                <Link href={`/p/${product.id}`} className="block relative" style={{ aspectRatio: "3/4" }}>
                  <div
                    className="relative w-full h-full overflow-hidden"
                    style={{ aspectRatio: "3/4" }}
                  >
                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover product-card-img"
                      />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center product-card-img"
                        style={{
                          background:
                            "repeating-linear-gradient(135deg, #f5e8e0 0, #f5e8e0 6px, #ede0d8 6px, #ede0d8 12px)",
                        }}
                      >
                        <span className="text-[32px]">🌸</span>
                      </div>
                    )}

                    {/* Overlay vendido */}
                    {isSold && (
                      <div
                        className="absolute inset-0 flex items-center justify-center z-10"
                        style={{
                          background: "rgba(250,240,232,0.82)",
                          backdropFilter: "blur(2px)",
                        }}
                      >
                        <span className="font-display italic text-[18px] text-[#8a6a60]">
                          vendido
                        </span>
                      </div>
                    )}

                    {/* Badge vendido desktop */}
                    {isSold && (
                      <div
                        className="absolute top-3 right-3 z-20 px-[10px] py-[3px] rounded-[10px] text-[10px] font-bold uppercase tracking-[0.8px] text-white max-md:hidden"
                        style={{
                          background: "rgba(42,26,22,0.72)",
                          backdropFilter: "blur(4px)",
                        }}
                      >
                        Vendido
                      </div>
                    )}

                    {/* Badge reservado */}
                    {isReserved && (
                      <div className="absolute top-2 right-2 z-10 rounded-full bg-salmao px-2 py-0.5 text-[10px] font-bold text-white">
                        Reservado
                      </div>
                    )}
                  </div>
                </Link>

                {/* WhatsApp hover action (desktop only) */}
                {!isSold && (
                  <div
                    className="product-card-overlay absolute bottom-0 left-0 right-0 z-10 text-center px-4 pb-4 max-md:hidden"
                    style={{
                      background: "linear-gradient(to top, rgba(42,26,22,0.85) 0%, transparent 100%)",
                      paddingTop: "40px",
                    }}
                  >
                    <a
                      href={whatsappLink(product.name, product.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block bg-white text-rosa px-5 py-[7px] rounded-2xl font-body text-[11px] font-bold transition-all duration-150 hover:bg-rosa hover:text-white hover:scale-[1.05]"
                    >
                      Perguntar pelo WhatsApp
                    </a>
                  </div>
                )}

                {/* Corpo do card */}
                <div className="px-4 pt-[14px] pb-[18px] max-md:px-3 max-md:pt-[10px] max-md:pb-3">
                  {product.categories && (
                    <p className="font-body text-[10px] font-bold uppercase tracking-[1px] text-verde-agua mb-1">
                      {product.categories.name}
                    </p>
                  )}
                  <p className="font-display text-[15px] text-[#3a2420] leading-snug mb-2 max-md:text-[12px]">
                    {product.name}
                  </p>
                  <p className="font-script text-[24px] text-rosa max-md:text-[19px]">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
