"use client";

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
import { taoArtist, layArtistTheoSlug } from '@/lib/artists';

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

export default function NewArtistPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    bio: '',
    country: '',
    city: '',
    website: '',
    instagram: '',
    twitter: '',
    spotify: '',
    label: '',
    avatar_url: '',
    cover_image_url: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError('');
    
    try {
      // Check if user is authenticated
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setError('Bạn cần đăng nhập để tạo nghệ sĩ mới.');
        return;
      }

      // Generate slug from name
      const slug = formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Check if slug already exists
      const existingArtist = await layArtistTheoSlug(slug);
      if (existingArtist) {
        setError(`Nghệ sĩ với tên "${formData.name}" đã tồn tại. Vui lòng chọn tên khác.`);
        return;
      }
      
      // Prepare artist data
      const artistData = {
        name: formData.name,
        slug: slug,
        bio: formData.bio,
        genre: formData.genre ? [formData.genre] : [],
        social_links: {
          website: formData.website,
          instagram: formData.instagram,
          twitter: formData.twitter,
          spotify: formData.spotify,
        },
        monthly_listeners: '0',
        followers: '0',
        total_streams: '0',
        verified: false,
        is_active: true,
        avatar_url: formData.avatar_url,
        cover_image_url: formData.cover_image_url,
      };
      
      // Create artist in Supabase
      await taoArtist(artistData);
      
      // Redirect to artists list
      router.push('/admin/artists');
    } catch (error) {
      console.error('Error creating artist:', error);
      setError('Không thể tạo nghệ sĩ. Vui lòng thử lại.');
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
          <h1 className="text-3xl font-bold text-foreground">Thêm Nghệ sĩ Mới</h1>
          <p className="text-muted-foreground mt-1">Tạo hồ sơ nghệ sĩ mới</p>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
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

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Thao tác</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button type="submit" className="w-full" disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? 'Đang lưu...' : 'Lưu Nghệ sĩ'}
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
