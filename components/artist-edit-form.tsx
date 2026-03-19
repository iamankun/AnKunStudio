'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Save, Instagram, Twitter, Music2, Globe } from 'lucide-react';
import Link from 'next/link';
import { capNhatArtist } from '@/lib/artists';
import { Artist } from '@/types/database';

const genres = [
  'Pop',
  'Rock',
  'Hip-Hop',
  'R&B',
  'Electronic',
  'Jazz',
  'Classical',
  'Country',
  'Indie',
  'Metal',
  'Folk',
  'Reggae',
];

interface ArtistEditFormProps {
  artist: Artist;
}

export function ArtistEditForm({ artist }: ArtistEditFormProps) {
  const router = useRouter();
  const artistId = artist.id;
  
  const socialLinks = artist.social_links || {};
  const genreValue = artist.genre && artist.genre.length > 0 ? artist.genre[0] : '';
  
  const [formData, setFormData] = useState({
    name: artist.name || '',
    genre: genreValue,
    bio: artist.bio || '',
    country: artist.country || '',
    city: artist.city || '',
    website: socialLinks.website || '',
    instagram: socialLinks.instagram || '',
    twitter: socialLinks.twitter || '',
    spotify: socialLinks.spotify || '',
    label: artist.label || '',
    avatar_url: artist.avatar_url || '',
    cover_image_url: artist.cover_image_url || '',
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    
    try {
      const artistData = {
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        genre: formData.genre ? [formData.genre] : [],
        social_links: {
          website: formData.website.trim(),
          instagram: formData.instagram.trim(),
          twitter: formData.twitter.trim(),
          spotify: formData.spotify.trim(),
        },
        country: formData.country.trim(),
        city: formData.city.trim(),
        label: formData.label.trim(),
        avatar_url: formData.avatar_url.trim(),
        cover_image_url: formData.cover_image_url.trim(),
      };
      
      if (!artistData.name) {
        setError('Tên nghệ sĩ không được để trống.');
        return;
      }
      
      await capNhatArtist(artistId, artistData);
      router.push('/admin/artists');
    } catch (err) {
      console.error('Error updating artist:', err);
      let errorMessage = 'Không thể cập nhật nghệ sĩ. Vui lòng thử lại.';
      if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/artists">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chỉnh sửa Nghệ sĩ</h1>
          <p className="text-muted-foreground mt-1">Cập nhật thông tin nghệ sĩ</p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thông tin Cơ bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Tên Nghệ sĩ *</Label>
                    <Input
                      id="name"
                      placeholder="Nhập tên nghệ sĩ..."
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Thể loại *</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) => setFormData({ ...formData, genre: value })}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn thể loại" />
                      </SelectTrigger>
                      <SelectContent>
                        {genres.map((genre) => (
                          <SelectItem key={genre} value={genre}>
                            {genre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Tiểu sử</Label>
                  <Textarea
                    id="bio"
                    placeholder="Kể câu chuyện về nghệ sĩ..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={6}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="country">Quốc gia</Label>
                    <Input
                      id="country"
                      placeholder="vd., Việt Nam"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input
                      id="city"
                      placeholder="vd., Hà Nội"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="label">Hãng Thu âm</Label>
                  <Input
                    id="label"
                    placeholder="vd., An Kun Studio"
                    value={formData.label}
                    onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Liên kết Mạng xã hội</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Trang web</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="website"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="relative">
                    <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="instagram"
                      placeholder="@username"
                      value={formData.instagram}
                      onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter / X</Label>
                  <div className="relative">
                    <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="twitter"
                      placeholder="@username"
                      value={formData.twitter}
                      onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="spotify">ID Nghệ sĩ Spotify</Label>
                  <div className="relative">
                    <Music2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="spotify"
                      placeholder="ID nghệ sĩ từ Spotify"
                      value={formData.spotify}
                      onChange={(e) => setFormData({ ...formData, spotify: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thao tác</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button type="submit" className="w-full" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Đang lưu...' : 'Lưu Thay đổi'}
                </Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/artists">Hủy</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ảnh Hồ sơ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.avatar_url && (
                  <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                    <img
                      src={formData.avatar_url}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="avatar_url">Link ảnh hồ sơ</Label>
                  <Input
                    id="avatar_url"
                    placeholder="https://..."
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  />
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground text-xs">
                  <p>Khuyến nghị ảnh vuông</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ảnh Bìa</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.cover_image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                    <img
                      src={formData.cover_image_url}
                      alt="Cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="cover_image_url">Link ảnh bìa</Label>
                  <Input
                    id="cover_image_url"
                    placeholder="https://..."
                    value={formData.cover_image_url}
                    onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                  />
                </div>
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center text-muted-foreground text-xs">
                  <p>Khuyến nghị 1920x1080</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
