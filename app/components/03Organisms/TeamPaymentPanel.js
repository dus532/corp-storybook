import React from 'react';
import styled from 'styled-components';

// import NoDataIMG from 'images/icon_no-data.png';

import Color from 'config/color';

const StyledPanel = styled.div`
  margin-top: 30px;
  background: ${Color.White};
  padding: 24px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  font-weight: 700;
`;

const Table = styled.div``;

const Card = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  border-top: 1px solid ${Color.LineGray};

  .team_name {
    width: 170px;
  }
  .team_info {
    flex: 1;
  }
  .team_amount {
    color: ${Color.Blue};
    font-weight: 700;
  }
`;

// const NoData = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

//   width: 100%;
//   height: 112px;
//   text-align: center;
// `;

// const NoDataICON = styled.div`
//   width: 68px;
//   height: 40px;
//   background: url(${NoDataIMG}) center / cover;
// `;

const TeamPaymentPanel = () => (
  <StyledPanel>
    <Filter>
      <div>부서별 결제 금액</div>
      <div>1</div>
    </Filter>
    <Table>
      <Card>
        <div className="team_name">전체</div>
        <div className="team_info">부서 전용 카드 삼성카드/</div>
        <div className="team_amount">3,789,400원</div>
      </Card>
    </Table>
    {/* <NoData>
      <NoDataICON />
      <br />
      최근 결제 금액이 없습니다.
    </NoData> */}
  </StyledPanel>
);

export default TeamPaymentPanel;
