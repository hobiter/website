-- Core blog table
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text,
  slug text unique,
  excerpt text,
  content text,
  category text,
  published boolean default true,
  published_at timestamp default now()
);

-- Future: users (for members)
create table if not exists users (
  id uuid primary key,
  email text
);

-- Future: watchlist
create table if not exists watchlist (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  ticker text,
  created_at timestamp default now()
);

-- Future: portfolio
create table if not exists portfolio (
  id uuid primary key default gen_random_uuid(),
  user_id uuid,
  ticker text,
  shares numeric,
  avg_price numeric
);
