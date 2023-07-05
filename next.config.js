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
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
