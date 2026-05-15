export const STORE = {
  name: "Bemvinda Poesia & Cia",
  tagline: "Brechó",
  address: "Rua Ipiranga, 18 — Centro",
  hours: "Seg a Sex, 10h às 17h",
  phone: "5511926361869",
  whatsapp: "5511926361869",
  instagram: "@bemvindapoesia",
} as const;

export const CATEGORIES = [
  { name: "Roupas", slug: "roupas" },
  { name: "Acessórios", slug: "acessorios" },
  { name: "Calçados", slug: "calcados" },
  { name: "Bolsas", slug: "bolsas" },
  { name: "Decoração", slug: "decoracao" },
] as const;

export const PRODUCT_STATUS = {
  AVAILABLE: "available",
  SOLD: "sold",
  RESERVED: "reserved",
} as const;

export type ProductStatus = (typeof PRODUCT_STATUS)[keyof typeof PRODUCT_STATUS];

export const PRODUCT_CONDITION_LABELS: Record<string, string> = {
  new: "Novo",
  excellent: "Ótimo estado",
  good: "Bom estado",
  used: "Usado",
};

export const CONDITION_OPTIONS = [
  { value: "new", label: "Novo" },
  { value: "excellent", label: "Ótimo estado" },
  { value: "good", label: "Bom estado" },
  { value: "used", label: "Usado" },
];
