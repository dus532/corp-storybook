import React, { useEffect } from 'react';
import { push } from 'connected-react-router';

import { useDispatch, useSelector } from 'react-redux';

import { SignWrap, SignInput, SignExtra, Button, Logo } from 'components';
import {
  actionSignIn,
  actionSignHandleChange,
  toggleFindEmail,
  actionSetUser,
} from 'store';
import { ModalFindEmail } from 'modals';

const SignIn = () => {
  const dispatch = useDispatch();
  const signInData = useSelector(state => state.sign);
  const modalsData = useSelector(state => state.modals);
  const userData = useSelector(state => state.user);

  const handleChange = data => {
    dispatch(actionSignHandleChange(data.target));
  };

  const handleCheckBoxChange = data => {
    dispatch(actionSignHandleChange(data.target, 'checkbox'));
  };

  const onSignIn = () => {
    dispatch(
      actionSignIn(() => {
        dispatch(actionSetUser());
        dispatch(push('/home'));
      }),
    );
  };

  const doToggleFindEmail = () => {
    dispatch(toggleFindEmail());
  };

  const propsList = { signInData, handleChange, handleCheckBoxChange };

  useEffect(() => {
    if (userData.name) {
      dispatch(push('/home'));
    }
  }, []);

  return (
    <>
      <SignWrap>
        <div className="sign_container">
          <Logo />
          <h2>
            프리미엄 기업 카셰어링 서비스,
            <br /> 카플랫 비즈니스에 오신 것을 환영합니다.
          </h2>
          <div className="sign_bottom">
            <SignInput {...propsList} />
            <SignExtra {...propsList} toggleFindEmail={doToggleFindEmail} />
            <Button onClick={onSignIn}>
              <span>로그인</span>
            </Button>
            <h5 className="sign_askCarplat">
              [느낌표] 나는요 오빠가 좋은걸 어떡해
            </h5>
          </div>
        </div>
      </SignWrap>
      <ModalFindEmail
        view={modalsData.findEmail}
        onClickExit={doToggleFindEmail}
      />
    </>
  );
};

export default SignIn;
