"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Music, TrendingUp, Play } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: 'Tổng số bài viết', value: '24', change: '+3 tuần này', icon: FileText, href: '/admin/blog' },
  { label: 'Nghệ sĩ', value: '156', change: '+12 tháng này', icon: Users, href: '/admin/artists' },
  { label: 'Bài hát', value: '1,248', change: '+45 tuần này', icon: Music, href: '/admin/songs' },
  { label: 'Tổng lượt nghe', value: '2.4M', change: '+18% so với tháng trước', icon: Play, href: '/admin/songs' },
];

const recentActivity = [
  { type: 'post', title: 'Bài viết blog mới được xuất bản', description: 'Tương lai của Streaming Âm nhạc', time: '2 giờ trước' },
  { type: 'artist', title: 'Nghệ sĩ mới được thêm', description: 'Luna Echo tham gia nền tảng', time: '5 giờ trước' },
  { type: 'song', title: 'Bài hát được tải lên', description: 'Midnight Dreams bởi Luna Echo', time: '1 ngày trước' },
  { type: 'post', title: 'Bài viết blog được cập nhật', description: 'Nghệ sĩ tiêu biểu: Rising Sun', time: '2 ngày trước' },
  { type: 'artist', title: 'Hồ sơ nghệ sĩ được cập nhật', description: 'Urban Beats cập nhật tiểu sử của họ', time: '3 ngày trước' },
];

const topSongs = [
  { title: 'Digital Flow', artist: 'Urban Beats', plays: '5.1M', trend: '+12%' },
  { title: 'Midnight Dreams', artist: 'Luna Echo', plays: '4.2M', trend: '+8%' },
  { title: 'Sunrise Vibes', artist: 'Rising Sun', plays: '3.8M', trend: '+15%' },
  { title: 'Infinite Love', artist: 'Soul Harmony', plays: '2.9M', trend: '+5%' },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Bảng điều khiển</h1>
        <p className="text-muted-foreground mt-1">Chào mừng trở lại! Đây là những gì đang diễn ra.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Hoạt động Gần đây</CardTitle>
            <CardDescription>Cập nhật mới nhất trên nền tảng</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'post' ? 'bg-blue-100 dark:bg-blue-900/30' :
                    activity.type === 'artist' ? 'bg-green-100 dark:bg-green-900/30' :
                    'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {activity.type === 'post' && <FileText className="h-4 w-4 text-blue-600 dark:text-blue-400" />}
                    {activity.type === 'artist' && <Users className="h-4 w-4 text-green-600 dark:text-green-400" />}
                    {activity.type === 'song' && <Music className="h-4 w-4 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground truncate">{activity.description}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Songs */}
        <Card>
          <CardHeader>
            <CardTitle>Bài hát Hàng đầu</CardTitle>
            <CardDescription>Các bài hát được phát nhiều nhất tháng này</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topSongs.map((song, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <span className="text-lg font-bold text-muted-foreground w-6">{idx + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{song.title}</p>
                    <p className="text-sm text-muted-foreground">{song.artist}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{song.plays}</p>
                    <p className="text-xs text-green-600 dark:text-green-400">{song.trend}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hành động Nhanh</CardTitle>
          <CardDescription>Các tác vụ thường gặp bạn có thể muốn thực hiện</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <FileText className="h-5 w-5 text-primary" />
              <span className="font-medium">Bài viết Blog Mới</span>
            </Link>
            <Link
              href="/admin/artists/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <Users className="h-5 w-5 text-primary" />
              <span className="font-medium">Thêm Nghệ sĩ</span>
            </Link>
            <Link
              href="/admin/songs/new"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <Music className="h-5 w-5 text-primary" />
              <span className="font-medium">Tải lên Bài hát</span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-secondary/50 transition-colors"
            >
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="font-medium">Xem Phân tích</span>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
