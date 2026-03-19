import { createClient } from '@/utils/supabase/client';

// SQL script to create artists, sounds, albums, events tables
const setupTables = async () => {
  const supabase = createClient();
  
  try {
    // Create artists table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.artists (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          bio TEXT,
          avatar_url TEXT,
          cover_image_url TEXT,
          genre TEXT[],
          social_links JSONB DEFAULT '{}',
          monthly_listeners TEXT DEFAULT '0',
          followers TEXT DEFAULT '0',
          total_streams TEXT DEFAULT '0',
          top_chart TEXT,
          verified BOOLEAN DEFAULT false,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    // Create sounds table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.sounds (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
          description TEXT,
          audio_url TEXT NOT NULL,
          cover_image_url TEXT,
          duration INTEGER,
          genre TEXT[],
          release_date DATE,
          is_published BOOLEAN DEFAULT false,
          play_count INTEGER DEFAULT 0,
          album TEXT,
          track_number INTEGER,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    // Create albums table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.albums (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          slug TEXT UNIQUE NOT NULL,
          artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
          cover_image_url TEXT,
          release_year INTEGER,
          track_count INTEGER DEFAULT 0,
          description TEXT,
          is_published BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    // Create events table
    await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.events (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          artist_id UUID REFERENCES public.artists(id) ON DELETE CASCADE,
          venue TEXT,
          location TEXT,
          event_date DATE,
          description TEXT,
          ticket_url TEXT,
          is_published BOOLEAN DEFAULT false,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });
    
    console.log('✅ Tables created successfully!');
    return true;
  } catch (error) {
    console.error('❌ Error creating tables:', error);
    return false;
  }
};

export default setupTables;
