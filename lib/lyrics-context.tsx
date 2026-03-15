"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { LyricLine, loadLRC, getCurrentLine, getCurrentWord } from './lyrics-utils';

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
  calibrationSamples: { expectedTime: number; actualTime: number }[];
  
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
  const [calibrationSamples, setCalibrationSamples] = useState<{ expectedTime: number; actualTime: number }[]>([]);

  // Helper function to calculate average drift
  const calculateAverageDrift = (samples: { expectedTime: number; actualTime: number }[]): number => {
    if (samples.length === 0) return 0;
    const totalDrift = samples.reduce((sum, sample) => sum + (sample.actualTime - sample.expectedTime), 0);
    return totalDrift / samples.length;
  };

  // Enhanced calibration using multiple sample points
  const calibrate = useCallback((currentAudioTime: number) => {
    if (lyrics.length === 0) return;
    
    // Find the current lyric line closest to this time
    const currentLine = getCurrentLine(lyrics, currentAudioTime);
    if (!currentLine) return;
    
    const expectedTime = currentLine.startTime;
    const newSample = { expectedTime, actualTime: currentAudioTime };
    
    // Add to samples (keep last 5)
    setCalibrationSamples(prev => {
      const updated = [...prev, newSample].slice(-5);
      
      // Calculate average drift from samples
      if (updated.length >= 3) {
        const avgDrift = calculateAverageDrift(updated);
        console.log('🎯 Multi-point calibration:', updated.length, 'samples, avg drift:', avgDrift.toFixed(2), 's');
        setTimeOffsetState(avgDrift);
        setIsCalibrated(true);
      } else {
        // Single point calibration
        const singleOffset = currentAudioTime - expectedTime;
        console.log('🎯 Single-point calibration: offset =', singleOffset.toFixed(2), 's');
        setTimeOffsetState(singleOffset);
        setIsCalibrated(true);
      }
      
      return updated;
    });
  }, [lyrics]);

  const loadLyrics = useCallback(async (url: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const parsedLyrics = await loadLRC(url);
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
        calibrationSamples,
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
