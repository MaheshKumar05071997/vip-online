import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // CORRECT PLACEMENT: Root level
  allowedDevOrigins: ["http://192.168.137.1:3000"],

  experimental: {
    // Keep other experimental options here if you have any
  },
};

export default nextConfig;
