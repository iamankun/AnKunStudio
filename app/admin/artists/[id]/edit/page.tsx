import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { layArtistTheoIdStatic, layTatCaIdArtists } from '@/lib/artists-server';
import { ArtistEditForm } from '@/components/artist-edit-form';

// Static generation - build-time paths
export async function generateStaticParams() {
  try {
    const ids = await layTatCaIdArtists();
    console.log(`🎵 [ARTIST EDIT] Generated ${ids.length} static params`);
    return ids.map((id) => ({ id }));
  } catch (error) {
    console.log('🎵 [ARTIST EDIT] Static params generation failed:', error);
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const artist = await layArtistTheoIdStatic(id);
    
    if (!artist) {
      return {
        title: 'Không tìm thấy nghệ sĩ | An Kun Studio Admin',
      };
    }

    return {
      title: `Chỉnh sửa ${artist.name} | An Kun Studio Admin`,
    };
  } catch {
    return {
      title: 'Chỉnh sửa Nghệ sĩ | An Kun Studio Admin',
    };
  }
}

// Server component - fetches data statically
export default async function EditArtistPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const artist = await layArtistTheoIdStatic(id);
  
  if (!artist) {
    notFound();
  }

  return <ArtistEditForm artist={artist} />;
}
