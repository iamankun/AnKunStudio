'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { layBaiViets, BaiViet } from '@/lib/baiviet';

const categories = ['Tất cả', 'Thông tin Ngành', 'Nghệ sĩ Tiêu biểu', 'Sản xuất', 'Kinh doanh', 'Tin công ty', 'Công nghệ'];

export function BlogList() {
  const [posts, setPosts] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await layBaiViets();
        // Only show published posts
        const publishedPosts = data.filter(post => post.trang_thai === 'published');
        setPosts(publishedPosts);
      } catch (error) {
        console.error('Failed to fetch blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return `${readTime} phút đọc`;
  };

  const getCategory = (post: BaiViet) => {
    // Return the actual category from the post, or default if not set
    return post.category || 'Thông tin Ngành';
  };

  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'Tất cả') return true;
    return getCategory(post) === selectedCategory;
  });

  const featuredPosts = filteredPosts.slice(0, 2); // Show first 2 as featured
  const regularPosts = filteredPosts.slice(2); // Rest as regular posts

  if (loading) {
    return (
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-muted-foreground">Đang tải bài viết...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-4 mb-16 animate-fade-in-up">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Blog</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Tin tức & Câu chuyện
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Cập nhật tin tức mới nhất, câu chuyện nghệ sĩ và thông tin từ ngành công nghiệp âm nhạc.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-12 animate-fade-in-up animate-delay-100">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Chưa có bài viết nào trong danh mục này.</p>
          </div>
        ) : (
          <>
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className={`group animate-fade-in-up animate-delay-${Math.floor((0.2 + idx * 0.1) * 10)}`}
                  >
                    <article className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                      <div className="aspect-16/10 overflow-hidden">
                        {post.anh_dai_dien ? (
                          <Image 
                            src={post.anh_dai_dien} 
                            alt={post.tieude}
                            width={800}
                            height={500}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-4xl font-bold text-primary/50">{post.tieude.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                            {getCategory(post)}
                          </span>
                          <span className="text-muted-foreground">{getReadTime(post.noidung)}</span>
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.tieude}
                        </h2>
                        <p className="text-muted-foreground line-clamp-2">{post.tomtat || 'Không có tóm tắt'}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="text-xs font-medium text-primary">A</span>
                            </div>
                            <span className="text-sm font-medium text-foreground">Admin</span>
                          </div>
                          <span className="text-sm text-muted-foreground">{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}

            {/* Regular Posts */}
            {regularPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.id}`}
                    className={`group animate-fade-in-up animate-delay-${Math.floor((0.4 + idx * 0.1) * 10)}`}
                  >
                    <article className="h-full overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                      <div className="aspect-video overflow-hidden">
                        {post.anh_dai_dien ? (
                          <Image 
                            src={post.anh_dai_dien} 
                            alt={post.tieude}
                            width={400}
                            height={225}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-2xl font-bold text-primary/50">{post.tieude.charAt(0)}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 space-y-3">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                            {getCategory(post)}
                          </span>
                          <span className="text-muted-foreground">{getReadTime(post.noidung)}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {post.tieude}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{post.tomtat || 'Không có tóm tắt'}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <span className="text-xs font-medium text-foreground">Admin</span>
                          <span className="text-xs text-muted-foreground">{formatDate(post.created_at)}</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Load More - Hidden for now since we have all posts */}
        {filteredPosts.length > 0 && filteredPosts.length <= 6 && (
          <div className="flex justify-center mt-16">
            <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105">
              Tải thêm bài viết
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
