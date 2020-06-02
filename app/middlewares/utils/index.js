import React from 'react';

import { KEY, LIFECYCLE } from 'middlewares/pack/constants';
import { toggleSending, onToast, onModal } from 'stores';

import createActions from 'stores/controller/createActions';
import { ERROR } from 'modals/constants';

const utilsMiddleware = store => next => action => {
  const { type, meta } = action;
  const reqType = type.split('/')[0];

  // 통신 오류를 잡아 토스트로 표현합니다.
  if (meta && meta[KEY.LIFECYCLE] === LIFECYCLE.FAILURE) {
    const errReg = status => {
      switch (status) {
        case 401:
          // 인증 오류입니다. 아이디나 비빌먼호가 틀렸을까요?
          store.dispatch(onToast(`${status} : 인증에 실패했습니다.`));
          break;
        case 404:
          // 데이터가 없습니다. 즉, 존재하지 않는 라운터라는 이야기죠
          store.dispatch(onToast(`${status} : 존재하지 않는 라우터입니다.`));
          break;
        case 500:
          // 서버 오류입니다.
          store.dispatch(onToast(`${status} : 서버에서 오류가 발생했어요!`));
          break;

        default:
          break;
      }
    };

    if (action.payload && action.payload.response) {
      const { response } = action.payload;
      switch (response.data.message) {
        case 'Login Failed':
          store.dispatch(
            onToast(`등록되지 않은 아이디거나, 잘못된 비밀번호입니다.`),
          );
          break;
        case 'Card Already Registered':
          store.dispatch(
            onModal(ERROR, {
              title: '결제카드 등록 불가',
              body:
                '이미 등록된 결제카드입니다. 다른 결제카드를 등록해주십시오.',
            }),
          );
          break;
        case 'No Approved Subscription':
          store.dispatch(onToast(`구독을 승인할 수 없습니다.`));
          break;
        case 'Charge Subscription Failed':
          store.dispatch(onToast(`결제에 실패했습니다.`));
          break;
        case 'Raidea Server Error registerCardResult':
          store.dispatch(
            onToast(`카드 정보가 정확하지 않습니다. 다시 확인해주세요.`),
          );
          break;
        case 'Wrong Password':
          store.dispatch(onToast(`계정과 비밀번호가 일치하지 않습니다.`));
          break;
        case 'Wrong Current Password':
          store.dispatch(
            onToast(`관리자 정보 변경이 실패하였습니다. 다시 시도해주세요.`),
          );
          break;
        case 'Raidea Server Error findUserIdResult ':
          store.dispatch(onToast(`일치하는 유저 정보가 없습니다.`));
          break;
        case 'No number':
          store.dispatch(onToast(`번호를 입력해주세요.`));
          break;
        default:
          if (typeof response.data.message === 'string') {
            if (response.data.message.includes('fail to billkey')) {
              store.dispatch(
                onModal(ERROR, {
                  title: '결제카드 등록 실패',
                  body: (
                    <>
                      결제카드 정보 인증 및 빌 키 발급에 실패하였습니다.
                      <br />
                      <br />[
                      {
                        response.data.message
                          .split('resultCode:')[1]
                          .split(', ')[0]
                      }
                      ]{' '}
                      {
                        response.data.message
                          .split('resultCode:')[1]
                          .split(', ')[1]
                          .split('resultMsg:')[1]
                      }
                    </>
                  ),
                }),
              );
            }
          } else {
            errReg(response.status);
          }
          break;
      }
    }
  }

  // POST,PUT 통신시 Sending을 위한 미들웨어!
  switch (reqType) {
    case 'post':
    case 'put': {
      if (meta[KEY.LIFECYCLE] === LIFECYCLE.START) {
        store.dispatch(toggleSending(true));
      } else {
        store.dispatch(toggleSending(false));
      }
      break;
    }
    default: {
      break;
    }
  }

  // POST,PUT 이후 다시 데이터를 가져와야할 경우 사용함!
  if (meta && meta.read && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
    const { read } = createActions(meta.resourceName);

    store.dispatch(
      read({
        fastLoading: true,
        url: meta.read,
      }),
    );
  }

  return next(action);
};

export default utilsMiddleware;
