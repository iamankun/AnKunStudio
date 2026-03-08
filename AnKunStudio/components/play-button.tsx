"use client";

import { useMusic, sampleTracks, Track } from '@/lib/music-context';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface PlayButtonProps {
  track?: Track;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export function PlayButton({ track, variant = 'default', size = 'icon', className }: PlayButtonProps) {
  const { currentTrack, isPlaying, play, pause, resume } = useMusic();
  
  const targetTrack = track || sampleTracks[0];
  const isCurrentTrack = currentTrack?.id === targetTrack.id;
  const isCurrentlyPlaying = isCurrentTrack && isPlaying;

  const handleClick = () => {
    if (isCurrentTrack) {
      if (isPlaying) {
        pause();
      } else {
        resume();
      }
    } else {
      play(targetTrack);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      className={className}
    >
      {isCurrentlyPlaying ? (
        <Pause className="h-4 w-4" />
      ) : (
        <Play className="h-4 w-4" />
      )}
    </Button>
  );
}

// Component to play all tracks
export function PlayAllButton({ className }: { className?: string }) {
  const { play, setQueue } = useMusic();

  const handlePlayAll = () => {
    setQueue(sampleTracks);
    play(sampleTracks[0]);
  };

  return (
    <Button onClick={handlePlayAll} className={className}>
      <Play className="h-4 w-4 mr-2" />
      Play All
    </Button>
  );
}
