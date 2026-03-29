'use client';

import Image from 'next/image';
import { Artist, SocialLinks } from '@/types/database';

interface ArtistDetailProps {
  artist: Artist;
}

function isSocialLinks(obj: unknown): obj is SocialLinks {
  return typeof obj === 'object' && obj !== null && !Array.isArray(obj);
}

export function ArtistDetail({ artist }: ArtistDetailProps) {
  const socialLinks = isSocialLinks(artist.social_links) ? artist.social_links : {};

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        {artist.cover_image_url ? (
          <Image
            src={artist.cover_image_url}
            alt={`${artist.name} cover`}
            fill
            sizes="100vw"
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
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={(artist.avatar_url as string) || '/anhdaidiennghesi.jpg'}
                    alt={artist.name as string}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
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
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                    Nghệ sĩ xác minh
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
              {socialLinks.apple_music && (
                <a href={socialLinks.apple_music} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Apple Music">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-2.954-1.71-.922-3.72-1.15-5.64-1.314-3.08-.279-6.16-.264-9.24-.043-1.54.117-3.08.346-4.54.804C1.39 1.102.4 2.122.09 3.49c-.14.55-.187 1.12-.227 1.69-.06.83-.03 1.66.01 2.49.08 1.76.24 3.52.46 5.26.14 1.09.3 2.17.52 3.24.33 1.61 1.06 2.91 2.46 3.74 1.4.83 2.96 1.12 4.56 1.24 1.46.11 2.93.09 4.4.06.28-.01.56-.02.83-.04.62-.04 1.24-.09 1.86-.17.51-.07 1.02-.17 1.51-.3 1.38-.37 2.54-1.11 3.14-2.44.37-.82.51-1.7.63-2.59.16-1.26.21-2.53.21-3.8 0-.57-.01-1.14-.03-1.71.03-.43.07-.85.13-1.27.12-.83.31-1.64.59-2.42.37-1.04.91-1.97 1.6-2.78.16-.19.33-.37.51-.54zm-6.84 11.86c-.19.55-.48 1.03-.86 1.45-.37.41-.83.74-1.36.97-.53.23-1.11.35-1.73.35-.62 0-1.2-.12-1.73-.35-.53-.23-.99-.56-1.36-.97-.38-.42-.67-.9-.86-1.45-.19-.54-.29-1.13-.29-1.74 0-.61.1-1.2.29-1.74.19-.55.48-1.03.86-1.45.37-.41.83-.74 1.36-.97.53-.23 1.11-.35 1.73-.35.62 0 1.2.12 1.73.35.53.23.99.56 1.36.97.38.42.67.9.86 1.45.19.54.29 1.13.29 1.74 0 .61-.1 1.2-.29 1.74z"/>
                    <path d="M12 8.96c-1.11 0-2.12.45-2.85 1.18-.73.73-1.18 1.74-1.18 2.85 0 1.11.45 2.12 1.18 2.85.73.73 1.74 1.18 2.85 1.18 1.11 0 2.12-.45 2.85-1.18.73-.73 1.18-1.74 1.18-2.85 0-1.11-.45-2.12-1.18-2.85-.73-.73-1.74-1.18-2.85-1.18z"/>
                  </svg>
                </a>
              )}
              {socialLinks.soundcloud && (
                <a href={socialLinks.soundcloud} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="SoundCloud">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.054-.049-.1-.084-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.195-1.308-.21-1.332c-.009-.057-.039-.094-.062-.094zm1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.105.104.105.06 0 .105-.045.12-.105l.24-2.474-.255-2.548c-.015-.06-.06-.103-.104-.103zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.21-2.544-.225-2.64c-.016-.075-.06-.135-.151-.135zm.931-.45c-.09 0-.149.075-.165.165l-.18 2.789.195 2.52c.016.09.075.165.165.165.089 0 .164-.076.18-.165l.18-2.52-.195-2.789c-.016-.09-.075-.165-.18-.165zm.915-.337c-.104 0-.18.09-.18.18l-.165 3.09.165 2.549c.015.104.09.18.18.18.089 0 .164-.076.18-.18l.18-2.549-.18-3.09c-.016-.09-.09-.18-.18-.18zm.931-.045c-.119 0-.21.105-.21.225l-.165 3.18.165 2.454c.016.119.09.21.21.21.104 0 .195-.09.21-.21l.165-2.454-.18-3.18c-.016-.12-.09-.225-.195-.225zm.945-.06c-.135 0-.226.12-.24.24l-.15 3.24.165 2.429c.015.135.105.24.24.24.119 0 .225-.12.24-.24l.165-2.43-.165-3.239c-.016-.12-.105-.24-.24-.24zm.971-.015c-.149 0-.255.135-.27.27l-.135 3.239.15 2.399c.016.15.121.27.27.27.134 0 .24-.12.255-.27l.165-2.399-.165-3.24c-.016-.135-.12-.269-.27-.269zm.99-.015c-.164 0-.285.15-.3.315l-.12 3.239.135 2.369c.016.165.135.3.3.3.149 0 .27-.135.285-.3l.15-2.37-.15-3.238c-.016-.165-.136-.315-.285-.315zm1.005-.015c-.18 0-.315.165-.33.345l-.12 3.224.135 2.355c.015.18.15.33.33.33.164 0 .3-.15.315-.33l.15-2.355-.15-3.224c-.015-.18-.15-.345-.33-.345zm.554 8.395c-.074 0-.135.06-.15.15l-.075 2.28.09 2.145c.014.074.075.135.15.135.074 0 .134-.06.149-.135l.09-2.145-.09-2.28c-.015-.09-.075-.15-.15-.15zm.63-1.32c-.09 0-.165.075-.18.18l-.06 3.54.075 2.04c.015.09.09.165.18.165.089 0 .164-.075.179-.165l.09-2.04-.09-3.54c-.015-.105-.09-.18-.18-.18zm.645-3.57c-.105 0-.195.09-.21.21l-.045 3.555.06 2.01c.015.105.09.195.21.195.089 0 .179-.09.195-.21l.075-2.01-.075-3.54c-.016-.12-.09-.21-.21-.21zm.66-5.16c-.12 0-.225.105-.24.24l-.03 3.54.06 1.98c.014.12.105.21.24.21.104 0 .21-.09.225-.21l.06-1.98-.06-3.54c-.016-.135-.12-.24-.24-.24zm.689-1.89c-.135 0-.255.12-.27.27l-.015 3.555.045 1.965c.015.135.12.255.27.255.119 0 .24-.12.255-.27l.045-1.965-.045-3.555c-.016-.15-.135-.27-.27-.27zm.705-1.59c-.15 0-.27.135-.285.3l-.015 3.54.03 1.95c.016.15.135.285.285.285.135 0 .27-.135.285-.3l.03-1.95-.03-3.54c-.016-.165-.135-.3-.3-.3zm.721-1.41c-.165 0-.3.15-.315.33l-.015 3.525.03 1.92c.016.165.15.315.315.315.15 0 .3-.15.315-.33l.03-1.92-.03-3.51c-.016-.18-.15-.33-.315-.33zm.736-1.32c-.18 0-.33.165-.345.36l-.015 3.51.015 1.89c.015.18.165.345.345.345.164 0 .33-.165.345-.36l.03-1.89-.03-3.495c-.016-.195-.165-.36-.345-.36zm.751-1.245c-.195 0-.36.18-.375.39l-.015 3.48.015 1.845c.016.195.18.375.375.375.18 0 .36-.18.375-.39l.015-1.845-.015-3.465c-.016-.21-.18-.39-.375-.39zm.766-1.17c-.21 0-.39.195-.405.42l-.015 3.45.015 1.8c.016.21.195.405.405.405.195 0 .39-.195.405-.42l.015-1.8-.015-3.435c-.016-.225-.195-.42-.405-.42zm.781-1.125c-.225 0-.42.21-.435.45l-.015 3.405.015 1.755c.016.225.21.435.435.435.21 0 .42-.21.435-.45l.015-1.755-.015-3.39c-.016-.24-.21-.45-.435-.45z"/>
                  </svg>
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
