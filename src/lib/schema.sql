-- GovDart PostgreSQL Schema
-- Designed for Supabase with RLS policies

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- =============================================================================
-- TABLES
-- =============================================================================

-- Companies
create table companies (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  cage_code text not null,
  duns text not null,
  naics_codes text[] not null default '{}',
  capabilities text[] not null default '{}',
  size_standard text not null default '',
  certifications text[] not null default '{}',
  location text not null default '',
  website text,
  employee_count integer not null default 0,
  annual_revenue text not null default '',
  created_at timestamptz not null default now()
);

-- Users
create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text not null,
  company_id uuid not null references companies(id) on delete cascade,
  role text not null default 'member',
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Contractor profiles
create table contractor_profiles (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  cage_code text not null,
  duns text not null,
  naics_codes text[] not null default '{}',
  capabilities text[] not null default '{}',
  agencies_worked_with text[] not null default '{}',
  location text not null default '',
  website text not null default '',
  employee_count integer not null default 0,
  annual_revenue text not null default '',
  past_award_count integer not null default 0,
  past_award_value text not null default '',
  is_prime boolean not null default false,
  teaming_fit_score integer,
  contact_name text,
  contact_email text,
  contact_phone text,
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

-- Opportunities
create table opportunities (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  solicitation_number text not null,
  agency text not null,
  sub_agency text,
  description text not null default '',
  naics_code text not null default '',
  set_aside text not null default 'None'
    check (set_aside in ('Small Business', '8(a)', 'HUBZone', 'SDVOSB', 'WOSB', 'None')),
  contract_type text not null default '',
  estimated_value text not null default '',
  place_of_performance text not null default '',
  posted_date timestamptz not null default now(),
  due_date timestamptz not null,
  status text not null default 'reviewing'
    check (status in ('reviewing', 'bidding', 'partnered', 'submitted', 'archived')),
  pipeline_stage text not null default 'new'
    check (pipeline_stage in ('new', 'qualified', 'reaching_out', 'teaming', 'submitted')),
  attachments text[] not null default '{}',
  url text,
  created_at timestamptz not null default now()
);

-- Saved opportunities (user-specific tracking)
create table saved_opportunities (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  opportunity_id uuid not null references opportunities(id) on delete cascade,
  tags text[] not null default '{}',
  notes text not null default '',
  pipeline_stage text not null default 'new'
    check (pipeline_stage in ('new', 'qualified', 'reaching_out', 'teaming', 'submitted')),
  created_at timestamptz not null default now(),
  unique (user_id, opportunity_id)
);

-- Saved contractors (user-specific tracking)
create table saved_contractors (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  contractor_id uuid not null references contractor_profiles(id) on delete cascade,
  notes text not null default '',
  created_at timestamptz not null default now(),
  unique (user_id, contractor_id)
);

-- Notes (polymorphic: linked to opportunities or contractors)
create table notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  entity_type text not null check (entity_type in ('opportunity', 'contractor')),
  entity_id uuid not null,
  content text not null default '',
  created_at timestamptz not null default now()
);

-- Saved searches
create table saved_searches (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  filters jsonb not null default '{}',
  alert_enabled boolean not null default false,
  alert_frequency text not null default 'daily'
    check (alert_frequency in ('daily', 'weekly', 'instant')),
  created_at timestamptz not null default now()
);

