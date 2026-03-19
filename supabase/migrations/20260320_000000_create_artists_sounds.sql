-- Create artists, sounds, albums, events tables
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

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_artists_slug ON public.artists(slug);
CREATE INDEX IF NOT EXISTS idx_artists_is_active ON public.artists(is_active);
CREATE INDEX IF NOT EXISTS idx_artists_verified ON public.artists(verified);
CREATE INDEX IF NOT EXISTS idx_sounds_slug ON public.sounds(slug);
CREATE INDEX IF NOT EXISTS idx_sounds_artist_id ON public.sounds(artist_id);
CREATE INDEX IF NOT EXISTS idx_sounds_is_published ON public.sounds(is_published);
CREATE INDEX IF NOT EXISTS idx_sounds_release_date ON public.sounds(release_date);
CREATE INDEX IF NOT EXISTS idx_albums_slug ON public.albums(slug);
CREATE INDEX IF NOT EXISTS idx_albums_artist_id ON public.albums(artist_id);
CREATE INDEX IF NOT EXISTS idx_albums_is_published ON public.albums(is_published);
CREATE INDEX IF NOT EXISTS idx_events_artist_id ON public.events(artist_id);
CREATE INDEX IF NOT EXISTS idx_events_event_date ON public.events(event_date);
CREATE INDEX IF NOT EXISTS idx_events_is_published ON public.events(is_published);

-- Enable RLS
ALTER TABLE public.artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.albums ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Active artists are viewable by everyone" ON public.artists
  FOR SELECT USING (is_active = true);

CREATE POLICY "Artists can update their own profile" ON public.artists
  FOR UPDATE USING (true);

CREATE POLICY "Artists can be created by authenticated users" ON public.artists
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Published sounds are viewable by everyone" ON public.sounds
  FOR SELECT USING (is_published = true);

CREATE POLICY "Artists can manage their own sounds" ON public.sounds
  FOR ALL USING (true);

CREATE POLICY "Published albums are viewable by everyone" ON public.albums
  FOR SELECT USING (is_published = true);

CREATE POLICY "Artists can manage their own albums" ON public.albums
  FOR ALL USING (true);

CREATE POLICY "Published events are viewable by everyone" ON public.events
  FOR SELECT USING (is_published = true);

CREATE POLICY "Artists can manage their own events" ON public.events
  FOR ALL USING (true);

-- Create triggers
CREATE TRIGGER handle_artists_updated_at
  BEFORE UPDATE ON public.artists
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_sounds_updated_at
  BEFORE UPDATE ON public.sounds
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_albums_updated_at
  BEFORE UPDATE ON public.albums
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
