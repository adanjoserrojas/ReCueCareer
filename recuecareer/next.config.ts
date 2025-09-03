import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  async rewrites() {
    return [
      {
        source: "/auth/:path*",      // whatever you hit in the browser
        destination: "/api/auth/:path*", // is served by your API handler
      },
    ];
  },
};

export default nextConfig;
