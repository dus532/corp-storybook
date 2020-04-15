import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import IconRightText from 'components/01Atoms/IconRightText';

const StyledMyPanel = styled.div`
  width: 100%;
  background: ${Color.White};
  height: 154px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-top: 30px;
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
`;

const Line = styled.div`
  width: 1px;
  background: ${Color.LineGray};
  height: 48px;
`;

const MyPanel = ({ store, className }) => {
  const data = store.data.business_subs;

  return (
    <StyledMyPanel className={className}>
      <Part>
        이용중인 서비스 상품
        <h2>{data.product}</h2>
        <h5>
          <span>가입 상품 확인</span>&nbsp;
          <IconRightText />
        </h5>
      </Part>
      <Line />
      <Part>
        동시 이용자 수<h2>{data.user_number}명</h2>
      </Part>
      <Line />
      <Part>
        동시 이용자 초과
        <h2>{data.excess_number}건</h2>
      </Part>
    </StyledMyPanel>
  );
};

MyPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
};

export default MyPanel;
