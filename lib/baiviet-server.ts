import { createClient } from '@/utils/supabase/server';
import { Database } from '@/utils/supabase/generated-types';

export type BaiViet = Database['public']['Tables']['baiviet']['Row'];
export type CreateBaiViet = Database['public']['Tables']['baiviet']['Insert'];
export type UpdateBaiViet = Database['public']['Tables']['baiviet']['Update'];

// Get all blog post IDs for static generation of edit pages
export async function layTatCaIdBaiViet(): Promise<string[]> {
  console.log('🔍 [BÀI VIẾT] Đang tải tất cả bài viết và tạo trang tĩnh');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🔍 [BÀI VIẾT] Không tìm thấy biến môi trường');
    return [];
  }
  
  try {
    const { createServerClient } = await import('@supabase/ssr');
    const supabase = createServerClient(supabaseUrl, supabaseServiceKey, {
      cookies: {
        getAll() { return []; },
        setAll() { return; }
      }
    });
    
    const { data, error } = await supabase
      .from('baiviet')
      .select('id');
      
    if (error) {
      console.error('🔍 [BÀI VIẾT] Lỗi khi lấy danh sách ID:', error);
      return [];
    }
    
    const ids = data?.map((b: { id: string }) => b.id) || [];
    console.log(`🔍 [BÀI VIẾT] Không thấy ${ids.length} bài viết`);
    return ids;
  } catch (error) {
    console.error('🔍 [BÀI VIẾT] Lỗi khi lấy danh sách ID:', error);
    return [];
  }
}

// Static version for build-time generation (no cookies)
export async function layBaiVietTheoIdStatic(id: string): Promise<BaiViet | null> {
  console.log('🔍 [BÀI VIẾT] Đang tải bài viết với ID (tĩnh):', id);
  
  // Use service role key for build-time access
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🔍 [BÀI VIẾT] Lỗi: Không tìm thấy biến môi trường');
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
    
  console.log('🔍 [BÀI VIẾT] Kết quả truy vấn tĩnh:', {
    data: data ? 'Found' : 'Not found',
    error: error?.message,
    postId: id
  });
    
  if (error) {
    console.error('🔍 [BÀI VIẾT] Lỗi khi lấy bài viết (tĩnh):', error);
    return null;
  }
    
  return data;
}

// Server-side version for server components
export async function layBaiVietTheoId(id: string): Promise<BaiViet | null> {
  console.log('🔍 [BÀI VIẾT] Đang tải bài viết với ID:', id);
  
  const supabase = await createClient();
  
  console.log('🔍 [BÀI VIẾT] Supabase đang tạo dịch vụ khách');
  
  const { data, error } = await supabase
    .from('baiviet')
    .select('*')
    .eq('id', id)
    .single();
    
  console.log('🔍 [BÀI VIẾT] Kết quả truy vấn:', {
    data: data ? 'Found' : 'Not found',
    error: error?.message,
    postId: id
  });
    
  if (error) {
    console.error('🔍 [BÀI VIẾT]LOG] Lỗi khi lấy bài viết:', error);
    throw error;
  }
    
  return data;
}
