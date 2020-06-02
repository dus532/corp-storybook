import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import TEMPIMG from 'images/no_car.png';
import SubButton from 'components/01Atoms/SubButton';
import IconOK from 'components/01Atoms/IconOK';
import NoData from 'components/03Organisms/NoData';

import moment from 'utils/moment';
import C from 'config/constants';
import Color from 'config/color';
import { actionGetRentalStatement } from 'stores';

const StyledPanel = styled.div`
  width: 100%;
  height: 152px;
  background: white;
  margin-bottom: 20px;
  display: flex;
  padding: 20px 28px;
  box-sizing: border-box;
  border-left: 4px solid
    ${props => (props.mainColor ? props.mainColor : 'black')};

  .header {
    width: 400px;
    display: flex;
  }

  .header_status {
    width: 120px;
    font-size: 1.4rem;
    font-weight: 700;
    margin-right: 20px;
    color: ${props => (props.mainColor ? props.mainColor : 'black')};
  }

  .header_car {
    width: 200px;
    height: 100%;
    background: url(${TEMPIMG}) center / cover no-repeat;
  }

  .iconOK {
    position: relative;
    top: 4px;
    left: 4px;
  }

  .body {
    flex: 1;
    height: 100%;
  }

  .body_elements {
    display: flex;
    line-height: 28px;
  }

  .body_elements_bold {
    font-weight: 700;
    margin-right: 10px;
  }

  .footer {
    display: flex;
    width: 172px;
    align-items: flex-end;
  }

  @media screen and (max-width: 900px) {
    border-left: none;
    border-top: 4px solid
      ${props => (props.mainColor ? props.mainColor : 'black')};
    flex-direction: column;
    height: auto;

    .header_status {
      margin: 0;
    }

    .header {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
    }

    .header_car {
      width: 120px;
      height: 90px;
      background: url(${TEMPIMG}) center / cover no-repeat;
    }

    .body_elements {
      flex-direction: column;
    }

    .body_elements_bold {
      display: block;
    }

    .footer {
      margin-top: 20px;
      width: 100%;
    }
  }
`;

const toStringStatus = v => {
  switch (v) {
    case C.RENTAL_TYPE.RENTAL:
      return { body: '차량 대여', color: Color.Blue };
    case C.RENTAL_TYPE.RESERVATION:
      return { body: '차량 예약', color: Color.Blue };
    case C.RENTAL_TYPE.DELAY:
      return { body: '반납 지연', color: Color.RedAlert };
    case C.RENTAL_TYPE.FINISH:
      return { body: '이용 완료', color: Color.Black };
    case C.RENTAL_TYPE.CANCEL:
      return { body: '예약 취소', color: Color.Gray };
    default:
      return null;
  }
};

const RentalPanel = ({ data }) => {
  const isRental = data.status === C.RENTAL_TYPE.RENTAL;
  const dispatch = useDispatch();

  const onStatement = rentalId => {
    dispatch(actionGetRentalStatement(rentalId));
  };

  return (
    <StyledPanel
      className="box_overflow"
      mainColor={toStringStatus(data.status).color}
    >
      <div className="header">
        <div className="header_status">
          {toStringStatus(data.status).body}
          {isRental && <IconOK className="iconOK" />}
        </div>
        <div className="header_car" />
      </div>
      <div className="body" style={{ color: isRental ? Color.Blue : 'black' }}>
        <div className="body_elements">
          <span className="body_elements_bold">예약 번호</span>
          {data.id}
        </div>
        <div className="body_elements">
          <span className="body_elements_bold">대여 기간</span>
          {moment.unix(data.startDate).format(`MM/DD (ddd) HH:mm`)} ~{' '}
          {moment.unix(data.endDate).format('MM/DD (ddd) HH:mm')}
        </div>
        <div className="body_elements">
          <span className="body_elements_bold">대여 차량</span>
          {data.carName}, {data.carNumber}
        </div>
        <div className="body_elements">
          <span className="body_elements_bold">사원 정보</span>
          {data.employeeName}{' '}
          {data.employeePhoneNumber ? `/ ${data.employeePhoneNumber}` : ''}
          {data.userGroupName ? `/ ${data.userGroupName}` : ''}
          {data.employeeNumber ? `/ ${data.employeeNumber}` : ''}
        </div>
      </div>
      <div className="footer">
        {(data.status === C.RENTAL_TYPE.CANCEL ||
          data.status === C.RENTAL_TYPE.FINISH) && (
          <SubButton size="small" onClick={() => onStatement(data.id)} white>
            이용 내역서 확인
          </SubButton>
        )}
      </div>
    </StyledPanel>
  );
};

const RentalList = ({ data }) =>
  data.length > 0 ? (
    <>
      {data.map(d => (
        <RentalPanel data={d} key={d.id} />
      ))}
    </>
  ) : (
    <NoData type="rental" />
  );

RentalPanel.propTypes = {
  data: PropTypes.object,
};

RentalList.propTypes = {
  data: PropTypes.array,
};

export default RentalList;
