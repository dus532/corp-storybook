import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Color from 'config/color';

import DL_IMG from 'images/icon_download.png';

const StyledSummary = styled.div`
  width: 100%;
  background: white;
  margin-bottom: 20px;
  padding: 20px 28px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  align-items: center;

  .blue {
    color: ${Color.Blue};
  }

  .bold {
    font-weight: 700;
  }

  .left {
    font-weight: 700;
  }

  .right {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 768px) {
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
`;

const Summary = ({ data }) => (
  <StyledSummary>
    <div className="left">
      이용요금 :{' '}
      <span className="blue">
        {data.total_amount && data.total_amount.toLocaleString('en')}원
      </span>
    </div>
    <div className="right">
      <span className="bold">전체 {data.total_count}건</span> <span>- ~ -</span>{' '}
      <ExcelDownload>
        <div className="img" />
        엑셀 다운로드
      </ExcelDownload>
    </div>
  </StyledSummary>
);

Summary.propTypes = {
  data: PropTypes.any,
};

export default Summary;
