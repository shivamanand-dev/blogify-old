module.exports = {
  withBundleAnalyzer: require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
    reactStrictMode: true,
  }),
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }

    return config;
  },
};
