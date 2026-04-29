import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProductWithImages } from "@/lib/supabase/types";

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
  const isSold = product.status === "sold";
  const category = (product as { categories?: { name: string; slug: string } | null }).categories;
  const coverImage = product.product_images
    .slice()
    .sort((a, b) => a.display_order - b.display_order)[0]?.url ?? null;

  return (
    <div className="product-card-wrapper relative bg-white overflow-hidden rounded-xl shadow-sm">
      <Link href={`/p/${product.id}`} className="block" style={{ aspectRatio: "3/4" }}>
        <div className="relative w-full h-full overflow-hidden" style={{ aspectRatio: "3/4" }}>
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
              <span className="text-3xl">🌸</span>
            </div>
          )}

          {isSold && (
            <div
              className="absolute inset-0 flex items-center justify-center z-10"
              style={{ background: "rgba(250,240,232,0.82)", backdropFilter: "blur(2px)" }}
            >
              <span className="font-display italic text-[18px] text-[#8a6a60]">vendido</span>
            </div>
          )}

          {product.status === "reserved" && (
            <div className="absolute top-2 right-2 z-10 rounded-full bg-salmao px-2 py-0.5 text-[10px] font-bold text-white">
              Reservado
            </div>
          )}
        </div>
      </Link>

      <div className="px-4 pt-[14px] pb-[18px]">
        {category && (
          <p className="font-body text-[10px] font-bold uppercase tracking-[1px] text-verde-agua mb-1">
            {category.name}
          </p>
        )}
        <p className="font-display text-[15px] text-[#3a2420] leading-snug mb-2">
          {product.name}
        </p>
        <p className="font-script text-[24px] text-rosa">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
