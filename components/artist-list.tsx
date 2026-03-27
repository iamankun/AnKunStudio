'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { layDanhSachArtists } from '@/lib/artists';

const genres = ['Tất cả', 'Electronic', 'Pop', 'Hip-Hop', 'R&B', 'Indie', 'Classical', 'Synthwave', 'Folk', 'EDM', 'Jazz', 'Rock', 'Reggae'];

export function ArtistList() {
  const [selectedGenre, setSelectedGenre] = useState('Tất cả');
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await layDanhSachArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists.filter(artist => {
    const matchesGenre = selectedGenre === 'Tất cả' || artist.genre?.includes(selectedGenre);
    const matchesSearch = artist.name?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  const featuredArtists = filteredArtists.filter(a => a.verified);
  const regularArtists = filteredArtists.filter(a => !a.verified);

  if (loading) {
    return (
      <section className="w-full py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Đang tải danh sách nghệ sĩ...</p>
          </div>
        </div>
      </section>
    );
  }

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
        <div className="flex flex-col md:flex-row gap-4 mb-12 animate-fade-in-up animate-delay-100">
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
        <div className="flex flex-wrap gap-2 mb-12 animate-fade-in-up animate-delay-150">
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
            <h2 className="text-2xl font-bold text-foreground mb-6">Nghệ sĩ tiêu biểu</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {featuredArtists.map((artist, idx) => (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.slug}`}
                  className={`group animate-fade-in-up animate-delay-${Math.floor((0.2 + idx * 0.1) * 10)}`}
                >
                  <article className="relative overflow-hidden rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl">
                    <div className="aspect-square overflow-hidden">
                      <Image 
                        src={artist.avatar_url || '/anhdaidiennghesi.jpg?height=400&width=400'} 
                        alt={artist.name}
                        width={400}
                        height={400}
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
                            <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                          </svg>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{artist.genre?.[0] || 'Unknown'}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{artist.monthly_listeners || '0'} người nghe hàng tháng</span>
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
              className={`group text-center animate-fade-in-up animate-delay-${Math.floor((0.3 + idx * 0.05) * 20)}`}
            >
              <article className="text-center">
                <div className="relative mb-4">
                  <div className="aspect-square rounded-full overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 border-2 border-transparent group-hover:border-primary transition-all duration-300 flex items-center justify-center">
                    <Image 
                      src={artist.avatar_url || '/placeholder.svg?height=200&width=200'} 
                      alt={artist.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {artist.verified && (
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {artist.name}
                </h3>
                <p className="text-xs text-muted-foreground">{artist.genre?.[0] || 'Unknown'}</p>
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
