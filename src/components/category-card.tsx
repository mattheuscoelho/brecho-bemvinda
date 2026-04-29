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
      className="group flex items-center gap-3 rounded-xl border border-rosa-claro/20 bg-rosa-claro/8 px-5 py-4 transition-all hover:border-rosa/40 hover:bg-rosa-claro/15 hover:shadow-sm"
    >
      <span className="text-rosa-claro text-lg leading-none select-none shrink-0 transition-colors group-hover:text-rosa" aria-hidden>✿</span>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-medium text-foreground group-hover:text-rosa transition-colors">
          {category.name}
        </h3>
        {count !== undefined && (
          <p className="text-sm text-muted-foreground">
            {count} {count === 1 ? "peça" : "peças"}
          </p>
        )}
      </div>
    </Link>
  );
}
