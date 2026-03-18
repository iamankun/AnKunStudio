import { createClient } from '@/utils/supabase/client';
import { Database } from '@/utils/supabase/generated-types';

export type BaiViet = Database['public']['Tables']['baiviet']['Row'];
export type CreateBaiViet = Database['public']['Tables']['baiviet']['Insert'];
export type UpdateBaiViet = Database['public']['Tables']['baiviet']['Update'];

export async function layBaiViets(): Promise<BaiViet[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('baiviet')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Lỗi khi lấy bài viết:', error);
    throw error;
  }
    
  return data || [];
}

export async function layBaiVietTheoId(id: string): Promise<BaiViet | null> {
  const supabase = createClient();
  
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

export async function taoBaiViet(baiViet: CreateBaiViet): Promise<BaiViet> {
  const supabase = createClient();
  
  console.log('📝 Creating blog post with data:', baiViet);
  
  const insertData: CreateBaiViet = {
    tieude: baiViet.tieude,
    noidung: baiViet.noidung,
    tomtat: baiViet.tomtat,
    anh_dai_dien: baiViet.anh_dai_dien,
    trang_thai: baiViet.trang_thai,
    admin_id: baiViet.admin_id,
    published_at: baiViet.trang_thai === 'published' ? new Date().toISOString() : null
  };
  
  console.log('📤 Insert data prepared:', insertData);
  
  const { data, error } = await supabase
    .from('baiviet')
    .insert(insertData)
    .select()
    .single();
    
  if (error) {
    console.error('❌ Lỗi khi tạo bài viết:', error);
    console.error('❌ Error details:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw error;
  }
    
  console.log('✅ Blog post created successfully:', data);
  return data;
}

export async function capNhatBaiViet(id: string, baiViet: UpdateBaiViet): Promise<BaiViet> {
  const supabase = createClient();
  
  const updateData: UpdateBaiViet = {
    tieude: baiViet.tieude,
    noidung: baiViet.noidung,
    tomtat: baiViet.tomtat,
    anh_dai_dien: baiViet.anh_dai_dien,
    trang_thai: baiViet.trang_thai,
    published_at: baiViet.trang_thai === 'published' && !baiViet.published_at ? new Date().toISOString() : baiViet.published_at
  };
  
  const { data, error } = await supabase
    .from('baiviet')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Lỗi khi cập nhật bài viết:', error);
    throw error;
  }
    
  return data;
}

export async function xoaBaiViet(id: string): Promise<void> {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('baiviet')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Lỗi khi xóa bài viết:', error);
    throw error;
  }
}

export async function layBaiVietsCuaAdmin(): Promise<BaiViet[]> {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('baiviet')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Lỗi khi lấy bài viết của admin:', error);
    throw error;
  }
    
  return data || [];
}
