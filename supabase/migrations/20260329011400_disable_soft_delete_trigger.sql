-- ========================================
-- DISABLE SOFT DELETE TRIGGER FOR ARTISTS
-- ========================================
-- Created: 2026-03-29
-- Purpose: Disable soft delete trigger to allow hard delete

-- Drop the soft delete trigger that prevents actual deletion
DROP TRIGGER IF EXISTS trigger_soft_delete_artist ON public.artists;

-- Drop the soft delete function
DROP FUNCTION IF EXISTS public.soft_delete_artist();

-- Update RLS policy to allow hard delete for authenticated users
DROP POLICY IF EXISTS "artists_delete_auth" ON public.artists;

CREATE POLICY "artists_delete_auth" ON public.artists 
FOR DELETE 
TO authenticated 
USING (true);

SELECT 'Soft delete trigger disabled and hard delete policy updated' AS result;
