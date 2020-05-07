// 환영합니다!
// 여기는 API 요청을 담당하는 RequestManager 입니다.
import axios from 'axios';
import { toast } from 'react-toastify';

import moment from 'utils/moment';
import UserManager from 'utils/userManager';
import configs from 'config';

const RequestManager = (method, url, data, header) => {
  // Promise 문입니다.
  // Redux-Pack 과의 연동을 위해 Promise 문으로 사용합니다.
  moment.locale('ko');

  const Network = (resolve, reject) => {
    // 재귀용 함수 입니다.
    // 이는 추후 발생할수 있는 Token 재발급 과정에서 필요합니다.
    // Token 재발급이 발생할 경우 RefreshToken Fn 을 이용하여 발급후 재통신을 시도합니다.
    // 이 코드를 통하면 데이터를 간직한 채로 2차, 3차 통신이 가능합니다.

    // 01. auth를 판독합니다.
    // 현재 localStorage에 auth 데이터가 있는지 판독합니다.
    // 있을 경우 header에 Auth가 자동으로 들어갑니다.
    const AUTHORIZATION = UserManager().getUser();

    // DEV. 모든 데이터 통신을 콘솔화 합니다.
    // 이는 추후 서버쪽 로그 기록으로도 활용될 수 있습니다.
    const now = moment().format('MM.DD a h:mm:ss');
    console.log(`${now} 📡 서버 통신 ( ${method.toUpperCase()} ) ${url}`, data);

    // 02. axios 통신
    // axios 통신을 시도합니다.
    axios({
      method,
      url: `${configs.dev.apiServerURL}${url}`,
      data: method !== 'get' && data,
      params: method === 'get' && data,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, Content-Length, X-Requested-With',
        ...header,
        authorization: `Bearer ${
          AUTHORIZATION ? AUTHORIZATION.accessToken : ''
        }`,
      },
    })
      .then(res => {
        console.log(
          `${now} ✅ 서버 통신 ( ${method.toUpperCase()} ) ${url}`,
          res.data,
        );
        resolve(res);
      })
      .catch(err => {
        if (err.response) {
          switch (err.response.status) {
            case 400:
              console.log(
                `${now} ⛔️ 잘못된 요청 ( Bad Request, 400 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              break;
            case 401:
              console.log(
                `${now} ⛔️ 인증 실패 ( Unauthorized, 401 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              if (document.location.pathname === '/') {
                reject(err);
              } else {
                UserManager().setUser({
                  isSignIn: false,
                  id: 0,
                  name: '',
                  username: '',
                  companyNumber: '',
                  phoneNumber: '',
                  adminSecretKey: '',
                  isApproved: false,
                  accessToken: '',
                });
                setTimeout(() => {
                  document.location.href = '/';
                }, 1500);
              }
              break;
            case 403:
              console.log(
                `${now} ⛔️ 권한 없음 ( Forbidden, 403 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              if (document.location.pathname !== '/') {
                toast.error(
                  `⛔️ 권한이 없습니다. ( Forbidden, 403 ) - ${
                    err.response.data.message
                  }`,
                );
              }
              break;
            case 404:
              console.log(
                `${now} ⛔️ 데이터 없음 ( Not Found, 404 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              // toast.error("데이터가 없습니다. ( No Data, 404 )");
              break;
            case 406:
              console.log(
                `${now} ⛔️ 서버에서 원하는 규격이 아님 ( Not Acceptable, 406 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              break;
            case 409:
              console.log(
                `${now} ⛔️ 요청 충돌 ( Confilct, 409 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              break;
            case 419:
              console.log(
                `${now} ⛔️ 토큰 만료 ( Token Expired, 419 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              //   RefreshToken().then(res => Network(resolve, reject));
              break;
            case 500:
              console.log(
                `${now} ⛔️ 서버 에러 ( Server Error, 500 ) ${url} - ${
                  err.response.data.message
                }`,
              );
              break;
            default:
              console.log(err.response);
              break;
          }
        }
        reject(err);
      });
  };

  return new Promise((resolve, reject) => Network(resolve, reject));
};

export default RequestManager;
