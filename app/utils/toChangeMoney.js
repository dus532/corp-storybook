export default (value, reg = 'en', err = '오류') =>
  Number.isNaN(value) ? err : `${Number(value).toLocaleString(reg)} 원`;
