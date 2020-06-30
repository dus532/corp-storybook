import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CSVLink } from 'react-csv/lib';

import Color from 'config/color';
import moment from 'utils/moment';

import DL_IMG from 'images/icon_download.png';
import DL_IMG_M from 'images/icon_download_mobile.png';
import { RegData } from 'utils/regData';
import toChangeMoney from 'utils/toChangeMoney';

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

  .date {
    margin: 0 12px;
  }

  .left {
    flex: 1;
    font-weight: 700;
  }

  .right {
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: auto;
    padding: 20px;

    .date {
      display: none;
    }

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

  @media screen and (max-width: 900px) {
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

const Summary = ({ data, type, filter }) => {
  const headerData = [
    { label: '거점 이름', key: 'positionName' },
    { label: '회원 그룹 이름', key: 'corpName' },
    { label: '구독 상품', key: 'subscriptionProductName' },
    { label: '회원 이름', key: 'userName' },
    { label: '전화번호', key: 'phoneNumber' },
    { label: '부서 이름', key: 'userGroupName' },
    { label: '사원 번호', key: 'employeeNumber' },
    { label: '연관 예약번호', key: 'rentalId' },
    { label: '업무용 / 개인용', key: 'businessPersonal' },
    { label: '예약 시간', key: 'rentalStartDate' },
    { label: '실제 이용 시간', key: 'usageStartDate' },
    { label: '실제 이용 시간(분)', key: 'usagePeriod' },
    { label: '차량 번호', key: 'carNumber' },
    { label: '대여 차량', key: 'carName' },
    { label: '대여 사유', key: 'purpose' },
    { label: '인보이스 번호', key: 'chargeId' },
    { label: '청구일시', key: 'chargeRequestDate' },
    { label: '청구내역', key: 'item' },
    { label: '인보이스 상태', key: 'status' },
    { label: 'ID', key: 'chargeId' },
    { label: '결제 시각', key: 'chargeDate' },
    { label: '결제 회사', key: 'cardCorp' },
    { label: '결제 카드', key: 'cardNumber' },
    { label: '결제 금액', key: 'amount' },
    { label: '결제 항목', key: 'item' },
    { label: '구분', key: 'type' },
    { label: '상태', key: 'chargeStatus' },
  ];

  switch (type) {
    case 'employee':
      // 사원관리
      if (data.employees.length > 0) {
        return (
          <StyledSummary className="box_overflow">
            <div className="left">
              총 {data.employees.length}명의 사원이 등록된 상태입니다.
            </div>
          </StyledSummary>
        );
      }
      return <></>;

    case 'rental':
      // 예약조회
      if (data.totalCount > 0) {
        return (
          <StyledSummary className="box_overflow">
            <div className="left">
              이용요금 :{' '}
              <span className="blue">{toChangeMoney(data.totalAmount)}</span>
            </div>
            <div className="right">
              <span className="bold">{data.totalCount}건</span>{' '}
            </div>
            <span className="date">
              {moment.unix(filter.startDate).format('YYYY년 MM월 DD일')} ~{' '}
              {moment.unix(filter.endDate).format('YYYY년 MM월 DD일')}
            </span>
          </StyledSummary>
        );
      }
      return <></>;

    default:
      // 결제내역
      if (data.totalCount > 0) {
        return (
          <StyledSummary className="box_overflow">
            <div className="left">
              이용요금 :{' '}
              <span className="blue">{toChangeMoney(data.totalAmount)}</span>
            </div>
            <div className="right">
              <span className="bold">전체 {data.totalCount}건</span>
              <span className="date">
                {moment.unix(filter.startDate).format('YYYY년 MM월 DD일')} ~{' '}
                {moment.unix(filter.endDate).format('YYYY년 MM월 DD일')}
              </span>
              <ExcelDownload>
                <CSVLink
                  headers={headerData}
                  data={data.payments.map(d => ({
                    ...d,
                    item: RegData('item', d),
                    status: RegData('status', d),
                    type: RegData('type', d),
                    date: RegData('date', d),
                    businessPersonal: RegData('businessPersonal', d),
                    purpose: RegData('purpose', d),
                    chargeStatus: RegData('status', d),
                    rentalStartDate: RegData('rentalStartDate', d),
                    usageStartDate: RegData('usageStartDate', d),
                    chargeRequestDate: RegData('chargeRequestDate', d),
                    chargeDate: RegData('chargeDate', d),
                    amount: toChangeMoney(d.amount),
                  }))}
                  filename={`carplat_payment_${moment().format(
                    'YYYYMMDDHHmmss',
                  )}.csv`}
                >
                  <div className="img" />
                  <span>엑셀 다운로드</span>
                </CSVLink>
              </ExcelDownload>
            </div>
          </StyledSummary>
        );
      }
      return <></>;
  }
};

Summary.propTypes = {
  type: PropTypes.string,
  data: PropTypes.any,
  filter: PropTypes.object,
};

export default Summary;
