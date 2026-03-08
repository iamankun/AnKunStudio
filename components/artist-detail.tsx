'use client';

import Link from 'next/link';

const artist = {
  name: 'Luna Echo',
  genre: 'Electronic',
  monthlyListeners: '2.5M',
  followers: '1.2M',
  verified: true,
  bio: `Luna Echo is an electronic music producer and DJ who has been making waves in the music industry since 2020. Known for her ethereal soundscapes and innovative production techniques, she has quickly become one of the most exciting artists in the electronic music scene.

Born and raised in Tokyo, Luna's music is heavily influenced by the city's vibrant nightlife and cutting-edge technology. Her unique blend of ambient textures, powerful basslines, and haunting vocals has earned her a dedicated global fanbase and critical acclaim from industry professionals.

Since signing with WMG in 2023, Luna has released two critically acclaimed EPs and collaborated with some of the biggest names in electronic music. Her live performances are known for their immersive visual experiences and emotional intensity.`,
  image: '/artists/luna-echo.jpg',
  coverImage: '/artists/luna-echo-cover.jpg',
  socials: {
    spotify: 'https://spotify.com',
    instagram: 'https://instagram.com',
    twitter: 'https://twitter.com',
    youtube: 'https://youtube.com',
  },
  stats: {
    monthlyListeners: '2.5M',
    followers: '1.2M',
    totalStreams: '85M',
    topChart: '#12',
  },
  popularTracks: [
    { id: 1, title: 'Midnight Dreams', plays: '12.4M', duration: '3:45', album: 'Ethereal', image: '/tracks/midnight-dreams.jpg' },
    { id: 2, title: 'Neon Lights', plays: '8.7M', duration: '4:02', album: 'Ethereal', image: '/tracks/neon-lights.jpg' },
    { id: 3, title: 'Digital Soul', plays: '6.2M', duration: '3:28', album: 'Awakening', image: '/tracks/digital-soul.jpg' },
    { id: 4, title: 'Starlight', plays: '5.8M', duration: '4:15', album: 'Awakening', image: '/tracks/starlight.jpg' },
    { id: 5, title: 'Echo Chamber', plays: '4.9M', duration: '3:55', album: 'Ethereal', image: '/tracks/echo-chamber.jpg' },
  ],
  albums: [
    { id: 1, title: 'Ethereal', year: '2025', tracks: 12, image: '/albums/ethereal.jpg' },
    { id: 2, title: 'Awakening', year: '2024', tracks: 8, image: '/albums/awakening.jpg' },
    { id: 3, title: 'First Light EP', year: '2023', tracks: 5, image: '/albums/first-light.jpg' },
  ],
  upcomingEvents: [
    { id: 1, title: 'Ultra Music Festival', location: 'Miami, FL', date: 'March 28, 2026', venue: 'Bayfront Park' },
    { id: 2, title: 'Tomorrowland', location: 'Boom, Belgium', date: 'July 19, 2026', venue: 'De Schorre' },
    { id: 3, title: 'Asia Tour 2026', location: 'Tokyo, Japan', date: 'September 5, 2026', venue: 'Zepp DiverCity' },
  ],
  relatedArtists: [
    { id: 2, slug: 'rising-sun', name: 'Rising Sun', genre: 'Pop', image: '/artists/rising-sun.jpg' },
    { id: 7, slug: 'neon-dreams', name: 'Neon Dreams', genre: 'Synthwave', image: '/artists/neon-dreams.jpg' },
    { id: 9, slug: 'bass-culture', name: 'Bass Culture', genre: 'EDM', image: '/artists/bass-culture.jpg' },
  ],
};

export function ArtistDetail() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-primary/40 to-primary/10" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 lg:p-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-background shadow-2xl bg-linear-to-br from-primary/30 to-primary/10 flex items-center justify-center shrink-0">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
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
                <span className="text-lg">{artist.genre}</span>
                <span className="text-lg">{artist.stats.monthlyListeners} monthly listeners</span>
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
              Play
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
              <a href={artist.socials.spotify} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Spotify">
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </a>
              <a href={artist.socials.instagram} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href={artist.socials.twitter} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href={artist.socials.youtube} className="p-2 rounded-full hover:bg-secondary transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5 text-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Người nghe hàng tháng', value: artist.stats.monthlyListeners },
              { label: 'Người theo dõi', value: artist.stats.followers },
              { label: 'Tổng lượt phát', value: artist.stats.totalStreams },
              { label: 'Bảng xếp hạng Toàn cầu', value: artist.stats.topChart },
            ].map((stat, idx) => (
              <div key={idx} className={`p-6 rounded-xl bg-card border border-border text-center animate-fade-in-up animate-delay-${idx + 1}`}>
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tracks */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Bài hát Phổ biến</h2>
          <div className="space-y-2">
            {artist.popularTracks.map((track, idx) => (
              <div
                key={track.id}
                className={`group flex items-center gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-all cursor-pointer animate-fade-in-up animate-stagger-${idx + 1}`}
              >
                <span className="w-8 text-center text-muted-foreground group-hover:hidden">{idx + 1}</span>
                <button 
                  type="button"
                  className="w-8 hidden group-hover:flex items-center justify-center"
                  aria-label={`Play ${track.title}`}
                >
                  <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <div className="w-12 h-12 rounded-md overflow-hidden bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">{track.title}</h3>
                  <p className="text-sm text-muted-foreground">{track.album}</p>
                </div>
                <span className="text-sm text-muted-foreground hidden sm:block">{track.plays}</span>
                <button 
                  type="button"
                  className="p-2 rounded-full opacity-0 group-hover:opacity-100 hover:bg-primary/10 transition-all"
                  aria-label={`Like ${track.title}`}
                >
                  <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <span className="text-sm text-muted-foreground w-12 text-right">{track.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discography */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Danh mục Phát hành</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {artist.albums.map((album, idx) => (
              <div key={album.id} className={`group cursor-pointer animate-fade-in-up animate-delay-${idx + 1}`}>
                <div className="aspect-square rounded-xl overflow-hidden mb-4 bg-linear-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:shadow-lg transition-all">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{album.title}</h3>
                <p className="text-sm text-muted-foreground">{album.year} - {album.tracks} bài hát</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Về</h2>
          <div className="max-w-3xl">
            <p className="text-muted-foreground whitespace-pre-line leading-relaxed">{artist.bio}</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sự kiện Sắp diễn ra</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artist.upcomingEvents.map((event, idx) => (
              <div
                key={event.id}
                className={`p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all animate-fade-in-up animate-delay-${idx + 1}`}
              >
                <p className="text-primary font-semibold mb-2">{event.date}</p>
                <h3 className="text-lg font-bold text-foreground mb-1">{event.title}</h3>
                <p className="text-muted-foreground text-sm">{event.venue}</p>
                <p className="text-muted-foreground text-sm">{event.location}</p>
                <button className="mt-4 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all">
                  Mua Vé
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Artists */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-6">Fan cũng Thích</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {artist.relatedArtists.map((relatedArtist, idx) => (
              <Link
                key={relatedArtist.id}
                href={`/artists/${relatedArtist.slug}`}
                className={`group text-center animate-fade-in-up animate-delay-${idx + 1}`}
              >
                <div className="aspect-square rounded-full overflow-hidden mb-4 bg-linear-to-br from-primary/20 to-primary/5 border-2 border-transparent group-hover:border-primary transition-all flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">{relatedArtist.name}</h3>
                <p className="text-xs text-muted-foreground">{relatedArtist.genre}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
