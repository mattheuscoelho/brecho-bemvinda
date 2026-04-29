"use client";

import { useRouter } from "next/navigation";
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
      className="text-[12px] font-body text-[#d4a898] transition-colors hover:text-white cursor-pointer bg-transparent border-none"
    >
      Sair
    </button>
  );
}
