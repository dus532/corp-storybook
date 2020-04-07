import React from 'react';
import styled from 'styled-components';

import Color from 'config/color';

const StyledMyPanel = styled.div`
  width: 100%;
  background: ${Color.Blue};
  height: 154px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  margin-top: 30px;
  color: ${Color.White};
`;

const Part = styled.div`
  flex: 1;
  font-weight: 700;
`;

const Sub = styled.div`
  position: relative;
  right: 8px;
  width: 120px;
  margin-top: 116px;
  margin-left: -120px;
`;

const MyPanel = () => (
  <StyledMyPanel>
    <Part>
      이용중인 서비스 상품
      <h2>프리미엄</h2>
    </Part>
    <Part>
      동시 이용자 수<h2>5명</h2>
    </Part>
    <Part>
      동시 이용자 초과
      <h2>0건</h2>
    </Part>
    <Sub>가입 상품 확인</Sub>
  </StyledMyPanel>
);

export default MyPanel;
