create table admin_logs (
  id uuid primary key default gen_random_uuid(),
  action text not null,       -- 'create_product' | 'update_product' | 'delete_product' | 'update_settings'
  entity_type text,           -- 'product' | 'settings'
  entity_id uuid,
  entity_name text,
  created_at timestamptz not null default now()
);

create index idx_admin_logs_created on admin_logs(created_at desc);

alter table admin_logs enable row level security;

create policy "Admin lê logs"
  on admin_logs for select
  using (auth.role() = 'authenticated');

create policy "Admin insere logs"
  on admin_logs for insert
  with check (auth.role() = 'authenticated');
