import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["10.100.1.72:3000", "localhost:3000", "0.0.0.0:3000"],
    },
  },
};

export default nextConfig;
