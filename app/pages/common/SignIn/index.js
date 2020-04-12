import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  SignWrap,
  SignInput,
  SignExtra,
  Button,
  Logo,
  NewLine,
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
    email: '',
    emailError: '',
    password: '',
    passwordError: '',
    isSaved: false,
  });

  const userStore = useSelector(state => state.user);

  useEffect(() => {
    if (userStore.data) {
      history.push('/home');
    }
  }, [userStore]);

  const handleChange = (e, type) => {
    if (type === 'checkbox') {
      setUserData({ ...userData, isSaved: e.target.checked });
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (userData.email && userData.password) {
      dispatch(actionPostSignIn(userData));
    } else {
      toast('빈칸을 채워주세요.');
    }
  };

  const modalFindEmail = () => {
    modal(SIGN_FIND_EMAIL);
  };

  const propsList = { userData, handleChange };

  return (
    <>
      <SignWrap>
        <div className="sign_container">
          <Logo />
          <h2>
            <FormattedMessage id="carplat-biz.signin.body">
              {txt => <NewLine data={txt} />}
            </FormattedMessage>
          </h2>
          <form className="sign_bottom" onSubmit={handleSubmit}>
            <SignInput {...propsList} />
            <SignExtra {...propsList} toggleFindEmail={modalFindEmail} />
            <Button>
              <span>
                <FormattedMessage id="carplat-biz.signin.signin" />
              </span>
            </Button>
            <InfoBox>카플랫에 문의하기 : 1544-7198</InfoBox>
          </form>
        </div>
      </SignWrap>
    </>
  );
};

export default SignIn;
