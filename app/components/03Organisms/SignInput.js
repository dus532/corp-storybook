import React from 'react';
import PropTypes from 'prop-types';

import DataInput from 'components/02Molecules/DataInput';

const SignInInput = ({ userData, handleChange }) => (
  <>
    <DataInput
      name="email"
      value={userData.email}
      onChange={handleChange}
      placeholder="아이디"
      error="한번도 못했던 말"
    />
    <DataInput
      name="password"
      type="password"
      value={userData.password}
      onChange={handleChange}
      placeholder="비밀번호"
      error="울면서 할 줄은 나 몰랐던 말"
    />
  </>
);

SignInInput.propTypes = {
  userData: PropTypes.object,
  handleChange: PropTypes.func,
};

export default SignInInput;
