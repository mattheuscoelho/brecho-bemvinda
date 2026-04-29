import { Suspense } from "react";
import { getCategories } from "@/lib/data/categories";
import { getAllProducts } from "@/lib/data/products";
import { getStoreSettings } from "@/lib/data/settings";
import { Hero } from "@/components/store/hero";
import { CatalogClient } from "@/components/store/catalog-client";
import { AboutSection } from "@/components/store/about-section";

export const revalidate = 60;

export default async function HomePage() {
  return (
    <>
      <HeroSection />
      <Suspense fallback={<CatalogSkeleton />}>
        <CatalogSection />
      </Suspense>
      <Suspense fallback={null}>
        <AboutSectionWrapper />
      </Suspense>
    </>
  );
}

async function HeroSection() {
  const settings = await getStoreSettings().catch(() => null);
  return <Hero whatsapp={settings?.whatsapp} />;
}

async function CatalogSection() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getCategories(),
  ]);

  const publicProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
    status: p.status,
    size: p.size,
    categories: (p as { categories?: { name: string; slug: string } | null }).categories ?? null,
    product_images: p.product_images,
  }));

  return (
    <CatalogClient
      products={publicProducts}
      categories={categories}
    />
  );
}

async function AboutSectionWrapper() {
  const settings = await getStoreSettings().catch(() => null);
  return (
    <AboutSection
      bio={settings?.bio}
      address={settings?.address}
      hours={settings?.hours}
      payment={settings?.payment}
    />
  );
}

function CatalogSkeleton() {
  return (
    <div>
      {/* Filter skeleton */}
      <div className="flex gap-2 justify-center px-14 py-[14px]" style={{ background: "#F2B8B0" }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-8 w-20 rounded-[20px] animate-pulse bg-[#e8a8a0]" />
        ))}
      </div>
      {/* Grid skeleton */}
      <div className="grid gap-[1px] bg-[#ddd0c8]" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white aspect-[3/4] animate-pulse" style={{ opacity: 0.6 }} />
        ))}
      </div>
    </div>
  );
}
