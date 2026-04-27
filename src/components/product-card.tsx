import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { ProductWithImages } from "@/lib/supabase/types";

interface ProductCardProps {
  product: ProductWithImages;
}

export function ProductCard({ product }: ProductCardProps) {
  const isSold = product.status === "sold";
  const coverImage = product.product_images
    .slice()
    .sort((a, b) => a.display_order - b.display_order)[0]?.url ?? null;

  return (
    <Link
      href={`/p/${product.id}`}
      className="group block overflow-hidden rounded-xl bg-card shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <span className="text-3xl">🌸</span>
          </div>
        )}

        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
            <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-foreground">
              Vendido
            </span>
          </div>
        )}

        {product.status === "reserved" && (
          <div className="absolute top-2 right-2 rounded-full bg-salmao px-2 py-0.5 text-[10px] font-medium text-white">
            Reservado
          </div>
        )}

        {product.size && (
          <div className="absolute bottom-2 left-2 rounded bg-foreground/60 px-1.5 py-0.5 text-[10px] font-medium text-white">
            {product.size}
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground line-clamp-1 group-hover:text-rosa transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 font-script text-lg text-rosa">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
