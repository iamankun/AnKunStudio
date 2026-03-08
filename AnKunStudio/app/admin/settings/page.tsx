"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'An Kun Studio',
    siteDescription: 'Biến ước mơ thành hiện thực. Chúng tôi hỗ trợ nghệ sĩ, nhạc sĩ, nhà sản xuất và tất cả những người làm âm nhạc',
    contactEmail: 'contact@ankunstudio.com',
    socialInstagram: '@ankunstudio',
    socialTwitter: '@ankunstudio',
    youtubeVideoId: 'dQw4w9WgXcQ',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Cài đặt</h1>
        <p className="text-muted-foreground mt-1">Quản lý cấu hình trang web của bạn</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cài đặt Chung</CardTitle>
            <CardDescription>Thông tin cơ bản của trang web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="siteName">Tên Trang web</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="siteDescription">Mô tả Trang web</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Email Liên hệ</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mạng xã hội</CardTitle>
            <CardDescription>Liên kết và tài khoản mạng xã hội</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="socialInstagram">Instagram</Label>
              <Input
                id="socialInstagram"
                value={settings.socialInstagram}
                onChange={(e) => setSettings({ ...settings, socialInstagram: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="socialTwitter">Twitter / X</Label>
              <Input
                id="socialTwitter"
                value={settings.socialTwitter}
                onChange={(e) => setSettings({ ...settings, socialTwitter: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Hero</CardTitle>
            <CardDescription>Video YouTube cho phần hero trang chủ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="youtubeVideoId">ID Video YouTube</Label>
              <Input
                id="youtubeVideoId"
                value={settings.youtubeVideoId}
                onChange={(e) => setSettings({ ...settings, youtubeVideoId: e.target.value })}
                placeholder="vd., dQw4w9WgXcQ"
              />
              <p className="text-xs text-muted-foreground">
                ID video từ URL YouTube (sau v=)
              </p>
            </div>
            {settings.youtubeVideoId && (
              <div className="aspect-video rounded-lg overflow-hidden bg-secondary">
                <iframe
                  src={`https://www.youtube.com/embed/${settings.youtubeVideoId}?autoplay=0&mute=1`}
                  className="w-full h-full"
                  title="YouTube video preview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Khu vực Nguy hiểm</CardTitle>
            <CardDescription>Các hành động không thể hoàn tác</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-lg border border-destructive/50 bg-destructive/5">
              <h4 className="font-medium text-destructive mb-2">Xóa Tất cả Dữ liệu</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Thao tác này sẽ xóa vĩnh viễn tất cả bài viết, nghệ sĩ và bài hát. Không thể hoàn tác.
              </p>
              <Button variant="destructive" size="sm">
                Xóa Tất cả Dữ liệu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Đang lưu...' : 'Lưu Cài đặt'}
        </Button>
      </div>
    </div>
  );
}
