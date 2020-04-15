import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import IconNoData from 'components/01Atoms/IconNoData';
import C from 'config/constants';

const StyledPanel = styled.div`
  margin-top: 30px;
  background: ${Color.White};
  padding: 24px 20px;
  padding-bottom: 0px;
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  font-weight: 700;
`;

const Table = styled.div``;

const Card = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 80px;
  align-items: center;
  border-top: 1px solid ${Color.LineGray};

  .team_name {
    width: 170px;
    font-weight: 500;
  }
  .team_info {
    flex: 1;
  }
  .team_amount {
    color: ${Color.Blue};
    font-weight: 700;
  }
`;

const NoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  width: 100%;
  height: 112px;
  text-align: center;
`;

const Tag = styled.span`
  padding: 6px 20px;
  border-radius: 4px;
  font-weight: 500;
  color: ${props => (props.is_new_announcement ? '#2946b0' : 'black')};
  background: ${props => (props.is_new_announcement ? '#e1e7ff' : `#f7f7f7`)};
  margin-right: 10px;
`;

const TeamPaymentPanel = ({ store, className }) => {
  const data = store.data.user_groups;

  return (
    <StyledPanel className={className}>
      <Filter>
        <div>부서별 결제 금액</div>
        <div>1</div>
      </Filter>
      {data.length > 0 ? (
        <Table>
          {data.map(d => (
            <Card key={d.id}>
              <h3 className="team_name">{d.name}</h3>
              <div className="team_info">
                <Tag type={d.is_new_announcement}>
                  {d.is_new_announcement ? '대표 결제카드' : '부서 전용카드'}
                </Tag>
                {d.card_corp} / {d.card_number} /{' '}
                {d.card_type === C.CARD_TYPE.PERSONAL ? '개인카드' : '법인카드'}
              </div>
              <div className="team_amount">
                {d.payment_amount && d.payment_amount.toLocaleString('en')}원
              </div>
            </Card>
          ))}
        </Table>
      ) : (
        <NoData>
          <IconNoData />
          <br />
          <h3>부서별 결제 금액이 없습니다.</h3>
        </NoData>
      )}
    </StyledPanel>
  );
};

TeamPaymentPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
};

export default TeamPaymentPanel;
