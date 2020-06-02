import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import UserGroups from 'components/03Organisms/UserGroups';

const StyledBillPaper = styled.div`
  padding: 24px 20px;
  background: ${Color.White};
  position: relative;
  margin-top: ${props => props.noPadding && '2px'};
  margin-bottom: ${props => props.noPadding && '2px'};

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
  padding-top: 12px;
  padding-bottom: 12px;
  max-width: ${props => (props.type ? '572px' : '100%')};
  width: 100%;
  color: ${props => (props.blue ? Color.Blue : '#000000')};

  .title {
    font-weight: 500;
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

  @media screen and (max-width: 900px) {
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

const H3 = styled.h3`
  display: flex;
  margin: 0 auto;
  max-width: 572px;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const ButtonSpecial = styled.button`
  width: 164px;
  height: 40px;
  border: 1px solid ${Color.LineGray};
  text-align: center;
  line-height: 40px;
  font-size: 0.8rem;
  font-weight: 700;
  border-radius: 5px;
  transition: 0.25s;

  &:hover {
    background: ${Color.LineGray};
    transition: 0.25s;
  }

  .mobile {
    display: none;
  }

  @media screen and (max-width: 900px) {
    margin: 20px auto 0;
    max-width: ${props => (props.type ? '572px' : '100%')};
    width: 100%;
    .pc {
      display: none;
    }
    .mobile {
      display: block;
    }
  }
`;

const BillPaper = ({
  className,
  title,
  data,
  amount,
  startDate,
  endDate,
  bottom,
  buttonSpecial,
  buttonSpecialOnClick,
  noPadding,
  blue,
}) => (
  <StyledBillPaper noPadding={noPadding} className={className}>
    <H3>
      <span className="fs01">{title}</span>
      {buttonSpecial && (
        <ButtonSpecial className="pc" onClick={buttonSpecialOnClick}>
          {buttonSpecial}
        </ButtonSpecial>
      )}
    </H3>
    {data.map(d =>
      !d.table ? (
        <Line type={title} key={d.title} blue={blue}>
          <span className="title">{d.title}</span>
          <span className="body">{d.body ? d.body : '-'}</span>
        </Line>
      ) : (
        <React.Fragment key={d.title}>
          <Line type={title} blue={blue}>
            <span className="title">{d.title}</span>
          </Line>
          <UserGroups type={title} data={d.table} />
        </React.Fragment>
      ),
    )}
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
    {buttonSpecial && (
      <ButtonSpecial
        type={title}
        className="mobile"
        onClick={buttonSpecialOnClick}
      >
        {buttonSpecial}
      </ButtonSpecial>
    )}
    {bottom && <Bottom noPadding={noPadding}>{bottom}</Bottom>}
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
  buttonSpecial: PropTypes.any,
  buttonSpecialOnClick: PropTypes.any,
  noPadding: PropTypes.bool,
  blue: PropTypes.bool,
};

export default BillPaper;
