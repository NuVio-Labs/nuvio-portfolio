-- Journal-Likes
--
-- Im Supabase-Dashboard unter SQL Editor ausfuehren, oder per CLI:
--   supabase db push
--
-- Aufbau: anonyme Besucher duerfen den Zaehler lesen, aber nicht schreiben.
-- Hochgezaehlt wird ausschliesslich ueber die Funktion unten, die als
-- SECURITY DEFINER laeuft und damit an der Schreibsperre vorbei darf.
-- So kann niemand ueber die REST-Schnittstelle beliebige Werte setzen.

create table if not exists public.journal_likes (
    slug       text        primary key,
    count      integer     not null default 0 check (count >= 0),
    updated_at timestamptz not null default now()
);

alter table public.journal_likes enable row level security;

-- Lesen: erlaubt. Schreiben: bewusst keine Policy, also verboten.
drop policy if exists journal_likes_select on public.journal_likes;
create policy journal_likes_select
    on public.journal_likes
    for select
    to anon, authenticated
    using (true);

-- Zaehlt hoch und legt die Zeile beim ersten Like an.
create or replace function public.increment_journal_like(article_slug text)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
    new_count integer;
begin
    -- Gleiche Slug-Regel wie in lib/journal.ts. Verhindert, dass ueber die
    -- Funktion beliebige Zeilen angelegt werden.
    if article_slug is null or article_slug !~ '^[a-z0-9-]{1,120}$' then
        raise exception 'invalid slug';
    end if;

    insert into public.journal_likes as l (slug, count)
    values (article_slug, 1)
    on conflict (slug) do update
        set count      = l.count + 1,
            updated_at = now()
    returning l.count into new_count;

    return new_count;
end;
$$;

-- Funktionen sind standardmaessig fuer PUBLIC ausfuehrbar, deshalb erst
-- entziehen und dann gezielt freigeben.
revoke all on function public.increment_journal_like(text) from public;
grant execute on function public.increment_journal_like(text) to anon, authenticated;
