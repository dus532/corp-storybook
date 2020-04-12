import React from 'react';
import PropTypes from 'prop-types';

import DataInput from 'components/02Molecules/DataInput';

const SignInInput = ({ userData, handleChange }) => (
  <>
    <DataInput
      name="email"
      value={userData.email}
      onChange={handleChange}
      error={userData.emailError}
      status={userData.email && !userData.emailError ? 1 : 2}
      placeholder="아이디"
    />
    <DataInput
      name="password"
      type="password"
      value={userData.password}
      onChange={handleChange}
      placeholder="비밀번호"
      error={userData.passwordError}
      status={userData.password && !userData.passwordError ? 1 : 2}
    />
  </>
);

SignInInput.propTypes = {
  userData: PropTypes.object,
  handleChange: PropTypes.func,
};

export default SignInInput;
