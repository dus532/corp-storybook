import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import LogoHeader from '../01Atoms/LogoHeader';
import SmallButton from '../01Atoms/SmallButton';

import HeaderBottom from './HeaderBottom';

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  background: black;
  padding: 0 8px;
  box-sizing: border-box;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }

  .header_right {
    display: flex;
    align-items: center;
  }

  .header_name {
    margin-right: 8px;
  }
`;

const Header = ({ isSigned, location }) => {
  if (isSigned) {
    return (
      <>
        <StyledHeader>
          <div className="container">
            <LogoHeader />
            <div className="header_right">
              <h5 className="header_name">{isSigned} 님</h5>
              <SmallButton>마이 페이지</SmallButton>
              <SmallButton>로그아웃</SmallButton>
            </div>
          </div>
        </StyledHeader>
        <HeaderBottom location={location} />
      </>
    );
  }
  return <></>;
};

Header.propTypes = {
  isSigned: PropTypes.string,
  location: PropTypes.string,
};

export default Header;
