"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { logAdminAction } from "@/lib/data/admin-logs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { StoreSettings } from "@/lib/supabase/types";

export default function ConfiguracoesPage() {
  const router = useRouter();
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("store_settings")
      .select("*")
      .single()
      .then(({ data, error }) => {
        if (error) setError("Erro ao carregar configurações.");
        else setSettings(data);
        setLoading(false);
      });
  }, []);

  function update(field: keyof StoreSettings, value: string) {
    setSettings((prev) => prev ? { ...prev, [field]: value } : prev);
    setSaved(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase
      .from("store_settings")
      .update({
        bio: settings.bio,
        address: settings.address,
        hours: settings.hours,
        payment: settings.payment,
        whatsapp: settings.whatsapp,
        instagram: settings.instagram,
        updated_at: new Date().toISOString(),
      })
      .eq("id", 1);

    if (error) {
      setError("Erro ao salvar. Tente novamente.");
    } else {
      await logAdminAction({ action: "update_settings", entity_type: "settings" });
      setSaved(true);
      setTimeout(() => router.push("/admin"), 1200);
    }

    setSaving(false);
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-lg flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!settings) return null;

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 font-display text-xl text-foreground">Configurações da loja</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <Textarea
          id="bio"
          label="Texto da página Sobre"
          value={settings.bio}
          onChange={(e) => update("bio", e.target.value)}
          rows={4}
        />

        <Input
          id="address"
          label="Endereço"
          value={settings.address}
          onChange={(e) => update("address", e.target.value)}
          placeholder="Rua Ipiranga, 18 — Centro"
        />

        <Input
          id="hours"
          label="Horário de funcionamento"
          value={settings.hours}
          onChange={(e) => update("hours", e.target.value)}
          placeholder="Seg a Sex, 10h às 17h"
        />

        <Input
          id="payment"
          label="Formas de pagamento"
          value={settings.payment}
          onChange={(e) => update("payment", e.target.value)}
          placeholder="Cartão, débito e Pix"
        />

        <Input
          id="whatsapp"
          label="WhatsApp (com código do país)"
          value={settings.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          placeholder="5511999999999"
        />

        <Input
          id="instagram"
          label="Instagram"
          value={settings.instagram}
          onChange={(e) => update("instagram", e.target.value)}
          placeholder="@bemvindapoesia"
        />

        {error && (
          <p className="text-sm text-destructive text-center">{error}</p>
        )}

        <Button type="submit" disabled={saving} className="mt-2">
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4" />
              Salvo!
            </>
          ) : (
            "Salvar configurações"
          )}
        </Button>
      </form>
    </div>
  );
}
