import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import SubButton from 'components/01Atoms/SubButton';

import Color from 'config/color';

const StyledWelcomePanel = styled.div`
  margin-top: 30px;
  height: 80px;
  padding: 0 20px;
  font-weight: 700;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${Color.White};

  .btn_mobile {
    display: none;
  }

  @media screen and (max-width: 768px) {
    margin-top: 0px;
    flex-direction: column;
    padding: 20px;
    height: auto;
    text-align: left;

    * {
      width: 100%;
    }

    .btn_mobile {
      height: 32px;
      margin-top: 10px;
      display: block;
    }
  }
`;

const Button = styled.button`
  border: 1px solid ${Color.LineGray};
  height: 40px;
  padding: 0 36px;
  font-weight: 700;
  transition: 0.35s;
  border-radius: 4px;

  &:hover {
    background: ${Color.SubGray};
    transition: 0.35s;
  }
`;

const WelcomePanel = ({ className, store }) => {
  const history = useHistory();

  return (
    <StyledWelcomePanel className={className}>
      <div className="fs01">
        {store.data.corpInfo.name} 관리자님, 안녕하세요!
      </div>
      <Button
        className="pc subbutton_size"
        onClick={() => {
          history.push('/setting/announcements/');
        }}
      >
        이용안내 확인
      </Button>
      <SubButton
        white
        size="small"
        className="btn_mobile"
        onClick={() => {
          history.push('/setting/announcements/');
        }}
      >
        이용안내 확인
      </SubButton>
    </StyledWelcomePanel>
  );
};

WelcomePanel.propTypes = {
  className: PropTypes.any,
  store: PropTypes.object,
};

export default WelcomePanel;
