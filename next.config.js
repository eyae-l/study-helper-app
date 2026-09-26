/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Handle pdfjs-dist worker
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
}

module.exports = nextConfig
