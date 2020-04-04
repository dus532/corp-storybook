import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';

const StyledBillPaper = styled.div`
  padding: 24px;
  background: ${Color.White};
`;

const Line = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${Color.LineGray};
  padding-top: 4px;
  padding-bottom: 12px;
  max-width: 532px;

  .title {
    font-weight: 700;
  }
`;

const Amount = styled.div`
  margin: 48px auto 0;
  display: flex;
  justify-content: space-between;
  color: ${Color.Blue};
  max-width: 532px;

  span {
    font-weight: 700;
  }

  .price {
    font-weight: 700;
  }
`;

const BillPaper = ({ data, amount, startDate, endDate }) => (
  <StyledBillPaper>
    {data.map(d => (
      <Line key={d.body}>
        <span className="title">{d.title}</span>
        <span className="body">{d.body}</span>
      </Line>
    ))}
    {amount && (
      <Amount>
        <div className="info">
          <span>결제금액</span>
          <br />
          {startDate} ~ {endDate}
        </div>
        <h2 className="price">{amount}</h2>
      </Amount>
    )}
  </StyledBillPaper>
);

BillPaper.propTypes = {
  data: PropTypes.array,
  amount: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
};

export default BillPaper;
