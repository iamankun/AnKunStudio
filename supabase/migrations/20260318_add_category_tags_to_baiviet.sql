-- Add category and tags columns to baiviet table
ALTER TABLE public.baiviet 
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS tags TEXT;

-- Add comments for documentation
COMMENT ON COLUMN public.baiviet.category IS 'Category of the blog post (e.g., "Thông tin", "Nghệ sĩ", "Mẹo & Hướng dẫn")';
COMMENT ON COLUMN public.baiviet.tags IS 'Comma-separated tags for the blog post (e.g., "nhạc, streaming, nghệ sĩ")';

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_baiviet_category ON public.baiviet(category);
CREATE INDEX IF NOT EXISTS idx_baiviet_tags ON public.baiviet(tags);
