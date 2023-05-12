/** @type {import('next'.NextConfig)} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [options.defaultLoaders.babel, { loader: 'graphql-tag/loader' }],
    });

    return config;
  },
  env: {
    SITECORE_CH1_CLIENT_KEY: process.env.SITECORE_CH1_CLIENT_KEY,
    SITECORE_CH1_ENDPOINT_URL: process.env.SITECORE_CH1_ENDPOINT_URL,
  },
};

module.exports = nextConfig;
