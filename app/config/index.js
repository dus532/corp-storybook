const env = process.env.RUN_TIME_ENV || 'local';
const configs = {
  local: {
    apiServerURL: process.env.LOCAL_API_SERVER || 'http://localhost:8080',
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

export default Object.assign({}, configs.local, configs[env]);
