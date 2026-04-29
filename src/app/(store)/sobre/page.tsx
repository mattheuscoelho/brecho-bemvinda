import { STORE } from "@/lib/constants";
import { getStoreSettings } from "@/lib/data/settings";
import { AboutSection } from "@/components/store/about-section";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça o ${STORE.name} — brechó com peças únicas e muita poesia.`,
};

export default async function SobrePage() {
  const settings = await getStoreSettings().catch(() => null);

  return (
    <>
      <AboutSection
        bio={settings?.bio}
        address={settings?.address}
        hours={settings?.hours}
        payment={settings?.payment}
      />

      {/* Informações práticas */}
      <div className="px-14 py-10 max-md:px-5 max-md:py-8" style={{ background: "#FAF0E8" }}>
        <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-3">
          {[
            {
              icon: "📍",
              title: "Endereço",
              value: settings?.address || STORE.address,
            },
            {
              icon: "🕐",
              title: "Horário",
              value: settings?.hours || STORE.hours,
            },
            {
              icon: "💳",
              title: "Pagamento",
              value: settings?.payment || "Cartão de crédito, débito e Pix",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-2xl p-8 text-center"
              style={{ background: "#fff", boxShadow: "0 2px 10px rgba(180,100,80,0.07)" }}
            >
              <span className="text-[28px]">{item.icon}</span>
              <div>
                <h3 className="font-display text-[15px] text-foreground mb-2">{item.title}</h3>
                <p className="font-body text-[13px] text-[#8a6a60] leading-relaxed">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
