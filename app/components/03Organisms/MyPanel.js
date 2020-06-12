/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import Color from 'config/color';
import IconRightText from 'components/01Atoms/IconRightText';
import SubButton from 'components/01Atoms/SubButton';

const StyledMyPanel = styled.div`
  width: 100%;
  background: ${Color.White};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
  align-items: center;
  margin-top: 30px;

  .button_mobile {
    display: none;
  }

  .expired {
    opacity: 0.4;
  }

  .inner {
    display: flex;
    width: 100%;
    align-items: center;
  }

  @media screen and (max-width: 900px) {
    padding: 20px;
    margin-top: 10px;

    .button_mobile {
      display: block;
      height: 32px;
    }
  }
`;

const Part = styled.div`
  flex: 1;
  padding: 32px 0;

  h2 {
    font-weight: 700;
  }

  h5 {
    margin-top: 4px;
    color: ${Color.Blue};
    font-weight: 700;
    line-height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 900px) {
    padding: 0;
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

  @media screen and (max-width: 900px) {
    display: none;
  }
`;

const MyPanel = ({ store, expired, className, isSetting }) => {
  const data = store.data.businessSubs;
  const history = useHistory();

  return (
    <StyledMyPanel className={className}>
      <div className={`inner ${expired ? 'expired' : ''}`}>
        <Part>
          이용중인 상품
          <h2>
            {expired ? '(해지) ' : ''}
            {data.product}
          </h2>
          {!isSetting && (
            <h5
              tabIndex={0}
              role="button"
              onClick={() => history.push('/setting/subscription')}
            >
              <span>가입 상품 확인</span>&nbsp;
              <IconRightText />
            </h5>
          )}
        </Part>
        <Line />
        <Part className="other">
          동시 이용자 수<h2>{data.userNumber}명</h2>
        </Part>
      </div>
      {!isSetting && (
        <SubButton
          className="button_mobile"
          white
          size="small"
          onClick={() => history.push('/setting/subscription')}
        >
          <span>가입 상품 확인</span>
        </SubButton>
      )}
    </StyledMyPanel>
  );
};

MyPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
  expired: PropTypes.any,
  isSetting: PropTypes.bool,
};

export default MyPanel;
