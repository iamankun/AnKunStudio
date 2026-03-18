'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { layBaiVietTheoId, BaiViet } from '@/lib/baiviet';
import '@/styles/blog-content.css';

// Function to format blog content with proper HTML
const formatBlogContent = (content: string): string => {
  return content
    // Convert double newlines to paragraphs
    .split(/\n\n+/)
    .map(paragraph => {
      const trimmed = paragraph.trim();
      
      // Check if paragraph contains an image (including HTML img tags)
      if (trimmed.includes('<img') || trimmed.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
        // Extract image src if it's an HTML img tag
        let imgSrc = '';
        let imgAlt = 'Blog image';
        
        if (trimmed.includes('<img')) {
          // Extract src from HTML img tag
          const srcMatch = trimmed.match(/src="([^"]+)"/);
          const altMatch = trimmed.match(/alt="([^"]*)"/);
          imgSrc = srcMatch ? srcMatch[1] : '';
          imgAlt = altMatch ? altMatch[1] : 'Blog image';
          
          // Extract text content from paragraph (if any)
          const textContent = trimmed.replace(/<img[^>]*>/gi, '').trim();
          
          // Return both image and text if there's text content
          if (textContent) {
            return `<div class="blog-image-container">
              <img src="${imgSrc}" alt="${imgAlt}" class="blog-image" loading="lazy" />
            </div>
            <p class="blog-paragraph">${textContent.replace(/\n/g, '<br>')}</p>`;
          }
        } else {
          // It's a direct URL
          imgSrc = trimmed;
          imgAlt = 'Blog image';
        }
        
        // Return just the image for standalone images
        return `<div class="blog-image-container">
          <img src="${imgSrc}" alt="${imgAlt}" class="blog-image" loading="lazy" />
        </div>`;
      }
      
      // Regular text paragraph
      return `<p class="blog-paragraph">${trimmed.replace(/\n/g, '<br>')}</p>`;
    })
    .join('');
};

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

      try {
        console.log('📤 Attempting to fetch post:', params.slug);
        const data = await layBaiVietTheoId(params.slug as string);
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
    <section className="w-full pb-20 sm:pb-32">
      {/* Featured Image with Title Overlay - Reduced Height */}
      {post.anh_dai_dien && (
        <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden group">
          <Image 
            src={post.anh_dai_dien} 
            alt={post.tieude}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* No Overlay Gradient to keep image clean */}
          
          {/* Title Overlay with semi-transparent background for readability */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-linear-to-t from-black/80 to-transparent">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 drop-shadow-lg">
                {post.tieude}
              </h1>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm opacity-90">
                <div className="flex items-center gap-4">
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm font-medium">
                    {post.category || 'Thông tin Ngành'}
                  </span>
                  <span>{getReadTime(post.noidung)}</span>
                </div>
                {post.tags && (
                  <div className="flex flex-wrap gap-2 text-xs">
                    {post.tags.split(',').map((tag: string, index: number) => (
                      <span 
                        key={index}
                        className="px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white/80"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center gap-4 text-xs">
                  <div className="text-center">
                    <div>An Kun Studio</div>
                  </div>
                  <div className="text-right">
                    {post.published_at && (
                      <div>Xuất bản ngày: {formatDate(post.published_at)}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

        {/* Excerpt */}
        {post.tomtat && (
          <div className="mb-12 text-center px-8 py-6">
            <p className="text-lg text-muted-foreground italic leading-relaxed max-w-3xl mx-auto">
              &ldquo;{post.tomtat}&rdquo;
            </p>
          </div>
        )}

        {/* Content */}
        <article className="prose prose-lg max-w-none">
          <div 
            className="blog-content text-foreground leading-relaxed space-y-6"
            dangerouslySetInnerHTML={{ 
              __html: formatBlogContent(post.noidung) 
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
                Bài Viết
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Liên hệ
              </Link>
            </div>
          </div>
        </footer>
        </div>
      </div>
    </section>
  );
}
