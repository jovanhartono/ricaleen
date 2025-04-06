import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "yd1jimsuwvzgnhbn.public.blob.vercel-storage.com",
        search: "",
        port: "",
      },
    ],
  },
};

export default nextConfig;
