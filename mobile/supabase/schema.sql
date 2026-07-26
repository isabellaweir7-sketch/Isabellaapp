-- Giftling backend schema (Supabase / Postgres)
--
-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)
-- for a fresh project. Safe to re-run individual "create table if not exists"
-- blocks, but policies use "drop policy if exists" so the whole file is
-- re-runnable from scratch too.
--
-- Data model: a "circle" is the shared tracker for one real-world person's
-- birthday/gifting (what the app currently calls a "friend profile"). Multiple
-- real Giftling users ("circle_members") can jointly maintain one circle -- that's
-- what makes secret gift-claiming, group chip-ins, and group chat meaningful:
-- everyone in the circle sees the same shared wishlist, not their own private
-- copy of it. The subject of a circle (e.g. "Chloe") does not need to be a
-- Giftling user themselves.

create extension if not exists "pgcrypto";

-- One row per real Giftling user, extending Supabase's built-in auth.users.
create table if not exists profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- A shared tracker for one real-world person's birthday/gifting.
create table if not exists circles (
  id uuid primary key default gen_random_uuid(),
  created_by uuid not null references profiles (id),
  subject_name text not null,
  avatar_url text,
  relationship text,
  birthday date,
  bio text,
  theme jsonb not null default '{}'::jsonb,
  preferences jsonb not null default '{}'::jsonb,
  reminder_enabled boolean not null default true,
  reminder_days_before int not null default 14,
  created_at timestamptz not null default now()
);

-- Which real users collaborate on a given circle (the "friend group").
create table if not exists circle_members (
  circle_id uuid not null references circles (id) on delete cascade,
  user_id uuid not null references profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (circle_id, user_id)
);

-- Short-lived invite codes so a friend can join a circle without it being
-- publicly discoverable.
create table if not exists circle_invites (
  code text primary key,
  circle_id uuid not null references circles (id) on delete cascade,
  created_by uuid not null references profiles (id),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default (now() + interval '7 days')
);

create table if not exists wishlist_items (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references circles (id) on delete cascade,
  title text not null,
  price numeric not null default 0,
  price_range_tag text not null,
  store text,
  url text,
  image_url text,
  category text,
  event_date date,
  event_venue text,
  claimed_by uuid references profiles (id),
  claimed_status text not null default 'unclaimed',
  priority text not null default 'medium',
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists chip_in_participants (
  wishlist_item_id uuid not null references wishlist_items (id) on delete cascade,
  user_id uuid not null references profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (wishlist_item_id, user_id)
);

-- Dream board pins stay private to the user who saved them -- this is your
-- own scrapbook, not shared with a circle.
create table if not exists dream_board_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  title text not null,
  type text not null,
  media_url text not null,
  price numeric,
  price_range_tag text not null,
  link_url text,
  notes text,
  board_category text not null,
  created_at timestamptz not null default now()
);

-- "Whispers" -- casual mentions logged about a circle's subject.
create table if not exists circle_notes (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references circles (id) on delete cascade,
  author_id uuid references profiles (id),
  content text not null,
  created_at timestamptz not null default now()
);

-- Group chat, scoped per circle.
create table if not exists circle_messages (
  id uuid primary key default gen_random_uuid(),
  circle_id uuid not null references circles (id) on delete cascade,
  author_id uuid references profiles (id),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists user_progress (
  user_id uuid primary key references profiles (id) on delete cascade,
  giver_level int not null default 1,
  gifts_given_count int not null default 0,
  unlocked_themes text[] not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles (id) on delete cascade,
  name text not null,
  icon text,
  description text,
  unlocked_at timestamptz not null default now()
);

-- Helper: is the current user a member of this circle?
create or replace function is_circle_member(target_circle_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from circle_members
    where circle_id = target_circle_id
      and user_id = auth.uid()
  );
$$;

-- Join a circle via invite code (bypasses RLS safely, validates expiry).
create or replace function join_circle_with_code(invite_code text)
returns uuid
language plpgsql
security definer
as $$
declare
  target_circle_id uuid;
begin
  select circle_id into target_circle_id
  from circle_invites
  where code = invite_code and expires_at > now();

  if target_circle_id is null then
    raise exception 'Invite code is invalid or has expired';
  end if;

  insert into circle_members (circle_id, user_id)
  values (target_circle_id, auth.uid())
  on conflict do nothing;

  return target_circle_id;
end;
$$;

-- Row Level Security: nothing is readable/writable without an explicit policy.
alter table profiles enable row level security;
alter table circles enable row level security;
alter table circle_members enable row level security;
alter table circle_invites enable row level security;
alter table wishlist_items enable row level security;
alter table chip_in_participants enable row level security;
alter table dream_board_items enable row level security;
alter table circle_notes enable row level security;
alter table circle_messages enable row level security;
alter table user_progress enable row level security;
alter table badges enable row level security;

drop policy if exists "profiles are readable by any signed-in user" on profiles;
create policy "profiles are readable by any signed-in user" on profiles
  for select using (auth.role() = 'authenticated');

drop policy if exists "users manage their own profile" on profiles;
create policy "users manage their own profile" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "circle members can read a circle" on circles;
create policy "circle members can read a circle" on circles
  for select using (is_circle_member(id));

drop policy if exists "circle members can update a circle" on circles;
create policy "circle members can update a circle" on circles
  for update using (is_circle_member(id));

drop policy if exists "signed-in users can create a circle" on circles;
create policy "signed-in users can create a circle" on circles
  for insert with check (auth.uid() = created_by);

drop policy if exists "members can see their circles' membership" on circle_members;
create policy "members can see their circles' membership" on circle_members
  for select using (is_circle_member(circle_id));

drop policy if exists "circle creator can add the first member" on circle_members;
create policy "circle creator can add the first member" on circle_members
  for insert with check (auth.uid() = user_id);

drop policy if exists "members can create invites for their circle" on circle_invites;
create policy "members can create invites for their circle" on circle_invites
  for insert with check (is_circle_member(circle_id));

drop policy if exists "members can view their circle's invites" on circle_invites;
create policy "members can view their circle's invites" on circle_invites
  for select using (is_circle_member(circle_id));

drop policy if exists "circle members can access wishlist items" on wishlist_items;
create policy "circle members can access wishlist items" on wishlist_items
  for all using (is_circle_member(circle_id)) with check (is_circle_member(circle_id));

drop policy if exists "circle members can access chip-in participants" on chip_in_participants;
create policy "circle members can access chip-in participants" on chip_in_participants
  for all using (
    exists (
      select 1 from wishlist_items
      where wishlist_items.id = wishlist_item_id
        and is_circle_member(wishlist_items.circle_id)
    )
  );

drop policy if exists "users manage their own dream board" on dream_board_items;
create policy "users manage their own dream board" on dream_board_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "circle members can access notes" on circle_notes;
create policy "circle members can access notes" on circle_notes
  for all using (is_circle_member(circle_id)) with check (is_circle_member(circle_id));

drop policy if exists "circle members can access messages" on circle_messages;
create policy "circle members can access messages" on circle_messages
  for all using (is_circle_member(circle_id)) with check (is_circle_member(circle_id));

drop policy if exists "users manage their own progress" on user_progress;
create policy "users manage their own progress" on user_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "users manage their own badges" on badges;
create policy "users manage their own badges" on badges
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
