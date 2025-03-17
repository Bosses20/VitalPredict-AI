/** @type {import('next').NextConfig} */
const nextConfig = {
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
  // Don't fail the build if ESLint finds issues
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Exclude backup files from the build process
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  transpilePackages: [],
  webpack: (config, { isServer }) => {
    // Add a rule to exclude backup files from being processed
    config.module.rules.push({
      test: /backups\//,
      use: 'null-loader',
    });
    return config;
  },
};

module.exports = nextConfig;
