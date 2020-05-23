/* eslint-disable indent */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';

import C from 'config/constants';

import {
  Container,
  BigTitle,
  Container580,
  ButtonBottom,
  Input,
  InputRadio,
  RegisterInformation,
  RegisterCardForm,
} from 'components';
import { actionPostCardUsageLimit } from 'stores';
import UserManager from 'utils/userManager';
import { useToast } from 'utils/hooks';

const useQuery = () => new URLSearchParams(useLocation().search);

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
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const isMain = useQuery().get('main') === 'true' ? '대표' : '부서';
  const userGroupId = useQuery().get('userGroupId');
  const limitedAmount = useQuery().get('limitedAmount');
  const noticeType = useQuery().get('noticeType');

  // 수정과 삭제를 구분합니다.
  const { id } = useParams();

  const [state, setState] = useState({
    isLimited: limitedAmount && true,
    limitedAmount: limitedAmount || 0,
    noticeType: noticeType || C.NOTICE_TYPE.NONE,
  });

  const handleSubmit = e => {
    e.preventDefault();
    const body = {
      type: isMain === '대표' ? 1 : 2,
      corpId: UserManager().getUser().corpId,
      cardId: id,
      userGroupId: isMain === '대표' ? null : userGroupId,
      ...state,
    };
    if (state.isLimited && state.limitedAmount < 500000) {
      toast('월 이용한도 금액이 너무 낮습니다.');
    } else {
      dispatch(
        actionPostCardUsageLimit(body, () => {
          history.push('/setting/paymentcard');
          toast(`${isMain} 결제카드의 이용 한도가 변경이 완료되었습니다`, 'ok');
        }),
      );
    }
  };

  return (
    <Container>
      <BigTitle>이용한도 설정</BigTitle>
      <Container className="box_overflow" white>
        <Container580>
          <RegisterInformation>
            <h2>{isMain} 결제카드의 이용 한도를 설정합니다.</h2>
            신용 카드 월 이용 한도 금액을 설정하면 한도 금액 초과 시
            기업관리자에게 공지해주는 기능입니다. <br />
            <br />
            이용 금액 한도에 도달하면 더 이상 임직원 차량 예약을 허용하지
            않습니다. 금액 한도 설정 시 임직원 분들의 차량 이용 빈도를
            감안하시고 충분한 한도 금액을 설정하세요. <br />
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
              style={
                state.isLimited ? {} : { pointerEvents: 'none', opacity: 0.4 }
              }
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
            <ButtonBottom
              left="취소"
              onClickLeft={() => history.push('/setting/paymentcard')}
              right="저장"
              typeRight="submit"
            />
            <br />
            <br />
          </RegisterCardForm>
        </Container580>{' '}
      </Container>
    </Container>
  );
};

export default Usage;
