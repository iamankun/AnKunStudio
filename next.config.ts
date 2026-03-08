import { NextConfig } from "next/dist/server/config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@heroui/react"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
