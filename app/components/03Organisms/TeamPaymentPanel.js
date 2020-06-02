import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import SegmentControl from 'components/02Molecules/SegmentControl';
import NoData from 'components/03Organisms/NoData';

import C from 'config/constants';
import moment from 'utils/moment';

const StyledPanel = styled.div`
  margin-top: 30px;
  background: ${Color.White};
  padding: 24px 20px;
  padding-bottom: 0px;

  h3 {
    font-size: 0.9rem;
  }

  @media screen and (max-width: 900px) {
    margin-top: 10px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  font-weight: 700;

  .control {
    width: 480px;
  }

  .date {
    flex: 1;
    text-align: right;
    margin-right: 12px;
    font-weight: 300;
  }

  @media screen and (max-width: 900px) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 16px;
    .date {
      display: none;
    }
    .control {
      width: 100%;
      margin-top: 12px;
    }
  }
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
    font-size: 1.1rem;
  }
  .team_info {
    flex: 1;
  }
  .team_amount {
    color: ${Color.Blue};
    font-weight: 700;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    height: auto;

    .team_name {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    .team_amount {
      margin-top: 4px;
      font-size: 1.1rem;
      margin-bottom: 12px;
    }
  }
`;

const Tag = styled.span`
  padding: 6px;
  border-radius: 4px;
  font-weight: 300;
  color: ${props => (props.isRepresentativeCard ? '#2946b0' : 'black')};
  background: ${props => (props.isRepresentativeCard ? '#e1e7ff' : `#f7f7f7`)};
  margin-right: 10px;
  display: ${props => (props.mobile ? 'none' : 'inline-block')};
  font-size: 0.8rem;

  @media screen and (max-width: 900px) {
    font-size: 0.8rem;
    margin-right: 0px;
    display: ${props => (props.mobile ? 'inline-block' : 'none')};
  }
`;

const TeamPaymentPanel = ({ store, className, setDate, date }) => {
  const data = store.data.userGroups;
  const [state, setState] = useState(0);

  const tag = (d, mobile) => (
    <Tag mobile={mobile} isRepresentativeCard={d.isRepresentativeCard}>
      {d.isRepresentativeCard ? '대표 결제카드' : '부서 전용카드'}
    </Tag>
  );

  return (
    <StyledPanel className={className}>
      <Filter>
        <div className="fs01">부서별 결제 금액</div>
        <div className="date">
          {moment
            .unix(date.userGroupPaymentsStartDate)
            .format('YYYY년 MM월 DD일')}{' '}
          ~{' '}
          {moment
            .unix(date.userGroupPaymentsEndDate)
            .format('YYYY년 MM월 DD일')}{' '}
        </div>
        <div className="control">
          <SegmentControl
            height={30}
            data={[
              {
                key: 0,
                body: '이번 달',
                onClick: () => {
                  setState(0);
                  setDate({
                    userGroupPaymentsStartDate: moment()
                      .startOf('month')
                      .format('X'),
                    userGroupPaymentsEndDate: moment()
                      .endOf('month')
                      .format('X'),
                  });
                },
              },
              {
                key: 1,
                body: '최근 1개월',
                onClick: () => {
                  setState(1);
                  setDate({
                    userGroupPaymentsStartDate: moment()
                      .subtract(1, 'month')
                      .format('X'),
                    userGroupPaymentsEndDate: moment().format('X'),
                  });
                },
              },
              {
                key: 2,
                body: '최근 3개월',
                onClick: () => {
                  setState(2);
                  setDate({
                    userGroupPaymentsStartDate: moment()
                      .subtract(3, 'month')
                      .startOf('month')
                      .format('X'),
                    userGroupPaymentsEndDate: moment().format('X'),
                  });
                },
              },
              {
                key: 3,
                body: '최근 6개월',
                onClick: () => {
                  setState(3);
                  setDate({
                    userGroupPaymentsStartDate: moment()
                      .subtract(6, 'month')
                      .startOf('month')
                      .format('X'),
                    userGroupPaymentsEndDate: moment().format('X'),
                  });
                },
              },
            ]}
            noMargin
            clicked={state}
          />
        </div>
      </Filter>
      {data.length > 0 ? (
        <Table>
          {data.map(d => (
            <Card key={d.id}>
              <h3 className="team_name">
                {d.name}
                {tag(d, true)}
              </h3>
              <div className="team_info">
                {tag(d)}
                {d.cardCorp} / {d.cardNumber} /{' '}
                {d.cardType === C.CARD_TYPE.PERSONAL ? '개인카드' : '법인카드'}
              </div>
              <div className="team_amount">
                {d.paymentAmount && d.paymentAmount.toLocaleString('en')}원
              </div>
            </Card>
          ))}
        </Table>
      ) : (
        <NoData type="teamPayment" />
      )}
    </StyledPanel>
  );
};

TeamPaymentPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.any,
  setDate: PropTypes.func,
  date: PropTypes.object,
};

export default TeamPaymentPanel;
