-- Fix RLS Policy for baiviet table - Allow anonymous access
-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view their own posts" ON public.baiviet;
DROP POLICY IF EXISTS "Admins can insert their own posts" ON public.baiviet;
DROP POLICY IF EXISTS "Admins can update their own posts" ON public.baiviet;
DROP POLICY IF EXISTS "Admins can delete their own posts" ON public.baiviet;
DROP POLICY IF EXISTS "Published posts are viewable by everyone" ON public.baiviet;

-- Create new policies with proper anonymous access
-- 1. Admin can read/write their own posts
CREATE POLICY "Admins can view their own posts" ON public.baiviet
  FOR SELECT USING (auth.uid() = admin_id);

CREATE POLICY "Admins can insert their own posts" ON public.baiviet
  FOR INSERT WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can update their own posts" ON public.baiviet
  FOR UPDATE USING (auth.uid() = admin_id);

CREATE POLICY "Admins can delete their own posts" ON public.baiviet
  FOR DELETE USING (auth.uid() = admin_id);

-- 2. Public users can read published posts (including anonymous users)
CREATE POLICY "Published posts are viewable by everyone" ON public.baiviet
  FOR SELECT USING (trang_thai = 'published' OR auth.uid() = admin_id);
