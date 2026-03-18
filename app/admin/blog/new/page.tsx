"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import RichTextEditor from '@/components/ui/rich-text-editor';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewBlogPostPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featuredImage: '',
    status: 'draft',
    tags: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [featuredImageWarning, setFeaturedImageWarning] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      // Get current user
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Bạn cần đăng nhập để tạo bài viết');
      }
      
      // Create blog post
      const { taoBaiViet } = await import('@/lib/baiviet');
      await taoBaiViet({
        tieude: formData.title,
        noidung: formData.content,
        tomtat: formData.excerpt,
        anh_dai_dien: formData.featuredImage,
        category: formData.category,
        tags: formData.tags,
        trang_thai: formData.status as 'draft' | 'published',
        admin_id: user.id
      });
      
      router.push('/admin/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
      alert(`Lỗi khi tạo bài viết: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const validateFeaturedImage = (url: string): { isValid: boolean; warning?: string } => {
    if (!url) return { isValid: true }; // Empty URL is valid
    
    // Data URLs are always valid for images
    if (url.startsWith('data:')) {
      return { isValid: true };
    }
    
    try {
      const urlObj = new URL(url);
      
      if (!['http:', 'https:'].includes(urlObj.protocol)) {
        return { isValid: false, warning: 'Chỉ chấp nhận HTTP và HTTPS URLs' };
      }
      
      // Allow all domains - no restrictions
      return { isValid: true };
    } catch {
      return { isValid: false, warning: 'URL không hợp lệ' };
    }
  };

  const handleFeaturedImageChange = (value: string) => {
    setFormData({ ...formData, featuredImage: value });
    const validation = validateFeaturedImage(value);
    setFeaturedImageWarning(validation.warning || null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bài viết Blog Mới</h1>
          <p className="text-muted-foreground mt-1">Tạo bài viết mới cho blog của bạn</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Nội dung</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề</Label>
                  <Input
                    id="title"
                    placeholder="Nhập tiêu đề bài viết..."
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Tóm tắt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Mô tả ngắn về bài viết..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(value) => setFormData({ ...formData, content: value })}
                    placeholder="Viết nội dung bài viết của bạn ở đây... (Hỗ trợ Markdown)"
                    height="400px"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Xuất bản</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={handleSubmit}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu Nháp
                  </Button>
                  <Button
                    type="button"
                    className="flex-1"
                    onClick={handleSubmit}
                    disabled={isSaving}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Xuất bản
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Chi tiết</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Input
                    id="category"
                    placeholder="Nhập danh mục..."
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Thẻ</Label>
                  <Input
                    id="tags"
                    placeholder="vd., nhạc, streaming, nghệ sĩ..."
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Phân cách các thẻ bằng dấu phẩy</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ảnh Nổi bật</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="featuredImage">URL ảnh đại diện</Label>
                    <Input
                      id="featuredImage"
                      placeholder="https://example.com/image.jpg"
                      value={formData.featuredImage}
                      onChange={(e) => handleFeaturedImageChange(e.target.value)}
                    />
                    {featuredImageWarning && (
                      <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-1">
                        ⚠️ {featuredImageWarning}
                      </div>
                    )}
                    {formData.featuredImage && !featuredImageWarning && (
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200 mt-1">
                        ✅ URL hợp lệ và được phép
                      </div>
                    )}
                  </div>
                  
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                       onClick={() => {
                         const input = document.createElement('input');
                         input.type = 'file';
                         input.accept = 'image/*';
                         input.onchange = (e) => {
                           const file = (e.target as HTMLInputElement).files?.[0];
                           if (file) {
                             // In production, upload to your server
                             // For now, create a local preview
                             const url = URL.createObjectURL(file);
                             handleFeaturedImageChange(url);
                             console.log('File selected for upload:', file);
                           }
                         };
                         input.click();
                       }}>
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Nhấp để tải lên hoặc kéo thả
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG, GIF tối đa 10MB
                    </p>
                  </div>
                  
                  {formData.featuredImage && (
                    <div className="mt-3">
                      <img 
                        src={formData.featuredImage} 
                        alt="Featured image preview" 
                        className="w-full h-32 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjEzMCIgdmlld0JveD0iMCAwIDMyMCAxMzAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMyMCIgaGVpZ2h0PSIxMzAiIGZpbGw9IiNmNWY1ZjUiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj7Ekb25nIGjhu5QgY+G7oWk8L3RleHQ+PC9zdmc+';
                        }}
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
