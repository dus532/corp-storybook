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

const Table = styled.table`
  margin: 0 auto;
  max-width: ${props => (props.type ? '572px' : '100%')};
  width: 100%;
  border: 1px solid ${Color.LineGray};
  box-sizing: border-box;
  border-collapse: collapse;
  padding: 0 12px;

  .thead_tr {
    height: 40px;
    background: rgba(0, 0, 0, 0.04);
  }

  tr,
  td {
    height: 40px;
    padding: 0 28px;
  }

  .right {
    text-align: right;
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

const H3 = styled.h3`
  display: flex;
  justify-content: space-between;
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

  @media screen and (max-width: 768px) {
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
      <span>{title}</span>
      {buttonSpecial && (
        <ButtonSpecial className="pc" onClick={buttonSpecialOnClick}>
          {buttonSpecial}
        </ButtonSpecial>
      )}
    </H3>
    {data.map(d =>
      d.body ? (
        <Line type={title} key={d.title} blue={blue}>
          <span className="title">{d.title}</span>
          <span className="body">{d.body}</span>
        </Line>
      ) : (
        <>
          <Line type={title} key={d.title} blue={blue}>
            <span className="title">{d.title}</span>
          </Line>
          <Table type={title}>
            <thead>
              <tr className="thead_tr">
                <th>부서명</th>
                <th>사원수</th>
                <th>부서 결제카드</th>
              </tr>
            </thead>
            <tbody>
              {d.table.map(t => (
                <tr key={t.id}>
                  <td>{t.name}</td>
                  <td>{t.employeeNumber} 명</td>
                  <td>{t.isCardRegistered ? '등록 됨' : '등록 안됨'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
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
  buttonSpecial: PropTypes.any,
  buttonSpecialOnClick: PropTypes.any,
  noPadding: PropTypes.bool,
  blue: PropTypes.bool,
};

export default BillPaper;
