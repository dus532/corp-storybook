import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import IconRightText from 'components/01Atoms/IconRightText';
import SubButton from 'components/01Atoms/SubButton';

const StyledMyPanel = styled.div`
  width: 100%;
  background: ${Color.White};
  min-height: 154px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  margin-top: 30px;

  .button_mobile {
    display: none;
  }

  .inner {
    display: flex;
    width: 100%;
  }

  @media screen and (max-width: 768px) {
    padding: 20px;
    margin-top: 10px;
    min-height: 128px;

    .button_mobile {
      display: block;
      height: 32px;
    }
  }
`;

const Part = styled.div`
  flex: 1;
  height: 92px;

  h5 {
    margin-top: 4px;
    color: ${Color.Blue};
    font-weight: 700;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    font-size: 0.8rem;
    height: auto;
    margin-bottom: 12px;

    h2 {
      font-size: 1.4rem;
    }

    h5 {
      display: none;
    }
  }
`;

const Line = styled.div`
  width: 1px;
  background: ${Color.LineGray};
  height: 48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MyPanel = ({ store, className }) => {
  const data = store.data.businessSubs;

  return (
    <StyledMyPanel className={className}>
      <div className="inner">
        <Part>
          이용중인 상품
          <h2>{data.product}</h2>
          <h5>
            <span>가입 상품 확인</span>&nbsp;
            <IconRightText />
          </h5>
        </Part>
        <Line />
        <Part>
          동시 이용자 수<h2>{data.userNumber}명</h2>
        </Part>
      </div>
      <SubButton className="button_mobile" white size="small">
        <span>가입 상품 확인</span>
      </SubButton>
    </StyledMyPanel>
  );
};

MyPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
};

export default MyPanel;
