/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Handle trailing slashes consistently
  trailingSlash: false,
  // Add redirects for hash fragments
  async redirects() {
    return [
      {
        source: '/#features',
        destination: '/features',
        permanent: true,
      },
      {
        source: '/#how-it-works',
        destination: '/how-it-works',
        permanent: true,
      },
      {
        source: '/#testimonials',
        destination: '/testimonials',
        permanent: true,
      },
      {
        source: '/#faqs',
        destination: '/faqs',
        permanent: true,
      },
      {
        source: '/#early-access',
        destination: '/early-access',
        permanent: true,
      },
      {
        source: '/#pre-sale-offer',
        destination: '/early-access',
        permanent: true,
      },
      {
        source: '/#hero',
        destination: '/',
        permanent: true,
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
        pathname: '/7.x/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' https:; script-src 'none'; sandbox;",
    unoptimized: true
  },
  // Completely disable TypeScript and ESLint checking for build
  typescript: { 
    ignoreBuildErrors: true 
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  // Disable static export errors
  experimental: {
    missingSuspenseWithCSRBailout: false
  },
  // Exclude backup files
  distDir: '.next',
  // Set all pages to be server-side rendered
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
