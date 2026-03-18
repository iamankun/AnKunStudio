"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { layBaiVietsCuaAdmin, xoaBaiViet, BaiViet } from '@/lib/baiviet';

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<BaiViet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await layBaiVietsCuaAdmin();
        setPosts(data);
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post =>
    post.tieude.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    try {
      await xoaBaiViet(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'archived':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Đã xuất bản';
      case 'draft':
        return 'Bản nháp';
      case 'archived':
        return 'Lưu trữ';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Đang tải...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Bài viết Blog</h1>
          <p className="text-muted-foreground mt-1">Quản lý nội dung blog của bạn</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Bài viết mới
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm bài viết..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Tiêu đề</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Tóm tắt</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Ngày tạo</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{post.tieude}</p>
                        <p className="text-sm text-muted-foreground mt-1">{formatDate(post.created_at)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-muted-foreground">
                      <p className="line-clamp-2">{post.tomtat || 'Không có tóm tắt'}</p>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(post.trang_thai)}`}>
                        {getStatusText(post.trang_thai)}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-muted-foreground">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/blog/${post.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Xem
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/blog/${post.id}/edit`}>
                              <Edit className="h-4 w-4 mr-2" />
                              Chỉnh sửa
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Xóa
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredPosts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">
                  {searchQuery ? 'Không tìm thấy bài viết nào' : 'Chưa có bài viết nào'}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
