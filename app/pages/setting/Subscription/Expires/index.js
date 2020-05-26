import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

import C from 'config/constants';
import {
  Container,
  BigTitle,
  ButtonBottom,
  ExpiresPanel,
  InfoBox,
} from 'components';
import { useModal } from 'utils/hooks';
import { SUBSCRIPTION_EXPIRES } from 'modals/constants';
import { actionGetSubscription } from 'stores';
import moment from 'utils/moment';

const SubTitle = styled.div`
  margin-bottom: 10px;

  @media screen and (max-width: 768px) {
    margin-top: 18px;
    margin-bottom: 4px;
  }
`;

const Expires = () => {
  const history = useHistory();
  const modal = useModal();
  const dispatch = useDispatch();

  const [data, setData] = useState({ type: C.EXPIRES_TYPE.NEXT_MONTH });
  const SubscriptionsData = useSelector(state => state.subscription);

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const expireData = () => ({
    subscriptionId: SubscriptionsData.data.nextSubs.id,
    cancelReqTime: moment().format('X'),
    cancelApplyTime: moment().format('X'),
  });

  useEffect(() => {
    if (!window.sessionStorage.getItem('CHECK')) {
      history.goBack();
    }
    window.sessionStorage.clear();

    if (!SubscriptionsData.data) {
      dispatch(actionGetSubscription());
    }
  }, []);

  return (
    <div>
      <Container>
        <BigTitle marginSmall>구독 해지</BigTitle>
        <SubTitle>구독 해지 방식을 선택하세요.</SubTitle>
        <ExpiresPanel
          type={C.EXPIRES_TYPE.NEXT_MONTH}
          handleChange={handleChange}
          value={data.type}
          title="익월 해지"
          body={
            <>
              정기 결제 만료일까지 사용 후 해지됩니다. <br />
              계약 종료 익일 출근시간까지 사용 가능합니다.
            </>
          }
        />
        <ExpiresPanel
          type={C.EXPIRES_TYPE.IMMEDIATELY}
          handleChange={handleChange}
          value={data.type}
          title="중도 해지"
          body={
            <>
              동의 시 즉시 해지하고 남은 구독 일을 계산하여 환불합니다. (50%
              환불 수수료 있음)
              <br /> 중도 해지 당일 까지만 사용 가능합니다.
            </>
          }
        />
        <InfoBox>
          구독 상품 해지와 관련된 문의가 있으시면 1833-7164로 연락바랍니다.
        </InfoBox>
        <br />
        <br />
        <ButtonBottom
          left="해지 동의"
          right="취소"
          onClickLeft={() =>
            modal(SUBSCRIPTION_EXPIRES, { ...data, ...expireData() })
          }
          onClickRight={() => {
            history.goBack();
          }}
        />
      </Container>
    </div>
  );
};

export default Expires;
