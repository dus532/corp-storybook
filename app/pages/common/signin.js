import React from 'react';
import { push } from 'connected-react-router';

import { useDispatch, useSelector } from 'react-redux';

import { SignWrap, SignInput, SignExtra, Button, Logo } from 'components';
import { actionSignIn, actionSignHandleChange } from 'store/sign/actions';

const SignIn = () => {
  const dispatch = useDispatch();
  const signInData = useSelector(state => state.sign);

  const handleChange = data => {
    dispatch(actionSignHandleChange(data.target));
  };

  const handleCheckBoxChange = data => {
    dispatch(actionSignHandleChange(data.target, 'checkbox'));
  };

  const onSignIn = () => {
    dispatch(actionSignIn(() => dispatch(push('/carplat'))));
  };

  const propsList = { signInData, handleChange, handleCheckBoxChange };

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
        <Button onClick={onSignIn}>로그인</Button>
      </div>
    </SignWrap>
  );
};

export default SignIn;
