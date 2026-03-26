import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogList } from '@/components/blog-list';
import { AnimatedBackground } from '@/components/animated-background';

export const metadata = {
  title: 'Bài viết | An Kun Studio',
  description: 'Tin tức, sự kiện, chủ đề về điện ảnh, âm nhạc luôn cập nhật từ An Kun Studio',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}
