-- ============================================================
-- EJECUTA ESTO en Supabase SQL Editor
-- ============================================================

-- 1. Agregar columna tipo_solicitud a mesa_partes
alter table mesa_partes
  add column if not exists tipo_solicitud text
    check (tipo_solicitud in ('ARBITRAJE','JPRD','OTRAS'));

-- 2. Tabla de secuencia de expedientes por año
create table if not exists expediente_secuencia (
  anio    int     not null,
  ultimo  int     not null default 0,
  primary key (anio)
);

-- Insertar el año actual si no existe
insert into expediente_secuencia (anio, ultimo)
values (extract(year from now())::int, 0)
on conflict (anio) do nothing;

-- 3. Función que genera el número correlativo MP-YYYY-NNNNN
-- Usa FOR UPDATE para evitar condiciones de carrera
create or replace function siguiente_numero_expediente()
returns text
language plpgsql
security definer
as $$
declare
  v_anio  int;
  v_num   int;
  v_code  text;
begin
  v_anio := extract(year from now())::int;

  -- Insertar el año si es nuevo
  insert into expediente_secuencia (anio, ultimo)
  values (v_anio, 0)
  on conflict (anio) do nothing;

  -- Incrementar de forma atómica
  update expediente_secuencia
  set ultimo = ultimo + 1
  where anio = v_anio
  returning ultimo into v_num;

  -- Formato: MP-2026-00001
  v_code := 'MP-' || v_anio::text || '-' || lpad(v_num::text, 5, '0');

  return v_code;
end;
$$;

-- 4. Permisos para que el anon key pueda llamar la función
grant execute on function siguiente_numero_expediente() to anon;
grant execute on function siguiente_numero_expediente() to authenticated;

-- Permisos en la tabla secuencia
alter table expediente_secuencia enable row level security;
create policy "seq_all" on expediente_secuencia for all using (true) with check (true);

-- 5. Índice para filtrar por tipo de solicitud
create index if not exists idx_mesa_partes_tipo on mesa_partes(tipo_solicitud);
