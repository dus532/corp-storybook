/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import MoreIMG from 'images/icon_more.png';
import { NormalizeData } from 'utils/regData';

const StyledPanel = styled.div`
  width: 100%;
  min-height: 88px;
  padding: 0 28px;
  background: white;
  display: flex;
  align-items: center;
  margin-bottom: 20px;

  .head {
    width: 120px;
    flex-shrink: 0;
    font-weight: 700;
  }
  .body {
    flex: 1;
  }
  .menu {
    background: url(${MoreIMG}) center / cover no-repeat;
    width: 24px;
    height: 24px;
    flex-shrink: 0;
  }
  .menu_mobile {
    background: url(${MoreIMG}) center / contain no-repeat;
    width: 24px;
    height: 24px;
    display: none;
  }

  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    padding: 20px;
    flex-direction: column;
    align-items: flex-start;
    .head {
      order: 1;
      font-size: 1.1rem;
      margin-bottom: 16px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .body {
      order: 2;
      margin-bottom: 16px;
    }
    .tag {
      order: 3;
    }
    .menu {
      display: none;
    }
    .menu_mobile {
      display: block;
    }
  }
`;

const Tag = styled.span`
  padding: 6px 20px;
  border-radius: 4px;
  font-weight: 500;
  color: ${props => (props.t ? '#2946b0' : 'black')};
  background: ${props => (props.t ? '#e1e7ff' : `#f7f7f7`)};
  margin-right: 10px;
`;

const CardPanel = ({ data, onClickSetting }) => (
  <StyledPanel className="box_overflow">
    <div className="head">
      <div>
        {data.main
          ? `전체 부서`
          : data.userGroupName
          ? data.userGroupName
          : '부서 카드'}
      </div>
      <button type="button" onClick={onClickSetting} className="menu_mobile" />
    </div>
    <div className="tag">
      <Tag t={data.main}>{data.main ? '대표 결제카드' : '부서 전용카드'}</Tag>
    </div>
    {data.number ? (
      <div className="body">
        {NormalizeData('cardCorp', data.cardCorp)} /{' '}
        {NormalizeData('cardNumber', data.number)} /{' '}
        {NormalizeData('cardType', data.cardType)}
      </div>
    ) : (
      <div className="body">카드번호가 없습니다.</div>
    )}
    <button type="button" className="menu" onClick={onClickSetting} />
  </StyledPanel>
);

CardPanel.propTypes = {
  data: PropTypes.object,
  onClickSetting: PropTypes.func,
};

export default CardPanel;
