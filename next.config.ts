import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["source.unsplash.com", "images.unsplash.com"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
