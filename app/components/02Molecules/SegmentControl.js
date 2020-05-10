import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Color from 'config/color';

const StyledControl = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${Color.LineGray};
  border-radius: 4px;
  margin-bottom: 30px;

  div:first-child {
    border: 0;
    border-radius: 4px 0 0 4px;
  }

  div:last-child {
    border-radius: 0 4px 4px 0;
  }
`;

const Part = styled.div`
  flex: 1;
  border-left: 1px solid ${Color.LineGray};
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.35s;
  background: ${props => props.checked && Color.DarkBlue};
  color: ${props => props.checked && Color.White};
`;

const SegmentControl = ({ data, clicked }) => (
  <StyledControl>
    {data.map(d => (
      <Part
        key={d.key}
        checked={clicked === d.key}
        onClick={() => {
          window.scroll(0, 0);
          d.onClick();
        }}
      >
        {d.body}
      </Part>
    ))}
  </StyledControl>
);

SegmentControl.propTypes = {
  data: PropTypes.array,
  clicked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SegmentControl;
