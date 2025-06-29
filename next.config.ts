import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily
  },
  images: {
    remotePatterns: [
        {
            protocol: 'https',
            hostname: "fra.cloud.appwrite.io",
            port: '',
            pathname: '/v1/**',
        },
    ]
  }
};

export default nextConfig;
