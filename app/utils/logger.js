const Logger = (...value) => {
  if (
    process.env.RUN_TIME_ENV === 'dev' ||
    process.env.RUN_TIME_ENV === 'staging'
  ) {
    console.log(...value);
  }
};

export default Logger;
