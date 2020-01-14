import queryString from 'query-string';
import UAParser from 'ua-parser-js';
import { merge } from 'lodash';

import { getAccessToken } from './storage';

const parser = new UAParser();

const isCarplatURLRegx = /carplat/;

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }

  const totalCount = parseInt(response.headers.get('X-Total-Count'), 10);

  return response
    .json()
    .then(data => ({ message: data.message, totalCount, data }));
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = await response.json();
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  if (!url.match(isCarplatURLRegx)) {
    return fetch(url, options)
      .then(checkStatus)
      .then(parseJSON);
  }

  // CARPLAT API server로 요청을 보낼 때
  // userAgent를 추가해서 보냄.
  if (!window.userAgent) {
    if (navigator.userAgent) {
      parser.setUA(navigator.userAgent);
      const result = parser.getResult();

      window.userAgent = `CarplatPartners/2.0/${result.browser.name} ${
        result.browser.version
      }/${result.os.name} ${result.os.version}`;
    } else {
      window.userAgent = `CarplatPartners/2.0/unrecognized browser`;
    }
  }

  const userAgentOption = {
    headers: {
      'X-User-Agent': window.userAgent,
    },
  };

  return fetch(url, merge(options, userAgentOption))
    .then(checkStatus)
    .then(parseJSON);
}

/*
 * CARPLAT API request에 사용될 options 객체 생성
 *
 * @param {string} method HTTP METHOD
 * @param {object} params API 요청에 사용될 params
 *
 * @return {object} request 요청에 사용될 options 객체
 *
 */
export function makeOptionsWithAuth(method, params = {}) {
  return {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: getAccessToken(),
    },
    ...(['POST', 'PUT', 'DELETE'].includes(method) && {
      body: queryString.stringify(params),
    }),
  };
}

/*
 * API request에 사용될 options 객체 생성
 *
 * @param {string} method HTTP METHOD
 * @param {object} params API 요청에 사용될 params
 *
 * @return {object} request 요청에 사용될 options 객체
 */
export function makeOptions(method, params = {}) {
  return {
    method,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...(['POST', 'PUT', 'DELETE'].includes(method) && {
      body: queryString.stringify(params),
    }),
  };
}
