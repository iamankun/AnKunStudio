'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { layArtistTheoSlug } from '@/lib/artists';
import { Artist } from '@/types/database';

interface ArtistDetailProps {
  slug: string;
}

export function ArtistDetail({ slug }: ArtistDetailProps) {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const data = await layArtistTheoSlug(slug);
        if (!data) {
          setError('Không tìm thấy nghệ sĩ');
        } else {
          setArtist(data);
        }
      } catch (err) {
        console.error('Error fetching artist:', err);
        setError('Lỗi khi tải thông tin nghệ sĩ');
      } finally {
        setLoading(false);
      }
    };

    fetchArtist();
  }, [slug]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Đang tải thông tin nghệ sĩ...</p>
        </div>
      </div>
    );
  }

  if (error || !artist) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-destructive/10 mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p className="text-lg text-muted-foreground">{error || 'Không tìm thấy nghệ sĩ'}</p>
        </div>
      </div>
    );
  }

  const socialLinks = artist.social_links || {};

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        {artist.cover_image_url ? (
          <Image
            src={artist.cover_image_url}
            alt={`${artist.name} cover`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-primary/10" />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-background shadow-2xl bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
              {artist.avatar_url ? (
                <Image
                  src={artist.avatar_url}
                  alt={artist.name}
                  width={208}
                  height={208}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="space-y-4 animate-fade-in-up">
              <div className="flex items-center gap-3">
                {artist.verified && (
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Verified Artist
                  </span>
                )}
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground">{artist.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="text-lg">{artist.genre?.[0] || 'Unknown'}</span>
                <span className="text-lg">{artist.monthly_listeners || '0'} người nghe hàng tháng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-8 bg-linear-to-b from-background to-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <button type="button" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Phát
            </button>
            <button type="button" className="px-6 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-primary-foreground transition-all">
              Theo dõi
            </button>
            <button 
              type="button" 
              className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
              aria-label="Share artist"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <div className="flex items-center gap-3 ml-auto">
              {socialLinks.spotify && (
                <a href={socialLinks.spotify} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Spotify">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
              )}
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
              {socialLinks.website && (
                <a href={socialLinks.website} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Website">
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9-9m9 9H3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Người nghe hàng tháng', value: artist.monthly_listeners || '0' },
              { label: 'Người theo dõi', value: artist.followers || '0' },
              { label: 'Tổng lượt phát', value: artist.total_streams || '0' },
              { label: 'Bảng xếp hạng Toàn cầu', value: artist.top_chart || '-' },
            ].map((stat, idx) => (
              <div key={idx} className={`p-6 rounded-xl bg-card border border-border text-center animate-fade-in-up animate-delay-${idx + 1}`}>
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      {artist.bio && (
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">Về {artist.name}</h2>
            <div className="max-w-3xl">
              <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{artist.bio}</p>
            </div>
            {(artist.country || artist.city) && (
              <div className="mt-6 flex gap-4 text-sm text-muted-foreground">
                {artist.country && (
                  <span>Quốc gia: {artist.country}</span>
                )}
                {artist.city && (
                  <span>Thành phố: {artist.city}</span>
                )}
                {artist.label && (
                  <span>Hãng thu âm: {artist.label}</span>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Discography Placeholder */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Danh mục Phát hành</h2>
          <div className="p-8 rounded-xl bg-card border border-border text-center">
            <svg className="w-12 h-12 text-muted-foreground mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="text-muted-foreground">Album và bài hát sẽ sớm được cập nhật</p>
          </div>
        </div>
      </section>
    </div>
  );
}
