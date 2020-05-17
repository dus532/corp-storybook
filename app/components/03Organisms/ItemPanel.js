/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import ArrowIMG from 'images/icon_arrow_black.png';

const StyledItemPanel = styled.div`
  .panel {
    width: 100%;
    min-height: 80px;
    background: white;
    font-weight: 700;
    line-height: 80px;
    box-sizing: border-box;
    cursor: pointer;
    overflow: hidden;
  }

  .wrap {
    display: flex;
    justify-content: space-between;
    height: 100%;
    width: auto;
    box-sizing: border-box;
    margin: 0 28px;
    border-bottom: 1px solid ${Color.LineGray};
  }

  .wrap_body {
    line-height: 24px;
    padding: 20px 28px;
  }

  .arrow {
    width: 20px;
    min-height: 80px;
    background: url(${ArrowIMG}) center / contain no-repeat;
  }

  .arrow_up {
    width: 20px;
    min-height: 80px;
    background: url(${ArrowIMG}) center / contain no-repeat;
    transform: rotate(-90deg);
  }

  .blue {
    color: ${Color.Blue};
  }

  .arrow_down {
    width: 20px;
    min-height: 80px;
    background: url(${ArrowIMG}) center / contain no-repeat;
    transform: rotate(90deg);
  }
`;

const Panel = ({ data, board }) => {
  const [state, setState] = useState(false);

  return (
    <div
      className="panel"
      onClick={() => (board ? setState(!state) : data.onClick())}
    >
      <div className="wrap">
        <div className={state && 'blue'}>{data.title}</div>
        <div
          className={board ? (state ? 'arrow_up' : 'arrow_down') : 'arrow'}
        />
      </div>
      {state && <div className="wrap_body">{data.body}</div>}
    </div>
  );
};

Panel.propTypes = {
  data: PropTypes.object,
  board: PropTypes.bool,
};

const ItemPanel = ({ data, board }) => (
  <StyledItemPanel className="box_overflow">
    {data.map(d => (
      <Panel data={d} board={board} />
    ))}
  </StyledItemPanel>
);

ItemPanel.propTypes = {
  data: PropTypes.array,
  board: PropTypes.bool,
};

export default ItemPanel;
