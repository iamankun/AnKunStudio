"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal, CheckCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const artistsData = [
  {
    id: '1',
    name: 'Luna Echo',
    genre: 'Electronic',
    monthlyListeners: '2.5M',
    totalStreams: '45.2M',
    status: 'verified',
    image: '/placeholder.svg?height=100&width=100',
    joinedDate: 'Jan 2022',
  },
  {
    id: '2',
    name: 'Rising Sun',
    genre: 'Pop',
    monthlyListeners: '1.8M',
    totalStreams: '32.1M',
    status: 'verified',
    image: '/placeholder.svg?height=100&width=100',
    joinedDate: 'Mar 2022',
  },
  {
    id: '3',
    name: 'Urban Beats',
    genre: 'Hip-Hop',
    monthlyListeners: '3.2M',
    totalStreams: '67.8M',
    status: 'verified',
    image: '/placeholder.svg?height=100&width=100',
    joinedDate: 'Nov 2021',
  },
  {
    id: '4',
    name: 'Soul Harmony',
    genre: 'R&B',
    monthlyListeners: '2.1M',
    totalStreams: '38.4M',
    status: 'pending',
    image: '/placeholder.svg?height=100&width=100',
    joinedDate: 'Jun 2023',
  },
  {
    id: '5',
    name: 'Wave Riders',
    genre: 'Indie',
    monthlyListeners: '1.4M',
    totalStreams: '21.6M',
    status: 'verified',
    image: '/placeholder.svg?height=100&width=100',
    joinedDate: 'Sep 2022',
  },
  {
    id: '6',
    name: 'Pure Notes',
    genre: 'Classical',
    monthlyListeners: '980K',
    totalStreams: '15.3M',
    status: 'pending',
    image: '/placeholder.svg?height=100&width=100',
    joinedDate: 'Feb 2024',
  },
];

export default function AdminArtistsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState(artistsData);

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setArtists(artists.filter(artist => artist.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nghệ sĩ</h1>
          <p className="text-muted-foreground mt-1">Quản lý hồ sơ và thông tin nghệ sĩ</p>
        </div>
        <Link href="/admin/artists/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Thêm Nghệ sĩ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm nghệ sĩ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredArtists.map((artist) => (
              <div
                key={artist.id}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{artist.name}</h3>
                    {artist.status === 'verified' && (
                      <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{artist.genre}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{artist.monthlyListeners} hàng tháng</span>
                    <span>{artist.totalStreams} lượt stream</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/artists/${artist.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem Hồ sơ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/artists/${artist.id}`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(artist.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
