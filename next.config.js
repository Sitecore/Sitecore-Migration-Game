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
    SITECORE_CDP_CLIENT_KEY: process.env.SITECORE_CDP_CLIENT_KEY,
    SITECORE_CDP_TARGET_URL: process.env.SITECORE_CDP_TARGET_URL,
    SITECORE_CDP_COOKIE_DOMAIN: process.env.SITECORE_CDP_COOKIE_DOMAIN,
    SITECORE_CDP_POS: process.env.SITECORE_CDP_POS,
    NEXT_PUBLIC_MEASUREMENT_ID: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
  },
};

module.exports = nextConfig;
