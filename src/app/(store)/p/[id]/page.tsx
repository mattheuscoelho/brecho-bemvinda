import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flower2 } from "lucide-react";
import { getProduct } from "@/lib/data/products";
import { getStoreSettings } from "@/lib/data/settings";
import type { StoreSettings } from "@/lib/supabase/types";
import { formatPrice } from "@/lib/utils";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { PRODUCT_CONDITION_LABELS } from "@/lib/constants";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return {
      title: product.name,
      description: product.description || `${product.name} — Brechó Bemvinda Poesia & Cia`,
    };
  } catch {
    return { title: "Produto não encontrado" };
  }
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  let product;
  let settings: StoreSettings | undefined;
  try {
    product = await getProduct(id);
    settings = await getStoreSettings();
  } catch {
    notFound();
  }

  const category = product.categories as { name: string; slug: string } | null;
  const isSold = product.status === "sold";
  const isReserved = product.status === "reserved";
  const images = product.product_images
    .slice()
    .sort((a, b) => a.display_order - b.display_order);
  const coverImage = images[0]?.url ?? null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <Link
        href={category ? `/c/${category.slug}` : "/"}
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        {category ? category.name : "Voltar"}
      </Link>

      <div className="grid gap-6 sm:grid-cols-2">
        {/* Galeria */}
        <div className="flex flex-col gap-2">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            {coverImage ? (
              <Image
                src={coverImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Flower2 className="h-16 w-16 text-rosa-claro/30" />
              </div>
            )}

            {isSold && (
              <div className="absolute inset-0 flex items-center justify-center bg-foreground/40">
                <span className="rounded-full bg-card px-4 py-1.5 text-sm font-medium">
                  Vendido
                </span>
              </div>
            )}

            {isReserved && (
              <div className="absolute top-3 right-3 rounded-full bg-salmao px-3 py-1 text-xs font-medium text-white">
                Reservado
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <div
                  key={img.id}
                  className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted"
                >
                  <Image
                    src={img.url}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detalhes */}
        <div className="flex flex-col">
          {category && (
            <span className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
              {category.name}
            </span>
          )}

          <h1 className="font-display text-2xl text-foreground">
            {product.name}
          </h1>

          <p className="mt-2 font-display text-2xl text-rosa">
            {formatPrice(product.price)}
          </p>

          {/* Badges: tamanho + condição */}
          {(product.size || product.condition) && (
            <div className="mt-3 flex flex-wrap gap-2">
              {product.size && (
                <span className="rounded-full border border-border px-3 py-1 text-xs text-foreground">
                  Tamanho {product.size}
                </span>
              )}
              {product.condition && (
                <span className="rounded-full border border-border px-3 py-1 text-xs text-foreground">
                  {PRODUCT_CONDITION_LABELS[product.condition]}
                </span>
              )}
            </div>
          )}

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="mt-auto pt-6">
            {!isSold && !isReserved && (
              <WhatsAppButton
                productName={product.name}
                price={product.price}
                phone={settings?.whatsapp}
                className="w-full"
              />
            )}

            {isReserved && (
              <p className="text-center text-sm text-salmao">
                Esta peça está reservada no momento.
              </p>
            )}

            {isSold && (
              <p className="text-center text-sm text-muted-foreground">
                Esta peça já foi vendida.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
