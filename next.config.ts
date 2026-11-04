import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local network load the dev server (e.g. http://192.168.1.53:3000).
  allowedDevOrigins: ["192.168.1.53", "192.168.*.*", "10.*.*.*"],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
