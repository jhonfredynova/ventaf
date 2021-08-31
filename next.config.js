module.exports = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'es'
  },
  images: {
    domains: ['storage.googleapis.com']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'eslint-loader',
        options: {
          failOnError: true,
          failOnWarning: true
        }
      }]  
    });
    return config;
  }
};