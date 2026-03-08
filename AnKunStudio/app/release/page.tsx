import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { ReleaseMusic } from '@/components/release-music';
import { AnimatedBackground } from '@/components/animated-background';

export const metadata = {
  title: 'Phát hành Âm nhạc | An Kun Studio',
  description: 'Gửi âm nhạc của bạn đến An Kun Studio. Chúng tôi giúp nghệ sĩ phân phối và quảng bá âm nhạc trên toàn thế giới.',
};

export default function ReleasePage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <ReleaseMusic />
      </main>
      <Footer />
    </div>
  );
}
