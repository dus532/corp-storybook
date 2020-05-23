import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  ButtonBottom,
  Container580,
  InputRadio,
  RegisterInformation,
  Input,
} from 'components';
import { actionPostInitialUsage } from 'stores';
import { useToast } from 'utils/hooks';

import C from 'config/constants';
import UserManager from 'utils/userManager';

const RegisterCardForm = styled.form`
  margin-top: 60px;
  h4 {
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

const RegisterInputText = styled.div`
  display: flex;
  align-items: center;
  margin-right: 12px;
  input {
    text-align: right;
    margin-right: 12px;
  }
`;

const RegisterRadio = styled.div`
  display: flex;
  div {
    flex: 1;
  }
`;

const Usage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const USER = UserManager().getUser();

  const [state, setState] = useState({
    type: 1,
    isLimited: false,
    limitedAmount: 0,
    noticeType: C.NOTICE_TYPE.NONE,
  });

  const handleSubmit = e => {
    e.preventDefault();
    if (state.isLimited && state.limitedAmount < 500000) {
      toast('월 이용한도 금액이 너무 낮습니다.');
    } else {
      dispatch(
        actionPostInitialUsage(state, () => {
          UserManager().setUser({ ...USER, isInitialized: true });
          history.push('/home');
        }),
      );
    }
  };

  return (
    <Container580>
      <RegisterInformation>
        <h2>서비스이용 한도를 설정합니다.</h2>
        신용 카드 월 이용 한도 금액을 설정하면 한도 금액 초과 시 기업관리자에게
        공지해주는 기능입니다. <br />
        <br />
        이용 금액 한도에 도달하면 더 이상 임직원 차량 예약을 허용하지 않습니다.
        금액 한도 설정 시 임직원 분들의 차량 이용 빈도를 감안하시고 충분한 한도
        금액을 설정하세요. <br />
        <br />
        결제 카드 변경을 원하실 경우{' '}
        <span className="underline">메뉴 &#62; 설정 &#62; 결제카드 관리</span>
        에서 수행하실 수 있습니다. 모든 설정을 마치면 <span>완료</span> 버튼을
        선택하세요.
      </RegisterInformation>
      <RegisterCardForm onSubmit={handleSubmit}>
        <h4>신용카드 월 이용 한도</h4>
        <RegisterRadio>
          <InputRadio
            name="is_limited"
            id="no"
            body="설정하지 않음"
            checked={!state.isLimited}
            onChange={() => setState({ ...state, isLimited: false })}
          />
          <InputRadio
            name="is_limited"
            id="yes"
            body="설정 함"
            checked={state.isLimited}
            onChange={() => setState({ ...state, isLimited: true })}
          />
        </RegisterRadio>
        <div
          style={state.isLimited ? {} : { pointerEvents: 'none', opacity: 0.4 }}
        >
          <br />
          <br />
          <h4>월 이용 한도 금액 입력 (최소 50만원 이상)</h4>
          <RegisterInputText>
            <Input
              name="limited_amount"
              type="tel"
              onChange={e =>
                setState({
                  ...state,
                  limitedAmount: Number(e.target.value.replace(/\D/g, '')),
                })
              }
              value={state.limitedAmount.toLocaleString('en')}
            />{' '}
            원
          </RegisterInputText>
          <br />
          <br />
          <h4>한도 금액 도달 시 이메일 알림</h4>
          <RegisterRadio>
            <InputRadio
              name="notice_type"
              id="all"
              body="설정하지 않음"
              checked={state.noticeType === C.NOTICE_TYPE.NONE}
              onChange={() =>
                setState({ ...state, noticeType: C.NOTICE_TYPE.NONE })
              }
            />
            <InputRadio
              name="notice_type"
              id="email"
              body="설정 함"
              checked={state.noticeType === C.NOTICE_TYPE.EMAIL}
              onChange={() =>
                setState({ ...state, noticeType: C.NOTICE_TYPE.EMAIL })
              }
            />
          </RegisterRadio>
          <br />
          <br />
          <br />
          <br />
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              top: 0,
              left: 0,
            }}
          />
        </div>
        <ButtonBottom right="완료" typeRight="submit" />
      </RegisterCardForm>
    </Container580>
  );
};

export default Usage;
