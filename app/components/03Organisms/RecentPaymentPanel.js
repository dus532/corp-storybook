import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  Bar,
  Tooltip,
} from 'recharts';

import Color from 'config/color';
import NoData from 'components/03Organisms/NoData';

const StyledPanel = styled.div`
  margin-top: 30px;
  background: ${Color.White};
  padding: 24px 20px;

  .chart {
    display: flex;
    margin-left: -20px;
    justify-content: center;
  }

  @media screen and (max-width: 900px) {
    margin-top: 10px;
  }
`;

const Filter = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
`;

const renderCustomizedLabel = props => {
  const { x, y, width, value } = props;
  const viewport = document.body.clientWidth > 768 ? 'pc' : 'mobile';
  const boxWidth = 120;
  const boxHeight = 26;

  return (
    <g>
      <rect
        x={viewport === 'pc' ? x - 30 : x - 55}
        y={y - 36}
        rx="5"
        ry="5"
        width={boxWidth}
        height={boxHeight}
        fill="#ededed"
      />
      <polygon
        points={
          viewport === 'pc'
            ? `${x + 40},${y - 12} ${x + 20},${y - 12} ${x + 30},${y - 2}`
            : `${x + 20},${y - 12} ${x - 10},${y - 12} ${x + 5},${y - 2}`
        }
        fill="#ededed"
      />
      <text
        x={x + width / 2}
        y={y - 22}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="14"
      >
        {Number(value).toLocaleString('en')}원
      </text>
    </g>
  );
};

const RecentPaymentPanel = ({ store, className }) => {
  const data = store.data.monthlyPayments;
  const viewport = document.body.clientWidth > 768 ? 'pc' : 'mobile';

  const CustomTooltip = ({ active, payload, label }) => {
    const StyledToolTip = styled.div`
      padding: 12px;
      border-radius: 5px;
      height: auto;
      font-size: 1.1rem;
      font-weight: 700;
      background: #ededed;

      .intro {
        font-size: 0.9rem;
        font-weight: 500;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    `;

    if (active && payload[0].payload) {
      return (
        <StyledToolTip className="custom-tooltip">
          <div className="intro">
            {payload[0].payload.year}년 {payload[0].payload.month}월
          </div>
          <div className="body">{Number(label).toLocaleString('en')} 원</div>
        </StyledToolTip>
      );
    }

    return null;
  };

  CustomTooltip.propTypes = {
    active: PropTypes.any,
    payload: PropTypes.any,
    label: PropTypes.any,
  };

  return (
    <StyledPanel className={className}>
      <Filter>
        <div className="fs01">최근 결제 금액</div>
      </Filter>
      {data.length > 0 ? (
        <>
          <br />
          <br />
          <div className="chart">
            <BarChart
              width={viewport === 'pc' ? 1080 : document.body.clientWidth - 20}
              height={400}
              data={data}
              margin={{ top: viewport === 'pc' ? 40 : 0 }}
            >
              <CartesianGrid
                strokeDasharray="0"
                vertical={false}
                stroke="#ededed"
              />
              <XAxis
                dataKey="amount"
                tickFormatter={tick =>
                  viewport === 'pc'
                    ? `${data.filter(d => d.amount === tick)[0].year}년
                  ${data.filter(d => d.amount === tick)[0].month}월`
                    : `${data.filter(d => d.amount === tick)[0].month}월`
                }
                axisLine={{ stroke: '#ededed' }}
                tick={{ fontSize: viewport === 'pc' ? 16 : 12 }}
                tickLine={false}
                dy={10}
              />
              <YAxis
                unit=" 원"
                width={viewport === 'pc' ? 120 : 90}
                tickFormatter={tick => tick.toLocaleString()}
                tick={{ fontSize: viewport === 'pc' ? 16 : 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ fill: 'rgba(0,0,0,0.01)' }}
                content={<CustomTooltip />}
              />
              <Bar
                dataKey="amount"
                fill={Color.DarkBlue}
                barSize={viewport === 'pc' ? 60 : 10}
              >
                {viewport === 'pc' && (
                  <LabelList dataKey="amount" content={renderCustomizedLabel} />
                )}
              </Bar>
            </BarChart>
          </div>
        </>
      ) : (
        <NoData type="recentPayment" />
      )}
    </StyledPanel>
  );
};

renderCustomizedLabel.propTypes = {
  x: PropTypes.any,
  y: PropTypes.any,
  width: PropTypes.any,
  value: PropTypes.any,
};

RecentPaymentPanel.propTypes = {
  store: PropTypes.object,
  className: PropTypes.string,
};

export default RecentPaymentPanel;
