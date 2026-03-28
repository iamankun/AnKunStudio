import { NextConfig } from "next/dist/server/config";

const nextConfig: NextConfig = {
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
      {
        protocol: "https",
        hostname: "t2.genius.com",
      },
      {
        protocol: "https",
        hostname: "**.genius.com",
      },
      {
        protocol: "https",
        hostname: "images.genius.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https: va.vercel-scripts.com; script-src-elem 'self' 'unsafe-inline' https: va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https: exsoflgvdreikabvhvkg.supabase.co https: *.supabase.co https: images.unsplash.com https: i.imgur.com https: i.ibb.co https: placehold.co https: localhost https: 127.0.0.1; font-src 'self' data:; connect-src 'self' https: exsoflgvdreikabvhvkg.supabase.co https: *.supabase.co https: va.vercel-scripts.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
