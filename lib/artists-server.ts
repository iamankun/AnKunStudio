import { Artist } from '@/types/database';

// Static version for build-time generation (no cookies)
export async function layArtistTheoSlugStatic(slug: string): Promise<Artist | null> {
  console.log('🎵 [ARTIST] Fetching artist (static):', slug);
  
  // Use service role key for build-time access
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🎵 [ARTIST] Missing environment variables for static fetch');
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
    
  console.log('🎵 [ARTIST] Static query result:', {
    data: data ? 'Found' : 'Not found',
    error: error?.message,
    slug: slug
  });
    
  if (error) {
    console.error('🎵 [ARTIST] Lỗi khi lấy nghệ sĩ (static):', error);
    return null;
  }
    
  return data as Artist;
}

// Get all artist slugs for static generation
export async function layTatCaSlugArtists(): Promise<string[]> {
  console.log('🎵 [ARTIST] Fetching all artist slugs for static generation');
  
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.log('🎵 [ARTIST] Missing environment variables for static slugs');
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
      console.error('🎵 [ARTIST] Lỗi khi lấy danh sách slug:', error);
      return [];
    }
    
    const slugs = data?.map((a: { slug: string }) => a.slug) || [];
    console.log(`🎵 [ARTIST] Found ${slugs.length} artist slugs`);
    return slugs;
  } catch (error) {
    console.error('🎵 [ARTIST] Error fetching slugs:', error);
    return [];
  }
}
