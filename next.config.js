/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "itstep.org",
      },
    ],
    domains: ["itstep.org"],
  },
  async rewrites() {
    return [
      {
        source: "/ingest/:path*",
        destination: "https://app.posthog.com/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
