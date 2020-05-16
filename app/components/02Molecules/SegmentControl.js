import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Color from 'config/color';

const StyledControl = styled.div`
  width: 100%;
  display: flex;
  border: 1px solid ${Color.LineGray};
  border-radius: 4px;
  margin-bottom: ${props => (props.noMargin ? 0 : 30)};

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
  height: ${props => (props.heig ? props.heig : 40)}px;
  line-height: ${props => (props.heig ? props.heig : 40)}px;
  font-size: ${props => (props.heig ? 0.8 : 1)}rem;
  cursor: pointer;
  border-radius: ${props => (props.checked ? 4 : 0)};
  transition: 0.35s;
  background: ${props => props.checked && Color.Blue};
  color: ${props => props.checked && Color.White};
`;

const SegmentControl = ({ data, clicked, noMargin, height }) => (
  <StyledControl>
    {data.map(d => (
      <Part
        key={d.key}
        checked={clicked === d.key}
        noMargin={noMargin}
        heig={height}
        onClick={() => {
          if (!noMargin) {
            window.scroll(0, 0);
          }
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
  noMargin: PropTypes.bool,
  height: PropTypes.number,
  clicked: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default SegmentControl;
