/* eslint-disable indent */
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

import C from 'config/constants';
import { useToast } from 'utils/hooks';
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
  const toast = useToast();

  const subData = useSelector(state => state.subscription.data);
  if (!subData) {
    history.push('/setting/subscription');
  }

  const current = useSelector(state => state.subscription.data.businessSubs);
  const next = useSelector(state => state.subscription.detail);

  let isUpgrade = true;
  // 이 부분은 현재 구독 상품과 비교하여 업그레이드인지 다운그레이드인지를 확인합니다.

  // 다운그레이드 조건
  if (current.product < next.type) {
    // 구독 상품이 프리미엄 > 스탠다드 > 베이직 순서로 하향 변경되었을 때
    isUpgrade = false;
  } else if (current.userNumber > next.people) {
    // 동시 이용자 수가 줄어들었을 때
    isUpgrade = false;
  }

  const update = {
    ...current,
    ...next,
    type: isUpgrade ? 1 : 2,
    subscriptionId: current.id,
    product: next.type,
    userNumber: next.people,
    cardCorp: current.cardCorp,
    cardNumber: current.cardNumber,
    openHours: current.businessHour,
    periodicPrice:
      C.ITEM_TYPE_ARRAY.filter(it => it.value === next.type)[0].price *
      next.people,
  };

  if (update.product === C.ITEM_TYPE.PREMIUM.value) {
    update.periodicPrice =
      C.ITEM_TYPE_ARRAY.filter(it => it.value === next.type)[0].price *
      (next.people - 1);
  }

  if (isUpgrade) {
    update.subscriptionStartDate =
      C.ITEM_TYPE_ARRAY.filter(it => it.value === next.type)[0].price *
      update.userNumber;
  } else {
    const today = moment().date();
    update.subscriptionStartDate =
      today >= 25
        ? moment()
            .add(2, 'month')
            .startOf('month')
            .format('X')
        : moment()
            .add(1, 'month')
            .startOf('month')
            .format('X');
  }

  const onReqeust = () => {
    dispatch(
      actionPutSubscription(update, () => {
        history.push('/setting/subscription');
        toast('구독 상품 변경을 요청한 상태입니다. ', 'Ok');
        toast(
          '기업 구독상품 혹은 동시 구독자 인원이 업그레이드 될 경우 고객님들이 이용할 수 있는 차량 대수가 충분한지 확인한 후 기업 관리자분에게 연락을 드릴 예정입니다.',
          'ok',
        );
      }),
    );
  };

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
            body: moment.unix(current.startDate).format('YYYY년 MM월 DD일'),
          },
          {
            title: '구독 갱신일',
            body: current.renewDate
              ? moment.unix(current.renewDate).format('YYYY년 MM월 DD일')
              : '-',
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
          {
            title: '업무 시간',
            body: `${current.startHour} ~ ${current.endHour}`,
          },
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
              ? moment
                  .unix(update.subscriptionStartDate)
                  .format('YYYY년 MM월 DD일')
              : '-',
          },
          {
            title: '결제 카드',
            body: `${update.cardCorp}카드 / ${update.cardNumber} / ${
              update.cardType
            }`,
          },
          {
            title: '정기 결제일',
            body: `매월 ${update.periodicPaymentDate}일`,
          },
          {
            title: '정기 결제 금액',
            body: update.periodicPrice
              ? `월 ${update.periodicPrice.toLocaleString('en')}원`
              : '-',
          },
          {
            title: '업무 시간',
            body: `${update.startHour} ~ ${update.endHour}`,
          },
        ]}
      />
      <InfoBox>
        결제카드 변경은 설정 &#8594; 결제카드 관리 메뉴에서 수행할 수 있습니다.
        업무 시간 변경을 원하실 경우 1833-7164로 연락바랍니다.
      </InfoBox>
      <Text>
        위의 사항을 확인하고 상품 변경에 동의하시면 <span>변경 신청</span>{' '}
        버튼을 선택하세요.
      </Text>
      <ButtonBottom
        left="취소"
        right="변경 신청"
        onClickLeft={() => {
          history.goBack();
        }}
        onClickRight={onReqeust}
      />
    </Container>
  );
};

export default Payment;
