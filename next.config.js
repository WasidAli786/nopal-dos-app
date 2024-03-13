/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
        pathname: "/cafescale_restaurants_backend_bucket/**",
      },
      {
        protocol: "https",
        hostname: "cafescale.site",
        port: "",
        pathname: "/storage/app/public/profile/**",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // experimental: {
  //   missingSuspenseWithCSRBailout: false,
  // },
};

module.exports = nextConfig;
