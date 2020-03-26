import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import CheckBox from 'components/01Atoms/CheckBox';

const SignExtraFlex = styled.div`
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .save_checkbox {
    display: flex;
    align-items: center;
  }
`;

const SignExtra = ({ SignInData, handleChange }) => (
  <SignExtraFlex>
    <div className="save_checkbox">
      <CheckBox
        id="isSaved"
        checked={SignInData.isSaved}
        handleChange={handleChange}
      />
      <label htmlFor="isSaved">
        <h5>로그인 상태 유지</h5>
      </label>
    </div>
    <h5>아이디/비밀번호 찾기</h5>
  </SignExtraFlex>
);

SignExtra.propTypes = {
  SignInData: PropTypes.object,
  handleChange: PropTypes.func,
};

export default SignExtra;
