const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://43.201.218.199/:path*", // 백엔드 서버 주소
      },
    ];
  },
});
