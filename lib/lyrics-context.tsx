"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { LyricLine, loadSRT, getCurrentLine, getCurrentWord } from './lyrics-utils';

interface LyricsContextType {
  // State
  lyrics: LyricLine[];
  currentLine: LyricLine | null;
  currentWord: LyricWord | null;
  isExpanded: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  loadLyrics: (url: string) => Promise<void>;
  updatePosition: (currentTime: number) => void;
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
  clearLyrics: () => void;
}

interface LyricWord {
  text: string;
  startTime: number;
  endTime: number;
}

const LyricsContext = createContext<LyricsContextType | null>(null);

export function LyricsProvider({ children }: { children: ReactNode }) {
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [currentLine, setCurrentLine] = useState<LyricLine | null>(null);
  const [currentWord, setCurrentWord] = useState<LyricWord | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadLyrics = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const parsedLyrics = await loadSRT(url);
      setLyrics(parsedLyrics);
      console.log('✅ Lyrics loaded:', parsedLyrics.length, 'lines');
    } catch (err) {
      console.error('❌ Failed to load lyrics:', err);
      setError('Không thể tải lời bài hát');
      setLyrics([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updatePosition = useCallback((currentTime: number) => {
    if (lyrics.length === 0) return;
    
    const line = getCurrentLine(lyrics, currentTime);
    setCurrentLine(line);
    
    if (line) {
      const word = getCurrentWord(line, currentTime);
      setCurrentWord(word);
    } else {
      setCurrentWord(null);
    }
  }, [lyrics]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  const setExpanded = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);
  }, []);

  const clearLyrics = useCallback(() => {
    setLyrics([]);
    setCurrentLine(null);
    setCurrentWord(null);
    setError(null);
  }, []);

  return (
    <LyricsContext.Provider
      value={{
        lyrics,
        currentLine,
        currentWord,
        isExpanded,
        isLoading,
        error,
        loadLyrics,
        updatePosition,
        toggleExpanded,
        setExpanded,
        clearLyrics,
      }}
    >
      {children}
    </LyricsContext.Provider>
  );
}

export function useLyrics() {
  const context = useContext(LyricsContext);
  if (!context) {
    throw new Error('useLyrics must be used within a LyricsProvider');
  }
  return context;
}
