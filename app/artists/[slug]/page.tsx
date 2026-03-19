import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArtistDetail } from '@/components/artist-detail';
import { AnimatedBackground } from '@/components/animated-background';
import { layArtistTheoSlugStatic, layTatCaSlugArtists } from '@/lib/artists-server';
import { notFound } from 'next/navigation';

// Static generation - build-time data fetching
export async function generateStaticParams() {
  try {
    const slugs = await layTatCaSlugArtists();
    console.log(`🎵 [ARTIST] Generated ${slugs.length} static params`);
    return slugs.map((slug) => ({
      slug: slug,
    }));
  } catch (error) {
    console.log('🎵 [ARTIST] Static params generation failed, falling back to dynamic:', error);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const artist = await layArtistTheoSlugStatic(slug);
    
    if (!artist) {
      return {
        title: 'Nghệ sĩ không tìm thấy | An Kun Studio',
        description: 'Nghệ sĩ bạn tìm kiếm không tồn tại.',
      };
    }

    return {
      title: `${artist.name} | Nghệ sĩ An Kun Studio`,
      description: artist.bio || `Khám phá âm nhạc từ ${artist.name} trên An Kun Studio`,
      openGraph: {
        title: artist.name,
        description: artist.bio,
        images: artist.avatar_url ? [artist.avatar_url] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Lỗi | An Kun Studio',
      description: 'Có lỗi xảy ra khi tải thông tin nghệ sĩ.',
    };
  }
}

export default async function ArtistDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const artist = await layArtistTheoSlugStatic(slug);
  
  if (!artist) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <ArtistDetail slug={slug} />
      </main>
      <Footer />
    </div>
  );
}
