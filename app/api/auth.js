import config from 'config';

import request, { makeOptionsWithAuth, makeOptions } from 'utils/request';

const { apiServerURL } = config;

export async function requestAdminLogin(params) {
  const requestURL = `${apiServerURL}/auth/admin`;
  const requestOptions = makeOptions('POST', params);

  return request(requestURL, requestOptions);
}

export async function requestManagerLogin(params) {
  const requestURL = `${apiServerURL}/auth/manager`;
  const requestOptions = makeOptions('POST', params);

  return request(requestURL, requestOptions);
}

export async function requestLogout() {
  const requestURL = `${apiServerURL}/auth`;
  const requestOptions = makeOptionsWithAuth('DELETE');
  return request(requestURL, requestOptions);
}
