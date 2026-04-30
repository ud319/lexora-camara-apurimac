-- ============================================================
-- EJECUTA ESTO en Supabase SQL Editor (adicional al schema-v2)
-- ============================================================

-- Tabla de tokens para recuperación de contraseña
create table if not exists password_resets (
  id          uuid default gen_random_uuid() primary key,
  cliente_id  uuid references clientes(id) on delete cascade,
  token       text not null unique,
  expira_at   timestamptz not null,
  usado       boolean default false,
  created_at  timestamptz default now()
);

alter table password_resets enable row level security;
create policy "reset_insert" on password_resets for insert with check (true);
create policy "reset_select" on password_resets for select using (true);
create policy "reset_update" on password_resets for update using (true);

-- Limpiar tokens vencidos automáticamente (opcional, ejecutar periódicamente)
-- delete from password_resets where expira_at < now();
