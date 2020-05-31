/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-useless-escape */
import React from 'react';
import PropTypes from 'prop-types';

import DataInput from 'components/02Molecules/DataInput';

const SignInInput = ({ register, errors, formData }) => {
  const REG = /(?=.*\d{1,50})(?=.*[~`!@#$%\[\]\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,12}$/;

  return (
    <>
      <DataInput
        name="adminLoginId"
        InputRef={register({
          minLength: {
            value: 6,
            message: '아이디가 너무 짧습니다.',
          },
          required: '아이디가 너무 짧습니다.',
        })}
        error={errors.adminLoginId}
        status={
          errors.adminLoginId && errors.adminLoginId.message
            ? 2
            : formData.adminLoginId
            ? 1
            : 0
        }
        placeholder="아이디"
      />

      <DataInput
        name="password"
        type="password"
        InputRef={register({
          pattern: {
            value: REG,
            message: '영문, 숫자, 특수문자를 조합하여 8~12자로 입력하세요',
          },
          required: '영문, 숫자, 특수문자를 조합하여 8~12자로 입력하세요',
        })}
        placeholder="비밀번호"
        error={errors.password}
        status={
          errors.password && errors.password.message
            ? 2
            : formData.password
            ? 1
            : 0
        }
      />
    </>
  );
};

SignInInput.propTypes = {
  register: PropTypes.any,
  errors: PropTypes.any,
  formData: PropTypes.object,
};

export default SignInInput;
