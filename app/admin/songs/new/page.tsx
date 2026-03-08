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
import { ArrowLeft, Save, Upload, Music, FileAudio } from 'lucide-react';
import Link from 'next/link';

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

const artists = [
  'Luna Echo',
  'Rising Sun',
  'Urban Beats',
  'Soul Harmony',
  'Wave Riders',
  'Pure Notes',
];

export default function NewSongPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
    genre: '',
    releaseDate: '',
    lyrics: '',
    isrc: '',
    explicit: false,
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    router.push('/admin/songs');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/songs">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tải lên Bài hát</h1>
          <p className="text-muted-foreground mt-1">Thêm bài hát mới vào nền tảng</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Audio Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Tệp Âm thanh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <FileAudio className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-foreground mb-1">
                    {audioFile ? audioFile.name : 'Kéo thả tệp âm thanh vào đây'}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    MP3, WAV, FLAC tối đa 100MB
                  </p>
                  <input
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    id="audio-upload"
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                  />
                  <Button type="button" variant="outline" asChild>
                    <label htmlFor="audio-upload" className="cursor-pointer">
                      <Upload className="h-4 w-4 mr-2" />
                      Chọn Tệp
                    </label>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Track Details */}
            <Card>
              <CardHeader>
                <CardTitle>Chi tiết Bài hát</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tiêu đề Bài hát *</Label>
                    <Input
                      id="title"
                      placeholder="Nhập tiêu đề bài hát..."
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="artist">Nghệ sĩ *</Label>
                    <Select
                      value={formData.artist}
                      onValueChange={(value) => setFormData({ ...formData, artist: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn nghệ sĩ" />
                      </SelectTrigger>
                      <SelectContent>
                        {artists.map((artist) => (
                          <SelectItem key={artist} value={artist}>
                            {artist}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="album">Album</Label>
                    <Input
                      id="album"
                      placeholder="Tên album..."
                      value={formData.album}
                      onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="genre">Thể loại</Label>
                    <Select
                      value={formData.genre}
                      onValueChange={(value) => setFormData({ ...formData, genre: value })}
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

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="releaseDate">Ngày Phát hành</Label>
                    <Input
                      id="releaseDate"
                      type="date"
                      value={formData.releaseDate}
                      onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="isrc">Mã ISRC</Label>
                    <Input
                      id="isrc"
                      placeholder="vd., VN-A01-20-00001"
                      value={formData.isrc}
                      onChange={(e) => setFormData({ ...formData, isrc: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lyrics">Lời bài hát</Label>
                  <Textarea
                    id="lyrics"
                    placeholder="Nhập lời bài hát..."
                    value={formData.lyrics}
                    onChange={(e) => setFormData({ ...formData, lyrics: e.target.value })}
                    rows={8}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="explicit"
                    checked={formData.explicit}
                    onChange={(e) => setFormData({ ...formData, explicit: e.target.checked })}
                    className="rounded border-border"
                    aria-label="Bài hát này có nội dung nhạy cảm"
                  />
                  <Label htmlFor="explicit" className="font-normal">
                    Bài hát này có nội dung nhạy cảm
                  </Label>
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
                  {isSaving ? 'Đang tải lên...' : 'Tải lên Bài hát'}
                </Button>
                <Button type="button" variant="outline" className="w-full" asChild>
                  <Link href="/admin/songs">Hủy</Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ảnh Bìa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Music className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {coverFile ? coverFile.name : 'Nhấp để tải lên'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Ảnh vuông, tối thiểu 1400x1400
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="cover-upload"
                    onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                  />
                </div>
                <Button type="button" variant="outline" className="w-full mt-3" asChild>
                  <label htmlFor="cover-upload" className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Chọn Ảnh
                  </label>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hướng dẫn Tải lên</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>- Âm thanh phải chất lượng cao (MP3 320kbps+ hoặc lossless)</p>
                <p>- Ảnh bìa phải có kích thước tối thiểu 1400x1400 pixels</p>
                <p>- Đảm bảo bạn có quyền phân phối nội dung này</p>
                <p>- Mã ISRC giúp theo dõi tiền bản quyền</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
