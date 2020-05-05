/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Container,
  BigTitle,
  AsyncDiv,
  BillPaper,
  ButtonBottom,
} from 'components';
import { actionGetSubscription } from 'stores';

import moment from 'utils/moment';

const Subscription = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const SubscriptionsData = useSelector(state => state.subscription);

  const current = useSelector(
    state => state.subscription.data.currentBusinessSubs,
  );

  useEffect(() => {
    dispatch(actionGetSubscription());
  }, []);

  return (
    <div>
      <Container>
        <BigTitle>기업 정보 관리</BigTitle>
        <AsyncDiv store={SubscriptionsData}>
          {current && (
            <BillPaper
              className="box_overflow"
              title="구독 상품 정보"
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
                { title: '결제 카드', body: current.cardNumber },
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
                { title: '업무 시간', body: current.businessHour },
              ]}
              bottom={
                <>
                  <ButtonBottom
                    type="big"
                    left="구독 해지"
                    onClickLeft={() => {
                      history.push('/setting/subscription/expires');
                    }}
                    right="구독 상품 변경"
                    onClickRight={() => {
                      history.push('/setting/subscription/update');
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
