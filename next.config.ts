import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false }; // Fix potential issues with server-side dependencies
    return config;
  },
  reactStrictMode: true, // Helps catch React issues early
};

export default nextConfig;
