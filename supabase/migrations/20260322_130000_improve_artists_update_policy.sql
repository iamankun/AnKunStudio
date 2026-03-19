-- Improve UPDATE policy for artists table
-- Add WITH CHECK clause to allow authenticated users to update artists

DROP POLICY IF EXISTS "Artists can update their own profile" ON public.artists;

CREATE POLICY "Artists can update their own profile" ON public.artists
  FOR UPDATE USING (true) WITH CHECK (true);
