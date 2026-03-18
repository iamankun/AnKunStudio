"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { layBaiVietTheoIdClient } from '@/lib/baiviet';
import { useParams } from 'next/navigation';

interface BlogPost {
  id: string;
  tieude: string;
  tomtat?: string;
  noidung: string;
  trang_thai: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

export default function BlogPostActionPage() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const postId = params['post-id'] as string;

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) {
        setError('Không có ID bài viết');
        setLoading(false);
        return;
      }

      try {
        const postData = await layBaiVietTheoIdClient(postId);
        if (postData) {
          setPost(postData);
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
  }, [postId]);

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
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{post?.tieude}</h1>
          <p className="text-muted-foreground mt-1">Hành động bài viết</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin bài viết</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Tiêu đề</h3>
            <p className="text-muted-foreground">{post?.tieude}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Trạng thái</h3>
            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
              post?.trang_thai === 'published' ? 'bg-green-100 text-green-800' :
              post?.trang_thai === 'draft' ? 'bg-yellow-100 text-yellow-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {post?.trang_thai === 'published' ? 'Đã xuất bản' :
               post?.trang_thai === 'draft' ? 'Bản nháp' : 'Lưu trữ'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}