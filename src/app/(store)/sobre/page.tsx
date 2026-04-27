import { Flower2, MapPin, Clock, CreditCard } from "lucide-react";
import { STORE } from "@/lib/constants";
import { getStoreSettings } from "@/lib/data/settings";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça o ${STORE.name} — brechó com peças únicas e muita poesia.`,
};

export default async function SobrePage() {
  const settings = await getStoreSettings();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <Flower2 className="mx-auto mb-4 h-10 w-10 text-rosa-claro" />
        <h1 className="font-display text-3xl text-foreground">
          {STORE.name}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {settings.bio}
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center">
          <MapPin className="h-6 w-6 text-teal" />
          <div>
            <h3 className="text-sm font-medium text-foreground">Endereço</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {settings.address}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center">
          <Clock className="h-6 w-6 text-teal" />
          <div>
            <h3 className="text-sm font-medium text-foreground">Horário</h3>
            <p className="mt-1 text-xs text-muted-foreground">{settings.hours}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center">
          <CreditCard className="h-6 w-6 text-teal" />
          <div>
            <h3 className="text-sm font-medium text-foreground">Pagamento</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {settings.payment}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
