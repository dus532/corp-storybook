/* eslint-disable react/no-array-index-key */
import React from 'react';
import styled from 'styled-components';
import Sticky from 'react-sticky-fill';

import { Container, ButtonBottom } from 'components';
import LogoHeader from 'components/01Atoms/LogoHeader';
import Color from 'config/color';
import ICON_OK from 'images/icon_confirm_navy.png';

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${Color.LineGray};
  align-items: center;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
`;

const Div = styled.form`
  background: white;
`;

const Wrap = styled.div`
  width: 600px;
  min-height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 0 auto;

  h2 {
    font-size: 2.4rem;
    font-weight: 100;
    line-height: 3.2rem;
  }

  h2 > span {
    font-weight: 400;
  }
  .ok {
    display: inline-block;
    width: 60px;
    height: 60px;
    background: url(${ICON_OK}) center / cover no-repeat;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
    padding: 0 8px;
  }
`;

const Apply = () => (
  <Div>
    <Sticky>
      <StyledHeader>
        <Container
          style={{ height: 60, display: 'flex', alignItems: 'center' }}
        >
          <LogoHeader />
        </Container>
      </StyledHeader>
    </Sticky>
    <br />
    <Container width="864" style={{ background: 'white' }}>
      <Wrap>
        <div>
          <div className="ok" />
          <br />
          <br />
          <h2>
            신청이
            <br />
            <span>완료되었습니다.</span>
          </h2>
          <br />
          <h4>
            기업 구독 신청을 요청했습니다.
            <br />
            24시간 내에 카플랫 고객센터에서 연락드리겠습니다.
          </h4>
          <br />
          <br />
          <ButtonBottom
            right="카플랫으로 돌아가기"
            onClickRight={() => {
              window.location.href = 'https://biz.carplat.co.kr/sharing/';
            }}
          />
          <br />
          <br />
        </div>
      </Wrap>
    </Container>
  </Div>
);

export default Apply;
