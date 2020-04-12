import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import Color from 'config/color';

import { actionSignOut } from 'stores';

import ArrowImg from 'images/icon_arrow_black.png';

import LogoHeader from '../01Atoms/LogoHeader';
import SmallButton from '../01Atoms/SmallButton';
import Container from '../01Atoms/Container';

const StyledHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    max-width: 1172px;
    margin: 0 auto;
  }

  .header_top {
    width: 100%;
    background: ${Color.White};
  }

  .header_bottom {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header_bottom-menu {
    display: flex;
    justify-content: space-around;
    font-weight: 700;
    width: 670px;
  }

  .header_right {
    display: flex;
    align-items: center;
  }

  .header_name {
    margin-right: 8px;
  }

  .header_bottom-active {
    border-bottom: 2px solid black;
  }

  .initial_status {
    width: 100%;
    text-align: center;
  }

  .initial_arrow {
    flex-shrink: 0;
    width: 16px;
    height: 100%;
    text-align: center;
    background: url(${ArrowImg}) center / contain no-repeat;
  }

  .initial_bottom {
    height: 120px;
  }
`;

const Header = ({ isSigned, location }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSignOut = () => {
    dispatch(actionSignOut());
    history.push('/');
  };

  if (isSigned) {
    return (
      <>
        <StyledHeader>
          <div className="header_top">
            <Container className="container">
              {location.indexOf('/initial') !== -1 ? <LogoHeader /> : <div />}
              <div className="header_right">
                <h5 className="header_name">{isSigned.access_token} 님</h5>
                <SmallButton
                  onClick={() => {
                    history.push('/initial/introduce');
                  }}
                >
                  초기설정
                </SmallButton>
                <SmallButton>마이 페이지</SmallButton>
                <SmallButton onClick={onSignOut}>로그아웃</SmallButton>
              </div>
            </Container>
          </div>
          {location.indexOf('/initial') !== -1 ? (
            <>
              {location.indexOf(`/introduce`) !== -1 ? (
                <></>
              ) : (
                <Container className="header_bottom initial_bottom">
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
              )}
            </>
          ) : (
            <Container className="header_bottom">
              <LogoHeader />
              <div className="header_bottom-menu">
                <NavLink to="/home" activeClassName="header_bottom-active">
                  대시보드
                </NavLink>
                <NavLink
                  to="/reservation"
                  activeClassName="header_bottom-active"
                >
                  예약조회
                </NavLink>
                <NavLink to="/payment" activeClassName="header_bottom-active">
                  결제내역
                </NavLink>
                <NavLink to="/employee" activeClassName="header_bottom-active">
                  사원관리
                </NavLink>
                <NavLink to="/setting" activeClassName="header_bottom-active">
                  설정
                </NavLink>
              </div>
            </Container>
          )}
        </StyledHeader>
      </>
    );
  }
  return <></>;
};

Header.propTypes = {
  isSigned: PropTypes.any,
  location: PropTypes.string,
};

export default Header;
