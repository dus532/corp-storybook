import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import C from 'config/constants';
import { useToast } from 'utils/hooks';

import {
  Container,
  BigTitle,
  SubscriptionPanel,
  ButtonBottom,
  InputPeople,
} from 'components';
import { actionPushSubscription } from 'stores';

const Flex = styled.div`
  display: flex;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubscriptionUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (!window.sessionStorage.getItem('CHECK')) {
      history.goBack();
    }
    window.sessionStorage.clear();
  }, []);

  const [data, setData] = useState({
    type: C.ITEM_TYPE.PREMIUM.value,
    people: window.sessionStorage.getItem('userNumber')
      ? window.sessionStorage.getItem('userNumber')
      : 2,
  });

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  const onNext = () => {
    if (data.people < 1) {
      toast('선택한 상품의 최소 구독인원은 1명입니다.');
    } else if (data.type === C.ITEM_TYPE.PREMIUM.value && data.people < 2) {
      toast('프리미엄 상품의 최소 구독인원은 2명입니다.');
    } else {
      dispatch(actionPushSubscription(data));
      history.push(`/setting/subscription/payment`);
    }
  };

  return (
    <div>
      <Container>
        <BigTitle>구독 상품 변경</BigTitle>
        <Flex>
          <SubscriptionPanel
            type={C.ITEM_TYPE.PREMIUM.value}
            title="프리미엄"
            people={2}
            car={4}
            value={data.type}
            amount="150,000"
            handleChange={handleChange}
          />
          <SubscriptionPanel
            type={C.ITEM_TYPE.STANDARD.value}
            title="스탠다드"
            people={1}
            car={3}
            value={data.type}
            amount="100,000"
            handleChange={handleChange}
          />
          <SubscriptionPanel
            type={C.ITEM_TYPE.BASIC.value}
            title="베이직"
            people={1}
            car={2}
            value={data.type}
            amount="50,000"
            handleChange={handleChange}
          />
        </Flex>
        <InputPeople number={data.people} handleChange={handleChange} />
        <ButtonBottom
          left="취소"
          onClickLeft={() => {
            history.goBack();
          }}
          right="다음"
          onClickRight={onNext}
        />
      </Container>
    </div>
  );
};

export default SubscriptionUpdate;
