'use client';

import { useLyrics } from '@/lib/lyrics-context';
import { ChevronUp, ChevronDown, Mic2, Target } from 'lucide-react';
import { getWordProgress } from '@/lib/lyrics-utils';
import { useMusic } from '@/lib/music-context';
import { useEffect, useRef, useState } from 'react';

interface LyricsDisplayProps {
  currentTime: number;
  onCalibrate?: () => void;
}

export function LyricsDisplay({ currentTime: initialTimeProp, onCalibrate }: LyricsDisplayProps) {
  const { 
    lyrics, 
    currentLine, 
    currentWord, 
    isExpanded, 
    isLoading, 
    error,
    toggleExpanded,
    calibrate,
    isCalibrated
  } = useLyrics();
  
  const lyricsRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current line in expanded view
  useEffect(() => {
    if (isExpanded && currentLine && lyricsRef.current) {
      const activeLine = lyricsRef.current.querySelector(`[data-line-id="${currentLine.id}"]`);
      if (activeLine) {
        // Scroll slightly above center for a better karaoke feel
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLine, isExpanded]);

  const { getCurrentTime, isPlaying } = useMusic();
  const [animationTime, setAnimationTime] = useState(initialTimeProp || 0);

  // Dedicated high-frequency render loop for buttery smooth highlights
  useEffect(() => {
    let rafId: number;
    const loop = () => {
      if (isPlaying) {
        setAnimationTime(getCurrentTime());
      }
      rafId = requestAnimationFrame(loop);
    };
    if (isPlaying) {
      rafId = requestAnimationFrame(loop);
    } else {
      setAnimationTime(getCurrentTime());
    }
    return () => cancelAnimationFrame(rafId);
  }, [isPlaying, getCurrentTime]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-16 text-muted-foreground">
        <Mic2 className="w-4 h-4 mr-2 animate-pulse" />
        <span className="text-sm">Đang tải lời bài hát...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-16 text-muted-foreground">
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  if (lyrics.length === 0) {
    return null;
  }

  // Minimized view - show only current line with word highlighting
  if (!isExpanded) {
    return (
      <div className="relative">
        {/* Minimized Lyrics */}
        <div 
          className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-4 cursor-pointer hover:from-primary/20 hover:to-secondary/20 transition-all"
          onClick={toggleExpanded}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider flex items-center">
              <Mic2 className="w-3 h-3 mr-1" />
              Lời bài hát
            </span>
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          </div>
          
          {currentLine ? (
            <div className="text-center">
              <p className="text-lg font-medium leading-relaxed">
                {currentLine.words.map((word, idx) => {
                  const progress = getWordProgress(word, animationTime);
                  const isUpcoming = animationTime < word.startTime;
                  
                  return (
                    <span
                      key={idx}
                      className="inline-block mx-0.5 transition-colors duration-100 font-semibold"
                      style={{
                        backgroundImage: isUpcoming 
                          ? 'none' 
                          : `linear-gradient(90deg, var(--color-primary) ${progress}%, color-mix(in oklch, var(--color-foreground) 40%, transparent) ${progress}%)`,
                        WebkitBackgroundClip: isUpcoming ? 'none' : 'text',
                        WebkitTextFillColor: isUpcoming ? 'color-mix(in oklch, var(--color-foreground) 40%, transparent)' : 'transparent',
                      }}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </p>
            </div>
          ) : (
            <p className="text-center text-muted-foreground text-sm">
              ♪ Âm nhạc đang phát...
            </p>
          )}
        </div>
      </div>
    );
  }

  // Expanded view - show full lyrics like MusixMatch/Apple Music
  // Determine dynamically colored background based on lyric section tags
  const getSectionBackground = (section?: string) => {
    switch(section) {
      case 'Rap': return 'bg-destructive/20'; // Example red-tint for rap
      case 'Chorus': return 'bg-primary/20';  // Main tint for chorus
      case 'Verse': 
      default: return 'bg-background/95';     // Default dark blur
    }
  };

  return (
    <div className={`fixed inset-0 z-50 backdrop-blur-2xl flex flex-col transition-colors duration-1000 ${getSectionBackground(currentLine?.section)}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center">
          <Mic2 className="w-5 h-5 mr-2 text-primary" />
          <span className="font-semibold">Lời bài hát</span>
          {currentLine?.section && (
            <span className="ml-3 px-2 py-0.5 rounded-full bg-foreground/10 text-xs font-mono tracking-widest uppercase">
              {currentLine.section}
            </span>
          )}
          {isCalibrated && (
            <span className="ml-2 text-xs text-green-500 hidden sm:inline">✓ Đã đồng bộ</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Calibrate button */}
          <button
            onClick={() => {
              calibrate(animationTime);
              if (onCalibrate) onCalibrate();
            }}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors text-primary"
            aria-label="Đồng bộ lời với nhạc"
            title="Nhấn khi nghe thấy lời đầu tiên để đồng bộ"
          >
            <Target className="w-5 h-5" />
          </button>
          <button
            onClick={toggleExpanded}
            className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
            aria-label="Thu nhỏ lời bài hát"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full Lyrics */}
      <div 
        ref={lyricsRef}
        className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {/* Current track info */}
        <div className="text-center mb-16 pt-8">
          <CurrentTrackInfo />
        </div>

        {/* Lyrics lines */}
        {lyrics.map((line) => {
          const isActive = currentLine?.id === line.id;
          const isPast = currentLine && line.id < currentLine.id;
          
          return (
            <div
              key={line.id}
              data-line-id={line.id}
              className={`transition-all duration-500 origin-center text-center font-semibold tracking-tight ${
                isActive 
                  ? 'text-2xl md:text-3xl lg:text-4xl font-bold text-foreground scale-100 blur-none opacity-100' 
                  : isPast 
                    ? 'text-xl md:text-2xl lg:text-3xl text-muted-foreground scale-90 blur-[1px] opacity-40' 
                    : 'text-xl md:text-2xl lg:text-3xl text-muted-foreground scale-95 blur-[2px] opacity-30 transform-gpu'
              }`}
            >
              <p className="leading-normal py-2">
                {line.words.map((word, idx) => {
                  const progress = getWordProgress(word, animationTime);
                  
                  // Active line feathering and gradient processing
                  // Unsung words should be dim, sung words should be colored
                  const isPassed = animationTime >= word.endTime;
                  const isUpcoming = animationTime < word.startTime;
                  
                  return (
                    <span
                      key={idx}
                      className="inline-block mx-0.5 lg:mx-1 transition-all duration-150"
                      style={isActive ? {
                        // For the active line: upcoming words dim, sung words colored
                        backgroundImage: isUpcoming 
                          ? 'none' 
                          : `linear-gradient(90deg, var(--color-primary) ${progress}%, color-mix(in oklch, var(--color-foreground) 50%, transparent) ${progress}%)`,
                        WebkitBackgroundClip: isUpcoming ? 'none' : 'text',
                        WebkitTextFillColor: isUpcoming ? 'currentColor' : 'transparent',
                        opacity: isUpcoming ? 0.3 : 1,
                      } : {}}
                    >
                      {word.text}
                    </span>
                  );
                })}
              </p>
            </div>
          );
        })}
        
        {/* Bottom spacer */}
        <div className="h-[50vh]" />
      </div>
    </div>
  );
}

function CurrentTrackInfo() {
  const { currentTrack } = useMusic();
  
  if (!currentTrack) return null;
  
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-bold">{currentTrack.title}</h2>
      <p className="text-muted-foreground">{currentTrack.artist}</p>
    </div>
  );
}