-- Past awards (linked to contractor profiles)
create table past_awards (
  id uuid primary key default uuid_generate_v4(),
  contractor_id uuid not null references contractor_profiles(id) on delete cascade,
  title text not null,
  agency text not null,
  value text not null default '',
  award_date timestamptz not null,
  naics_code text not null default '',
  description text not null default ''
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Users
create index idx_users_email on users(email);
create index idx_users_company_id on users(company_id);

-- Companies
create index idx_companies_cage_code on companies(cage_code);
create index idx_companies_naics_codes on companies using gin(naics_codes);

-- Contractor profiles
create index idx_contractor_profiles_cage_code on contractor_profiles(cage_code);
create index idx_contractor_profiles_naics_codes on contractor_profiles using gin(naics_codes);
create index idx_contractor_profiles_capabilities on contractor_profiles using gin(capabilities);
create index idx_contractor_profiles_agencies on contractor_profiles using gin(agencies_worked_with);
create index idx_contractor_profiles_is_prime on contractor_profiles(is_prime);
create index idx_contractor_profiles_tags on contractor_profiles using gin(tags);

-- Opportunities
create index idx_opportunities_agency on opportunities(agency);
create index idx_opportunities_naics_code on opportunities(naics_code);
create index idx_opportunities_set_aside on opportunities(set_aside);
create index idx_opportunities_status on opportunities(status);
create index idx_opportunities_pipeline_stage on opportunities(pipeline_stage);
create index idx_opportunities_due_date on opportunities(due_date);
create index idx_opportunities_posted_date on opportunities(posted_date);
create index idx_opportunities_solicitation_number on opportunities(solicitation_number);

-- Saved opportunities
create index idx_saved_opportunities_user_id on saved_opportunities(user_id);
create index idx_saved_opportunities_opportunity_id on saved_opportunities(opportunity_id);
create index idx_saved_opportunities_pipeline_stage on saved_opportunities(pipeline_stage);

-- Saved contractors
create index idx_saved_contractors_user_id on saved_contractors(user_id);
create index idx_saved_contractors_contractor_id on saved_contractors(contractor_id);

-- Notes
create index idx_notes_user_id on notes(user_id);
create index idx_notes_entity on notes(entity_type, entity_id);

-- Saved searches
create index idx_saved_searches_user_id on saved_searches(user_id);

-- Past awards
create index idx_past_awards_contractor_id on past_awards(contractor_id);
create index idx_past_awards_agency on past_awards(agency);
create index idx_past_awards_naics_code on past_awards(naics_code);
create index idx_past_awards_award_date on past_awards(award_date);

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================

alter table users enable row level security;
alter table companies enable row level security;
alter table contractor_profiles enable row level security;
alter table opportunities enable row level security;
alter table saved_opportunities enable row level security;
alter table saved_contractors enable row level security;
alter table notes enable row level security;
alter table saved_searches enable row level security;
alter table past_awards enable row level security;

-- Users: can read own row, update own row
create policy "users_select_own"
  on users for select
  using (id = auth.uid());

create policy "users_update_own"
  on users for update
  using (id = auth.uid());

-- Companies: members can read their own company
create policy "companies_select_member"
  on companies for select
  using (
    id in (select company_id from users where id = auth.uid())
  );

create policy "companies_update_member"
  on companies for update
  using (
    id in (select company_id from users where id = auth.uid())
  );

-- Contractor profiles: readable by all authenticated users
create policy "contractor_profiles_select_authenticated"
  on contractor_profiles for select
  using (auth.role() = 'authenticated');

-- Opportunities: readable by all authenticated users
create policy "opportunities_select_authenticated"
  on opportunities for select
  using (auth.role() = 'authenticated');

-- Saved opportunities: user-scoped CRUD
create policy "saved_opportunities_select_own"
  on saved_opportunities for select
  using (user_id = auth.uid());

create policy "saved_opportunities_insert_own"
  on saved_opportunities for insert
  with check (user_id = auth.uid());

create policy "saved_opportunities_update_own"
  on saved_opportunities for update
  using (user_id = auth.uid());

create policy "saved_opportunities_delete_own"
  on saved_opportunities for delete
  using (user_id = auth.uid());

-- Saved contractors: user-scoped CRUD
create policy "saved_contractors_select_own"
  on saved_contractors for select
  using (user_id = auth.uid());

create policy "saved_contractors_insert_own"
  on saved_contractors for insert
  with check (user_id = auth.uid());

create policy "saved_contractors_update_own"
  on saved_contractors for update
  using (user_id = auth.uid());

create policy "saved_contractors_delete_own"
  on saved_contractors for delete
  using (user_id = auth.uid());

-- Notes: user-scoped CRUD
create policy "notes_select_own"
  on notes for select
  using (user_id = auth.uid());

create policy "notes_insert_own"
  on notes for insert
  with check (user_id = auth.uid());

create policy "notes_update_own"
  on notes for update
  using (user_id = auth.uid());

create policy "notes_delete_own"
  on notes for delete
  using (user_id = auth.uid());

-- Saved searches: user-scoped CRUD
create policy "saved_searches_select_own"
  on saved_searches for select
  using (user_id = auth.uid());

create policy "saved_searches_insert_own"
  on saved_searches for insert
  with check (user_id = auth.uid());

create policy "saved_searches_update_own"
  on saved_searches for update
  using (user_id = auth.uid());

create policy "saved_searches_delete_own"
  on saved_searches for delete
  using (user_id = auth.uid());

-- Past awards: readable by all authenticated users
create policy "past_awards_select_authenticated"
  on past_awards for select
  using (auth.role() = 'authenticated');
