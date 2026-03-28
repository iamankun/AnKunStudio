import type { NextConfig } from "next";

// Kiểm tra xem hệ thống có đang ở môi trường phát triển (development) hay không
const isDev = process.env.NODE_ENV !== "production";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Chấp nhận TẤT CẢ các link ảnh sử dụng giao thức HTTPS
        protocol: "https",
        hostname: "**", 
      },
      {
        // (Tùy chọn) Chấp nhận TẤT CẢ các link ảnh HTTP cũ
        protocol: "http",
        hostname: "**", 
      }
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Nội suy biến isDev để tự động thêm 'unsafe-eval' khi đang code,
            // và tự động xóa bỏ khi triển khai lên máy chủ thật.
            value: `default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com ${isDev ? "'unsafe-eval'" : ""}; script-src-elem 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://exsoflgvdreikabvhvkg.supabase.co https://*.supabase.co https://images.unsplash.com https://i.imgur.com https://i.ibb.co https://placehold.co; font-src 'self' data:; connect-src 'self' https://exsoflgvdreikabvhvkg.supabase.co https://*.supabase.co https://va.vercel-scripts.com; media-src 'self' https://www.soundhelix.com; frame-src 'self' https://www.youtube.com;`,
          },
        ],
      },
    ];
  },
};

export default nextConfig;