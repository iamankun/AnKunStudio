'use client';

import { useMusic, sampleTracks, Track } from '@/lib/music-context';
import { Play, Pause, Heart, Plus } from 'lucide-react';
import Image from 'next/image';

export function Featured() {
  const { currentTrack, isPlaying, playTrack, pause, resume, setIsPlayerVisible } = useMusic();

  const featuredTracks: (Track & { plays: string; durationFormatted: string })[] = sampleTracks.map((track, idx) => ({
    ...track,
    plays: ['4.2M', '3.8M', '5.1M', '2.9M', '3.5M'][idx] || '1.0M',
    durationFormatted: formatDuration(track.duration),
  }));

  const artists = [
    { name: 'Luna Echo', genre: 'Electronic', plays: '2.5M', image: '/artists/luna-echo.jpg' },
    { name: 'Rising Sun', genre: 'Pop', plays: '1.8M', image: '/artists/rising-sun.jpg' },
    { name: 'Urban Beats', genre: 'Hip-Hop', plays: '3.2M', image: '/artists/urban-beats.jpg' },
    { name: 'Soul Harmony', genre: 'R&B', plays: '2.1M', image: '/artists/soul-harmony.jpg' },
    { name: 'Wave Riders', genre: 'Indie', plays: '1.4M', image: '/artists/wave-riders.jpg' },
    { name: 'Pure Notes', genre: 'Classical', plays: '980K', image: '/artists/pure-notes.jpg' },
  ];

  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const handlePlayTrack = (track: Track) => {
    console.log('handlePlayTrack called with:', track.title);
    console.log('Current track:', currentTrack?.title);
    console.log('Is playing:', isPlaying);
    console.log('Track ID match:', currentTrack?.id === track.id);
    
    setIsPlayerVisible(true); // Show music player
    
    if (currentTrack?.id === track.id) {
      console.log('Same track selected');
      if (isPlaying) {
        console.log('Track is playing, calling pause...');
        pause();
      } else {
        console.log('Track is paused, calling resume...');
        resume();
      }
    } else {
      console.log('Different track, calling playTrack...');
      playTrack(track);
    }
  };

  return (
    <section id="featured" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-background to-secondary/20">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Trending Now */}
        <div className="space-y-12">
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Nổi bật</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight rainbow-text inline-block leading-tight">
              Đang thịnh hành
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Khám phá các bài hát nóng nhất và các nghệ sĩ mới nổi từ khắp nơi trên thế giới
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredTracks.slice(0, 4).map((track) => {
              const isCurrentTrack = currentTrack?.id === track.id;
              const isCurrentlyPlaying = isCurrentTrack && isPlaying;

              return (
                <div
                  key={track.id}
                  className="group cursor-pointer animate-fade-in-up animate-delay-[0ms]"
                >
                  <div className="relative overflow-hidden rounded-xl mb-4">
                    <div className="aspect-square relative overflow-hidden bg-secondary">
                      <Image
                        src={track.cover}
                        alt={track.title}
                        fill
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                        <button
                          onClick={() => handlePlayTrack(track)}
                          className={`transition-all duration-300 transform w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary ${
                            isCurrentlyPlaying
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0'
                          }`}
                        >
                          {isCurrentlyPlaying ? (
                            <Pause className="w-5 h-5 text-primary-foreground" />
                          ) : (
                            <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                          )}
                        </button>
                      </div>
                      {isCurrentlyPlaying && (
                        <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1">
                          <div className="flex items-end gap-0.5 h-4">
                            {[1, 2, 3, 4].map((bar) => (
                              <div
                                key={bar}
                                className={`w-1 bg-primary rounded-full animate-pulse animate-delay-[${bar * 100}ms] ${
                                  bar === 1 ? 'h-2/4' : 
                                  bar === 2 ? 'h-3/4' : 
                                  bar === 3 ? 'h-full' : 
                                  'h-1/2'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-white font-medium ml-1">Đang phát</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className={`font-semibold transition-colors duration-300 line-clamp-1 ${
                      isCurrentTrack ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {track.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                      {track.artist}
                    </p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-2">
                      <span>{track.plays} lượt nghe</span>
                      <span>{track.durationFormatted}</span>
                    </div>

                    <div className="pt-3 border-t border-border group-hover:border-primary/30 transition-colors duration-300 flex items-center justify-between">
                      <div className="flex gap-2">
                        <button 
                          type="button"
                          className="p-1.5 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          aria-label="Like track"
                        >
                          <Heart className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                        </button>
                        <button 
                          type="button"
                          className="p-1.5 rounded-full hover:bg-primary/10 transition-colors duration-300"
                          aria-label="Add to playlist"
                        >
                          <Plus className="w-4 h-4 text-foreground group-hover:text-primary transition-colors" />
                        </button>
                      </div>
                      <button
                        onClick={() => handlePlayTrack(track)}
                        className="text-primary font-medium text-xs hover:underline"
                      >
                        {isCurrentlyPlaying ? 'Pause' : 'Listen'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discover Amazing Talent */}
        <div className="space-y-12">
          <div className="space-y-4 animate-fade-in-up">
            <p className="text-sm font-semibold text-primary uppercase tracking-widest">Nghệ sĩ</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight rainbow-text inline-block leading-tight">
              Khám phá Tài năng Phi thường
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Gặp gỡ các nghệ sĩ đang định hình tương lai của âm nhạc
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {artists.map((artist, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-xl bg-linear-to-br from-primary/20 to-primary/5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer animate-fade-in-up animate-delay-[${Math.floor((0.1 + idx * 0.08) * 1000)}ms]`}
              >
                <div className="relative w-full h-32 overflow-hidden rounded-t-xl">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                <div className="relative p-3 space-y-1">
                  <h4 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-1">
                    {artist.name}
                  </h4>
                  <p className="text-xs text-muted-foreground">{artist.genre}</p>
                  <div className="pt-2 border-t border-primary/10 group-hover:border-primary/30 transition-colors duration-300">
                    <p className="text-xs font-medium text-primary">{artist.plays} lượt nghe</p>
                  </div>
                </div>

                <div className="absolute inset-0 bg-linear-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
