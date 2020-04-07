import React from 'react';
import styled from 'styled-components';

import NoDataIMG from 'images/icon_no-data.png';

import Color from 'config/color';

const StyledPanel = styled.div`
  margin-top: 30px;
  background: ${Color.White};
  padding: 24px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

// const Chart = styled.div``;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 112px;
  text-align: center;
`;

const NoDataICON = styled.div`
  width: 68px;
  height: 40px;
  background: url(${NoDataIMG}) center / cover;
`;

const RecentPaymentPanel = () => (
  <StyledPanel>
    <Filter>
      <div>최근 결제 금액</div>
      <div>1</div>
    </Filter>
    <NoData>
      <NoDataICON />
      <br />
      최근 결제 금액이 없습니다.
    </NoData>
  </StyledPanel>
);

export default RecentPaymentPanel;
