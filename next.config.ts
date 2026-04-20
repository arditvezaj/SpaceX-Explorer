import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.staticflickr.com" },
      { protocol: "https", hostname: "imgur.com" },
      { protocol: "https", hostname: "**.spacexdata.com" },
      { protocol: "https", hostname: "i.imgur.com" },
      { protocol: "https", hostname: "images2.imgbox.com" },
    ],
  },
};

export default nextConfig;
