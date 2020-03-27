import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import CheckBox from 'components/01Atoms/CheckBox';

const SignExtraFlex = styled.div`
  margin-top: 4px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .sign-extra_container {
    display: flex;
    align-items: center;
  }

  .sign-extra_checkbox {
    margin-right: 8px;
  }
`;

const SignExtra = ({ signInData, handleCheckBoxChange, toggleFindEmail }) => (
  <SignExtraFlex>
    <div className="sign-extra_container">
      <CheckBox
        className="sign-extra_checkbox"
        id="isSaved"
        name="isSaved"
        checked={signInData.isSaved}
        onChange={handleCheckBoxChange}
      />
      <label htmlFor="isSaved">
        <h5>로그인 상태 유지</h5>
      </label>
    </div>
    <h5>
      <button type="button" onClick={toggleFindEmail}>
        <span>
          <u>아이디/비밀번호 찾기</u>
        </span>
      </button>
    </h5>
  </SignExtraFlex>
);

SignExtra.propTypes = {
  toggleFindEmail: PropTypes.func,
  signInData: PropTypes.object,
  handleCheckBoxChange: PropTypes.func,
};

export default SignExtra;
