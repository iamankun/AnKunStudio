'use client';

import Link from 'next/link';
import { useState } from 'react';

const artists = [
  {
    id: 1,
    slug: 'luna-echo',
    name: 'Luna Echo',
    genre: 'Electronic',
    monthlyListeners: '2.5M',
    followers: '1.2M',
    image: '/artists/luna-echo.jpg',
    verified: true,
    featured: true,
    bio: 'Nhà sản xuất âm nhạc điện tử nổi tiếng với những âm thanh hư ảo',
  },
  {
    id: 2,
    slug: 'rising-sun',
    name: 'Rising Sun',
    genre: 'Pop',
    monthlyListeners: '1.8M',
    followers: '890K',
    image: '/artists/rising-sun.jpg',
    verified: true,
    featured: true,
    bio: 'Hiện tượng Pop kết hợp giai điệu bắt tai với lời ca sâu sắc',
  },
  {
    id: 3,
    slug: 'urban-beats',
    name: 'Urban Beats',
    genre: 'Hip-Hop',
    monthlyListeners: '3.2M',
    followers: '1.5M',
    image: '/artists/urban-beats.jpg',
    verified: true,
    featured: true,
    bio: 'Nhóm hip-hop mang âm thanh đường phố vào dòng chính',
  },
  {
    id: 4,
    slug: 'soul-harmony',
    name: 'Soul Harmony',
    genre: 'R&B',
    monthlyListeners: '2.1M',
    followers: '980K',
    image: '/artists/soul-harmony.jpg',
    verified: true,
    featured: false,
    bio: 'Bộ đôi R&B tạo nên âm nhạc mượt mà, đầy cảm xúc',
  },
  {
    id: 5,
    slug: 'wave-riders',
    name: 'Wave Riders',
    genre: 'Indie',
    monthlyListeners: '1.4M',
    followers: '620K',
    image: '/artists/wave-riders.jpg',
    verified: false,
    featured: false,
    bio: 'Ban nhạc Indie với sự pha trộn độc đáo của alternative rock',
  },
  {
    id: 6,
    slug: 'pure-notes',
    name: 'Pure Notes',
    genre: 'Classical',
    monthlyListeners: '980K',
    followers: '450K',
    image: '/artists/pure-notes.jpg',
    verified: true,
    featured: false,
    bio: 'Nghệ sĩ piano cổ điển mang các tác phẩm vượt thời gian đến với khán giả mới',
  },
  {
    id: 7,
    slug: 'neon-dreams',
    name: 'Neon Dreams',
    genre: 'Synthwave',
    monthlyListeners: '1.1M',
    followers: '520K',
    image: '/artists/neon-dreams.jpg',
    verified: false,
    featured: false,
    bio: 'Nghệ sĩ Synthwave tạo nên các âm cảnh retro-futuristic',
  },
  {
    id: 8,
    slug: 'acoustic-soul',
    name: 'Acoustic Soul',
    genre: 'Folk',
    monthlyListeners: '870K',
    followers: '390K',
    image: '/artists/acoustic-soul.jpg',
    verified: true,
    featured: false,
    bio: 'Nhạc sĩ Folk singer-songwriter với những câu chuyện từ trái tim',
  },
  {
    id: 9,
    slug: 'bass-culture',
    name: 'Bass Culture',
    genre: 'EDM',
    monthlyListeners: '2.8M',
    followers: '1.3M',
    image: '/artists/bass-culture.jpg',
    verified: true,
    featured: false,
    bio: 'Nhà sản xuất EDM nổi tiếng với các bản hit lễ hội bùng nổ',
  },
  {
    id: 10,
    slug: 'midnight-jazz',
    name: 'Midnight Jazz',
    genre: 'Jazz',
    monthlyListeners: '650K',
    followers: '280K',
    image: '/artists/midnight-jazz.jpg',
    verified: false,
    featured: false,
    bio: 'Nhóm nhạc Jazz kết hợp phong cách truyền thống và hiện đại',
  },
  {
    id: 11,
    slug: 'rock-rebellion',
    name: 'Rock Rebellion',
    genre: 'Rock',
    monthlyListeners: '1.9M',
    followers: '870K',
    image: '/artists/rock-rebellion.jpg',
    verified: true,
    featured: false,
    bio: 'Ban nhạc Rock mang âm thanh cổ điển trở lại với nét hiện đại',
  },
  {
    id: 12,
    slug: 'tropical-vibes',
    name: 'Tropical Vibes',
    genre: 'Reggae',
    monthlyListeners: '720K',
    followers: '340K',
    image: '/artists/tropical-vibes.jpg',
    verified: false,
    featured: false,
    bio: 'Nghệ sĩ Reggae lan tỏa năng lượng tích cực khắp nơi',
  },
];

const genres = ['Tất cả', 'Electronic', 'Pop', 'Hip-Hop', 'R&B', 'Indie', 'Classical', 'Synthwave', 'Folk', 'EDM', 'Jazz', 'Rock', 'Reggae'];

export function ArtistList() {
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArtists = artists.filter(artist => {
    const matchesGenre = selectedGenre === 'Tất cả' || artist.genre === selectedGenre;
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featuredArtists = filteredArtists.filter(a => a.featured);
  const regularArtists = filteredArtists.filter(a => !a.featured);

  return (
    <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="space-y-4 mb-12 animate-fade-in-up">
          <p className="text-sm font-semibold text-primary uppercase tracking-widest">Danh sách Nghệ sĩ</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Khám phá Nghệ sĩ
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Khám phá danh sách nghệ sĩ tài năng đa dạng từ khắp nơi trên thế giới, bao gồm mọi thể loại và phong cách.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="relative flex-1 max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Tìm kiếm nghệ sĩ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Genre Filter */}
        <div className="flex flex-wrap gap-2 mb-12 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          {genres.map((genre, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedGenre === genre
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Featured Artists */}
        {featuredArtists.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-6">Nghệ sĩ Tiêu biểu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredArtists.map((artist, idx) => (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.slug}`}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
                >
                  <article className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={artist.image} 
                        alt={artist.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {artist.name}
                        </h3>
                        {artist.verified && (
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{artist.genre}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{artist.monthlyListeners} người nghe hàng tháng</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* All Artists */}
        <h2 className="text-2xl font-bold text-foreground mb-6">Tất cả Nghệ sĩ</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {regularArtists.map((artist, idx) => (
            <Link
              key={artist.id}
              href={`/artists/${artist.slug}`}
              className="group animate-fade-in-up"
              style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
            >
              <article className="text-center">
                <div className="relative mb-4">
                  <div className="aspect-square rounded-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 border-2 border-transparent group-hover:border-primary transition-all duration-300">
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {artist.verified && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {artist.name}
                </h3>
                <p className="text-xs text-muted-foreground">{artist.genre}</p>
              </article>
            </Link>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-lg text-muted-foreground">Không tìm thấy nghệ sĩ nào phù hợp</p>
          </div>
        )}
      </div>
    </section>
  );
}
