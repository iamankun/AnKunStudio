'use client';

import Link from 'next/link';

const blogPost = {
  title: 'The Future of Music Streaming: What Artists Need to Know',
  excerpt: 'Explore the evolving landscape of music streaming platforms and how artists can maximize their reach in the digital age.',
  author: {
    name: 'Sarah Chen',
    role: 'Music Industry Analyst',
    avatar: '/authors/sarah-chen.jpg',
  },
  date: 'March 5, 2026',
  readTime: '8 min read',
  category: 'Industry Insights',
  image: '/blog/streaming-future.jpg',
  content: `
    <p>The music streaming landscape is evolving at an unprecedented pace. As we move further into 2026, artists and industry professionals must stay ahead of the curve to maximize their reach and revenue in this digital-first era.</p>

    <h2>The Current State of Streaming</h2>
    <p>With over 600 million paid streaming subscribers globally, the music industry has firmly established streaming as its primary revenue driver. Platforms like Spotify, Apple Music, and emerging regional players continue to compete for market share, creating both opportunities and challenges for artists.</p>

    <p>The average listener now consumes over 20 hours of music per week through streaming services, a significant increase from just five years ago. This shift in consumption patterns has fundamentally changed how artists approach release strategies, marketing, and fan engagement.</p>

    <h2>Key Trends Shaping the Future</h2>

    <h3>1. Personalization and AI-Driven Discovery</h3>
    <p>Streaming platforms are investing heavily in AI-powered recommendation systems. These algorithms analyze listening patterns, contextual data, and even emotional states to deliver increasingly personalized experiences. For artists, this means understanding how to optimize their music and metadata for algorithmic discovery is more important than ever.</p>

    <h3>2. Spatial Audio and Immersive Experiences</h3>
    <p>Dolby Atmos and spatial audio formats are becoming standard offerings across major platforms. Artists who embrace these technologies early can differentiate their work and create more engaging listening experiences. Studios and producers are rapidly adapting their workflows to accommodate these new formats.</p>

    <h3>3. Direct Artist-to-Fan Monetization</h3>
    <p>New features allowing artists to sell merchandise, concert tickets, and exclusive content directly through streaming platforms are gaining traction. This vertical integration creates new revenue streams while keeping fans within the streaming ecosystem.</p>

    <h3>4. Regional Platform Growth</h3>
    <p>While global platforms dominate, regional streaming services in Asia, Africa, and Latin America are experiencing explosive growth. Artists looking to expand their international presence must understand and engage with these localized platforms.</p>

    <h2>Strategies for Success</h2>

    <h3>Release Strategy Evolution</h3>
    <p>The traditional album release cycle is giving way to more flexible approaches. Many successful artists now favor:</p>
    <ul>
      <li>Consistent single releases to maintain algorithmic momentum</li>
      <li>Deluxe editions and variant releases to extend album lifecycle</li>
      <li>Collaborative releases to cross-pollinate fan bases</li>
      <li>Strategic timing based on platform-specific data insights</li>
    </ul>

    <h3>Playlist Optimization</h3>
    <p>Playlists remain crucial gatekeepers to new listeners. Artists should focus on:</p>
    <ul>
      <li>Building relationships with playlist curators</li>
      <li>Creating and promoting artist-curated playlists</li>
      <li>Optimizing release timing for playlist consideration</li>
      <li>Understanding genre-specific playlist ecosystems</li>
    </ul>

    <h3>Data-Driven Decision Making</h3>
    <p>Access to streaming data has democratized industry insights. Smart artists and their teams are leveraging:</p>
    <ul>
      <li>Geographic streaming data for tour routing</li>
      <li>Demographic insights for targeted marketing</li>
      <li>Listening pattern analysis for release timing</li>
      <li>Competitive analysis within genre spaces</li>
    </ul>

    <h2>The Road Ahead</h2>
    <p>As streaming continues to evolve, artists who embrace change and stay informed will be best positioned for success. The key is balancing creative authenticity with strategic platform optimization – maintaining artistic vision while understanding the mechanics of digital discovery.</p>

    <p>At WMG, we're committed to helping our artists navigate this complex landscape. Our team of digital strategists and data analysts work closely with artists to develop customized streaming strategies that amplify their unique voices while maximizing their reach and revenue potential.</p>

    <p>The future of music streaming is bright, and those who adapt will thrive. Stay tuned to our blog for more insights and strategies as we continue to track this rapidly evolving space.</p>
  `,
  relatedPosts: [
    {
      id: 2,
      slug: 'rising-star-interview-luna-echo',
      title: 'Rising Star Interview: Luna Echo on Her Journey to 10M Streams',
      category: 'Artist Spotlight',
      image: '/blog/luna-echo-interview.jpg',
    },
    {
      id: 3,
      slug: 'music-production-tips-2026',
      title: 'Top 10 Music Production Tips for 2026',
      category: 'Production',
      image: '/blog/production-tips.jpg',
    },
    {
      id: 6,
      slug: 'ai-in-music-creation',
      title: 'How AI is Transforming Music Creation',
      category: 'Technology',
      image: '/blog/ai-music.jpg',
    },
  ],
};

export function BlogPostDetail() {
  return (
    <article className="w-full">
      {/* Hero Section */}
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-secondary/30 to-background">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-8 animate-fade-in-down">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{blogPost.category}</span>
          </nav>

          {/* Category & Read Time */}
          <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
            <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm">
              {blogPost.category}
            </span>
            <span className="text-muted-foreground text-sm">{blogPost.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up text-balance animate-delay-100">
            {blogPost.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up animate-delay-200">
            {blogPost.excerpt}
          </p>

          {/* Author & Date */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-border animate-fade-in-up animate-delay-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-lg font-semibold text-primary">{blogPost.author.name.charAt(0)}</span>
              </div>
              <div>
                <p className="font-semibold text-foreground">{blogPost.author.name}</p>
                <p className="text-sm text-muted-foreground">{blogPost.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground">{blogPost.date}</span>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" title="Share on Twitter">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" title="Share on LinkedIn">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-secondary transition-colors" title="Copy link">
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="w-full px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-21/9 rounded-2xl overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-li:text-muted-foreground">
          <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
        </div>
      </section>

      {/* Tags */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {['Streaming', 'Music Industry', 'Digital Strategy', 'Artist Growth', 'Technology'].map((tag, idx) => (
              <span key={idx} className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-primary/10 transition-colors cursor-pointer">
                #{tag.replace(' ', '')}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Author Card */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-primary">{blogPost.author.name.charAt(0)}</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg text-foreground">{blogPost.author.name}</h3>
                <p className="text-sm text-primary">{blogPost.author.role}</p>
                <p className="text-muted-foreground">
                  Sarah is a music industry analyst with over 10 years of experience covering streaming trends, artist development, and digital marketing strategies. She regularly speaks at industry conferences and consults for major labels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPost.relatedPosts.map((post, idx) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className={`group animate-fade-in-up animate-delay-${Math.floor((0.1 + idx * 0.1) * 10)}`}
              >
                <article className="h-full overflow-hidden rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                  <div className="aspect-video overflow-hidden">
                    <div className="w-full h-full bg-linear-to-br from-primary/15 to-primary/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="p-5 space-y-3">
                    <span className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-medium text-xs">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
