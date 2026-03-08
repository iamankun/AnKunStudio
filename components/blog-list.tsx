'use client';

import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    slug: 'the-future-of-music-streaming',
    title: 'Tương lai của Phát trực tuyến Âm nhạc: Điều Nghệ sĩ Cần Biết',
    excerpt: 'Khám phá bối cảnh đang phát triển của các nền tảng phát trực tuyến âm nhạc và cách nghệ sĩ có thể tối đa hóa phạm vi tiếp cận trong kỷ nguyên số.',
    author: 'Trần Thị Mai',
    date: '05/03/2026',
    readTime: '8 phút đọc',
    category: 'Thông tin Ngành',
    image: '/blog/streaming-future.jpg',
    featured: true,
  },
  {
    id: 2,
    slug: 'rising-star-interview-luna-echo',
    title: 'Phỏng vấn Nghệ sĩ Tiêu biểu: Luna Echo về Hành trình đến 10M Lượt phát',
    excerpt: 'Từ nhà sản xuất trong phòng ngủ đến nghệ sĩ đứng đầu bảng xếp hạng, Luna Echo chia sẻ câu chuyện và lời khuyên cho các nhạc sĩ mới nổi.',
    author: 'Nguyễn Văn Minh',
    date: '02/03/2026',
    readTime: '12 phút đọc',
    category: 'Nghệ sĩ Tiêu biểu',
    image: '/blog/luna-echo-interview.jpg',
    featured: true,
  },
  {
    id: 3,
    slug: 'music-production-tips-2026',
    title: '10 Mẹo Sản xuất Âm nhạc hàng đầu cho 2026',
    excerpt: 'Các chuyên gia ngành chia sẻ bí quyết của họ để tạo ra các bài hát sẵn sàng phát sóng trong thị trường âm nhạc cạnh tranh ngày nay.',
    author: 'Lê Hoàng Anh',
    date: '28/02/2026',
    readTime: '10 phút đọc',
    category: 'Sản xuất',
    image: '/blog/production-tips.jpg',
    featured: false,
  },
  {
    id: 4,
    slug: 'sync-licensing-opportunities',
    title: 'Mở khóa Cơ hội Cấp phép Đồng bộ cho Nghệ sĩ Độc lập',
    excerpt: 'Tìm hiểu cách đưa âm nhạc của bạn vào phim, chương trình truyền hình và quảng cáo để mở rộng các nguồn doanh thu.',
    author: 'Phạm Thị Thu',
    date: '25/02/2026',
    readTime: '7 phút đọc',
    category: 'Kinh doanh',
    image: '/blog/sync-licensing.jpg',
    featured: false,
  },
  {
    id: 5,
    slug: 'wmg-global-expansion-announcement',
    title: 'An Kun Studio công bố Mở rộng Toàn cầu vào Đông Nam Á',
    excerpt: 'An Kun Studio tiết lộ kế hoạch mở văn phòng mới tại Việt Nam, Thái Lan và Philippines để hỗ trợ tài năng khu vực.',
    author: 'Đội ngũ Báo chí An Kun Studio',
    date: '20/02/2026',
    readTime: '5 phút đọc',
    category: 'Tin công ty',
    image: '/blog/global-expansion.jpg',
    featured: false,
  },
  {
    id: 6,
    slug: 'ai-in-music-creation',
    title: 'AI đang Biến đổi Sáng tạo Âm nhạc như thế nào',
    excerpt: 'Cái nhìn sâu sắc về cách các công cụ trí tuệ nhân tạo đang được nghệ sĩ và nhà sản xuất sử dụng trong sản xuất âm nhạc hiện đại.',
    author: 'Trần Quang Anh',
    date: '15/02/2026',
    readTime: '15 phút đọc',
    category: 'Công nghệ',
    image: '/blog/ai-music.jpg',
    featured: false,
  },
];

const categories = ['Tất cả', 'Thông tin Ngành', 'Nghệ sĩ Tiêu biểu', 'Sản xuất', 'Kinh doanh', 'Tin công ty', 'Công nghệ'];

export function BlogList() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

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
        <div className="flex flex-wrap gap-2 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          {categories.map((category, idx) => (
            <button
              key={idx}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                idx === 0
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map((post, idx) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
            >
              <article className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                <div className="aspect-16/10 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm">
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-primary">{post.author.charAt(0)}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{post.author}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Regular Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, idx) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
            >
              <article className="h-full overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center gap-3 text-xs">
                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {post.category}
                    </span>
                    <span className="text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <span className="text-xs font-medium text-foreground">{post.author}</span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105">
            Tải thêm bài viết
          </button>
        </div>
      </div>
    </section>
  );
}
