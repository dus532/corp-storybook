/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDropBox = styled.select`
  padding: 0 12px;
  margin: ${({ margin }) => margin};
  height: 40px;
  display: inline-block;
  border: 1px solid var(--grey200);
  border-radius: 2px;
  font-size: 14px;
  font-weight: 400;

  &:focus,
  &:active {
    outline: none;
  }
`;

const DropBox = ({
  name,
  initial,
  data,
  className,
  margin,
  onChange,
  value,
}) => (
  <StyledDropBox
    name={name}
    margin={margin}
    className={className}
    value={value}
    onChange={onChange}
  >
    {!data && <option>데이터 없음</option>}
    {initial && <option value={initial.value}>{initial.body}</option>}
    {data &&
      data.map(
        (d, index) =>
          d && (
            <option key={index} value={d.value || d.id || 0}>
              {d.body || d.name}
            </option>
          ),
      )}
  </StyledDropBox>
);

DropBox.propTypes = {
  name: PropTypes.string,
  initial: PropTypes.object,
  data: PropTypes.array,
  className: PropTypes.string,
  margin: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default DropBox;
