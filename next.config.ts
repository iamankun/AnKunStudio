import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Giữ lại cấu hình domain hình ảnh của bạn
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "exsoflgvdreikabvhvkg.supabase.co",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
    ],
  },
  // Giữ lại cấu hình tối ưu gói
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  // Đã xóa bỏ phần ignoreBuildErrors để đảm bảo TypeScript check lỗi khi build
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Đã loại bỏ 'unsafe-eval'
            // Đã sửa lại đúng định dạng URL (thêm //) cho tất cả các domain
            // Đã gộp thêm các cấu hình frame-src từ tệp mjs cũ sang
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; script-src-elem 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://exsoflgvdreikabvhvkg.supabase.co https://*.supabase.co https://images.unsplash.com https://i.imgur.com https://i.ibb.co https://placehold.co; font-src 'self' data:; connect-src 'self' https://exsoflgvdreikabvhvkg.supabase.co https://*.supabase.co https://va.vercel-scripts.com; media-src 'self' https://www.soundhelix.com; frame-src 'self' https://www.youtube.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;