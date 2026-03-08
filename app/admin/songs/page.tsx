"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Play, Pause, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useMusic, sampleTracks } from '@/lib/music-context';

const songsData = [
  {
    id: '1',
    title: 'Midnight Dreams',
    artist: 'Luna Echo',
    album: 'Ethereal Waves',
    duration: '4:05',
    plays: '4.2M',
    status: 'published',
    cover: '/placeholder.svg?height=60&width=60',
    uploadDate: 'Mar 1, 2024',
  },
  {
    id: '2',
    title: 'Neon Lights',
    artist: 'Rising Sun',
    album: 'City Nights',
    duration: '3:18',
    plays: '3.8M',
    status: 'published',
    cover: '/placeholder.svg?height=60&width=60',
    uploadDate: 'Feb 28, 2024',
  },
  {
    id: '3',
    title: 'Urban Flow',
    artist: 'Urban Beats',
    album: 'Street Stories',
    duration: '5:12',
    plays: '5.1M',
    status: 'published',
    cover: '/placeholder.svg?height=60&width=60',
    uploadDate: 'Feb 25, 2024',
  },
  {
    id: '4',
    title: 'Soul Connection',
    artist: 'Soul Harmony',
    album: 'Heartfelt',
    duration: '4:36',
    plays: '2.9M',
    status: 'published',
    cover: '/placeholder.svg?height=60&width=60',
    uploadDate: 'Feb 20, 2024',
  },
  {
    id: '5',
    title: 'Ocean Breeze',
    artist: 'Wave Riders',
    album: 'Coastal Dreams',
    duration: '3:43',
    plays: '1.4M',
    status: 'draft',
    cover: '/placeholder.svg?height=60&width=60',
    uploadDate: 'Mar 5, 2024',
  },
];

export default function AdminSongsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [songs, setSongs] = useState(songsData);
  const { currentTrack, isPlaying, play, pause, resume } = useMusic();

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setSongs(songs.filter(song => song.id !== id));
  };

  const handlePlaySong = (songId: string) => {
    const track = sampleTracks.find(t => t.id === songId);
    if (track) {
      if (currentTrack?.id === track.id) {
        if (isPlaying) {
          pause();
        } else {
          resume();
        }
      } else {
        play(track);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bài hát</h1>
          <p className="text-muted-foreground mt-1">Quản lý các bản nhạc đã tải lên</p>
        </div>
        <Link href="/admin/songs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Tải lên Bài hát
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài hát..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {/* Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground border-b border-border">
              <div className="col-span-1">#</div>
              <div className="col-span-4">Tiêu đề</div>
              <div className="col-span-2">Album</div>
              <div className="col-span-1">Thời lượng</div>
              <div className="col-span-1">Lượt phát</div>
              <div className="col-span-1">Trạng thái</div>
              <div className="col-span-2 text-right">Thao tác</div>
            </div>

            {/* Songs List */}
            {filteredSongs.map((song, idx) => {
              const isCurrentSong = currentTrack?.id === song.id;
              const isCurrentlyPlaying = isCurrentSong && isPlaying;

              return (
                <div
                  key={song.id}
                  className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-lg hover:bg-secondary/50 transition-colors items-center ${
                    isCurrentSong ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="col-span-1 flex items-center">
                    <button
                      onClick={() => handlePlaySong(song.id)}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors group"
                    >
                      {isCurrentlyPlaying ? (
                        <Pause className="h-4 w-4 text-primary" />
                      ) : (
                        <>
                          <span className="group-hover:hidden text-muted-foreground">{idx + 1}</span>
                          <Play className="h-4 w-4 hidden group-hover:block" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="col-span-11 md:col-span-4 flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-lg object-cover shrink-0">
                      <Image
                        src={song.cover}
                        alt={song.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className={`font-medium truncate ${isCurrentSong ? 'text-primary' : 'text-foreground'}`}>
                        {song.title}
                      </p>
                      <p className="text-sm text-muted-foreground truncate">{song.artist}</p>
                    </div>
                  </div>
                  <div className="hidden md:block col-span-2 text-sm text-muted-foreground truncate">
                    {song.album}
                  </div>
                  <div className="hidden md:block col-span-1 text-sm text-muted-foreground">
                    {song.duration}
                  </div>
                  <div className="hidden md:block col-span-1 text-sm text-muted-foreground">
                    {song.plays}
                  </div>
                  <div className="hidden md:block col-span-1">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      song.status === 'published'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {song.status}
                    </span>
                  </div>
                  <div className="hidden md:flex col-span-2 justify-end">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/songs/${song.id}`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Chỉnh sửa
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => handleDelete(song.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
