/* eslint-disable no-unused-vars */
const configs = {
  dev: {
    apiServerURL: 'https://biz-corp-admin-api.dev.platdev.net',
  },
  local: {
    apiServerURL:
      // process.env.LOCAL_API_SERVER ||
      'https://biz-corp-admin-api.dev.platdev.net',
  },
  development: {
    apiServerURL:
      // process.env.DEV_API_SERVER ||
      'https://biz-corp-admin-api.dev.platdev.net',
  },
  staging: {
    apiServerURL:
      // process.env.STAGING_API_SERVER ||
      'https://biz-corp-admin-api.staging.platdev.net',
  },
  production: {
    apiServerURL: process.env.PROD_API_SERVER,
  },
  test: {
    apiServerURL: `http://192.168.0.34:8080`,
  },
};

export default configs;
