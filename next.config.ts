import type { NextConfig } from "next";
/** @type {import('next').Next.jsConfig} */
const nextConfig: NextConfig = {

  experimental: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    allowedDevOrigins: ["192.168.2.127:3000", "localhost:3000"]
  }
};

export default nextConfig;
