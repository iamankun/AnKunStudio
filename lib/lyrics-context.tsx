"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { LyricLine, loadSRT, getCurrentLine, getCurrentWord } from './lyrics-utils';

interface LyricsContextType {
  // State
  lyrics: LyricLine[];
  currentLine: LyricLine | null;
  currentWord: LyricWord | null;
  isExpanded: boolean;
  isLoading: boolean;
  error: string | null;
  timeOffset: number; // in seconds, to adjust sync
  isCalibrated: boolean;
  
  // Actions
  loadLyrics: (url: string) => Promise<void>;
  updatePosition: (currentTime: number) => void;
  toggleExpanded: () => void;
  setExpanded: (expanded: boolean) => void;
  clearLyrics: () => void;
  setTimeOffset: (offset: number) => void;
  calibrate: (currentAudioTime: number) => void; // Auto-sync based on first lyric
  autoAdjust: (driftAmount: number) => void; // Auto-correct drift
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
  const [timeOffset, setTimeOffsetState] = useState(-2); // in seconds, positive = lyrics delayed
  const [isCalibrated, setIsCalibrated] = useState(false);

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
    
    // Apply time offset to sync lyrics with audio
    // Negative offset = lyrics appear earlier
    const adjustedTime = currentTime + timeOffset;
    
    const line = getCurrentLine(lyrics, adjustedTime);
    setCurrentLine(line);
    
    if (line) {
      const word = getCurrentWord(line, adjustedTime);
      setCurrentWord(word);
    } else {
      setCurrentWord(null);
    }
  }, [lyrics, timeOffset]);

  const toggleExpanded = useCallback(() => {
    console.log('🎤 toggleExpanded called, current isExpanded:', isExpanded);
    setIsExpanded(prev => {
      const newValue = !prev;
      console.log('🎤 Setting isExpanded to:', newValue);
      return newValue;
    });
  }, [isExpanded]);

  const setExpanded = useCallback((expanded: boolean) => {
    setIsExpanded(expanded);
  }, []);

  const setTimeOffset = useCallback((offset: number) => {
    console.log('⏱️ Setting time offset to:', offset, 'seconds');
    setTimeOffsetState(offset);
    setIsCalibrated(true);
  }, []);

  // Calibrate: When user clicks at the moment they hear the first lyric
  const calibrate = useCallback((currentAudioTime: number) => {
    if (lyrics.length === 0) return;
    
    // Find the first lyric line with actual text (not just instrumental markers)
    const firstLyricLine = lyrics.find(line => 
      line.text.trim() && 
      !line.text.startsWith('#') && 
      !line.text.toLowerCase().includes('instrumental')
    );
    
    if (!firstLyricLine) return;
    
    // Calculate offset: what time SHOULD it be vs what time it IS
    const expectedTime = firstLyricLine.startTime;
    const actualTime = currentAudioTime;
    const newOffset = actualTime - expectedTime;
    
    console.log('🎯 Calibration:');
    console.log('   Expected first lyric at:', expectedTime, 's');
    console.log('   Actually heard at:', actualTime, 's');
    console.log('   New offset:', newOffset, 's');
    
    setTimeOffsetState(newOffset);
    setIsCalibrated(true);
  }, [lyrics]);

  // Auto-adjust: Detect and correct drift
  const autoAdjust = useCallback((driftAmount: number) => {
    setTimeOffsetState(prev => {
      const newOffset = prev + driftAmount;
      console.log('🔄 Auto-adjust: drift =', driftAmount, 's, new offset =', newOffset, 's');
      return newOffset;
    });
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
        timeOffset,
        isCalibrated,
        loadLyrics,
        updatePosition,
        toggleExpanded,
        setExpanded,
        clearLyrics,
        setTimeOffset,
        calibrate,
        autoAdjust,
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
