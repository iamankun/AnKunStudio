-- Create baiviet table for blog posts
CREATE TABLE IF NOT EXISTS public.baiviet (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tieude TEXT NOT NULL,
  noidung TEXT NOT NULL,
  tomtat TEXT,
  anh_dai_dien TEXT,
  trang_thai TEXT DEFAULT 'draft' CHECK (trang_thai IN ('draft', 'published', 'archived')),
  admin_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_baiviet_admin_id ON public.baiviet(admin_id);
CREATE INDEX IF NOT EXISTS idx_baiviet_trang_thai ON public.baiviet(trang_thai);
CREATE INDEX IF NOT EXISTS idx_baiviet_published_at ON public.baiviet(published_at);

-- Enable RLS (Row Level Security)
ALTER TABLE public.baiviet ENABLE ROW LEVEL SECURITY;

-- Create policies
-- 1. Admin can read/write their own posts
CREATE POLICY "Admins can view their own posts" ON public.baiviet
  FOR SELECT USING (auth.uid() = admin_id);

CREATE POLICY "Admins can insert their own posts" ON public.baiviet
  FOR INSERT WITH CHECK (auth.uid() = admin_id);

CREATE POLICY "Admins can update their own posts" ON public.baiviet
  FOR UPDATE USING (auth.uid() = admin_id);

CREATE POLICY "Admins can delete their own posts" ON public.baiviet
  FOR DELETE USING (auth.uid() = admin_id);

-- 2. Public users can read published posts
CREATE POLICY "Published posts are viewable by everyone" ON public.baiviet
  FOR SELECT USING (trang_thai = 'published');

-- Create trigger for updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_baiviet_updated_at
  BEFORE UPDATE ON public.baiviet
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();