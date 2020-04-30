import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';

const StyledBillPaper = styled.div`
  padding: 24px 20px;
  background: ${Color.White};
  position: relative;
  margin-top: ${props => props.noPadding && '2px'};

  h3 {
    margin-bottom: 28px;
    font-weight: 700;
  }
`;

const Line = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${Color.LineGray};
  padding-top: 4px;
  padding-bottom: 12px;
  max-width: ${props => (props.type ? '572px' : '100%')};
  width: 100%;
  color: ${props => (props.blue ? Color.Blue : '#000000')};

  .title {
    font-weight: 700;
  }
`;

const Amount = styled.div`
  margin: 48px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  color: ${Color.Blue};
  width: 100%;

  span {
    font-weight: 700;
  }

  .price {
    font-weight: 700;
  }

  @media screen and (max-width: 768px) {
    .price {
      width: 100%;
      text-align: right;
    }
  }
`;

const Bottom = styled.div`
  margin-top: 60px;
  margin-bottom: 36px;
  display: ${props => (props.noPadding ? 'none' : 'block')};
`;

const BillPaper = ({
  className,
  title,
  data,
  amount,
  startDate,
  endDate,
  bottom,
  noPadding,
  blue,
}) => (
  <StyledBillPaper noPadding={noPadding} className={className}>
    <h3>{title}</h3>
    {data.map(d => (
      <Line type={title} key={d.title} blue={blue}>
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
    <Bottom noPadding={noPadding}>{bottom}</Bottom>
  </StyledBillPaper>
);

BillPaper.propTypes = {
  data: PropTypes.array,
  amount: PropTypes.string,
  title: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  className: PropTypes.any,
  bottom: PropTypes.any,
  noPadding: PropTypes.bool,
  blue: PropTypes.bool,
};

export default BillPaper;
