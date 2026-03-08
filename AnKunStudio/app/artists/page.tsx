import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArtistList } from '@/components/artist-list';
import { AnimatedBackground } from '@/components/animated-background';

export const metadata = {
  title: 'Nghệ sĩ | An Kun Studio',
  description: 'Khám phá các nghệ sĩ tài năng từ An Kun Studio. Từ tài năng mới nổi đến các siêu sao toàn cầu.',
};

export default function ArtistsPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <ArtistList />
      </main>
      <Footer />
    </div>
  );
}
