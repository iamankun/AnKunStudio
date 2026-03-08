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
import { ArrowLeft, Save, Eye, Upload, Bold, Italic, Link as LinkIcon, Image, List, ListOrdered, Quote } from 'lucide-react';
import Link from 'next/link';

const categories = [
  'Thông tin Ngành',
  'Nghệ sĩ Tiêu biểu',
  'Mẹo & Hướng dẫn',
  'Sản xuất',
  'Tin tức',
  'Sự kiện',
];

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSaving(false);
    router.push('/admin/blog');
  };

  const insertMarkdown = (syntax: string, placeholder: string = '') => {
    const textarea = document.getElementById('content') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = formData.content.substring(start, end) || placeholder;
    
    let newText = '';
    switch (syntax) {
      case 'bold':
        newText = `**${selectedText}**`;
        break;
      case 'italic':
        newText = `*${selectedText}*`;
        break;
      case 'link':
        newText = `[${selectedText}](url)`;
        break;
      case 'image':
        newText = `![${selectedText}](image-url)`;
        break;
      case 'list':
        newText = `\n- ${selectedText}`;
        break;
      case 'ordered':
        newText = `\n1. ${selectedText}`;
        break;
      case 'quote':
        newText = `\n> ${selectedText}`;
        break;
      default:
        newText = selectedText;
    }

    const newContent = formData.content.substring(0, start) + newText + formData.content.substring(end);
    setFormData({ ...formData, content: newContent });
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
                  <div className="border border-border rounded-lg overflow-hidden">
                    {/* Toolbar */}
                    <div className="flex items-center gap-1 p-2 border-b border-border bg-secondary/30">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('bold', 'bold text')}
                      >
                        <Bold className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('italic', 'italic text')}
                      >
                        <Italic className="h-4 w-4" />
                      </Button>
                      <div className="w-px h-6 bg-border mx-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('link', 'link text')}
                      >
                        <LinkIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('image', 'alt text')}
                      >
                        <Image className="h-4 w-4" aria-label="Chèn ảnh" />
                      </Button>
                      <div className="w-px h-6 bg-border mx-1" />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('list', 'list item')}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('ordered', 'list item')}
                      >
                        <ListOrdered className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => insertMarkdown('quote', 'quote')}
                      >
                        <Quote className="h-4 w-4" />
                      </Button>
                    </div>
                    <Textarea
                      id="content"
                      placeholder="Viết nội dung bài viết của bạn ở đây... (Hỗ trợ Markdown)"
                      value={formData.content}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      rows={15}
                      className="border-0 rounded-none focus-visible:ring-0 resize-none"
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
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Nhấp để tải lên hoặc kéo thả
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG tối đa 10MB
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
