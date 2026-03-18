import { BaiViet } from '@/lib/baiviet';
import Link from 'next/link';
import Image from 'next/image';
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

interface BlogPostDetailProps {
  post: BaiViet;
  currentUser?: any;
}

export function BlogPostDetail({ post, currentUser }: BlogPostDetailProps) {

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

        {/* Tags */}
        {post.tags && (
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.split(',').map((tag: string, index: number) => (
                <span 
                  key={index}
                  className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © 2026 An Kun Studio. Tất cả quyền được bảo lưu.
            </div>
            <div className="flex gap-4 items-center">
              {/* Admin Edit Button */}
              {currentUser && (
                <Link 
                  href={`/admin/blog/${post.id}/edit`}
                  className="text-sm bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded transition-colors"
                >
                  Chỉnh sửa
                </Link>
              )}
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
