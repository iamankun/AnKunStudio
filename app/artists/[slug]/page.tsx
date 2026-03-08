import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ArtistDetail } from '@/components/artist-detail';
import { AnimatedBackground } from '@/components/animated-background';

export const metadata = {
  title: 'Luna Echo | Nghệ sĩ An Kun Studio',
  description: 'Nhà sản xuất âm nhạc điện tử nổi tiếng với những âm thanh hư ảo. Khám phá âm nhạc, bản phát hành và hơn thế nữa từ Luna Echo.',
};

export default function ArtistDetailPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <ArtistDetail />
      </main>
      <Footer />
    </div>
  );
}
