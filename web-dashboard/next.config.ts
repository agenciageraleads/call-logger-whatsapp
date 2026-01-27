import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    // Disable static page generation - force all routes dynamic
    dynamicIO: true,
  },
};

export default nextConfig;
