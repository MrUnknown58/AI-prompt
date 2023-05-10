// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["images.unsplash.com","unsplash.com"],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "unsplash.com",
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
