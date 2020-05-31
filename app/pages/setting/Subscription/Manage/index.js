/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Container,
  BigTitle,
  AsyncDiv,
  MyPanel,
  BillPaper,
  ButtonBottom,
} from 'components';
import { actionGetSubscription } from 'stores';

import moment from 'utils/moment';
import C from 'config/constants';
import { useModal } from 'utils/hooks';
import { CHECK_PW } from 'modals/constants';
import { NormalizeData } from 'utils/regData';

const Subscription = () => {
  const dispatch = useDispatch();
  const modal = useModal();

  const SubscriptionsData = useSelector(state => state.subscription);

  const current = useSelector(state => state.subscription.data.businessSubs);
  const next = useSelector(state => state.subscription.data.nextSubs);

  useEffect(() => {
    dispatch(actionGetSubscription());
  }, []);

  window.sessionStorage.setItem(
    'userNumber',
    (current && current.userNumber) || 5,
  );

  return (
    <div>
      <Container>
        <BigTitle>구독 관리</BigTitle>
        <AsyncDiv store={SubscriptionsData}>
          <MyPanel
            className="box_overflow"
            store={SubscriptionsData}
            isSetting
          />
          <div style={{ marginTop: 10 }} />
          {current && (
            <BillPaper
              className="box_overflow"
              title={
                SubscriptionsData.data.status === C.SUB_TYPE.SUBSCRIBING
                  ? '최근 결제 금액'
                  : `${
                      SubscriptionsData.data.status !==
                      C.SUB_TYPE.EXPIRED_SUBSCRIBING
                        ? '기존 '
                        : ''
                    }구독 상품 정보`
              }
              noPadding={
                SubscriptionsData.data.status ===
                  C.SUB_TYPE.UPGRADE_SUBSCRIBING ||
                SubscriptionsData.data.status ===
                  C.SUB_TYPE.DOWNGRADE_SUBSCRIBING
              }
              data={[
                {
                  title: '구독 정보',
                  body: `${current.product} / ${current.userNumber} 명`,
                },
                {
                  title: '구독 시작일',
                  body: moment
                    .unix(current.startDate)
                    .format('YYYY년 MM월 DD일'),
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
                    ? `월 ${current.periodicPaymentAmount.toLocaleString(
                        'en',
                      )}원`
                    : '-',
                },
                {
                  title: '업무 시간',
                  body: `${current.startHour} ~ ${current.endHour}`,
                },
              ]}
              bottom={
                SubscriptionsData.data.status ===
                C.SUB_TYPE.EXPIRED_SUBSCRIBING ? (
                  <>
                    <ButtonBottom
                      white
                      type="big"
                      left="구독 상품 재신청"
                      onClickLeft={() => {
                        modal(CHECK_PW, '/setting/subscription/update');
                      }}
                    />
                  </>
                ) : (
                  <>
                    <ButtonBottom
                      white
                      type="big"
                      left="구독 해지"
                      onClickLeft={() => {
                        modal(CHECK_PW, '/setting/subscription/expires');
                      }}
                      right="구독 상품 변경"
                      onClickRight={() => {
                        modal(CHECK_PW, '/setting/subscription/update');
                      }}
                    />
                  </>
                )
              }
            />
          )}
          {(SubscriptionsData.data.status === C.SUB_TYPE.UPGRADE_SUBSCRIBING ||
            SubscriptionsData.data.status ===
              C.SUB_TYPE.DOWNGRADE_SUBSCRIBING) && (
            <BillPaper
              blue
              className="box_overflow"
              title="변경 구독 상품 정보"
              data={[
                {
                  title: '구독 정보',
                  body: `${next.product} / ${next.userNumber} 명`,
                },
                {
                  title: '구독 시작일',
                  body: next.startDate
                    ? moment.unix(next.startDate).format('YYYY년 MM월 DD일')
                    : '-',
                },
                {
                  title: '구독 갱신일',
                  body: next.renewDate
                    ? moment.unix(next.renewDate).format('YYYY년 MM월 DD일')
                    : '-',
                },
                {
                  title: '결제 카드',
                  body: next.cardNumber
                    ? `${NormalizeData(
                        'cardCorp',
                        next.cardCorp,
                      )} / ${NormalizeData(
                        'cardNumber',
                        next.cardNumber,
                      )} / ${NormalizeData('cardType', next.cardType)}`
                    : '-',
                },
                {
                  title: '정기 결제일',
                  body: next.periodicPaymentDate
                    ? `매월 ${next.periodicPaymentDate}일`
                    : '-',
                },
                {
                  title: '정기 결제 금액',
                  body: next.periodicPaymentAmount
                    ? `월 ${next.periodicPaymentAmount.toLocaleString('en')}원`
                    : '-',
                },
                {
                  title: '업무 시간',
                  body: `${next.startHour} ~ ${next.endHour}`,
                },
              ]}
              bottom={
                <>
                  <ButtonBottom
                    type="big"
                    left="구독 해지"
                    white
                    onClickLeft={() => {
                      modal(CHECK_PW, '/setting/subscription/expires');
                    }}
                    right={
                      SubscriptionsData.data.status ===
                      C.SUB_TYPE.DOWNGRADE_SUBSCRIBING
                        ? '구독 상품 변경'
                        : ''
                    }
                    onClickRight={() => {
                      modal(CHECK_PW, '/setting/subscription/update');
                    }}
                  />
                </>
              }
            />
          )}
        </AsyncDiv>
      </Container>
    </div>
  );
};

export default Subscription;
