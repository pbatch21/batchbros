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
    // This allows pages with dynamic data to be built
    outputFileTracingIncludes: {
      '/games': ['**/*'],
    },
  },
};

export default nextConfig;
