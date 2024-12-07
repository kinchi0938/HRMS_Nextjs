import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://43.201.218.199/:path*", // 백엔드 서버 주소
      },
    ];
  },
};

export default nextConfig;
