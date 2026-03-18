import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { BlogPostDetail } from '@/components/blog-post-detail';
import { AnimatedBackground } from '@/components/animated-background';
import { layBaiVietTheoId } from '@/lib/baiviet';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await layBaiVietTheoId(slug);
    
    if (!post) {
      return {
        title: 'Bài viết không tìm thấy | Blog An Kun Studio',
        description: 'Bài viết bạn tìm kiếm không tồn tại.',
      };
    }

    return {
      title: `${post.tieude} | Blog An Kun Studio`,
      description: post.tomtat || 'Đọc bài viết trên blog An Kun Studio',
      openGraph: {
        title: post.tieude,
        description: post.tomtat,
        type: 'article',
        images: post.anh_dai_dien ? [post.anh_dai_dien] : [],
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Lỗi | Blog An Kun Studio',
      description: 'Có lỗi xảy ra khi tải bài viết.',
    };
  }
}

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
