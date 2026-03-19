-- Add missing columns to artists table: country, city, label
-- These columns exist in the TypeScript types but not in the database schema

ALTER TABLE public.artists
  ADD COLUMN IF NOT EXISTS country TEXT,
  ADD COLUMN IF NOT EXISTS city TEXT,
  ADD COLUMN IF NOT EXISTS label TEXT;
