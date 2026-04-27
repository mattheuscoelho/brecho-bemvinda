import { createClient } from "@/lib/supabase/client";

type LogAction =
  | "create_product"
  | "update_product"
  | "delete_product"
  | "update_settings";

interface LogEntry {
  action: LogAction;
  entity_type?: string;
  entity_id?: string;
  entity_name?: string;
}

export async function logAdminAction(entry: LogEntry): Promise<void> {
  const supabase = createClient();
  await supabase.from("admin_logs").insert({
    action: entry.action,
    entity_type: entry.entity_type ?? null,
    entity_id: entry.entity_id ? (entry.entity_id as unknown as string) : null,
    entity_name: entry.entity_name ?? null,
  });
  // Log silencioso — falha não bloqueia o fluxo do admin
}
