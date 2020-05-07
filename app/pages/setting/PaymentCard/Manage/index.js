/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Container, BigTitle, AsyncDiv, CardPanel, InfoBox } from 'components';
import { actionGetCards } from 'stores';
import AddIMG from 'images/icon_add.png';
import { useModal } from 'utils/hooks';
import { EDIT_CARD } from 'modals/constants';

const AddCard = styled.div`
  width: 100%;
  min-height: 88px;
  background: white;
  align-items: center;
  padding: 0 28px;
  display: flex;
  text-align: 1.1rem;
  cursor: pointer;

  .plus {
    width: 24px;
    height: 24px;
    background: url(${AddIMG}) center / cover;
    margin-right: 20px;
  }
`;

const Manage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modal = useModal();

  const cardStore = useSelector(state => state.card);
  const cardData = useSelector(state =>
    state.card.data
      ? [
          { main: true, ...state.card.data.mainCard },
          ...state.card.data.groupCards,
        ]
      : [],
  );

  useEffect(() => {
    dispatch(actionGetCards());
  }, []);

  return (
    <Container>
      <BigTitle>결제 카드 관리</BigTitle>
      <AsyncDiv store={cardStore}>
        {cardData.map(d => (
          <CardPanel
            key={d.number}
            data={d}
            onClickSetting={() => {
              modal(EDIT_CARD, d);
            }}
          />
        ))}
        <AddCard
          className="box_overflow"
          onClick={() => {
            history.push('/setting/paymentcard/create');
          }}
        >
          <div className="plus" />
          <div>부서 결제카드 등록하기</div>
        </AddCard>
        <InfoBox>
          부서 결제카드는 부서별로 1개씩만 등록 가능합니다. 부서 결제카드가
          설정되지 않으면 대표 결제카드로 결제 처리됩니다.
        </InfoBox>
      </AsyncDiv>
    </Container>
  );
};

export default Manage;
