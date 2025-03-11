/** @type {import('next').NextConfig} */
module.exports = {
  // Optimize for Netlify
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Disable TypeScript type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optimize output for Netlify
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
  // Force dynamic rendering for all pages
  experimental: {
    serverMinification: true,
    serverSourceMaps: false,
  },
} 