import type { Metadata } from "next";
import { Playfair_Display, Nunito, Great_Vibes } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bemvinda Poesia & Cia — Brechó",
    template: "%s | Bemvinda Poesia & Cia",
  },
  description:
    "Brechó com peças únicas e muita poesia. Roupas, acessórios e encanto no coração do Centro.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${nunito.variable} ${greatVibes.variable}`}
    >
      <body className="min-h-dvh flex flex-col antialiased">{children}</body>
    </html>
  );
}
