import queryString from 'query-string';

import request, { makeOptionsWithAuth } from 'utils/request';
import config from 'config';

const { apiServerURL, controlCenterServerURL } = config;

export async function requestControlCenterControlsAPI(
  part,
  controlActionType,
  params,
) {
  const requestURL = `${controlCenterServerURL}/controls/${part}?action=${controlActionType}`;
  const requestOptions = makeOptionsWithAuth('POST', params);

  return request(requestURL, requestOptions);
}

export async function requestControlCenterRFIDsAPI(actionType, params) {
  const requestURL = `${controlCenterServerURL}/rfids/?action=${actionType}`;
  const requestOptions = makeOptionsWithAuth('POST', params);

  return request(requestURL, requestOptions);
}

export default async function requestAPI(uri, method, params = {}) {
  let requestURL = `${apiServerURL}/${uri}`;
  if (method === 'GET') {
    const filteredParams = params;
    if (!filteredParams.q) {
      delete filteredParams.q;
    }

    requestURL = `${requestURL}?${queryString.stringify(filteredParams)}`;
  }
  const requestOptions = makeOptionsWithAuth(method, params);

  return request(requestURL, requestOptions);
}
