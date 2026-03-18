import { createClient } from '@/utils/supabase/server';
import { Database } from '@/utils/supabase/generated-types';

export type BaiViet = Database['public']['Tables']['baiviet']['Row'];
export type CreateBaiViet = Database['public']['Tables']['baiviet']['Insert'];
export type UpdateBaiViet = Database['public']['Tables']['baiviet']['Update'];

// Server-side version for server components
export async function layBaiVietTheoId(id: string): Promise<BaiViet | null> {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('baiviet')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    throw error;
  }
    
  return data;
}
