import React from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { push } from 'connected-react-router';

import { Container580, ButtonBottom } from 'components';
import InitialCardsIMG from 'images/initial_cards.png';

const IntroTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 240px;
  margin-top: 160px;
  .intro_top-left {
    width: 100px;
    margin-top: 48px;
  }

  h2 {
    font-weight: 700;
  }

  .intro_top-img {
    width: 331px;
    height: 291px;
    position: relative;
    top: -51px;
    background: url(${InitialCardsIMG}) center / cover;
    animation: rotate_card 1s;
  }
`;
const IntroBottom = styled.div`
  font-size: 0.9em;
  margin-bottom: 60px;
  span {
    font-weight: 700;
  }
`;

const Introduce = () => {
  const userData = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Container580>
      <IntroTop>
        <div className="intro_top-left">
          <h2>
            {userData.name}님,
            <br />
            환영합니다!
          </h2>
        </div>
        <div className="intro_top-img" />
      </IntroTop>
      <IntroBottom>
        카플랫 서비스를 이용하기 위해서 먼저 대표 결제카드를 등록해야 합니다.
        <br />
        <br />
        대표 결제카드가 등록되면 매달 정기 결제일에 정기 구독료가 자동
        결제됩니다.
        <br />
        또한, 차량 이용 건 별로 이용료가 개별적으로 정산되어 후불 결제
        처리됩니다.
        <br />
        <br />
        대표 결제카드를 등록하기 위해서 다음 <span>버튼</span>을 선택하세요.
        <br />
      </IntroBottom>
      <ButtonBottom
        right="다음"
        onClickRight={() => dispatch(push('/initial/registercard'))}
      />
    </Container580>
  );
};

export default Introduce;
