-- Bíblia Play — lista de assinantes (rode uma vez no Supabase: SQL Editor → New query → Run)
create table if not exists public.assinantes (
  email          text primary key,                -- e-mail usado na compra (sempre minúsculo)
  status         text not null default 'ativo',   -- ativo | cancelado (vale até expira_em) | inativo
  plano          text,                            -- mensal | anual | nome do produto
  expira_em      timestamptz,                     -- até quando a assinatura vale
  ultimo_evento  text,                            -- último aviso da Kiwify (ex.: order_approved)
  pedido         text,                            -- número do pedido na Kiwify
  atualizado_em  timestamptz not null default now()
);
alter table public.assinantes enable row level security;
-- cada família só consegue ver a própria linha (pelo e-mail com que entrou)
drop policy if exists "ver a propria assinatura" on public.assinantes;
create policy "ver a propria assinatura" on public.assinantes
  for select to authenticated
  using (email = lower(auth.jwt() ->> 'email'));
-- ninguém escreve pelo site: só o webhook da Kiwify (com a chave de serviço) grava aqui
