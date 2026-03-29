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
  isLoading: boolean;
  error: string | null;
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
  clearError: () => void;
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
    title: 'Destiny',
    artist: 'Willdawind ft. Bảo Hân Helia',
    album: 'Amor Fati',
    duration: 276,
    cover: '/tracks/Willdawind - DESTINY ft Bao Han Helia.jpg',
    audioUrl: '/tracks/Destiny - Willdawind x Bảo Hân Helia - Prod. by Pawn by Willdawind.wav',
    lyricUrl: '/tracks/Willdawind - Destiny ft Bao Han Helia.json'
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playTrackRef = useRef<(track: Track) => void>(() => { });
  const retryCountRef = useRef(0);
  const maxRetries = 3;

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
      setError(null);
      setIsLoading(true);
      retryCountRef.current = 0;

      // If same track is already playing, don't recreate audio
      if (audioRef.current && currentTrack?.id === track.id) {
        console.log('Track already playing, resuming...');
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
              setIsPlaying(true);
            })
            .catch(error => {
              setIsLoading(false);
              if (error.name === 'AbortError') {
                return;
              }
              if (error.name === 'NotAllowedError') {
                setError('Vui lòng tương tác với trang để phát nhạc (chạm vào màn hình)');
              }
              console.error('Audio resume failed:', error);
            });
        }
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('timeupdate', () => { });
        audioRef.current.removeEventListener('ended', () => { });
      }

      // Create new audio element to avoid conflicts
      const newAudio = new Audio();
      newAudio.volume = volume;
      newAudio.preload = 'metadata';

      // Set up event listeners for new audio
      newAudio.addEventListener('timeupdate', () => {
        if (newAudio.duration) {
          setProgress((newAudio.currentTime / newAudio.duration) * 100);
        }
      });

      newAudio.addEventListener('ended', () => {
        nextTrack();
      });

      newAudio.addEventListener('canplaythrough', () => {
        setIsLoading(false);
      });

      newAudio.addEventListener('error', (e) => {
        setIsLoading(false);
        console.error('Audio error:', e);
        console.error('Audio error code:', newAudio.error);
        
        const errorCode = newAudio.error?.code;
        let errorMessage = 'Không thể phát bài hát';
        
        switch (errorCode) {
          case 1:
            errorMessage = 'Quá trình tải bài hát bị gián đoạn. Vui lòng thử lại.';
            break;
          case 2:
            errorMessage = 'Lỗi mạng. Vui lòng kiểm tra kết nối internet.';
            break;
          case 3:
            errorMessage = 'Định dạng audio không được hỗ trợ.';
            break;
          case 4:
            errorMessage = 'Không thể tải bài hát. File có thể bị lỗi hoặc không tồn tại.';
            break;
        }
        
        // Retry logic for network errors
        if (retryCountRef.current < maxRetries && (errorCode === 2 || errorCode === 4)) {
          retryCountRef.current += 1;
          console.log(`Retrying audio load (attempt ${retryCountRef.current}/${maxRetries})...`);
          setTimeout(() => {
            newAudio.load();
          }, 1000 * retryCountRef.current);
        } else {
          setError(errorMessage);
          setIsPlaying(false);
        }
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
              setIsLoading(false);
              setIsPlaying(true);
              retryCountRef.current = 0;
            })
            .catch(error => {
              setIsLoading(false);
              // AbortError is expected when play is interrupted by pause
              if (error.name === 'AbortError') {
                console.log('Audio play interrupted (AbortError - expected)');
                return;
              }
              
              // Mobile-specific error handling
              if (error.name === 'NotAllowedError') {
                setError('Vui lòng chạm vào màn hình để phát nhạc');
              } else {
                setError('Không thể phát bài hát. Vui lòng thử lại.');
              }
              
              console.error('Audio play failed:', error);
              console.error('Error name:', error.name);
              console.error('Error message:', error.message);
              setIsPlaying(false);
            });
        } else {
          console.log('Play promise is undefined');
          setIsLoading(false);
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
      setIsLoading(true);
      setError(null);
      // Small delay to ensure pause is fully processed
      setTimeout(() => {
        if (audioRef.current) {
          console.log('Attempting to play audio...');
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('Audio resumed successfully');
                setIsLoading(false);
                setIsPlaying(true);
              })
              .catch(error => {
                setIsLoading(false);
                // AbortError is expected when play is interrupted by pause
                if (error.name === 'AbortError') {
                  console.log('Audio resume interrupted (AbortError - expected)');
                  return;
                }
                if (error.name === 'NotAllowedError') {
                  setError('Vui lòng chạm vào màn hình để tiếp tục phát nhạc');
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

  const clearError = useCallback(() => {
    setError(null);
    retryCountRef.current = 0;
  }, []);

  const closePlayer = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setIsPlaying(false);
    setIsPlayerVisible(false);
    setCurrentTrack(null);
    setError(null);
    retryCountRef.current = 0;
  }, []);

  return (
    <MusicContext.Provider
      value={{
        currentTrack,
        isPlaying,
        isLoading,
        error,
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
        clearError,
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
