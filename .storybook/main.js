const path = require('path');
// your app's webpack.config.js
const custom = require('../internals/webpack/webpack.prod.babel.js');

module.exports = {
  stories: ['../app/stories/**/*.stories.js'],
  webpackFinal: config => {
    return {
      ...config,
      module: { ...config.module, rules: custom.module.rules },
    };
  },
};
