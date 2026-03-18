'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { layBaiVietTheoId, BaiViet } from '@/lib/baiviet';

export function BlogPostDetail() {
  const params = useParams();
  const [post, setPost] = useState<BaiViet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      console.log('🔍 Fetching post with slug:', params.slug);
      
      if (!params.slug) {
        console.error('❌ No slug provided');
        setError('Không có ID bài viết');
        setLoading(false);
        return;
      }

      if (typeof params.slug !== 'string') {
        console.error('❌ Invalid slug type:', typeof params.slug);
        setError('ID bài viết không hợp lệ');
        setLoading(false);
        return;
      }

      // Validate UUID format
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      if (!uuidRegex.test(params.slug)) {
        console.error('❌ Invalid UUID format:', params.slug);
        setError('ID bài viết không đúng định dạng');
        setLoading(false);
        return;
      }

      try {
        console.log('📤 Attempting to fetch post:', params.slug);
        const data = await layBaiVietTheoId(params.slug);
        console.log('📥 Received data:', data);
        
        if (data && data.trang_thai === 'published') {
          setPost(data);
        } else if (data) {
          console.error('❌ Post not published:', data.trang_thai);
          setError('Bài viết chưa được xuất bản');
        } else {
          console.error('❌ No data received');
          setError('Bài viết không tồn tại');
        }
      } catch (err) {
        console.error('❌ Failed to fetch blog post:', err);
        setError('Không thể tải bài viết');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} phút đọc`;
  };

  if (loading) {
    return (
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Đang tải bài viết...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Bài viết không tồn tại</h1>
          <p className="text-muted-foreground mb-8">{error}</p>
          <Link href="/blog">
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors">
              Quay lại blog
            </button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Quay lại blog
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
              Thông tin Ngành
            </span>
            <span>{getReadTime(post.noidung)}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            {post.tieude}
          </h1>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-medium text-primary">A</span>
              </div>
              <div>
                <div className="font-medium text-foreground">Admin</div>
                <div className="text-sm text-muted-foreground">An Kun Studio</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">{formatDate(post.created_at)}</div>
              {post.published_at && (
                <div className="text-xs text-muted-foreground">
                  Xuất bản: {formatDate(post.published_at)}
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {post.anh_dai_dien && (
          <div className="aspect-video overflow-hidden rounded-2xl mb-12">
            <Image 
              src={post.anh_dai_dien} 
              alt={post.tieude}
              width={1200}
              height={675}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {post.tomtat && (
          <div className="bg-muted/50 rounded-xl p-6 mb-12">
            <p className="text-lg text-muted-foreground italic leading-relaxed">
              {post.tomtat}
            </p>
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="text-foreground leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ 
              __html: post.noidung.replace(/\n/g, '<br>') 
            }}
          />
        </article>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 An Kun Studio. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex gap-4">
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Liên hệ
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
