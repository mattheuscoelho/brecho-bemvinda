import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppFab } from "@/components/store/whatsapp-fab";
import { getStoreSettings } from "@/lib/data/settings";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getStoreSettings().catch(() => null);

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppFab whatsapp={settings?.whatsapp} />
    </>
  );
}
