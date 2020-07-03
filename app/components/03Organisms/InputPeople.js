import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Div = styled.div`
  max-width: 372px;
  width: 100%;
  margin: 8px auto 40px;
`;

const Input = styled.div`
  margin-top: 10px;
  display: flex;

  .input {
    flex: 1;
    line-height: 60px;
    background: white;
    text-align: right;
    padding: 0 12px;
    display: flex;
    overflow: hidden;
  }

  .number {
    font-size: 1.6rem;
    font-weight: 700;
    margin-right: 4px;
    border: none;
    text-align: right;
    width: 90%;
  }

  .unit {
    position: relative;
    top: 6px;
  }

  button {
    flex-shring: 0;
    width: 60px;
    height: 60px;
    font-size: 2rem;
    background: white;
  }

  button:first-child {
    margin-right: 10px;
  }

  button:last-child {
    margin-left: 10px;
  }
`;

const InputPeople = ({ number, handleChange }) => (
  <Div>
    동시 이용자 인원
    <Input>
      <button
        type="button"
        onClick={() => {
          if (number > 1) {
            handleChange('people', number * 1 - 1);
          }
        }}
      >
        -
      </button>
      <div className="input">
        <input
          className="number"
          value={number}
          onChange={e => {
            handleChange('people', e.target.value);
          }}
        />
        <div className="unit">명</div>
      </div>
      <button
        type="button"
        onClick={() => {
          handleChange('people', number * 1 + 1);
        }}
      >
        +
      </button>
    </Input>
  </Div>
);

InputPeople.propTypes = {
  number: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChange: PropTypes.func,
};

export default InputPeople;
