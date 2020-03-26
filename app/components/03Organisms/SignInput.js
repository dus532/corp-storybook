import React from 'react';
import PropTypes from 'prop-types';

import Input from 'components/02Molecules/Input';

const SignInInput = ({ signInData, handleChange }) => (
  <>
    <Input
      name="id"
      value={signInData.id}
      onChange={handleChange}
      placeholder="아이디"
    />
    <Input
      name="pw"
      type="password"
      value={signInData.pw}
      onChange={handleChange}
      placeholder="비밀번호"
    />
  </>
);

SignInInput.propTypes = {
  signInData: PropTypes.object,
  handleChange: PropTypes.func,
};

export default SignInInput;
