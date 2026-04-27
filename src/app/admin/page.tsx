import Link from "next/link";
import Image from "next/image";
import { Plus, Flower2 } from "lucide-react";
import { getAllProducts } from "@/lib/data/products";
import { formatPrice } from "@/lib/utils";
import { PRODUCT_CONDITION_LABELS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { DeleteProductButton } from "./delete-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel Admin",
};

export default async function AdminPage() {
  const products = await getAllProducts();

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-xl text-foreground">Produtos</h1>
        <Link href="/admin/novo">
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Novo
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <Flower2 className="mx-auto mb-3 h-8 w-8 text-rosa-claro/50" />
          <p className="text-sm text-muted-foreground">
            Nenhum produto cadastrado.
          </p>
          <Link href="/admin/novo" className="mt-3 inline-block">
            <Button variant="outline" size="sm">
              Cadastrar primeiro produto
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => {
            const category = product.categories as { name: string; slug: string } | null;
            const coverImage = product.product_images
              .slice()
              .sort((a, b) => a.display_order - b.display_order)[0]?.url ?? null;
            return (
              <div
                key={product.id}
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
              >
                {/* Thumbnail */}
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-rosa-claro/40">
                      <Flower2 className="h-5 w-5" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {product.name}
                  </p>
                  <div className="mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs font-medium text-rosa">
                      {formatPrice(product.price)}
                    </span>
                    {product.size && (
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {product.size}
                      </span>
                    )}
                    {product.condition && (
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {PRODUCT_CONDITION_LABELS[product.condition]}
                      </span>
                    )}
                    {product.status !== "available" && (
                      <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
                        {product.status === "sold" ? "Vendido" : "Reservado"}
                      </span>
                    )}
                  </div>
                </div>

                {/* Ações */}
                <div className="flex shrink-0 items-center gap-1">
                  <Link href={`/admin/editar/${product.id}`}>
                    <Button variant="ghost" size="icon" aria-label="Editar">
                      ✏️
                    </Button>
                  </Link>
                  <DeleteProductButton productId={product.id} productName={product.name} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
