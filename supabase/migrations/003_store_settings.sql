create table store_settings (
  id int primary key default 1,
  bio text not null default 'Um brechó com alma. Cada peça que passa por aqui carrega uma história, e a gente acredita que moda boa é moda que circula.',
  address text not null default 'Rua Ipiranga, 18 — Centro',
  hours text not null default 'Seg a Sex, 10h às 17h',
  payment text not null default 'Cartão, débito e Pix',
  whatsapp text not null default '5500000000000',
  instagram text not null default '@bemvindapoesia',
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

-- Seed com valores reais
insert into store_settings (bio, address, hours, payment, whatsapp, instagram)
values (
  'Um brechó com alma. Cada peça que passa por aqui carrega uma história, e a gente acredita que moda boa é moda que circula. Aqui você encontra roupas, acessórios e objetos únicos, escolhidos com carinho e com muito bom gosto.',
  'Rua Ipiranga, 18 — Centro',
  'Seg a Sex, 10h às 17h',
  'Cartão, débito e Pix',
  '5500000000000',
  '@bemvindapoesia'
);

-- RLS
alter table store_settings enable row level security;

create policy "Configurações visíveis para todos"
  on store_settings for select
  using (true);

create policy "Admin atualiza configurações"
  on store_settings for update
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
