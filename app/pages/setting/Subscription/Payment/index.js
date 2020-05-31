/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
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
import { actionPutSubscription, actionPostCheckSubscription } from 'stores';
import { NormalizeData } from 'utils/regData';

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

  const [check, setCheck] = useState({
    periodicPaymentAmount: '',
    periodicPaymentDate: '',
  });

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

  const onReqeust = () =>
    check.periodicPaymentAmount
      ? dispatch(
          actionPutSubscription(update, () => {
            history.push('/setting/subscription');
            if (isUpgrade) {
              toast('구독 상품 변경을 요청한 상태입니다. ', 'Ok');
              toast(
                '기업 구독상품 혹은 동시 구독자 인원이 업그레이드 될 경우 고객님들이 이용할 수 있는 차량 대수가 충분한지 확인한 후 기업 관리자분에게 연락을 드릴 예정입니다.',
                'ok',
              );
            } else {
              toast('구독 상품 변경이 완료되었습니다.', 'ok');
              toast('다음 달부터 변경된 구독 상품이 적용될 예정입니다.', 'ok');
            }
          }),
        )
      : toast('상품의 정책이 정해지지 않았거나, 서버 오류가 발생했습니다.');

  useEffect(() => {
    dispatch(
      actionPostCheckSubscription(
        {
          subscriptionId: current.id,
          type: isUpgrade ? 1 : 2,
          product: next.type,
          userNumber: next.people,
        },
        res => {
          setCheck(res.data.payload);
        },
      ),
    );
  }, []);

  console.log(check);

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
            body: current.cardNumber
              ? `${NormalizeData(
                  'cardCorp',
                  current.cardCorp,
                )} / ${NormalizeData(
                  'cardNumber',
                  current.cardNumber,
                )} / ${NormalizeData('cardType', current.cardType)}`
              : '-',
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
            body: `${NormalizeData('productType', update.product)} / ${
              update.userNumber
            } 명`,
          },
          {
            title: '구독 시작일',
            body: check.startDate
              ? moment.unix(check.startDate).format('YYYY년 MM월 DD일')
              : '-',
          },
          {
            title: '결제 카드',
            body: update.cardNumber
              ? `${NormalizeData(
                  'cardCorp',
                  update.cardCorp,
                )} / ${NormalizeData(
                  'cardNumber',
                  update.cardNumber,
                )} / ${NormalizeData('cardType', update.cardType)}`
              : '-',
          },
          {
            title: '정기 결제일',
            body: `매월 ${check.periodicPaymentDate}일`,
          },
          {
            title: '정기 결제 금액',
            body: check.periodicPaymentAmount
              ? `월 ${check.periodicPaymentAmount.toLocaleString('en')}원`
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
