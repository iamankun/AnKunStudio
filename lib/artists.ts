import { createClient } from '@/utils/supabase/client';
import type { Artist, ArtistInsert, ArtistUpdate } from '@/types/database';

export const layDanhSachArtists = async (): Promise<Artist[]> => {
  const supabase = createClient();
  
  // Không còn cần (supabase as any) nữa
  const { data, error } = await supabase
    .from('artists')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Lỗi khi lấy danh sách nghệ sĩ:', error);
    throw error;
  }
    
  return (data || []) as Artist[];
};

export const layArtistTheoSlug = async (slug: string): Promise<Artist | null> => {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('artists')
      .select('*') // Lấy toàn bộ thông tin thay vì chỉ 'slug'
      .eq('slug', slug)
      .eq('is_active', true)
      .limit(1);
      
    if (error) {
      if (error.code === 'PGRST116') return null;
      return null;
    }
      
    return (data && data.length > 0 ? data[0] : null) as Artist | null;
  } catch (err) {
    console.error('Exception caught:', err);
    return null;
  }
};

// Đã đổi artist: any thành kiểu ArtistInsert chuẩn xác
export const taoArtist = async (artist: ArtistInsert): Promise<Artist> => {
  const supabase = createClient();
  
  try {
    const { data, error } = await supabase
      .from('artists')
      .insert(artist)
      .select()
      .single();
    
    if (error) {
      throw new Error(`Lỗi khi tạo nghệ sĩ: ${error.message || 'Unknown error'}`);
    }
    
    return data as Artist;
  } catch (err) {
    console.error('Unexpected error in taoArtist:', err);
    throw err;
  }
};

// Đã đổi artist: any thành kiểu ArtistUpdate chuẩn xác
export const capNhatArtist = async (id: string, artist: ArtistUpdate): Promise<Artist> => {
  const supabase = createClient();
  
  console.log(' [DB] Bắt đầu cập nhật nghệ sĩ ID:', id);
  console.log(' [DB] Dữ liệu cập nhật:', artist);
  
  const { data, error } = await supabase
    .from('artists')
    .update(artist)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error(' [DB] Lỗi Supabase:', error);
    throw new Error(`Lỗi khi cập nhật nghệ sĩ: ${error.message || 'Unknown error'}`);
  }
  
  console.log(' [DB] Cập nhật thành công, kết quả:', data);
  return data as Artist;
};

export const xoaArtist = async (id: string): Promise<void> => {
  const supabase = createClient();
  
  console.log('🎵 [DB] Bắt đầu xóa nghệ sĩ ID:', id);
  
  // Kiểm tra nghệ sĩ tồn tại trước khi xóa
  const { data: existingArtist, error: checkError } = await supabase
    .from('artists')
    .select('id, name')
    .eq('id', id)
    .single();
    
  if (checkError) {
    console.error('🎵 [DB] Lỗi khi kiểm tra nghệ sĩ:', checkError);
    throw new Error(`Không tìm thấy nghệ sĩ: ${checkError.message || 'Unknown error'}`);
  }
  
  if (!existingArtist) {
    console.error('🎵 [DB] Không tìm thấy nghệ sĩ với ID:', id);
    throw new Error('Không tìm thấy nghệ sĩ để xóa');
  }
  
  console.log('🎵 [DB] Tìm thấy nghệ sĩ:', existingArtist);
  
  // Thực hiện xóa hard delete
  const { error: deleteError } = await supabase
    .from('artists')
    .delete()
    .eq('id', id);
    
  if (deleteError) {
    console.error('🎵 [DB] Lỗi khi xóa nghệ sĩ:', deleteError);
    throw new Error(`Lỗi khi xóa nghệ sĩ: ${deleteError.message || 'Unknown error'}`);
  }
  
  console.log('🎵 [DB] Xóa nghệ sĩ thành công');
};