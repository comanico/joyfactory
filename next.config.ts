import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      {
        source: "/parties",
        destination: "/packages",
        permanent: true,
      },
      {
        source:
          "/:file((?!media/)[^/]+\\.(?:jpg|jpeg|JPG|png|webp|gif|GIF))",
        destination: "/404",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
