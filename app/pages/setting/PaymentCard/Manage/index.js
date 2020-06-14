/* eslint-disable indent */
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Container, BigTitle, AsyncDiv, CardPanel, InfoBox } from 'components';
import { useModal, useFetchData } from 'utils/hooks';
import { EDIT_CARD } from 'modals/constants';

import AddIMG from 'images/icon_add.png';

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
  const history = useHistory();
  const modal = useModal();
  const [cardStore, cardOriData] = useFetchData('card');

  const cardData = cardOriData
    ? [{ main: true, ...cardOriData.mainCard }, ...cardOriData.groupCards]
    : [];

  return (
    <Container>
      <BigTitle>결제 카드 관리</BigTitle>
      <AsyncDiv store={cardStore}>
        {cardData.map((d, index) => (
          <CardPanel
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            data={d}
            onClickSetting={() => {
              modal(EDIT_CARD, d);
            }}
          />
        ))}
        <AddCard
          className="box_overflow"
          onClick={() => {
            history.push(`/setting/paymentcard/create`);
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
