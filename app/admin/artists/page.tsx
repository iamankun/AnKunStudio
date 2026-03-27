"use client";

import { useState, useEffect } from 'react';
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
import { layDanhSachArtists, xoaArtist } from '@/lib/artists';

export default function AdminArtistsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [artists, setArtists] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await layDanhSachArtists();
        setArtists(data);
      } catch (error) {
        console.error('Error fetching artists:', error);
        setArtists([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  const filteredArtists = artists.filter((artist: Record<string, unknown>) => {
    return (artist.name as string)?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (artist.genre as string[])?.some((g: string) => g.toLowerCase().includes(searchQuery.toLowerCase()))
  });

  const handleDelete = async (id: string) => {
    try {
      await xoaArtist(id);
      setArtists(artists.filter(artist => artist.id !== id));
    } catch (error) {
      console.error('Lỗi khi xoá hồ sơ này:', error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="ml-4 text-muted-foreground">Đang tải danh sách nghệ sĩ...</p>
        </div>
      </div>
    );
  }

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
            Thêm hồ sơ nghệ sĩ
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm hồ sơ nghệ sĩ"
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
                key={artist.id as string}
                className="flex items-start gap-4 p-4 rounded-lg border border-border hover:border-primary/50 transition-colors"
              >
                <div className="relative w-16 h-16 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={(artist.avatar_url as string) || '/anhdaidiennghesi.jpg?height=100&width=100'}
                    alt={artist.name as string}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="shrink-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground truncate">{artist.name as string}</h3>
                    {artist.verified as boolean && (
                      <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{(artist.genre as string[])?.[0] || 'Không có thông tin '}</p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{(artist.monthly_listeners as string) || '0'} hàng tháng</span>
                    <span>{(artist.total_streams as string) || '0'} lượt nghe</span>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/artists/${artist.slug}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        Xem hồ sơ
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/artists/${artist.id}/edit`}>
                        <Edit className="h-4 w-4 mr-2" />
                        Chỉnh sửa
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => handleDelete(artist.id as string)}
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
