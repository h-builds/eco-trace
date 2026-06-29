import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform({ persist: true });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: false,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Accept" },
        ]
      }
    ];
  }
};

export default nextConfig;
