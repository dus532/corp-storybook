/* eslint-disable no-unused-vars */
const configs = {
  dev: {
    apiServerURL: 'https://biz-corp-admin-api.dev.platdev.net',
  },
  local: {
    apiServerURL:
      process.env.LOCAL_API_SERVER ||
      'https://biz-corp-admin-api.dev.platdev.net',
  },
  development: {
    apiServerURL: process.env.DEV_API_SERVER,
  },
  staging: {
    apiServerURL: process.env.STAGING_API_SERVER,
  },
  production: {
    apiServerURL: process.env.PROD_API_SERVER,
  },
};

export default configs;
