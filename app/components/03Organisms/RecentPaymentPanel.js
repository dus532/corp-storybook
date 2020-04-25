import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import IconNoData from 'components/01Atoms/IconNoData';

const StyledPanel = styled.div`
  margin-top: 30px;
  background: ${Color.White};
  padding: 24px 20px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  text-align: center;
  margin-bottom: 24px;
`;

const RecentPaymentPanel = ({ store, className }) => {
  const data = store.data.monthlyPayments;

  return (
    <StyledPanel className={className}>
      <Filter>
        <div>최근 결제 금액</div>
        <div>1</div>
      </Filter>
      {data.length > 0 ? (
        <>WIP</>
      ) : (
        <NoData>
          <IconNoData />
          <br />
          <h3>최근 결제 금액이 없습니다.</h3>
        </NoData>
      )}
    </StyledPanel>
  );
};

RecentPaymentPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
};

export default RecentPaymentPanel;
