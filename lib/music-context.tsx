"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

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
  currentTime: number;
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

const sampleTracks: Track[] = [
  {
    id: "1",
    title: "Refrigerator & Box",
    artist: "An Kun",
    album: "Single",
    duration: 180,
    cover: "/tracks/RefrigeratorBox.jpg",
    audioUrl: "/api/tracks/RefrigeratorBox.mp3",
    lyricUrl: "/tracks/RefrigeratorBox.json",
  },
  {
    id: "2",
    title: "Cứ Bước Đi",
    artist: "Congtri_ ft. QUYEN.",
    album: "Single",
    duration: 245,
    cover: "/tracks/cubuocdi.jpg",
    audioUrl: "/api/tracks/cubuocdi.wav",
    lyricUrl: "/tracks/cubuocdi.json",
  },
  {
    id: "3",
    title: "Đừng Lo Đến Anh",
    artist: "Willdawind ft. Xesi",
    album: "Single",
    duration: 240,
    cover: "/tracks/dung-lo-den-anh.jpg",
    audioUrl: "/api/tracks/dunglodenanh.m4a",
    lyricUrl: "/tracks/dunglodenanh.json",
  },
  {
    id: "4",
    title: "Nếu Như (OST Short Film WHAT IF)",
    artist: "An Kun, Cinnamorolls, KC Phan",
    album: "WHAT IF",
    duration: 312,
    cover: "https://t2.genius.com/unsafe/344x344/https%3A%2F%2Fimages.genius.com%2F95435768cd84f1b6a7af36f182b20a54.500x500x1.jpg",
    audioUrl: "/api/tracks/neunhu.wav",
    lyricUrl: "/tracks/neunhu.json",
  },
  {
    id: "5",
    title: "Destiny",
    artist: "Willdawind ft. Bảo Hân Helia",
    album: "Amor Fati",
    duration: 276,
    cover: "/tracks/Willdawind - DESTINY ft Bao Han Helia.jpg",
    audioUrl: "/api/tracks/destiny.wav",
    lyricUrl: "/tracks/Willdawind - Destiny ft Bao Han Helia.json",
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
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playTrackRef = useRef<(track: Track) => void>(() => {});
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const nextTrack = useCallback(() => {
    setQueueState((prevQueue) => {
      if (!currentTrack || prevQueue.length === 0) return prevQueue;
      const currentIndex = prevQueue.findIndex((t) => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % prevQueue.length;
      playTrackRef.current(prevQueue[nextIndex]);
      return prevQueue;
    });
  }, [currentTrack]); // Remove playTrackRef from deps as it's a stable ref

  // Initialize playTrack function in useEffect to avoid render-time ref access
  useEffect(() => {
    playTrackRef.current = (track: Track) => {
      console.log("Đang chơi nhạc:", track.title, "URL:", track.audioUrl);
      setError(null);
      setIsLoading(true);
      retryCountRef.current = 0;

      // Get current state from closure instead of depending on currentTrack in deps
      const currentTrackId = audioRef.current ? currentTrack?.id : null;

      // If same track is already playing, don't recreate audio
      if (audioRef.current && currentTrackId === track.id) {
        console.log("Bài hát đang phát, tiếp tục...");
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsLoading(false);
              setIsPlaying(true);
            })
            .catch((error) => {
              setIsLoading(false);
              if (error.name === "AbortError") {
                return;
              }
              if (error.name === "NotAllowedError") {
                setError(
                  "Vui lòng tương tác với trang để phát nhạc (chạm vào màn hình)",
                );
              }
              console.error("Âm thanh thất bại khi phát lại:", error);
            });
        }
        return;
      }

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", () => {});
        audioRef.current.removeEventListener("ended", () => {});
      }

      // Create new audio element to avoid conflicts
      const newAudio = new Audio();
      newAudio.volume = volume;
      newAudio.preload = "metadata";

      // Set up event listeners for new audio
      let lastUpdate = 0;
      const handleTimeUpdate = () => {
        const now = Date.now();
        if (now - lastUpdate < 200) return;
        lastUpdate = now;
        if (newAudio.duration) {
          setProgress((newAudio.currentTime / newAudio.duration) * 100);
        }
      };

      const handleEnded = () => {
        // Use functional update to avoid dependency issues
        setQueueState((prevQueue) => {
          if (!prevQueue.length) return prevQueue;
          const currentIndex = prevQueue.findIndex((t) => t.id === track.id);
          const nextIndex = (currentIndex + 1) % prevQueue.length;
          // Schedule next track
          setTimeout(() => {
            playTrackRef.current(prevQueue[nextIndex]);
          }, 0);
          return prevQueue;
        });
      };

      const handleCanPlayThrough = () => {
        setIsLoading(false);
      };

      const handleError = (e: Event) => {
        setIsLoading(false);
        console.error("Lỗi khi phát audio:", e);
        console.error("Mã lỗi audio:", newAudio.error);

        const errorCode = newAudio.error?.code;
        let errorMessage = "Không thể phát bài hát";

        switch (errorCode) {
          case 1:
            errorMessage =
              "Quá trình tải bài hát bị gián đoạn. Vui lòng thử lại.";
            break;
          case 2:
            errorMessage = "Lỗi mạng. Vui lòng kiểm tra kết nối internet.";
            break;
          case 3:
            errorMessage = "Định dạng âm thanh không được hỗ trợ.";
            break;
          case 4:
            errorMessage =
              "Không thể tải bài hát. File có thể bị lỗi hoặc không tồn tại.";
            break;
        }

        // Retry logic for network errors
        if (
          retryCountRef.current < maxRetries &&
          (errorCode === 2 || errorCode === 4)
        ) {
          retryCountRef.current += 1;
          console.log(
            `Đang thử lại tải audio (lần ${retryCountRef.current}/${maxRetries})...`,
          );
          setTimeout(() => {
            newAudio.load();
          }, 1000 * retryCountRef.current);
        } else {
          setError(errorMessage);
          setIsPlaying(false);
        }
      };

      newAudio.addEventListener("timeupdate", handleTimeUpdate);
      newAudio.addEventListener("ended", handleEnded);
      newAudio.addEventListener("canplaythrough", handleCanPlayThrough);
      newAudio.addEventListener("error", handleError);

      // Set source with cache-busting to avoid Safari stale error state
      const separator = track.audioUrl.includes("?") ? "&" : "?";
      newAudio.src = `${track.audioUrl}${separator}v=1`;

      audioRef.current = newAudio;
      setCurrentTrack(track);
      setProgress(0);

      const playPromise = newAudio.play();
      console.log("Play promise:", playPromise);
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Âm thanh đang phát thành công");
            setIsLoading(false);
            setIsPlaying(true);
            retryCountRef.current = 0;
          })
          .catch((error) => {
            setIsLoading(false);
            // AbortError is expected when play is interrupted by pause
            if (error.name === "AbortError") {
              console.log("Âm thanh bị gián đoạn (AbortError - expected)");
              return;
            }

            // Mobile-specific error handling
            if (error.name === "NotSupportedError") {
              setQueueState((prevQueue) => {
                if (!prevQueue.length) return prevQueue;
                const currentIndex = prevQueue.findIndex((t) => t.id === track.id);
                const nextIndex = (currentIndex + 1) % prevQueue.length;
                setTimeout(() => playTrackRef.current(prevQueue[nextIndex]), 0);
                return prevQueue;
              });
              return;
            } else if (error.name === "NotAllowedError") {
              setError("Vui lòng chạm vào màn hình để phát nhạc");
            } else {
              setError("Không thể phát bài hát. Vui lòng thử lại.");
            }

            console.error("Âm thanh thất bại khi phát:", error);
            console.error("Tên lỗi:", error.name);
            console.error("Thông báo lỗi:", error.message);
            setIsPlaying(false);
          });
      } else {
        console.log("Play promise is undefined");
        setIsLoading(false);
        setIsPlaying(true);
      }
    };
  }, [volume, currentTrack?.id]); // Only depend on volume and currentTrack.id for same-track detection

  const previous = useCallback(() => {
    setQueueState((prevQueue) => {
      if (!currentTrack || prevQueue.length === 0) return prevQueue;
      const currentIndex = prevQueue.findIndex((t) => t.id === currentTrack.id);
      const prevIndex =
        currentIndex === 0 ? prevQueue.length - 1 : currentIndex - 1;
      playTrackRef.current(prevQueue[prevIndex]);
      return prevQueue;
    });
  }, [currentTrack]);

  useEffect(() => {
    // Don't create audio here - it's created in playTrackRef.current
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Single RAF loop — replaces 3 independent loops
  useEffect(() => {
    if (!isPlaying) return;
    let raf: number;
    let last = 0;
    function tick() {
      const t = audioRef.current?.currentTime ?? 0;
      const now = Date.now();
      if (now - last >= 50) {
        setCurrentTime(t);
        last = now;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isPlaying]);

  const getCurrentTime = useCallback(() => {
    return audioRef.current?.currentTime || 0;
  }, []);

  const playTrack = useCallback((track: Track) => {
    playTrackRef.current(track);
  }, []);

  const pause = useCallback(() => {
    console.log("pause() called, audioRef.current exists:", !!audioRef.current);
    if (audioRef.current) {
      try {
        console.log("Pausing audio...");
        console.log("Audio paused before:", audioRef.current.paused);
        console.log("Audio currentTime:", audioRef.current.currentTime);

        audioRef.current.pause();

        // Check if pause actually worked
        setTimeout(() => {
          console.log("Audio paused after:", audioRef.current?.paused);
          console.log(
            "Audio currentTime after pause:",
            audioRef.current?.currentTime,
          );
        }, 100);

        setIsPlaying(false);
        console.log("Set isPlaying to false");
      } catch (error) {
        console.error("Audio pause failed:", error);
        // Don't change state if pause failed
      }
    }
  }, []);

  const resume = useCallback(() => {
    console.log("resume() called");
    console.log("audioRef.current exists:", !!audioRef.current);
    console.log("currentTrack exists:", !!currentTrack);
    console.log("audioRef.current.paused:", audioRef.current?.paused);

    if (audioRef.current && currentTrack) {
      console.log("Resuming audio...");
      setIsLoading(true);
      setError(null);
      console.log("Attempting to play audio...");
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Audio resumed successfully");
            setIsLoading(false);
            setIsPlaying(true);
          })
          .catch((error) => {
            setIsLoading(false);
            // AbortError is expected when play is interrupted by pause
            if (error.name === "AbortError") {
              console.log(
                "Audio resume interrupted (AbortError - expected)",
              );
              return;
            }
            if (error.name === "NotAllowedError") {
              setError("Vui lòng chạm vào màn hình để tiếp tục phát nhạc");
            }
            console.error("Audio resume failed:", error);
          });
      }
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
    setQueueState((prev) => [...prev, track]);
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
        currentTime,
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
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
}

export { sampleTracks };
