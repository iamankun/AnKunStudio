import { createClient } from '@/utils/supabase/server';
import { Database } from '@/utils/supabase/generated-types';

export type BaiViet = Database['public']['Tables']['baiviet']['Row'];
export type CreateBaiViet = Database['public']['Tables']['baiviet']['Insert'];
export type UpdateBaiViet = Database['public']['Tables']['baiviet']['Update'];

// Static version for build-time generation (no cookies)
export async function layBaiVietTheoIdStatic(id: string): Promise<BaiViet | null> {
  console.log('🔍 [BLOG] Fetching post with ID (static):', id);
  
  // Use service role key for build-time access
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🔍 [BLOG] Missing environment variables for static fetch');
    return null;
  }
  
  const { createServerClient } = await import('@supabase/ssr');
  const supabase = createServerClient(supabaseUrl, supabaseServiceKey, {
    cookies: {
      getAll() { return []; },
      setAll() { return; }
    }
  });
  
  const { data, error } = await supabase
    .from('baiviet')
    .select('*')
    .eq('id', id)
    .single();
    
  console.log('🔍 [BLOG] Static query result:', {
    data: data ? 'Found' : 'Not found',
    error: error?.message,
    postId: id
  });
    
  if (error) {
    console.error('🔍 [BLOG] Lỗi khi lấy bài viết (static):', error);
    return null;
  }
    
  return data;
}

// Server-side version for server components
export async function layBaiVietTheoId(id: string): Promise<BaiViet | null> {
  console.log('🔍 [BLOG] Fetching post with ID:', id);
  
  const supabase = await createClient();
  
  console.log('🔍 [BLOG] Supabase client created');
  
  const { data, error } = await supabase
    .from('baiviet')
    .select('*')
    .eq('id', id)
    .single();
    
  console.log('🔍 [BLOG] Query result:', {
    data: data ? 'Found' : 'Not found',
    error: error?.message,
    postId: id
  });
    
  if (error) {
    console.error('🔍 [BLOG] Lỗi khi lấy bài viết:', error);
    throw error;
  }
    
  return data;
}
