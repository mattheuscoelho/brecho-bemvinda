import { createClient } from "@/lib/supabase/server";

export async function getCategories() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getCategoriesWithCount() {
  const supabase = await createClient();

  const { data: categories, error: catError } = await supabase
    .from("categories")
    .select("*")
    .order("display_order", { ascending: true });

  if (catError) throw catError;

  const { data: products, error: prodError } = await supabase
    .from("products")
    .select("category_id")
    .eq("status", "available");

  if (prodError) throw prodError;

  const counts = new Map<string, number>();
  products.forEach((p) => {
    counts.set(p.category_id, (counts.get(p.category_id) || 0) + 1);
  });

  return categories.map((cat) => ({
    ...cat,
    count: counts.get(cat.id) || 0,
  }));
}
