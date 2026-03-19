import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev';

if (process.env.NODE_ENV === 'development') {
  setupDevPlatform({ persist: true });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
};

export default nextConfig;
