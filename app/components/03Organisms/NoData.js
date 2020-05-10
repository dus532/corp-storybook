import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;

  @media screen and (max-width: 768px) {
    height: 128px;
  }
`;

const NoData = () => (
  <StyledDiv className="box_overflow">검색된 정보가 없습니다.</StyledDiv>
);

export default NoData;
