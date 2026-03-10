"use client";

import { createContext, useContext, useState, useRef, useCallback, ReactNode, useEffect } from 'react';

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  cover: string;
  audioUrl: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Track[];
  isPlayerVisible: boolean;
  play: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  addToQueue: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  closePlayer: () => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

// Sample tracks with placeholder audio
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    album: 'Ethereal Waves',
    duration: 245,
    cover: '/tracks/midnight-dreams.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Electric Soul',
    artist: 'Rising Sun',
    album: 'City Nights',
    duration: 198,
    cover: '/tracks/electric-soul.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Neon Nights',
    artist: 'Urban Beats',
    album: 'Street Stories',
    duration: 312,
    cover: '/tracks/neon-nights.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    id: '4',
    title: 'Golden Hour',
    artist: 'Soul Harmony',
    album: 'Heartfelt',
    duration: 276,
    cover: '/tracks/golden-hour.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
  {
    id: '5',
    title: 'Rhythm Flow',
    artist: 'Wave Riders',
    album: 'Coastal Dreams',
    duration: 223,
    cover: '/tracks/rhythm-flow.jpg',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
  },
];

export function MusicProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolumeState] = useState(0.7);
  const [queue, setQueueState] = useState<Track[]>(sampleTracks);
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = useCallback((track: Track) => {
    if (audioRef.current) {
      // Stop current audio if playing
      if (isPlaying) {
        audioRef.current.pause();
      }
      
      // Set new source and load
      audioRef.current.src = track.audioUrl;
      audioRef.current.load();
      
      // Play after loading
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio play failed:', error);
          setIsPlaying(false);
        });
      }
      
      setCurrentTrack(track);
      setIsPlaying(true);
      setProgress(0);
    }
  }, [isPlaying]);

  const next = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    play(queue[nextIndex]);
  }, [currentTrack, queue, play]);

  const previous = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    play(queue[prevIndex]);
  }, [currentTrack, queue, play]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
      
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      });

      audioRef.current.addEventListener('ended', () => {
        next();
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [next, volume]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && currentTrack) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error('Audio resume failed:', error);
        });
      }
      setIsPlaying(true);
    }
  }, [currentTrack]);

  const setVolume = useCallback((newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolumeState(newVolume);
    }
  }, []);

  const seek = useCallback((time: number) => {
    if (audioRef.current && audioRef.current.duration) {
      audioRef.current.currentTime = (time / 100) * audioRef.current.duration;
    }
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueueState(prev => [...prev, track]);
  }, []);

  const setQueue = useCallback((tracks: Track[]) => {
    setQueueState(tracks);
  }, []);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setCurrentTrack(null);
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progress,
        volume,
        queue,
        isPlayerVisible,
        play,
        pause,
        resume,
        next,
        previous,
        setVolume,
        seek,
        addToQueue,
        setQueue,
        closePlayer,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

export { sampleTracks };
