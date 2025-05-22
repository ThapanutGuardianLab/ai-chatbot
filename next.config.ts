import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
      ...config.experiments,
    };
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/inline",
    });
    return config;
  },
  experimental: {
    ppr: true,
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  images: {
    remotePatterns: [
      {
        hostname: "avatar.vercel.sh",
      },
    ],
  },
};

export default nextConfig;
