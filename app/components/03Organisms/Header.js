/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import styled from 'styled-components';

import Color from 'config/color';

import { actionSignOut } from 'stores';

import ArrowImg from 'images/icon_arrow_black.png';

import LogoHeader from 'components/01Atoms/LogoHeader';
import SmallButton from 'components/01Atoms/SmallButton';
import Container from 'components/01Atoms/Container';
import IconMenu from 'components/01Atoms/IconMenu';
import IconClose from 'components/01Atoms/IconClose';
import IconConfirm from 'components/01Atoms/IconConfirm';
import IconStatusOK from 'components/01Atoms/IconStatusOK';
import IconStatusWait from 'components/01Atoms/IconStatusWait';

const StyledHeader = styled.div`
  width: 100%;
  box-sizing: border-box;
  border-bottom: ${props =>
    props.borderBottom ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'};
  background: ${Color.White};
  top: 0;
  z-index: 2;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    max-width: 1172px;
    margin: 0 auto;
  }

  h2 {
    font-weight: 700;
  }

  .header_top {
    width: 100%;
    background: ${Color.White};
  }

  .header_top_mobile {
    width: 100%;
    background: ${Color.White};
  }

  .header_bottom {
    width: 100%;
    height: 60px;
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header_bottom_mobile {
    display: none;
  }

  .header_bottom_status {
    background: white;
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
    color: ${Color.SubGray};
    text-align: center;
  }

  .initial_arrow {
    flex-shrink: 0;
    width: 16px;
    height: 100%;
    text-align: center;
    background: url(${ArrowImg}) center / contain no-repeat;
  }

  .initial_arrow_opacity {
    opacity: 0.2;
  }

  .initial_bottom {
    height: 120px;
  }

  .initial_ok {
    color: #101c4c;
  }

  .initial_01 {
    color: black;
  }

  @media screen and (max-width: 768px) {
    .header_top {
      display: none;
    }
    .header_bottom {
      height: 60px;
      margin: 0;
      background: white;
    }

    .header_bottom_mobile {
      display: flex;
    }

    .header_bottom_pc {
      display: none;
    }

    .header_bottom-menu {
      display: none;
    }
    .logo_header {
      width: 128px;
      height: 28px;
    }
  }
`;

