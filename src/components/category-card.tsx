import Link from "next/link";
import type { Category } from "@/lib/supabase/types";

interface CategoryCardProps {
  category: Category;
  count?: number;
}

export function CategoryCard({ category, count }: CategoryCardProps) {
  return (
    <Link
      href={`/c/${category.slug}`}
      className="group flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-rosa/30 hover:shadow-sm"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rosa-claro/30 text-rosa transition-colors group-hover:bg-rosa-claro/50">
        <span className="text-lg">🌿</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-rosa transition-colors">
          {category.name}
        </h3>
        {count !== undefined && (
          <p className="text-xs text-muted-foreground">
            {count} {count === 1 ? "peça" : "peças"}
          </p>
        )}
      </div>
    </Link>
  );
}
