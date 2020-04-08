import React from 'react';
import styled from 'styled-components';

import PropTypes from 'prop-types';

import InputCheckBox from 'components/02Molecules/InputCheckBox';

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

const SignExtra = ({ userData, handleChange, toggleFindEmail }) => (
  <SignExtraFlex>
    <InputCheckBox
      className="sign-extra_checkbox"
      id="isSaved"
      name="isSaved"
      body="로그인 상태 유지"
      labelStyle={{ textDecoration: 'none', fontSize: 12 }}
      checked={userData.isSaved}
      onChange={e => handleChange(e, 'checkbox')}
    />
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
  userData: PropTypes.object,
  handleChange: PropTypes.func,
};

export default SignExtra;
