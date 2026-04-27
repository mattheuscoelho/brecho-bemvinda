"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function AdminLogout() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
    >
      <LogOut className="h-3.5 w-3.5" />
      Sair
    </button>
  );
}
