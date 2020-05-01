/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, BigTitle, AsyncDiv, CardPanel } from 'components';
import { actionGetCards } from 'stores';

const Manage = () => {
  const dispatch = useDispatch();

  const cardStore = useSelector(state => state.card);
  const cardData = useSelector(state =>
    state.card.data
      ? [{ main: true, ...state.card.data.mainCard }, ...state.card.data.cards]
      : [],
  );

  useEffect(() => {
    dispatch(actionGetCards());
  }, []);

  console.log(cardData);

  return (
    <Container>
      <BigTitle>결제 카드 관리</BigTitle>
      <AsyncDiv store={cardStore}>
        {cardData.map(d => (
          <CardPanel key={d.number} data={d} />
        ))}
      </AsyncDiv>
    </Container>
  );
};

export default Manage;
