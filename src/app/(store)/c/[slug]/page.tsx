import { notFound } from "next/navigation";
import { getProducts } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { ProductCard } from "@/components/product-card";
import { ArrowLeft, Flower2 } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) return { title: "Categoria não encontrada" };

  return {
    title: category.name,
    description: `Peças de ${category.name} no Brechó Bemvinda Poesia & Cia`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === slug);

  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <h1 className="mb-6 font-display text-2xl text-foreground">
        {category.name}
      </h1>

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center">
          <Flower2 className="mx-auto mb-3 h-8 w-8 text-rosa-claro/50" />
          <p className="text-sm text-muted-foreground">
            Nenhuma peça nesta categoria no momento.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
