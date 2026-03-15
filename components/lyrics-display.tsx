'use client';

import { useLyrics } from '@/lib/lyrics-context';
import { ChevronUp, ChevronDown, Mic2, Target } from 'lucide-react';
import { getWordProgress } from '@/lib/lyrics-utils';
import { useMusic } from '@/lib/music-context';
import { useEffect, useRef } from 'react';

interface LyricsDisplayProps {
  currentTime: number;
  onCalibrate?: () => void;
}

export function LyricsDisplay({ currentTime, onCalibrate }: LyricsDisplayProps) {
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
        activeLine.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentLine, isExpanded]);

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
                  const isCurrentWord = currentWord && word.text === currentWord.text;
                  const progress = isCurrentWord ? getWordProgress(word, currentTime) : 0;
                  
                  return (
                    <span
                      key={idx}
                      className={`inline-block mx-0.5 transition-all duration-100 ${
                        isCurrentWord 
                          ? 'text-primary font-semibold scale-105' 
                          : 'text-foreground'
                      }`}
                      style={{
                        backgroundImage: isCurrentWord 
                          ? `linear-gradient(90deg, hsl(var(--primary)) ${progress}%, hsl(var(--foreground)/0.3) ${progress}%)`
                          : 'none',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: isCurrentWord ? 'transparent' : 'inherit',
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
  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center">
          <Mic2 className="w-5 h-5 mr-2 text-primary" />
          <span className="font-semibold">Lời bài hát</span>
          {isCalibrated && (
            <span className="ml-2 text-xs text-green-500">✓ Đã đồng bộ</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* Calibrate button */}
          <button
            onClick={() => {
              calibrate(currentTime);
              if (onCalibrate) onCalibrate();
            }}
            className="p-2 rounded-full hover:bg-secondary transition-colors text-primary"
            aria-label="Đồng bộ lời với nhạc"
            title="Nhấn khi nghe thấy lời đầu tiên để đồng bộ"
          >
            <Target className="w-5 h-5" />
          </button>
          <button
            onClick={toggleExpanded}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Thu nhỏ lời bài hát"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Full Lyrics */}
      <div 
        ref={lyricsRef}
        className="flex-1 overflow-y-auto p-6 space-y-6"
      >
        {/* Current track info */}
        <div className="text-center mb-8">
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
              className={`transition-all duration-300 text-center ${
                isActive 
                  ? 'text-2xl md:text-3xl font-bold text-primary scale-105' 
                  : isPast 
                    ? 'text-lg text-muted-foreground/50' 
                    : 'text-lg text-muted-foreground'
              }`}
            >
              {isActive ? (
                // Active line with word highlighting
                <p className="leading-relaxed">
                  {line.words.map((word, idx) => {
                    const isCurrentWord = currentWord && word.text === currentWord.text;
                    const progress = isCurrentWord ? getWordProgress(word, currentTime) : 0;
                    
                    return (
                      <span
                        key={idx}
                        className={`inline-block mx-1 transition-all duration-100 ${
                          isCurrentWord ? 'text-primary' : ''
                        }`}
                        style={{
                          backgroundImage: isCurrentWord 
                            ? `linear-gradient(90deg, hsl(var(--primary)) ${progress}%, hsl(var(--foreground)/0.2) ${progress}%)`
                            : 'none',
                          WebkitBackgroundClip: isCurrentWord ? 'text' : 'unset',
                          WebkitTextFillColor: isCurrentWord ? 'transparent' : 'inherit',
                        }}
                      >
                        {word.text}
                      </span>
                    );
                  })}
                </p>
              ) : (
                // Inactive line
                <p className="leading-relaxed text-center">{line.text}</p>
              )}
            </div>
          );
        })}
        
        {/* Bottom spacer */}
        <div className="h-32" />
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
