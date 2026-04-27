import { createClient } from "@/lib/supabase/server";
import type { StoreSettings } from "@/lib/supabase/types";

export async function getStoreSettings(): Promise<StoreSettings> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("store_settings")
    .select("*")
    .single();

  if (error) throw error;
  return data as StoreSettings;
}
