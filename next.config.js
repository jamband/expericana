module.exports = {
  future: {
    webpack5: true,
  },
  webpack: (config, { dev }) => {
    if (!dev) {
      config.cache = false;
    }

    return config;
  }
};
