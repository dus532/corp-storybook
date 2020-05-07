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
  InfoBox,
} from 'components';
import { actionPostSignIn } from 'stores';
import { SIGN_FIND_EMAIL } from 'modals/constants';
import { useToast, useModal } from 'utils/hooks';
import UserManager from 'utils/userManager';

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
    if (userData.adminLoginId && userData.password) {
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
          <h2 className="sign_title">
            프리미엄 기업 카셰어링 서비스,
            <br /> 카플랫 비즈니스에 오신 것을 환영합니다.
          </h2>
          <form className="sign_bottom" onSubmit={handleSubmit}>
            <SignInput {...propsList} />
            <SignExtra {...propsList} toggleFindEmail={modalFindEmail} />
            <Button>
              <span>
                <FormattedMessage id="carplat-biz.signin.signin" />
              </span>
            </Button>
            <br />
            <br />
            <Button
              type="button"
              onClick={() => {
                UserManager().setUser({
                  corpId: 'b9360949-c6b4-4e49-833f-ae5b86bb8d2b',
                  accessToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIiwicmFpZGVhIl0sInNvSWQiOiJjYXJwbGF0IiwidXNlcl9uYW1lIjoiZGI1OWIwMGMtNmE5YS00ZjAyLTk0YWItMzVlMDBiMjk3MDI1Iiwic2NvcGUiOlsicmVhZCJdLCJleHAiOjE2MDQyMDAyOTksImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiOTZlZTYzNjQtYmU0OC00YzkxLWEyMzQtNTgyMzcyNmFhNDk3IiwiY2xpZW50X2lkIjoiY2FycGxhdCJ9.u4ZKetnrJebeJeBd1IKiMlMh5OHqCmseF7KX1deo4eY',
                  refreshToken:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsib2F1dGgyLXJlc291cmNlIiwicmFpZGVhIl0sInNvSWQiOiJjYXJwbGF0IiwidXNlcl9uYW1lIjoiZGI1OWIwMGMtNmE5YS00ZjAyLTk0YWItMzVlMDBiMjk3MDI1Iiwic2NvcGUiOlsicmVhZCJdLCJhdGkiOiI5NmVlNjM2NC1iZTQ4LTRjOTEtYTIzNC01ODIzNzI2YWE0OTciLCJleHAiOjE2MjAxODQyOTksImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwianRpIjoiNjc2N2E5OWYtYWI0YS00YmFmLWExZmMtNzFmOTAyZjQ3MTZlIiwiY2xpZW50X2lkIjoiY2FycGxhdCJ9.sfzWrymg69yOl5MluPjkSWyiQundQrXflwCdDuB3wTs',
                });
              }}
            >
              <span>임시 로그인</span>
            </Button>
            <InfoBox>카플랫에 문의하기 : 1544-7198</InfoBox>
          </form>
        </div>
      </SignWrap>
    </>
  );
};

export default SignIn;
