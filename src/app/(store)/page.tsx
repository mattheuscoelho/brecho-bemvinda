import { Suspense } from "react";
import { getCategoriesWithCount } from "@/lib/data/categories";
import { getProducts } from "@/lib/data/products";
import { CategoryCard } from "@/components/category-card";
import { ProductCard } from "@/components/product-card";
import { Flower2 } from "lucide-react";
import { STORE } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Hero */}
      <section className="mb-16 py-16 sm:py-24 text-center">
        <span className="block text-3xl text-rosa-claro select-none mb-6" aria-hidden>✿</span>
        <h1 className="font-script text-5xl text-foreground sm:text-6xl">
          {STORE.name}
        </h1>
        <p className="mt-5 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Peças únicas com história e encanto
        </p>
        <p className="mt-3 text-xs text-muted-foreground/60">
          {STORE.address} · {STORE.hours}
        </p>
      </section>

      {/* Categorias */}
      <section className="mb-12">
        <h2 className="mb-4 font-display text-xl text-foreground">
          Categorias
        </h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-16 animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          }
        >
          <CategoriesList />
        </Suspense>
      </section>

      {/* Produtos recentes */}
      <section>
        <h2 className="mb-4 font-display text-xl text-foreground">
          Novidades
        </h2>
        <Suspense
          fallback={
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-xl bg-muted"
                />
              ))}
            </div>
          }
        >
          <ProductsList />
        </Suspense>
      </section>
    </div>
  );
}

async function CategoriesList() {
  const categories = await getCategoriesWithCount();

  if (categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Nenhuma categoria cadastrada ainda.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} count={cat.count} />
      ))}
    </div>
  );
}

async function ProductsList() {
  const products = await getProducts();

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
        <Flower2 className="mx-auto mb-3 h-8 w-8 text-rosa-claro/50" />
        <p className="text-sm text-muted-foreground">
          Em breve novas peças por aqui!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
