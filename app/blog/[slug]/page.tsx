import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getServerSession } from "@/utils/supabase/server-session";
import { BlogPostDetail } from '@/components/blog-post-detail';
import { AnimatedBackground } from '@/components/animated-background';
import { layBaiVietTheoId } from '@/lib/baiviet-server';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await layBaiVietTheoId(slug);
    
    if (!post) {
      return {
        title: 'Bài viết không tìm thấy | Bài viết trên An Kun Studio',
        description: 'Bài viết bạn tìm kiếm không tồn tại.',
      };
    }

    return {
      title: `${post.tieude} | Bài viết trên An Kun Studio`,
      description: post.tomtat || 'Đọc bài viết trên An Kun Studio',
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
      title: 'Lỗi | Bài viết trên An Kun Studio',
      description: 'Có lỗi xảy ra khi tải bài viết.',
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Check if user is logged in
  const { user } = await getServerSession();
  
  let post;
  try {
    post = await layBaiVietTheoId(slug);
    
    if (!post) {
      notFound();
    }
  } catch (error) {
    console.error('Lỗi khi tải bài viết:', error);
    notFound();
  }
  
  if (post.trang_thai !== 'published') {
    return (
      <div className="min-h-screen bg-background relative">
        <AnimatedBackground />
        <Header />
        <main className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Bài viết chưa được xuất bản</h1>
            <p className="text-muted-foreground">Bài viết này đang ở trạng thái nháp và chưa được công bố.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Header />
      <main>
        <BlogPostDetail post={post} currentUser={user} />
      </main>
      <Footer />
    </div>
  );
}
