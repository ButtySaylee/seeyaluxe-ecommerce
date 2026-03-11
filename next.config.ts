import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/cloudinaryLoader.ts',
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'via.placeholder.com' },
      { protocol: 'https', hostname: '**.supabase.co' },
    ],
  },
};

export default nextConfig;
