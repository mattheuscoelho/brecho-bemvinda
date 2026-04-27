-- Enum condição do produto
create type product_condition as enum ('new', 'excellent', 'good', 'used');

-- Adicionar campos na tabela products
alter table products
  add column size text,
  add column condition product_condition;

-- Remover image_url (substituído por product_images)
alter table products drop column image_url;

-- Tabela de imagens do produto
create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  url text not null,
  display_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_product_images_product on product_images(product_id, display_order);

-- RLS
alter table product_images enable row level security;

create policy "Imagens de produtos visíveis para todos"
  on product_images for select
  using (true);

create policy "Admin gerencia imagens de produtos"
  on product_images for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Storage: política de update para edição de imagens
create policy "Admin update imagem"
  on storage.objects for update
  using (bucket_id = 'products' and auth.role() = 'authenticated');
