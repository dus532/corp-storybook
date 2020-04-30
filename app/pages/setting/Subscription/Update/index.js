import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import C from 'config/constants';

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
`;

const SubscriptionUpdate = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState({ type: C.ITEM_TYPE.PREMIUM, people: 1 });

  const handleChange = (name, value) => {
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <Container>
        <BigTitle>구독 상품 변경</BigTitle>
        <Flex>
          <SubscriptionPanel
            type={C.ITEM_TYPE.PREMIUM}
            title="프리미엄"
            people={2}
            car={4}
            value={data.type}
            amount="150,000"
            handleChange={handleChange}
          />
          <SubscriptionPanel
            type={C.ITEM_TYPE.STANDARD}
            title="스탠다드"
            people={1}
            car={3}
            value={data.type}
            amount="100,000"
            handleChange={handleChange}
          />
          <SubscriptionPanel
            type={C.ITEM_TYPE.BASIC}
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
          onClickRight={() => {
            dispatch(actionPushSubscription(data));
            history.push(`/setting/subscription/payment`);
          }}
        />
      </Container>
    </div>
  );
};

export default SubscriptionUpdate;
