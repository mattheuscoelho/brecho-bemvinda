import { createClient } from "@/lib/supabase/server";

export async function getProducts(categorySlug?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*, categories!inner(slug, name), product_images(id, url, display_order)")
    .eq("status", "available")
    .order("created_at", { ascending: false });

  if (categorySlug) {
    query = query.eq("categories.slug", categorySlug);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getProduct(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug), product_images(id, url, display_order)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getAllProducts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, categories(name, slug), product_images(id, url, display_order)")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}
