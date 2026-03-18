import { createClient } from '@/utils/supabase/server';
import { Database } from '@/utils/supabase/generated-types';

export type BaiViet = Database['public']['Tables']['baiviet']['Row'];
export type CreateBaiViet = Database['public']['Tables']['baiviet']['Insert'];
export type UpdateBaiViet = Database['public']['Tables']['baiviet']['Update'];

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
