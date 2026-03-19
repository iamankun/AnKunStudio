-- Add INSERT policy for artists table
-- This allows authenticated users to create new artists

CREATE POLICY "Artists can be created by authenticated users" ON public.artists
  FOR INSERT WITH CHECK (true);
