import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { layBaiVietTheoIdStatic, layTatCaIdBaiViet } from '@/lib/baiviet-server';
import { BlogEditForm } from '@/components/blog-edit-form';

// Static generation - build-time paths
export async function generateStaticParams() {
  try {
    const ids = await layTatCaIdBaiViet();
    console.log(`🔍 [BLOG EDIT] Generated ${ids.length} static params`);
    return ids.map((id) => ({ id }));
  } catch (error) {
    console.log('🔍 [BLOG EDIT] Static params generation failed:', error);
    return [];
  }
}

// Dynamic metadata
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  try {
    const { id } = await params;
    const post = await layBaiVietTheoIdStatic(id);
    
    if (!post) {
      return {
        title: 'Không tìm thấy bài viết | An Kun Studio Admin',
      };
    }

    return {
      title: `Chỉnh sửa ${post.tieude} | An Kun Studio Admin`,
    };
  } catch {
    return {
      title: 'Chỉnh sửa Bài viết | An Kun Studio Admin',
    };
  }
}

// Server component - fetches data statically
export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await layBaiVietTheoIdStatic(id);
  
  if (!post) {
    notFound();
  }

  return <BlogEditForm post={post} />;
}