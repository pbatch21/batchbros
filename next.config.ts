/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable ESLint during build
  eslint: {
    // Only run ESLint on local development, not during builds
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    // Only run type checking on local development, not during builds
    ignoreBuildErrors: true,
  },
  // Set dynamic rendering for pages that use searchParams
  experimental: {
    // Optimize for Netlify
    serverMinification: true,
    serverSourceMaps: false,
  },
  // Optimize output for Netlify
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;
