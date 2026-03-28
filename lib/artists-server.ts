import { Artist } from '@/types/database';

// Get all artist IDs for static generation of edit pages
export async function layTatCaIdArtists(): Promise<string[]> {
  console.log('🎵 [NGHỆ SĨ] Đang lấy tất cả nghệ sĩ theo ID và tạo trang tĩnh');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🎵 [NGHỆ SĨ] không tìm thấy biến môi trường cho ID trang tĩnh');
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
      .from('artists')
      .select('id');
      
    if (error) {
      console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy ID:', error);
      return [];
    }
    
    const ids = data?.map((a: { id: string }) => a.id) || [];
    console.log(`🎵 [NGHỆ SĨ] Found ${ids.length} artist ID`);
    return ids;
  } catch (error) {
    console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy ID:', error);
    return [];
  }
}

// Get artist by ID for static generation
export async function layArtistTheoIdStatic(id: string): Promise<Artist | null> {
  console.log('🎵 [NGHỆ SĨ] Lây nghệ sĩ theo ID (tĩnh):', id);
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🎵 [NGHỆ SĨ] Không tìm thấy biến môi trường cho ID trang tĩnh');
    return null;
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
      .from('artists')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy nghệ sĩ theo ID:', error);
      return null;
    }
    
    console.log('🎵 [NGHỆ SĨ] Không thấy nghệ sĩ đâu:', data?.name);
    return data as Artist;
  } catch (error) {
    console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy nghệ sĩ theo ID:', error);
    return null;
  }
}

// Static version for build-time generation (no cookies)
export async function layArtistTheoSlugStatic(slug: string): Promise<Artist | null> {
  console.log('🎵 [NGHỆ SĨ] Lây nghệ sĩ theo đường dẫn (tĩnh):', slug);
  
  // Use service role key for build-time access
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🎵 [NGHỆ SĨ] Không tìm thấy biến môi trường cho ID trang tĩnh');
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
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
    
  console.log('🎵 [NGHỆ SĨ] Kết quả truy vấn tĩnh:', {
    data: data ? 'Found' : 'Not found',
    error: error?.message,
    slug: slug
  });
    
  if (error) {
    console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy nghệ sĩ (tĩnh):', error);
    return null;
  }
    
  return data as Artist;
}

// Get all artist slugs for static generation
export async function layTatCaSlugArtists(): Promise<string[]> {
  console.log('🎵 [NGHỆ SĨ] Lây tất cả đường dẫn nghệ sĩ để tạo trang tĩnh');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🎵 [NGHỆ SĨ] Không tìm thấy biến môi trường cho ID trang tĩnh');
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
      .from('artists')
      .select('slug')
      .eq('is_active', true);
      
    if (error) {
      console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy danh sách đường dẫn:', error);
      return [];
    }
    
    const slugs = data?.map((a: { slug: string }) => a.slug) || [];
    console.log(`🎵 [NGHỆ SĨ] Không thấy ${slugs.length} đường dẫn nghệ sĩ`);
    return slugs;
  } catch (error) {
    console.error('🎵 [NGHỆ SĨ] Lỗi khi lấy danh sách đường dẫn:', error);
    return [];
  }
}