const MobileMenu = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .menu_bg {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    animation: mobile_menu-bg 0.45s;
  }

  .menu {
    overflow: auto;
    position: absolute;
    top: 0;
    right: 0;
    width: 230px;
    height: 100%;
    background: white;
    font-weight: 700;
    animation: mobile_menu 0.35s;
  }

  .close {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    width: 100%;
  }

  .info {
    padding: 20px;
  }

  .info_text {
    margin-bottom: 10px;
  }

  .info_button {
    margin-bottom: 6px;
  }

  a {
    font-size: 1.2rem;
    display: block;
    padding: 10px 0 10px 28px;
  }

  .setting_button {
    width: 100%;
    font-size: 1.2rem;
    display: block;
    padding: 10px 0 10px 28px;
    text-align: left;
  }

  .header_bottom-active > span {
    border-bottom: 2px solid black;
  }

  @keyframes mobile_menu-bg {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes mobile_menu {
    from {
      right: -200px;
    }
    to {
      right: 0px;
    }
  }

  @media screen and (max-width: 768px) {
    .header_top {
      display: none;
    }
    .header_bottom {
      height: 60px;
      background: white;
    }
    .header_bottom-menu {
      display: none;
    }
    .logo_header {
      width: 128px;
      height: 28px;
    }
  }
`;

const SettingMenu = styled.div`
  width: 150px;
  margin-left: 900px;
  left: calc((100% - 1600px) / 2 + 316px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  animation: opacity 0.35s;
  z-index: 99;

  .menu {
    padding: 16px;
    display: block;
    text-align: right;
    background: white;
    transition: 0.35s;
  }

  .menu:hover {
    background: ${Color.SubGray};
    transition: 0.35s;
  }

  @media screen and (max-width: 1199px) {
    left: inherit;
    right: 20px;
    margin-left: 0;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const SettingMenuMobile = styled.div`
  width: 100%;
  display: none;

  .setting_menu {
    font-size: 0.9rem;
    font-weight: 400;
  }

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const Header = ({ isSigned, location }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const iRef = useRef(null);

  const [menu, setMenu] = useState(false);
  const [setting, setSetting] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        iRef.current &&
        !iRef.current.contains(event.target) &&
        document.body.clientWidth > 768
      ) {
        setSetting(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [iRef]);

  const nowInitPage = () => {
    if (location.indexOf('/registercard') !== -1) {
      return 1;
    }
    if (location.indexOf('/payment') !== -1) {
      return 2;
    }
    if (location.indexOf('/usage') !== -1) {
      return 3;
    }
    return 0;
  };

  const mobileInittatus = () => {
    const num = nowInitPage();
    switch (num) {
      case 1:
        return (
          <div className="initial_status">
            <h2>01</h2>
            <h3>결제카드 등록</h3>
            <IconStatusWait />
            <IconStatusWait />
            <IconStatusWait />
          </div>
        );
      case 2:
        return (
          <div className="initial_status">
            <h2>02</h2>
            <h3>정기구독 결제</h3>
            <IconStatusOK />
            <IconStatusWait />
            <IconStatusWait />
          </div>
        );
      case 3:
        return (
          <div className="initial_status">
            <h2>03</h2>
            <h3>결제한도 설정</h3>
            <IconStatusOK />
            <IconStatusOK />
            <IconStatusWait />
          </div>
        );
      default:
        return <></>;
    }
  };

  const onClose = () => {
    setMenu(false);
    setSetting(false);
  };

  const onOpen = () => {
    setMenu(true);
  };

  const menus = (
    <>
      <NavLink
        to="/home"
        onClick={onClose}
        activeClassName="header_bottom-active"
      >
        <span>대시보드</span>
      </NavLink>
      <NavLink
        to="/rental"
        onClick={onClose}
        activeClassName="header_bottom-active"
      >
        <span>예약조회</span>
      </NavLink>
      <NavLink
        to="/payment"
        onClick={onClose}
        activeClassName="header_bottom-active"
      >
        <span>결제내역</span>
      </NavLink>
      <NavLink
        to="/employee"
        onClick={onClose}
        activeClassName="header_bottom-active"
      >
        <span>사원관리</span>
      </NavLink>
      <button
        className="setting_button"
        style={{ cursor: 'pointer', fontWeight: 700 }}
        type="button"
        onClick={() => {
          setSetting(!setting);
        }}
      >
        설정
      </button>
      {setting && (
        <SettingMenuMobile>
          <NavLink
            className="setting_menu"
            onClick={onClose}
            to="/setting/announcements"
          >
            <span>공지사항</span>
          </NavLink>
          <NavLink
            className="setting_menu"
            onClick={onClose}
            to="/setting/subscription"
          >
            <span>구독 관리</span>
          </NavLink>
          <NavLink
            className="setting_menu"
            onClick={onClose}
            to="/setting/corp"
          >
            <span>기업 정보 관리</span>
          </NavLink>
          <NavLink
            className="setting_menu"
            onClick={onClose}
            to="/setting/paymentcard"
          >
            <span>결제카드 관리</span>
          </NavLink>
          <NavLink className="setting_menu" onClick={onClose} to="/setting/cs">
            <span>고객센터</span>
          </NavLink>
          <NavLink className="setting_menu" onClick={onClose} to="/setting/faq">
            <span>FAQ</span>
          </NavLink>
          <NavLink
            className="setting_menu"
            onClick={onClose}
            to="/setting/terms"
          >
            <span>약관 및 정책</span>
          </NavLink>
        </SettingMenuMobile>
      )}
    </>
  );

  const onSignOut = () => {
    onClose();
    dispatch(actionSignOut());
    history.push('/');
  };

  const noBorderBottom = () => {
    if (location === '/home') {
      return false;
    }
    return true;
  };

  if (isSigned) {
    return (
      <>
        <StyledHeader borderBottom={noBorderBottom()}>
          <div className="header_top">
            <Container padding className="container">
              {location.indexOf('/initial') !== -1 ? (
                <LogoHeader className="logo_header" />
              ) : (
                <div />
              )}
              <div className="header_right">
                <h5 className="header_name">{isSigned.corpName} 관리자 님</h5>
                <SmallButton
                  onClick={() => {
                    history.push('/initial/introduce');
                  }}
                >
                  초기설정
                </SmallButton>
                <SmallButton
                  onClick={() => {
                    history.push('/mypage');
                    onClose();
                  }}
                >
                  마이 페이지
                </SmallButton>
                <SmallButton onClick={onSignOut}>로그아웃</SmallButton>
              </div>
            </Container>
          </div>
          {location.indexOf('/initial') !== -1 ? (
            <>
              <div className="header_top_mobile">
                <Container
                  padding
                  className="header_bottom header_bottom_mobile"
                >
                  <LogoHeader className="logo_header" />
                </Container>
              </div>
              {location.indexOf(`/introduce`) !== -1 ? (
                <></>
              ) : (
                <>
                  <Container
                    padding
                    className="header_bottom initial_bottom header_bottom_pc"
                  >
                    {nowInitPage() > 1 ? (
                      <div className="initial_status initial_ok">
                        <IconConfirm />
                        <h3>결제카드 등록</h3>
                      </div>
                    ) : (
                      <div className="initial_status initial_01">
                        <h2>01</h2>
                        <h3>결제카드 등록</h3>
                      </div>
                    )}
                    <div className="initial_arrow" />
                    {nowInitPage() > 2 ? (
                      <div className="initial_status initial_ok">
                        <IconConfirm />
                        <h3>정기 구독 결제</h3>
                      </div>
                    ) : nowInitPage() === 2 ? (
                      <div className="initial_status initial_ok">
                        <h2>02</h2>
                        <h3>정기 구독 결제</h3>
                      </div>
                    ) : (
                      <div className="initial_status ">
                        <h2>02</h2>
                        <h3>정기 구독 결제</h3>
                      </div>
                    )}
                    {nowInitPage() === 3 ? (
                      <>
                        <div className="initial_arrow" />
                        <div className="initial_status initial_ok">
                          <h2>03</h2>
                          <h3>이용 한도 설정</h3>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="initial_arrow initial_arrow_opacity" />
                        <div className="initial_status ">
                          <h2>03</h2>
                          <h3>이용 한도 설정</h3>
                        </div>
                      </>
                    )}
                  </Container>
                  <Container
                    padding
                    className="header_bottom_mobile header_bottom_status"
                  >
                    {mobileInittatus()}
                  </Container>
                </>
              )}
            </>
          ) : (
            <Container padding className="header_bottom">
              <LogoHeader
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  history.push('/home');
                }}
                className="logo_header"
              />
              <div className="header_bottom-menu">{menus}</div>
              <IconMenu className="mobile" onClick={onOpen} />
            </Container>
          )}
        </StyledHeader>
        {menu && (
          <MobileMenu>
            <div
              className="menu_bg"
              role="button"
              tabIndex={0}
              onClick={onClose}
              onKeyUp={() => {}}
            />
            <div className="menu">
              <button type="button" onClick={onClose} className="close">
                <IconClose />
              </button>
              {menus}
              <br />
              <hr />
              <div className="info">
                <h5 className="info_text">{isSigned.corpName} 관리자 님</h5>
                <SmallButton
                  onClick={() => {
                    history.push('/initial/introduce');
                  }}
                >
                  초기설정
                </SmallButton>
                <SmallButton
                  onClick={() => {
                    history.push('/mypage');
                    onClose();
                  }}
                  className="info_button"
                  mobile
                >
                  마이 페이지
                </SmallButton>
                <SmallButton onClick={onSignOut} mobile>
                  로그아웃
                </SmallButton>
              </div>
            </div>
          </MobileMenu>
        )}
        {setting && (
          <SettingMenu ref={iRef}>
            <NavLink
              className="menu"
              onClick={onClose}
              to="/setting/announcements"
            >
              <span>공지사항</span>
            </NavLink>
            <NavLink
              className="menu"
              onClick={onClose}
              to="/setting/subscription"
            >
              <span>구독 관리</span>
            </NavLink>
            <NavLink className="menu" onClick={onClose} to="/setting/corp">
              <span>기업 정보 관리</span>
            </NavLink>
            <NavLink
              className="menu"
              onClick={onClose}
              to="/setting/paymentcard"
            >
              <span>결제카드 관리</span>
            </NavLink>
            <NavLink className="menu" onClick={onClose} to="/setting/cs">
              <span>고객센터</span>
            </NavLink>
            <NavLink className="menu" onClick={onClose} to="/setting/faq">
              <span>FAQ</span>
            </NavLink>
            <NavLink className="menu" onClick={onClose} to="/setting/terms">
              <span>약관 및 정책</span>
            </NavLink>
          </SettingMenu>
        )}
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
