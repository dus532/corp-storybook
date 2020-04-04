import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
  RegisterInformation,
  Container580,
  BillPaper,
  InfoBox,
  InputCheckBox,
  ButtonBottom,
} from 'components';
import Color from 'config/color';

const PaymentCheckBox = styled.div`
  padding: 24px;
  background: ${Color.White};

  *:last-child {
    margin-bottom: 0;
  }
`;

const Payment = () => {
  const history = useHistory();
  return (
    <Container580>
      <RegisterInformation>
        <h2>지금 결제를 진행합니다.</h2>
        서비스 시작일 기준으로 한 달의 구독 요금이 미리 결제 처리됩니다.
        <br />
        아래 내용을 확인하신 후 이상이 없으면 <span>결제하기</span> 버튼을
        선택하세요.
      </RegisterInformation>
      <BillPaper
        data={[
          { title: '기업이름', body: '휴맥스' },
          { title: '주소', body: '경기도 성남시 분당구' },
          { title: '사업자 등록번호', body: '559-8100291' },
          { title: '구독 상품', body: '프리미엄' },
        ]}
        amount="300,000 원"
        startDate="2020년 2월 10일"
        endDate="2020년 2월 29일"
      />
      <InfoBox>
        정기 구독 결제는 매월 25일에 대표 결제카드로 자동 결제됩니다.
      </InfoBox>
      <PaymentCheckBox>
        <InputCheckBox name="isName" id="allCheck" body="전체동의" bold />
        <InputCheckBox
          name="subscribe"
          id="termofsubscribe"
          body="기업 구독 상품 이용 약관 및 정기 구독 동의 (필수)"
        />
        <InputCheckBox
          name="use"
          id="termofuse"
          body="차량 대여를 위한 개인정보 수집 및 이용 동의 (필수)"
        />
      </PaymentCheckBox>
      <InfoBox>고객센터 문의 : 1544-7198</InfoBox>
      <br />
      <br />
      <br />
      <ButtonBottom
        left="이전"
        right="다음"
        onClickRight={() => history.push('/initial/usage')}
      />
    </Container580>
  );
};

export default Payment;
