import React from 'react';
import styled from 'styled-components';

import { ButtonBottom, Container580, Input } from 'components';

const RegisterCardTop = styled.div`
  margin-bottom: 60px;

  h2 {
    display: block;
    margin-top: 48px;
    margin-bottom: 32px;
    font-weight: 700;
  }

  span {
    font-weight: 700;
  }

  .underline {
    text-decoration: underline;
    font-weight: 500;
  }
`;

const RegisterCardBottom = styled.div`
  .enter_card {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  input {
    width: 24%;
    text-align: center;
  }
  h4 {
    font-weight: 700;
  }
`;

const RegisterCardForm = styled.form``;

const RegisterCard = () => {
  console.log('');
  return (
    <Container580>
      <RegisterCardTop>
        <h2>대표 결제 카드를 등록하세요.</h2>
        대표 결제카드 정보를 입력 하신 후 <span>다음</span> 버튼을 누르세요.
        <br />
        부서별로 결제카드를 등록하여 개별적으로 이용 요금 결제를 원하실 경우
        <br />
        <span className="underline">
          메뉴 &#8594; 설정 &#8594; 결제카드 관리
        </span>
        에서 부서 결제카드 등록을 설정하실 수 있습니다.
      </RegisterCardTop>
      <RegisterCardBottom>
        <h4>카드 번호를 입력하세요.</h4>
        <div className="enter_card">
          <Input />
          <Input />
          <Input />
          <Input />
        </div>
        <br />
        <RegisterCardForm>
          <ButtonBottom left="이전" disabledLeft right="다음" />
        </RegisterCardForm>
      </RegisterCardBottom>
    </Container580>
  );
};

export default RegisterCard;
