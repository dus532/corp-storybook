import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { SignWrap, SignInput, SignExtra, Button, Logo } from 'components';
import { signHandleChange } from 'store/sign/actions';

const SignIn = () => {
  const dispatch = useDispatch();
  const signInData = useSelector(state => state.sign);

  const handleChange = data => {
    dispatch(signHandleChange(data.target));
  };

  const propsList = { signInData, handleChange };

  return (
    <SignWrap>
      <div className="container">
        <Logo />
        <br />
        <h5>
          프리미엄 기업 카셰어링 서비스, 카플랫 비즈니스에 오신 것을 환영합니다.
        </h5>
        <SignInput {...propsList} />
        <SignExtra {...propsList} />
        <br />
        <Button>로그인</Button>
      </div>
    </SignWrap>
  );
};

export default SignIn;
