import React from 'react';
import styled from 'styled-components';

import {
  ButtonBottom,
  Container580,
  InputRadio,
  RegisterInformation,
} from 'components';

const RegisterCardForm = styled.form`
  h4 {
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

const RegisterRadio = styled.div`
  display: flex;
  div {
    flex: 1;
  }
`;

const Usage = () => (
  <Container580>
    <RegisterInformation>
      <h2>서비스이용 한도를 설정합니다.</h2>
      신용 카드 월 이용 한도 금액을 설정하면 한도 금액 초과 시 기업관리자에게
      공지해주는 기능합니다.
      <br />
      <br />
      이용 금액 한도에 도달하면 더 이상 임직원 차량 예약을 허용하지 않습니다.
    </RegisterInformation>
    <RegisterCardForm>
      <h4>신용카드 월 이용 한도</h4>
      <RegisterRadio>
        <InputRadio name="monthUsage" id="no" body="설정하지 않음" />
        <InputRadio name="monthUsage" id="yes" body="설정 함" />
      </RegisterRadio>
      <br />
      <h4>한도 금액 도달 시 알림 방식</h4>
      <RegisterRadio>
        <InputRadio name="alertType" id="all" body="모든 방식" />
        <InputRadio name="alertType" id="email" body="이메일 알림" />
        <InputRadio name="alertType" id="sms" body="문자 알림" />
      </RegisterRadio>
      <br />
      <ButtonBottom right="다음" />
    </RegisterCardForm>
  </Container580>
);

export default Usage;
