import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Opt nodemailer out of bundling so it uses native Node.js require
  serverExternalPackages: ["nodemailer"],

  // Enable compression for better performance
  compress: true,
  
  // Optimize images
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "**.freepik.com",
      },
      {
        protocol: "https",
        hostname: "**.thecrazyprogrammer.com",
      },
    ],
  },
  
  // Production source maps disabled for smaller bundle
  productionBrowserSourceMaps: false,
};

export default nextConfig;
