import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogPostDetail } from '@/components/blog-post-detail';
import { AnimatedBackground } from '@/components/animated-background';

export const metadata = {
  title: 'Tương lai của Phát trực tuyến Âm nhạc | Blog An Kun Studio',
  description: 'Khám phá bối cảnh đang phát triển của các nền tảng phát trực tuyến âm nhạc và cách nghệ sĩ có thể tối đa hóa phạm vi tiếp cận của họ trong thời đại kỹ thuật số.',
};

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <BlogPostDetail />
      </main>
      <Footer />
    </div>
  );
}
