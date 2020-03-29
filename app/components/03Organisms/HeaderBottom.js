import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import ArrowImg from 'images/icon_arrow.png';

import Container from '../01Atoms/Container';

const StyledHeaderBottom = styled.div`
  width: 100%;
  height: ${props => (props.type === 1 ? 80 : 120)}px;
  background: black;
  color: white;

  .headerbottom_container {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.1em;
  }

  .initial_status {
    width: 100%;
    text-align: center;
  }

  h2 {
    font-size: 2em;
  }

  .initial_arrow {
    flex-shrink: 0;
    width: 16px;
    height: 100%;
    text-align: center;
    background: url(${ArrowImg}) center / contain no-repeat;
  }

  .headerbottom_active {
    border-bottom: 1px solid white;
  }
`;

const HeaderBottom = ({ location }) => {
  // 하단 헤더를 설정합니다.
  if (location.indexOf('/initial') !== -1) {
    // 초기 설정시
    if (location.indexOf('/introduce') !== -1) {
      // 01. 소개 페이지시
      return <StyledHeaderBottom type="1" />;
    }
    // 02. 그외 진행 상황
    return (
      <StyledHeaderBottom>
        <Container className="headerbottom_container">
          <div className="initial_status">
            <h2>01</h2>
            <h3>결제카드 등록</h3>
          </div>
          <div className="initial_arrow" />
          <div className="initial_status">
            <h2>02</h2>
            <h3>정기 구독 결제</h3>
          </div>
          <div className="initial_arrow" />
          <div className="initial_status">
            <h2>03</h2>
            <h3>결제 한도 상향</h3>
          </div>
        </Container>
      </StyledHeaderBottom>
    );
  }
  // 홈 (대시보드) 화면일 시
  if (location.indexOf('/home') !== -1) {
    return (
      <StyledHeaderBottom>
        <Container className="headerbottom_container">
          <NavLink to="/home" activeClassName="headerbottom_active">
            대시보드
          </NavLink>
          <NavLink
            to="/initial/introduce"
            activeClassName="headerbottom_active"
          >
            예약조회
          </NavLink>
          <NavLink to="/payment" activeClassName="headerbottom_active">
            결제내역
          </NavLink>
          <NavLink to="/employee" activeClassName="headerbottom_active">
            사원관리
          </NavLink>
          <NavLink to="/setting" activeClassName="headerbottom_active">
            설정
          </NavLink>
        </Container>
      </StyledHeaderBottom>
    );
  }
  // 그외 모든 화면
  return (
    <StyledHeaderBottom type="1">
      <div className="container">그외</div>
    </StyledHeaderBottom>
  );
};

HeaderBottom.propTypes = {
  location: PropTypes.string,
};

export default HeaderBottom;
