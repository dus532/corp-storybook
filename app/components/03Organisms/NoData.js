import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ICON_NOTICE from 'images/icon_nodata_notice.png';
import ICON_PAYMENT from 'images/icon_nodata_payment.png';
import ICON_RENTAL from 'images/icon_nodata_rental.png';
import ICON_EMPLOYEE from 'images/icon_nodata_user.png';

const ICON = styled.div`
  width: 80px;
  height: 80px;
  background: url(${props => (props.bg ? props.bg : 'none')}) center / cover
    no-repeat;
  margin-bottom: 12px;
`;

const StyledDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: white;
  padding: 40px 0;

  @media screen and (max-width: 768px) {
    padding: 40px 0;
  }
`;

const NoData = ({ type }) => {
  switch (type) {
    case 'rental':
      return (
        <StyledDiv className="box_overflow">
          <ICON bg={ICON_RENTAL} />
          검색된 예약 정보가 없습니다.
        </StyledDiv>
      );
    case 'payment':
      return (
        <StyledDiv className="box_overflow">
          <ICON bg={ICON_PAYMENT} />
          검색된 결제 정보가 없습니다.
        </StyledDiv>
      );
    case 'employee':
      return (
        <StyledDiv className="box_overflow">
          <ICON bg={ICON_EMPLOYEE} />
          검색된 사원 정보가 없습니다.
        </StyledDiv>
      );
    case 'notice':
      return (
        <StyledDiv className="box_overflow">
          <ICON bg={ICON_NOTICE} />
          검색된 공지사항이 없습니다.
        </StyledDiv>
      );
    default:
      return (
        <StyledDiv className="box_overflow">검색된 정보가 없습니다.</StyledDiv>
      );
  }
};

NoData.propTypes = {
  type: PropTypes.string,
};

export default NoData;
