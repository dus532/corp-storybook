import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Color from 'config/color';
import moment from 'utils/moment';

const StyledBoard = styled.div`
  background: white;

  div:last-child {
    border: none;
  }
`;

const Line = styled.div`
  background: white;
  min-height: 80px;
  margin: 0 44px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${Color.LineGray};
  cursor: pointer;

  span {
    font-weight: 700;
  }
`;

const Board = ({ now = '1', data, onClick }) => (
  <StyledBoard>
    {data.map((d, index) => {
      if (index > (now * 1 - 1) * 10 && index < now * 10) {
        return (
          <Line key={d.id} onClick={() => onClick(d)}>
            <div>
              <span>{d.title}</span>
              <br />
              {moment(d.createdAt).format('YYYY년 MM월 DD일 hh:mm')}
            </div>
            <div>이동</div>
          </Line>
        );
      }
      return null;
    })}
  </StyledBoard>
);

Board.propTypes = {
  now: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array,
  onClick: PropTypes.func,
};

export default Board;
