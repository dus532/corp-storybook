import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  SignWrap,
  SignInput,
  SignExtra,
  Button,
  Logo,
  InfoBox,
} from 'components';
import { actionPostSignIn } from 'stores';
import { SIGN_FIND_EMAIL } from 'modals/constants';
import { useToast, useModal } from 'utils/hooks';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const modal = useModal();

  const [userData, setUserData] = useState({
    adminLoginId: '',
    emailError: '',
    password: '',
    passwordError: '',
    isSaved: false,
  });

  const userStore = useSelector(state => state.user);

  const { handleSubmit, register, errors, getValues } = useForm();

  useEffect(() => {
    if (userStore.data) {
      history.push('/home');
    }
  }, [userStore]);

  const formData = getValues();

  const handleChange = (e, type) => {
    if (type === 'checkbox') {
      setUserData({ ...userData, isSaved: e.target.checked });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = data => {
    if (data.adminLoginId && data.password) {
      dispatch(actionPostSignIn(data));
    } else {
      toast('빈칸을 채워주세요.');
    }
  };

  const modalFindEmail = () => {
    modal(SIGN_FIND_EMAIL);
  };

  const propsList = { userData, handleChange, register, errors, formData };

  return (
    <>
      <SignWrap>
        <div className="sign_container">
          <Logo />
          <h2 className="sign_title">
            프리미엄 기업 카셰어링 서비스,
            <br /> <span className="blue">카플랫 비즈</span>에 오신 것을
            환영합니다.
          </h2>
          <form className="sign_bottom" onSubmit={handleSubmit(onSubmit)}>
            <SignInput {...propsList} />
            <SignExtra {...propsList} toggleFindEmail={modalFindEmail} />
            <Button>
              <span>로그인</span>
            </Button>
            <br />
            <br />
            <InfoBox>카플랫에 문의하기 : 1833-7164</InfoBox>
          </form>
        </div>
      </SignWrap>
    </>
  );
};

export default SignIn;
