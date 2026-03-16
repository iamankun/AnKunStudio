"use client";

import { useMusic } from '@/lib/music-context';
import { useLyrics } from '@/lib/lyrics-context';
import { LyricsDisplay } from '@/components/lyrics-display';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  X,
  ChevronUp,
  ChevronDown,
  ListMusic,
  Mic2,
} from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function MusicPlayer() {
  const {
    currentTrack,
    isPlaying,
    progress,
    volume,
    queue,
    isPlayerVisible,
    pause,
    resume,
    nextTrack,
    previous,
    setVolume,
    seek,
    closePlayer,
    playTrack,
  } = useMusic();

  const {
    loadLyrics,
    clearLyrics,
    updatePosition,
    isExpanded: isLyricsExpanded,
    toggleExpanded,
  } = useLyrics();

  const [isExpanded, setIsExpanded] = useState(false);
  const [showQueue, setShowQueue] = useState(false);

  // Load lyrics when track changes
  useEffect(() => {
    if (currentTrack) {
      const lyricsUrl = `/tracks/dunglodenanh.json`;
      loadLyrics(lyricsUrl);
    } else {
      clearLyrics();
    }
  }, [currentTrack, loadLyrics, clearLyrics]);

  const getCurrentTime = useMusic().getCurrentTime;
  
  // High-performance 60fps lyrics sync loop
  useEffect(() => {
    let animationFrameId: number;
    
    function syncLyrics() {
      if (isPlaying) {
        const time = getCurrentTime();
        updatePosition(time);
      }
      animationFrameId = requestAnimationFrame(syncLyrics);
    }
    
    if (isPlaying) {
      animationFrameId = requestAnimationFrame(syncLyrics);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, getCurrentTime, updatePosition]);

  const currentTimeDisplay = currentTrack ? (progress / 100) * currentTrack.duration : 0;

  // Handle lyrics button click
  const handleToggleLyrics = useCallback(() => {
    console.log('🎵 Lyrics button clicked, current state:', isLyricsExpanded);
    toggleExpanded();
    console.log('🎵 After toggle, new state should be:', !isLyricsExpanded);
  }, [toggleExpanded, isLyricsExpanded]);

  if (!isPlayerVisible || !currentTrack) return null;

  return (
    <>
      {/* Backdrop for expanded view */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Player */}
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isExpanded
            ? 'bottom-0 top-0 md:top-auto md:bottom-0 md:h-[500px]'
            : 'bottom-0 h-20'
        }`}
      >
        <div
          className={`h-full bg-card/95 backdrop-blur-xl border-t border-border shadow-2xl ${
            isExpanded ? 'rounded-t-3xl' : ''
          }`}
        >
          {/* Collapsed View */}
          {!isExpanded && (
            <div className="h-full px-4 flex items-center gap-4">
              {/* Track Info */}
              <button
                onClick={() => setIsExpanded(true)}
                className="flex items-center gap-3 flex-1 min-w-0 text-left"
              >
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 shadow-lg">
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-sm text-foreground truncate">
                    {currentTrack.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {currentTrack.artist}
                  </p>
                </div>
              </button>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={previous}
                >
                  <SkipBack className="h-4 w-4" />
                </Button>
                <Button
                  variant="default"
                  size="icon"
                  className="h-12 w-12 rounded-full"
                  onClick={isPlaying ? pause : resume}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5 ml-0.5" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  onClick={nextTrack}
                >
                  <SkipForward className="h-4 w-4" />
                </Button>
              </div>

              {/* Progress (desktop) */}
              <div className="hidden md:flex items-center gap-3 flex-1 max-w-md">
                <span className="text-xs text-muted-foreground w-10 text-right">
                  {formatTime(currentTimeDisplay)}
                </span>
                <Slider
                  value={[progress]}
                  onValueChange={(value) => seek(value[0])}
                  max={100}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground w-10">
                  {formatTime(currentTrack.duration)}
                </span>
              </div>

              {/* Volume (desktop) */}
              <div className="hidden md:flex items-center gap-2 w-32">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                >
                  {volume === 0 ? (
                    <VolumeX className="h-4 w-4" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
                <Slider
                  value={[volume * 100]}
                  onValueChange={(value) => setVolume(value[0] / 100)}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>

              {/* Lyrics button */}
              <Button
                variant={isLyricsExpanded ? "default" : "ghost"}
                size="icon"
                className="h-8 w-8 transition-all hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log('🔘 Button clicked!');
                  handleToggleLyrics();
                }}
                aria-label="Hiển thị lời bài hát"
                title="Hiển thị lời bài hát"
              >
                <Mic2 className={`h-4 w-4 ${isLyricsExpanded ? 'text-primary-foreground' : ''}`} />
              </Button>

              {/* Expand button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsExpanded(true)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>

              {/* Close button */}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={closePlayer}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Expanded View */}
          {isExpanded && (
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsExpanded(false)}
                >
                  <ChevronDown className="h-5 w-5" />
                </Button>
                <span className="text-sm font-medium">Đang Phát</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowQueue(!showQueue)}
                >
                  <ListMusic className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Main Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 gap-6">
                  {/* Album Art */}
                  <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={currentTrack.cover}
                      alt={currentTrack.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Track Info */}
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-foreground">
                      {currentTrack.title}
                    </h2>
                    <p className="text-muted-foreground">{currentTrack.artist}</p>
                    <p className="text-sm text-muted-foreground/70">
                      {currentTrack.album}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="w-full max-w-md space-y-2">
                    <Slider
                      value={[progress]}
                      onValueChange={(value) => seek(value[0])}
                      max={100}
                      step={0.1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{formatTime(currentTimeDisplay)}</span>
                      <span>{formatTime(currentTrack.duration)}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={previous}
                    >
                      <SkipBack className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      className="h-16 w-16 rounded-full"
                      onClick={isPlaying ? pause : resume}
                    >
                      {isPlaying ? (
                        <Pause className="h-8 w-8" />
                      ) : (
                        <Play className="h-8 w-8 ml-1" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={nextTrack}
                    >
                      <SkipForward className="h-6 w-6" />
                    </Button>
                  </div>

                  {/* Volume */}
                  <div className="flex items-center gap-3 w-full max-w-xs">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
                    >
                      {volume === 0 ? (
                        <VolumeX className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                    <Slider
                      value={[volume * 100]}
                      onValueChange={(value) => setVolume(value[0] / 100)}
                      max={100}
                      step={1}
                      className="flex-1"
                    />
                  </div>
                </div>

                {/* Queue Panel */}
                {showQueue && !isLyricsExpanded && (
                  <div className="md:w-80 border-t md:border-t-0 md:border-l border-border overflow-y-auto">
                    <div className="p-4">
                      <h3 className="font-semibold mb-4">Tiếp theo</h3>
                      <div className="space-y-2">
                        {queue.map((track) => (
                          <button
                            key={track.id}
                            onClick={() => playTrack(track)}
                            className={`w-full flex items-center gap-3 p-2 rounded-lg transition-colors ${
                              track.id === currentTrack.id
                                ? 'bg-primary/10'
                                : 'hover:bg-secondary'
                            }`}
                          >
                            <div className="relative w-10 h-10 rounded overflow-hidden shrink-0">
                              <Image
                                src={track.cover}
                                alt={track.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="min-w-0 text-left">
                              <p
                                className={`text-sm font-medium truncate ${
                                  track.id === currentTrack.id
                                    ? 'text-primary'
                                    : 'text-foreground'
                                }`}
                              >
                                {track.title}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {track.artist}
                              </p>
                            </div>
                            <span className="text-xs text-muted-foreground ml-auto">
                              {formatTime(track.duration)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Lyrics Panel */}
                {isExpanded && isLyricsExpanded && (
                  <div className="md:w-96 border-t md:border-t-0 md:border-l border-border overflow-y-auto">
                    <LyricsDisplay currentTime={currentTimeDisplay} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Screen Lyrics Overlay */}
      {isLyricsExpanded && <LyricsDisplay currentTime={currentTimeDisplay} />}
    </>
  );
}
