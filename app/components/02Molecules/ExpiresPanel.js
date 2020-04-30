/* eslint-disable indent */
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import CheckIMG from 'images/icon_check_white.png';

const Div = styled.div`
  width: 100%;
  background: white;
  display: flex;
  margin-right: 28px;
  margin-bottom: 20px;
  align-items: center;
  height: 144px;
  flex: 1;
`;

const Check = styled.div`
  margin: 0 60px;

  input[type='radio'] {
    display: none;
    cursor: pointer;
  }

  input[type='radio'] + label {
    width: 40px;
    height: 40px;
    border-radius: 40px;
    display: block;
    border: 3px solid ${Color.LineGray};
    transition: 0.25s;
    cursor: pointer;
  }

  input[type='radio']:checked + label {
    background: ${Color.Blue} url(${CheckIMG}) center / 20px no-repeat;
    border: 3px solid ${Color.Blue};
    transition: 0.25s;
    cursor: pointer;
  }
`;

const View = styled.div`
  .title {
    font-weight: 700;
    font-size: 1.5rem;
  }

  .body {
    font-size: 1.1rem;
    margin-top: 4px;
  }
`;

const ExpiresPanel = ({ handleChange, value, type, title, body }) => (
  <Div className="box_overflow">
    <Check>
      <input
        id={type}
        name="sub"
        type="radio"
        onChange={() => handleChange('type', type)}
        checked={value === type}
      />
      <label htmlFor={type}> </label>
    </Check>
    <View>
      <div className="title">{title}</div>
      <div className="body">{body}</div>
    </View>
  </Div>
);

ExpiresPanel.propTypes = {
  value: PropTypes.number,
  type: PropTypes.number,
  body: PropTypes.element,
  title: PropTypes.string,
  handleChange: PropTypes.func,
};

export default ExpiresPanel;
