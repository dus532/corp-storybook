import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useToast } from 'utils/hooks';

import moment from 'utils/moment';

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
  margin-top: 12px;
  padding: 24px;
  background: ${Color.White};

  div {
    margin-bottom: 16px;
  }

  *:last-child {
    margin-bottom: 0;
  }
`;

const Payment = () => {
  const history = useHistory();
  const toast = useToast();
  const cardData = useSelector(state => state.initial.data);
  const [state, setState] = useState({
    all: false,
    check1: false,
    check2: false,
  });

  // 리덕스 스토어에 데이터가 없으면 전 화면으로 돌아갑니다.
  if (!cardData) {
    history.push('/initial/registercard');
  }

  // 체크박스 자동 체크 구현
  useEffect(() => {
    if (state.check1 && state.check2 && !state.all) {
      setState({ ...state, all: true });
    } else if ((!state.check1 || !state.check2) && state.all) {
      setState({ ...state, all: false });
    }
  }, [state]);

  const handleChange = e => {
    if (e.target.name === 'all') {
      if (e.target.checked === true) {
        setState({ all: true, check1: true, check2: true });
      } else {
        setState({ all: false, check1: false, check2: false });
      }
    } else {
      setState({ ...state, [e.target.name]: e.target.checked });
    }
  };

  // 다음장
  const onNext = () => {
    if (state.all) {
      history.push('/initial/usage');
    } else {
      toast('약관에 동의해주세요.');
    }
  };

  if (!cardData) {
    return <></>;
  }
  return (
    <>
      <Container580>
        <RegisterInformation className="padding">
          <h2>지금 결제를 진행합니다.</h2>
          서비스 시작일 기준으로 한 달의 구독 요금이 미리 결제 처리됩니다.
          <br />
          아래 내용을 확인하신 후 이상이 없으면 <span>결제하기</span> 버튼을
          선택하세요.
        </RegisterInformation>
        <BillPaper
          data={[
            { title: '기업이름', body: cardData.company_name },
            { title: '주소', body: cardData.address },
            { title: '사업자 등록번호', body: cardData.company_number },
            { title: '구독 상품', body: cardData.business_subs },
            { title: '동시 사용자 수', body: cardData.usage_number },
            { title: '결제 카드', body: cardData.card_corp },
            { title: '결제 카드번호', body: cardData.card_number },
            {
              title: '구독 시작 일',
              body: moment(cardData.subscription_start_date).format(
                'YYYY년 MM월 YY일',
              ),
            },
            {
              title: '이번달 결제 금액',
              body: `${cardData.this_month_price.toLocaleString('en')} 원`,
            },
            {
              title: '다음 달 결제일',
              body: moment(cardData.next_payment_date).format(
                'YYYY년 MM월 YY일',
              ),
            },
            {
              title: '다음 달 결제 금액',
              body: `${cardData.next_month_price.toLocaleString('en')} 원`,
            },
            { title: '업무 시간', body: cardData.open_hours },
          ]}
          amount={`${cardData.this_month_price.toLocaleString('en')} 원`}
          startDate="2020년 TEMP"
          endDate="2020년 TEMP"
        />
        <InfoBox className="padding">
          정기 구독 결제는 매월 25일에 대표 결제카드로 자동 결제됩니다.
        </InfoBox>
        <PaymentCheckBox>
          <InputCheckBox
            name="all"
            id="allCheck"
            body="전체동의"
            checked={state.all}
            onChange={handleChange}
            bold
          />
          <InputCheckBox
            name="check1"
            id="termofsubscribe"
            body="기업 구독 상품 이용 약관 및 정기 구독 동의 (필수)"
            checked={state.check1}
            onChange={handleChange}
          />
          <InputCheckBox
            name="check2"
            id="termofuse"
            body="차량 대여를 위한 개인정보 수집 및 이용 동의 (필수)"
            checked={state.check2}
            onChange={handleChange}
          />
        </PaymentCheckBox>
        <InfoBox className="padding">고객센터 문의 : 1544-7198</InfoBox>
        <br />
        <br />
        <br />
        <ButtonBottom
          left="이전"
          onClickLeft={() => history.push('/initial/registercard')}
          right="결제하기"
          onClickRight={onNext}
        />
      </Container580>
    </>
  );
};

export default Payment;
