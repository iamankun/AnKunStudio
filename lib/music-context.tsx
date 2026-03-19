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
  lyricUrl?: string;
}

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  progress: number;
  volume: number;
  queue: Track[];
  isPlayerVisible: boolean;
  getCurrentTime: () => number;
  playTrack: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  nextTrack: () => void;
  previous: () => void;
  setVolume: (volume: number) => void;
  seek: (time: number) => void;
  addToQueue: (track: Track) => void;
  setQueue: (tracks: Track[]) => void;
  closePlayer: () => void;
  setIsPlayerVisible: (visible: boolean) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

// Sample tracks with placeholder audio
const sampleTracks: Track[] = [
  {
    id: '1',
    title: 'Cứ Bước Đi',
    artist: 'Congtri_ ft. QUYEN.',
    album: 'Single',
    duration: 245,
    cover: '/tracks/cubuocdi.jpg',
    audioUrl: '/tracks/congtri_ & QUYEN - Cứ Bước Đi.wav',
    lyricUrl: '/tracks/cubuocdi.json'
  },
  {
    id: '2',
    title: 'Đừng Lo Đến Anh',
    artist: 'Willdawind ft. Xesi',
    album: 'Single',
    duration: 240,
    cover: '/tracks/dung-lo-den-anh.jpg',
    audioUrl: '/tracks/Willdawind - đừng lo đến anh ft. Xesi (Prod. by Pawn).m4a',
    lyricUrl: '/tracks/dunglodenanh.json'
  },
  {
    id: '3',
    title: 'Nếu Như (OST Short Film WHAT IF)',
    artist: 'An Kun, Cinnamorolls, KC Phan',
    album: 'WHAT IF',
    duration: 312,
    cover: 'https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F95435768cd84f1b6a7af36f182b20a54.500x500x1.jpg',
    audioUrl: '/tracks/neunhu.wav',
    lyricUrl: '/tracks/neunhu.json'
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
  const playTrackRef = useRef<(track: Track) => void>(() => { });

  const nextTrack = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    playTrackRef.current(queue[nextIndex]);
  }, [currentTrack, queue, playTrackRef]);

  // Initialize playTrack function in useEffect to avoid render-time ref access
  useEffect(() => {
    playTrackRef.current = (track: Track) => {
      console.log('Playing track:', track.title, 'URL:', track.audioUrl);

      // If same track is already playing, don't recreate audio
      if (audioRef.current && currentTrack?.id === track.id) {
        console.log('Track already playing, resuming...');
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (error.name === 'AbortError') {
              return;
            }
            console.error('Audio resume failed:', error);
          });
        }
        setIsPlaying(true);
        return;
      }

      // Get actual audio duration dynamically
      const handleLoadedMetadata = () => {
        if (audioRef.current) {
          const actualDuration = audioRef.current.duration;
          console.log('🎵 Actual audio duration:', actualDuration, 'seconds');
          // You can store this and use it for progress calculation
        }
      };
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', () => { });
        audioRef.current.removeEventListener('ended', () => { });
      }

      // Create new audio element to avoid conflicts
      const newAudio = new Audio();
      newAudio.volume = volume;

      // Set up event listeners for new audio
      newAudio.addEventListener('timeupdate', () => {
        if (newAudio.duration) {
          setProgress((newAudio.currentTime / newAudio.duration) * 100);
        }
      });

      newAudio.addEventListener('ended', () => {
        nextTrack();
      });

      newAudio.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        console.error('Audio error code:', newAudio.error);
        setIsPlaying(false);
      });

      // Set source and play
      newAudio.src = track.audioUrl;

      audioRef.current = newAudio;
      setCurrentTrack(track);
      setProgress(0);

      // Small delay to ensure state is updated
      setTimeout(() => {
        const playPromise = newAudio.play();
        console.log('Play promise:', playPromise);
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('Audio playing successfully');
              setIsPlaying(true);
            })
            .catch(error => {
              // AbortError is expected when play is interrupted by pause
              if (error.name === 'AbortError') {
                console.log('Audio play interrupted (AbortError - expected)');
                return;
              }
              console.error('Audio play failed:', error);
              console.error('Error name:', error.name);
              console.error('Error message:', error.message);
              setIsPlaying(false);
            });
        } else {
          console.log('Play promise is undefined');
          setIsPlaying(true);
        }
      }, 50);
    };
  }, [volume, nextTrack, currentTrack?.id, isPlaying]);

  const previous = useCallback(() => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
    playTrackRef.current(queue[prevIndex]);
  }, [currentTrack, queue, playTrackRef]);

  useEffect(() => {
    // Don't create audio here - it's created in playTrackRef.current
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const getCurrentTime = useCallback(() => {
    return audioRef.current?.currentTime || 0;
  }, []);

  const playTrack = useCallback((track: Track) => {
    playTrackRef.current(track);
  }, []);

  const pause = useCallback(() => {
    console.log('pause() called, audioRef.current exists:', !!audioRef.current);
    if (audioRef.current) {
      try {
        console.log('Pausing audio...');
        console.log('Audio paused before:', audioRef.current.paused);
        console.log('Audio currentTime:', audioRef.current.currentTime);

        audioRef.current.pause();

        // Check if pause actually worked
        setTimeout(() => {
          console.log('Audio paused after:', audioRef.current?.paused);
          console.log('Audio currentTime after pause:', audioRef.current?.currentTime);
        }, 100);

        setIsPlaying(false);
        console.log('Set isPlaying to false');
      } catch (error) {
        console.error('Audio pause failed:', error);
        // Don't change state if pause failed
      }
    }
  }, []);

  const resume = useCallback(() => {
    console.log('resume() called');
    console.log('audioRef.current exists:', !!audioRef.current);
    console.log('currentTrack exists:', !!currentTrack);
    console.log('audioRef.current.paused:', audioRef.current?.paused);

    if (audioRef.current && currentTrack) {
      console.log('Resuming audio...');
      // Small delay to ensure pause is fully processed
      setTimeout(() => {
        if (audioRef.current) {
          console.log('Attempting to play audio...');
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Audio resumed successfully');
                setIsPlaying(true);
              })
              .catch(error => {
                // AbortError is expected when play is interrupted by pause
                if (error.name === 'AbortError') {
                  console.log('Audio resume interrupted (AbortError - expected)');
                  return;
                }
                console.error('Audio resume failed:', error);
              });
          }
        }
      }, 50);
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
        getCurrentTime,
        playTrack,
        pause,
        resume,
        nextTrack,
        previous,
        setVolume,
        seek,
        addToQueue,
        setQueue,
        closePlayer,
        setIsPlayerVisible,
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
