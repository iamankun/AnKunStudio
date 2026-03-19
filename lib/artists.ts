/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from '@/utils/supabase/client';

// Simple wrapper functions with type assertion to bypass TypeScript errors
export const layDanhSachArtists = async () => {
  const supabase = createClient();
  
  const { data, error } = await (supabase as any)
    .from('artists')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Lỗi khi lấy danh sách nghệ sĩ:', error);
    throw error;
  }
    
  return data || [];
};

export const layArtistTheoSlug = async (slug: string) => {
  const supabase = createClient();
  
  const { data, error } = await (supabase as any)
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
    
  if (error) {
    console.error('Lỗi khi lấy nghệ sĩ:', error);
    return null;
  }
    
  return data;
};

export const laySoundsTheoArtist = async (artistId: string) => {
  const supabase = createClient();
  
  const { data, error } = await (supabase as any)
    .from('sounds')
    .select('*')
    .eq('artist_id', artistId)
    .eq('is_published', true)
    .order('release_date', { ascending: false });
    
  if (error) {
    console.error('Lỗi khi lấy sounds:', error);
    return [];
  }
    
  return data || [];
};

export const layAlbumsTheoArtist = async (artistId: string) => {
  const supabase = createClient();
  
  const { data, error } = await (supabase as any)
    .from('albums')
    .select('*')
    .eq('artist_id', artistId)
    .eq('is_published', true)
    .order('release_year', { ascending: false });
    
  if (error) {
    console.error('Lỗi khi lấy albums:', error);
    return [];
  }
    
  return data || [];
};

export const layEventsTheoArtist = async (artistId: string) => {
  const supabase = createClient();
  
  const { data, error } = await (supabase as any)
    .from('events')
    .select('*')
    .eq('artist_id', artistId)
    .eq('is_published', true)
    .order('event_date', { ascending: true });
    
  if (error) {
    console.error('Lỗi khi lấy events:', error);
    return [];
  }
    
  return data || [];
};

export const taoArtist = async (artist: any) => {
  const supabase = createClient();
  
  try {
    console.log('Creating artist with data:', artist);
    
    const { data, error } = await (supabase as any)
      .from('artists')
      .insert(artist)
      .select()
      .single();
    
    console.log('Supabase response:', { data, error });
    
    if (error) {
      console.error('Supabase error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error keys:', Object.keys(error));
      console.error('Full error object:', JSON.stringify(error, null, 2));
      
      // Handle case where error is an empty object
      if (typeof error === 'object' && Object.keys(error).length === 0) {
        throw new Error('Lỗi khi tạo nghệ sĩ: Database constraint violation - possibly missing required fields or duplicate slug');
      }
      
      throw new Error(`Lỗi khi tạo nghệ sĩ: ${error?.message || error?.details || 'Unknown error'}`);
    }
    
    console.log('Artist created successfully:', data);
    return data;
  } catch (err) {
    console.error('Unexpected error in taoArtist:', err);
    throw err;
  }
};

export const capNhatArtist = async (id: string, artist: any) => {
  const supabase = createClient();
  
  const { data, error } = await (supabase as any)
    .from('artists')
    .update(artist)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Supabase update error details:', error);
    console.error('Error type:', typeof error);
    console.error('Error keys:', Object.keys(error));
    console.error('Full error object:', JSON.stringify(error, null, 2));
    
    // Handle case where error is an empty object
    if (typeof error === 'object' && Object.keys(error).length === 0) {
      throw new Error('Lỗi khi cập nhật nghệ sĩ: Database constraint violation - possibly missing required fields or insufficient permissions');
    }
    
    throw new Error(`Lỗi khi cập nhật nghệ sĩ: ${error?.message || error?.details || 'Unknown error'}`);
  }
    
  return data;
};

export const xoaArtist = async (id: string) => {
  const supabase = createClient();
  
  const { error } = await (supabase as any)
    .from('artists')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Lỗi khi xóa nghệ sĩ:', error);
    throw error;
  }
};
