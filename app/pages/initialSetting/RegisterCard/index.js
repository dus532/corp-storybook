import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  ButtonBottom,
  Container580,
  Input,
  InputRadio,
  RegisterInformation,
} from 'components';

const RegisterCardForm = styled.form`
  h4 {
    font-weight: 700;
    margin-bottom: 12px;
  }
`;

const RegisterEnterCard = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  input {
    width: 24%;
    text-align: center;
  }
`;

const RegisterIsName = styled.div`
  display: flex;
  div {
    width: 40%;
  }
`;

const RegisterCardDetail = styled.div`
  display: flex;
`;

const RegisterCardExpired = styled.div`
  width: 100%;

  .center {
    display: flex;
  }

  span {
    font-size: 28px;
  }

  input {
    text-align: center;
    width: 80px;
    margin-right: 4px;
  }
`;

const RegisterBirth = styled.div`
  width: 50%;
  margin-bottom: 100px;

  input {
    text-align: center;
  }
`;

const RegisterCard = () => {
  const history = useHistory();

  return (
    <Container580>
      <RegisterInformation>
        <h2>대표 결제 카드를 등록하세요.</h2>
        대표 결제카드 정보를 입력 하신 후 <span>다음</span> 버튼을 누르세요.
        <br />
        부서별로 결제카드를 등록하여 개별적으로 이용 요금 결제를 원하실 경우
        <br />
        <span className="underline">
          메뉴 &#8594; 설정 &#8594; 결제카드 관리
        </span>
        에서 부서 결제카드 등록을 설정하실 수 있습니다.
      </RegisterInformation>
      <RegisterCardForm>
        <h4>법인카드에 본인 이름이 있으세요?</h4>
        <RegisterIsName>
          <InputRadio name="isName" id="yes" body="예" />
          <InputRadio name="isName" id="no" body="아니오" />
        </RegisterIsName>
        <br />
        <h4>카드 번호를 입력하세요.</h4>
        <RegisterEnterCard>
          <Input placeholder="0000" type="number" />
          <Input placeholder="0000" type="number" />
          <Input placeholder="0000" type="number" />
          <Input placeholder="0000" type="number" />
        </RegisterEnterCard>
        <br />
        <RegisterCardDetail>
          <RegisterCardExpired>
            <h4>유효기간</h4>
            <div className="center">
              <Input placeholder="MM" type="number" />
              <Input placeholder="YY" type="number" />
            </div>
          </RegisterCardExpired>
          <RegisterCardExpired>
            <h4>카드 비밀번호 (앞 두자리)</h4>
            <div className="center">
              <Input
                placeholder="**"
                type="number"
                autocomplete="new-password"
              />
              <span>●●</span>
            </div>
          </RegisterCardExpired>
        </RegisterCardDetail>
        <br />
        <h4>생년월일 (주민번호 앞 6자리)</h4>
        <RegisterBirth>
          <Input placeholder="ex) 951018" type="number" />
        </RegisterBirth>
        <ButtonBottom
          left="이전"
          right="다음"
          onClickRight={() => history.push('/initial/payment')}
        />
      </RegisterCardForm>
    </Container580>
  );
};

export default RegisterCard;
