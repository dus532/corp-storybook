import React from 'react';
import PropTypes from 'prop-types';

import DataInput from 'components/02Molecules/DataInput';

const SignInInput = ({ signInData, handleChange }) => (
  <>
    <DataInput
      name="id"
      value={signInData.id}
      onChange={handleChange}
      placeholder="아이디"
      error="한번도 못했던 말"
    />
    <DataInput
      name="pw"
      type="password"
      value={signInData.pw}
      onChange={handleChange}
      placeholder="비밀번호"
      error="울면서 할 줄은 나 몰랐던 말"
    />
  </>
);

SignInInput.propTypes = {
  signInData: PropTypes.object,
  handleChange: PropTypes.func,
};

export default SignInInput;
