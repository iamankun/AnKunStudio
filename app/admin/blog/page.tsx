"use client";

import { useState } from 'react';
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

const blogPosts = [
  {
    id: '1',
    title: 'Tương lai của Phát trực tuyến Âm nhạc: Điều Nghệ sĩ Cần Biết',
    excerpt: 'Khám phá bối cảnh đang phát triển của các nền tảng phát trực tuyến âm nhạc...',
    author: 'Nguyễn Thị Mai',
    status: 'published',
    category: 'Thông tin Ngành',
    date: '05/03/2024',
    views: 1234,
  },
  {
    id: '2',
    title: 'Nghệ sĩ Tiêu biểu: Hành Trình của Mặt Trời Mọc đến Ngôi sao',
    excerpt: 'Từ nhà sản xuất trong phòng ngủ đến nghệ sĩ đứng đầu bảng xếp hạng...',
    author: 'Trần Văn Minh',
    status: 'published',
    category: 'Nghệ sĩ Tiêu biểu',
    date: '03/03/2024',
    views: 892,
  },
  {
    id: '3',
    title: 'Cách Xây dựng Thương hiệu Cá nhân với tư cách Nghệ sĩ Độc lập',
    excerpt: 'Mẹo và chiến lược để xây dựng thương hiệu cá nhân mạnh mẽ...',
    author: 'Nguyễn Thị Mai',
    status: 'draft',
    category: 'Mẹo & Hướng dẫn',
    date: '01/03/2024',
    views: 0,
  },
  {
    id: '4',
    title: 'Nghệ thuật Sản xuất Âm nhạc: Hướng dẫn cho Người mới bắt đầu',
    excerpt: 'Mọi thứ bạn cần biết để bắt đầu sản xuất âm nhạc...',
    author: 'Lê Hoàng Anh',
    status: 'published',
    category: 'Sản xuất',
    date: '28/02/2024',
    views: 2156,
  },
  {
    id: '5',
    title: 'Hiểu về Tiền bản quyền Âm nhạc và Các Nguồn Doanh thu',
    excerpt: 'Hướng dẫn toàn diện về cách nghệ sĩ kiếm tiền...',
    author: 'Trần Văn Minh',
    status: 'published',
    category: 'Thông tin Ngành',
    date: '25/02/2024',
    views: 1567,
  },
];

export default function AdminBlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(blogPosts);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
  };

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
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden md:table-cell">Tác giả</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden lg:table-cell">Danh mục</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Trạng thái</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground hidden sm:table-cell">Lượt xem</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{post.date}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell text-muted-foreground">
                      {post.author}
                    </td>
                    <td className="py-4 px-4 hidden lg:table-cell">
                      <span className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                        {post.category}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        post.status === 'published'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                      }`}>
                        {post.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 hidden sm:table-cell text-muted-foreground">
                      {post.views.toLocaleString()}
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
                            <Link href={`/admin/blog/${post.id}`}>
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
