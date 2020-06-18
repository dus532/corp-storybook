/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';

import ko from 'date-fns/locale/ko';

import IconIMG from 'images/icon_calender.png';
import Color from 'config/color';

import './DatePicker.css';

registerLocale('ko', ko);
setDefaultLocale('ko');

const StyledCustomPicker = styled.button`
  width: 100%;
  height: 40px;
  border: solid 1px ${Color.LineGray};
  background: white url(${IconIMG}) 96% / 24px 24px no-repeat;
  z-index: 0;
  text-align: left;
  text-indent: 4px;
  vertical-align: middle;
`;

const CustomPicker = forwardRef(({ value, onClick }, ref) => (
  <StyledCustomPicker type="button" onClick={onClick} ref={ref}>
    {value}
  </StyledCustomPicker>
));

CustomPicker.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
};

const StyledDatePicer = styled.div`
  width: ${({ width }) => width || 252}px;
  display: inline-block;
  height: 40px;

  @media screen and (max-width: 900px) {
    width: 50%;
  }
`;

const DatePick = ({ name, className, value, onChange, width }) => (
  <StyledDatePicer width={width} className={className}>
    <DatePicker
      dateFormat="yyyy-MM-dd"
      name={name}
      selected={value}
      onChange={onChange}
      locale="ko"
      customInput={<CustomPicker />}
      withPortal={document.body.offsetWidth < 768}
    />
  </StyledDatePicer>
);

DatePick.propTypes = {
  name: PropTypes.string,
  width: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
};

export default DatePick;
