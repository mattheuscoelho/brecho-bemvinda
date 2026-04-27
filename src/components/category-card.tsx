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
      className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card px-4 py-3 transition-all hover:border-rosa/40 hover:shadow-sm"
    >
      <span className="text-rosa-claro text-base leading-none select-none shrink-0 transition-colors group-hover:text-rosa" aria-hidden>✿</span>
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
