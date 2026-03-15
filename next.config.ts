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
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: exsoflgvdreikabvhvkg.supabase.co https: *.supabase.co; font-src 'self' data:; connect-src 'self' https: exsoflgvdreikabvhvkg.supabase.co https: *.supabase.co;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
