-- ========================================
-- ADD RLS POLICIES FOR ARTISTS TABLE
-- ========================================
-- Created: 2026-03-29
-- Purpose: Enable Row Level Security for artists table

-- Enable RLS on artists table if not already enabled
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;

-- Policy: Allow all users to read active artists
CREATE POLICY "artists_select_active" ON public.artists 
FOR SELECT 
USING (is_active = true);

-- Policy: Allow authenticated users to insert artists
CREATE POLICY "artists_insert_auth" ON public.artists 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Policy: Allow authenticated users to update artists
CREATE POLICY "artists_update_auth" ON public.artists 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Policy: Allow authenticated users to delete artists (soft delete by setting is_active = false)
CREATE POLICY "artists_delete_auth" ON public.artists 
FOR DELETE 
TO authenticated 
USING (true);

-- ========================================
-- CREATE FUNCTION FOR SOFT DELETE
-- ========================================
CREATE OR REPLACE FUNCTION public.soft_delete_artist()
RETURNS TRIGGER AS $$
BEGIN
    -- Instead of deleting, set is_active to false
    UPDATE public.artists 
    SET is_active = false, updated_at = NOW() 
    WHERE id = OLD.id;
    RETURN NULL; -- Prevent actual deletion
END;
$$ LANGUAGE plpgsql;

-- Create trigger for soft delete
DROP TRIGGER IF EXISTS trigger_soft_delete_artist ON public.artists;
CREATE TRIGGER trigger_soft_delete_artist
BEFORE DELETE ON public.artists
FOR EACH ROW
EXECUTE FUNCTION public.soft_delete_artist();

-- ========================================
-- ADD UPDATED_AT COLUMN IF NOT EXISTS
-- ========================================
ALTER TABLE public.artists 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS set_artists_updated_at ON public.artists;
CREATE TRIGGER set_artists_updated_at
BEFORE UPDATE ON public.artists
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

SELECT 'RLS policies and triggers for artists table created successfully' AS result;
