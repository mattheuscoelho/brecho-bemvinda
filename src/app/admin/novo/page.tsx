import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/lib/data/categories";
import { ProductForm } from "../product-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Novo Produto",
};

export default async function NovoPage() {
  const categories = await getCategories();

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/admin"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Link>

      <h1 className="mb-6 font-display text-xl text-foreground">
        Novo Produto
      </h1>

      <ProductForm categories={categories} />
    </div>
  );
}
