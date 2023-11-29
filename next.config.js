/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(md|markdown)$/,
      type: "asset/source",
    });

    return config;
  },
};

module.exports = nextConfig;
