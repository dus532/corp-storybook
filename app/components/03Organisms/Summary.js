import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Color from 'config/color';

import DL_IMG from 'images/icon_download.png';
import DL_IMG_M from 'images/icon_download_mobile.png';

const StyledSummary = styled.div`
  width: 100%;
  background: white;
  margin-bottom: 20px;
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  align-items: center;
  min-height: 86px;

  .blue {
    color: ${Color.Blue};
  }

  .bold {
    font-weight: 700;
  }

  .left {
    flex: 1;
    font-weight: 700;
  }

  .right {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: auto;

    .left {
      width: 100%;
    }

    .right {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

const ExcelDownload = styled.button`
  font-size: 0.9rem;
  font-weight: 700;
  padding: 10px 30px;
  border: 1px solid ${Color.LineGray};
  border-radius: 4px;
  margin-left: 10px;
  transition: 0.35s;

  .img {
    width: 24px;
    height: 24px;
    background: url(${DL_IMG}) center / contain;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
  }

  &:hover {
    background: ${Color.SubGray};
    transition: 0.35s;
  }

  @media screen and (max-width: 768px) {
    border: none;
    padding: 4px;
    margin-left: 0;
    .img {
      margin: 0;
      background: url(${DL_IMG_M}) center / contain;
    }
    span {
      display: none;
    }
  }
`;

const Summary = ({ data, type }) => {
  switch (type) {
    case 'employee':
      // 사원관리
      return (
        <StyledSummary className="box_overflow">
          <div className="left">
            총 {data.employees.length}명의 사원이 등록된 상태입니다.
          </div>
        </StyledSummary>
      );

    case 'rental':
      // 예약조회
      return (
        <StyledSummary className="box_overflow">
          <div className="left">
            이용요금 :{' '}
            <span className="blue">
              {data.totalAmount && data.totalAmount.toLocaleString('en')}원
            </span>
          </div>
          <div className="right">
            <span className="bold">{data.totalCount}건</span>{' '}
          </div>
        </StyledSummary>
      );

    default:
      // 결제내역
      return (
        <StyledSummary className="box_overflow">
          <div className="left">
            이용요금 :{' '}
            <span className="blue">
              {data.totalAmount && data.totalAmount.toLocaleString('en')}원
            </span>
          </div>
          <div className="right">
            <span className="bold">{data.totalCount}건</span>{' '}
            <ExcelDownload>
              <div className="img" />
              <span>엑셀 다운로드</span>
            </ExcelDownload>
          </div>
        </StyledSummary>
      );
  }
};

Summary.propTypes = {
  type: PropTypes.string,
  data: PropTypes.any,
};

export default Summary;
