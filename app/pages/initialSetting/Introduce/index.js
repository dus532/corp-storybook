import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { Container580, ButtonBottom } from 'components';
import InitialCardsIMG from 'images/initial_cards.png';
import UserManager from 'utils/userManager';

const IntroTop = styled.div`
  display: flex;
  justify-content: space-between;
  height: 240px;
  margin-top: 160px;

  .intro_top-left {
    width: 100px;
    margin-top: 48px;
    flex: 1;
  }

  h2 {
    font-weight: 700;
  }

  .intro_top-img {
    flex-shrink: 0;
    width: 331px;
    height: 291px;
    position: relative;
    top: -51px;
    background: url(${InitialCardsIMG}) center / cover;
    animation: rotate_card 1s;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 20px;
    margin-bottom: 40px;
    height: auto;

    .intro_top-left {
      width: 100%;
      order: 2;
      margin-top: 0;
    }

    .intro_top-img {
      width: 100%;
      height: 180px;
      background-size: contain;
      background-position: right;
      background-repeat: no-repeat;
      order: 1;
      top: 0;
    }
  }
`;
const IntroBottom = styled.div`
  font-size: 0.9em;
  margin-bottom: 80px;
  span {
    font-weight: 700;
  }
`;

const Introduce = () => {
  const USER = UserManager().getUser();
  const history = useHistory();

  return (
    <Container580>
      <IntroTop>
        <div className="intro_top-left">
          <h2>
            {USER.corpName} 관리자 님,
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
        onClickRight={() => history.push('/initial/registercard')}
      />
    </Container580>
  );
};

export default Introduce;
