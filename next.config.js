/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["mystatfiles.itstep.org"],
  },
};

module.exports = nextConfig;
