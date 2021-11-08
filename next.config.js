module.exports = {
  // images: {
  //   imageSizes: [1100],
  //   deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
}
