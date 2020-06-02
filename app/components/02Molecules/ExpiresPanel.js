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

  @media screen and (max-width: 900px) {
    padding: 0 20px;
    height: 100%;
    min-height: 112px;
    margin-bottom: 10px;
  }
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

  @media screen and (max-width: 900px) {
    margin: 0 16px 0 0;
    position: relative;
    top: -20px;
    flex-direction: column;
    justify-content: flex-start;

    input[type='radio'] + label {
      width: 24px;
      height: 24px;
    }
    input[type='radio']:checked + label {
      background: ${Color.Blue} url(${CheckIMG}) center / 12px no-repeat;
    }
  }
`;

const View = styled.div`
  .title {
    font-weight: 700;
    font-size: 1.1rem;
  }

  .body {
    font-size: 1rem;
    margin-top: 4px;
  }

  @media screen and (max-width: 900px) {
    .title {
      font-size: 1.1rem;
    }
    .body {
      font-size: 1rem;
    }
  }
`;

const ExpiresPanel = ({ handleChange, value, type, title, body, style }) => (
  <Div style={style} className="box_overflow">
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
  style: PropTypes.object,
};

export default ExpiresPanel;
