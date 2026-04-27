-- Enum para status do produto
create type product_status as enum ('available', 'sold', 'reserved');

-- Categorias
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Produtos
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price int not null check (price > 0), -- centavos
  category_id uuid not null references categories(id) on delete restrict,
  image_url text,
  status product_status not null default 'available',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índices
create index idx_products_category on products(category_id);
create index idx_products_status on products(status);
create index idx_categories_slug on categories(slug);

-- RLS
alter table categories enable row level security;
alter table products enable row level security;

-- Leitura pública
create policy "Categorias visíveis para todos"
  on categories for select
  using (true);

create policy "Produtos visíveis para todos"
  on products for select
  using (true);

-- Escrita apenas para usuários autenticados (admin)
create policy "Admin gerencia categorias"
  on categories for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

create policy "Admin gerencia produtos"
  on products for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Seed de categorias
insert into categories (name, slug, display_order) values
  ('Roupas', 'roupas', 1),
  ('Acessórios', 'acessorios', 2),
  ('Calçados', 'calcados', 3),
  ('Bolsas', 'bolsas', 4),
  ('Decoração', 'decoracao', 5);

-- Storage bucket para imagens de produtos
insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do nothing;

-- Políticas do bucket
create policy "Imagens públicas"
  on storage.objects for select
  using (bucket_id = 'products');

create policy "Admin upload"
  on storage.objects for insert
  with check (bucket_id = 'products' and auth.role() = 'authenticated');

create policy "Admin delete"
  on storage.objects for delete
  using (bucket_id = 'products' and auth.role() = 'authenticated');
