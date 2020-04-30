import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import {
  Container,
  BigTitle,
  BillPaper,
  ButtonBottom,
  InfoBox,
} from 'components';
import moment from 'utils/moment';

import { actionPutSubscription } from 'stores';

const Text = styled.div`
  margin: 40px 0;
  text-align: center;
  font-weight: 400;
  font-size: 1.5rem;

  span {
    font-weight: 700;
  }
`;

const Payment = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const current = useSelector(
    state => state.manageSubscription.data.currentBusinessSubs,
  );
  const next = useSelector(state => state.manageSubscription.detail);

  let isUpgrade = true;
  const update = {
    product: next.type,
    userNumber: next.people,
    cardCorp: current.cardCorp,
    cardNumber: current.cardNumber,
    openHours: current.businessHour,
  };
  // 이 부분은 현재 구독 상품과 비교하여 업그레이드인지 다운그레이드인지를 확인합니다.

  // 다운그레이드 조건
  if (current.product < next.type) {
    // 구독 상품이 프리미엄 > 스탠다드 > 베이직 순서로 하향 변경되었을 때
    isUpgrade = false;
  } else if (current.userNumber > next.people) {
    // 동시 이용자 수가 줄어들었을 때
    isUpgrade = false;
  }

  if (isUpgrade) {
    update.subscriptionStartDate = '';
    update.nextMonthPrice = 500000;
  } else {
    update.subscriptionStartDate = moment(current.startDate)
      .add(1, 'month')
      .startOf('month');
    update.nextMonthPrice = 500000;
  }

  return (
    <Container>
      <BigTitle>구독 상품 변경</BigTitle>
      <BillPaper
        className="box_overflow"
        title="최근 결제 금액"
        noPadding
        data={[
          {
            title: '구독 정보',
            body: `${current.product} / ${current.userNumber} 명`,
          },
          {
            title: '구독 시작일',
            body: moment(current.startDate).format('YYYY년 MM월 DD일'),
          },
          {
            title: '구독 갱신일',
            body: moment(current.renewDate).format('YYYY년 MM월 DD일'),
          },
          {
            title: '결제 카드',
            body: `${current.cardCorp}카드 / ${current.cardNumber} / ${
              current.cardType
            }`,
          },
          {
            title: '정기 결제일',
            body: `매월 ${current.periodicPaymentDate}일`,
          },
          {
            title: '정기 결제 금액',
            body: current.periodicPaymentAmount
              ? `월 ${current.periodicPaymentAmount.toLocaleString('en')}원`
              : '-',
          },
          { title: '업무 시간', body: current.businessHour },
        ]}
      />
      <BillPaper
        className="box_overflow"
        title="변경 구독 상품 정보"
        noPadding
        blue
        data={[
          {
            title: '구독 정보',
            body: `${update.product} / ${update.userNumber} 명`,
          },
          {
            title: '구독 시작일',
            body: update.subscriptionStartDate
              ? moment(update.subscriptionStartDate).format('YYYY년 MM월 DD일')
              : '-',
          },
          {
            title: '구독 갱신일',
            body: '-',
          },
          {
            title: '결제 카드',
            body: `${current.cardCorp}카드 / ${current.cardNumber} / ${
              current.cardType
            }`,
          },
          {
            title: '정기 결제일',
            body: `매월 ${current.periodicPaymentDate}일`,
          },
          {
            title: '정기 결제 금액',
            body: update.nextMonthPrice
              ? `월 ${update.nextMonthPrice.toLocaleString('en')}원`
              : '-',
          },
          { title: '업무 시간', body: current.businessHour },
        ]}
      />
      <InfoBox>
        결제카드 변경은 설정 &#8594; 결제카드 관리 메뉴에서 수행할 수 있습니다.
        업무 시간 변경을 원하실 경우 1544-7198로 연락바랍니다.
      </InfoBox>
      <Text>
        위의 사항을 확인하고 상품 변경에 동의하시면{' '}
        <span>{isUpgrade ? `변경 신청` : `변경 동의`}</span> 버튼을 선택하세요.
      </Text>
      <ButtonBottom
        left="취소"
        right={isUpgrade ? `변경 신청` : `변경 동의`}
        onClickLeft={() => {
          history.goBack();
        }}
        onClickRight={() => {
          dispatch(
            actionPutSubscription(update, () => {
              history.push('/setting/subscription');
            }),
          );
        }}
      />
    </Container>
  );
};

export default Payment;
