"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
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
import RichTextEditor from '@/components/ui/rich-text-editor';
import { ArrowLeft, Save, Eye, Upload } from 'lucide-react';
import Link from 'next/link';
import { layBaiVietTheoId, capNhatBaiViet, UpdateBaiViet } from '@/lib/baiviet';
import Image from 'next/image';

// Extended interface for post data that might include category and tags
interface ExtendedBaiViet extends UpdateBaiViet {
  category?: string;
  tags?: string;
}

const categories = [
  'Thông tin',
  'Nghệ sĩ',
  'Mẹo & Hướng dẫn',
  'Sản xuất',
  'Tin tức',
  'Sự kiện',
];

export default function EditBlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<UpdateBaiViet>({
    tieude: '',
    noidung: '',
    tomtat: '',
    anh_dai_dien: '',
    trang_thai: 'draft',
  });
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [featuredImageWarning, setFeaturedImageWarning] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const postId = params.id as string;
      
      if (!postId) {
        setError('Không có ID bài viết');
        setLoading(false);
        return;
      }

      try {
        const post = await layBaiVietTheoId(postId);
        if (post) {
          setFormData({
            tieude: post.tieude || '',
            noidung: post.noidung || '',
            tomtat: post.tomtat || '',
            anh_dai_dien: post.anh_dai_dien || '',
            trang_thai: post.trang_thai || 'draft',
          });
          // Safely set category and tags using the extended interface
          const extendedPost = post as ExtendedBaiViet;
          setCategory(extendedPost.category || '');
          setTags(extendedPost.tags || '');
        } else {
          setError('Bài viết không tồn tại');
        }
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Không thể tải bài viết');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      if (!formData.tieude?.trim()) {
        throw new Error('Tiêu đề không được để trống');
      }
      if (!formData.noidung?.trim()) {
        throw new Error('Nội dung không được để trống');
      }
      
      const postId = params.id as string;
      if (!postId) {
        throw new Error('Thông tin không hợp lệ');
      }
      
      const updateData: UpdateBaiViet = {
        ...formData,
        trang_thai: formData.trang_thai as 'draft' | 'published' | 'archived',
      };
      
      await capNhatBaiViet(postId, updateData);
      router.push('/admin/blog');
    } catch (error) {
      console.error('Failed to update blog post:', error);
      alert(`Lỗi khi cập nhật bài viết: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (field: keyof UpdateBaiViet, value: string) => {
    setFormData((prev: UpdateBaiViet) => ({
      ...prev,
      [field]: value
    }));
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
      
      const allowedDomains = [
        'exsoflgvdreikabvhvkg.supabase.co',
        'images.unsplash.com',
        'i.imgur.com',
        'i.ibb.co',
        'placehold.co',
        'localhost',
        '127.0.0.1',
        'va.vercel-scripts.com'
      ];
      
      // Check for exact matches
      if (allowedDomains.includes(urlObj.hostname)) {
        return { isValid: true };
      }
      
      // Check for wildcard patterns
      for (const domain of allowedDomains) {
        if (domain.startsWith('*.')) {
          const baseDomain = domain.slice(2);
          if (urlObj.hostname === baseDomain || urlObj.hostname.endsWith('.' + baseDomain)) {
            return { isValid: true };
          }
        }
      }
      
      return { 
        isValid: true, 
        warning: `Domain "${urlObj.hostname}" không có trong danh sách cho phép. Ảnh có thể không hiển thị do CSP.` 
      };
    } catch {
      return { isValid: false, warning: 'URL không hợp lệ' };
    }
  };

  const handleFeaturedImageChange = (value: string) => {
    handleInputChange('anh_dai_dien', value);
    const validation = validateFeaturedImage(value);
    setFeaturedImageWarning(validation.warning || null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Đang tải thông tin bài viết...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="text-destructive mb-4">{error}</div>
          <Link href="/admin/blog">
            <Button variant="outline">Quay lại</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chỉnh sửa bài viết</h1>
          <p className="text-muted-foreground mt-1">Cập nhật nội dung bài viết</p>
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
                    value={formData.tieude || ''}
                    onChange={(e) => handleInputChange('tieude', e.target.value)}
                    className="text-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Tóm tắt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Mô tả ngắn về bài viết..."
                    value={formData.tomtat || ''}
                    onChange={(e) => handleInputChange('tomtat', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung</Label>
                  <RichTextEditor
                    value={formData.noidung || ''}
                    onChange={(value) => handleInputChange('noidung', value)}
                    placeholder="Viết nội dung bài viết tại đây..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO & Meta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    placeholder="Tiêu đề SEO (tối đa 60 ký tự)"
                    value={formData.tieude?.substring(0, 60) || ''}
                    maxLength={60}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    placeholder="Mô tả SEO (tối đa 160 ký tự)"
                    value={formData.tomtat?.substring(0, 160) || ''}
                    maxLength={160}
                    rows={2}
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
                    onClick={() => handleInputChange('trang_thai', 'draft')}
                    disabled={isSaving}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Lưu Nháp
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSaving}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Cập nhật
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
                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Thẻ</Label>
                  <Input
                    id="tags"
                    placeholder="vd., nhạc, streaming, nghệ sĩ..."
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
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
                      value={formData.anh_dai_dien || ''}
                      onChange={(e) => handleFeaturedImageChange(e.target.value)}
                    />
                    {featuredImageWarning && (
                      <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded border border-amber-200 mt-1">
                        ⚠️ {featuredImageWarning}
                      </div>
                    )}
                    {formData.anh_dai_dien && !featuredImageWarning && (
                      <div className="text-xs text-green-600 bg-green-50 p-2 rounded border border-green-200 mt-1">
                        ✅ URL hợp lệ và được phép
                      </div>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    <p className="font-semibold mb-1">Các domain được phép:</p>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-secondary px-2 py-1 rounded text-xs">supabase.co</span>
                      <span className="bg-secondary px-2 py-1 rounded text-xs">unsplash.com</span>
                      <span className="bg-secondary px-2 py-1 rounded text-xs">imgur.com</span>
                      <span className="bg-secondary px-2 py-1 rounded text-xs">ibb.co</span>
                    </div>
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
                             // You would typically upload to Supabase Storage here
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
                  
                  {formData.anh_dai_dien && (
                    <div className="mt-3">
                      <Image 
                        src={formData.anh_dai_dien} 
                        alt="Featured image preview" 
                        width={320}
                        height={128}
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