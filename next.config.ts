import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    minimumCacheTTL: 3600 * 24 * 30 * 12, // 1 year
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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
