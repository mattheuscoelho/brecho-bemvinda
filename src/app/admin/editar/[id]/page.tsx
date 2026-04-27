import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getProduct } from "@/lib/data/products";
import { getCategories } from "@/lib/data/categories";
import { ProductForm } from "../../product-form";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);
    return { title: `Editar — ${product.name}` };
  } catch {
    return { title: "Produto não encontrado" };
  }
}

export default async function EditarPage({ params }: Props) {
  const { id } = await params;

  let product;
  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <h1 className="mb-6 font-display text-xl text-foreground">
        Editar Produto
      </h1>

      <ProductForm product={product} categories={categories} />
    </div>
  );
}
