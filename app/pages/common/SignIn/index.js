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
} from 'components';
import { POSTSignIn, toggleFindEmail } from 'store';
import { ModalFindEmail } from 'modals';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [userData, setUserData] = useState({
    email: '',
    password: '',
    isSaved: false,
  });

  const modalsData = useSelector(state => state.modals);
  const userStore = useSelector(state => state.user);

  useEffect(() => {
    if (userStore.name) {
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

  const onSignIn = () => {
    dispatch(POSTSignIn(userData));
  };

  const modalFindEmail = () => {
    dispatch(toggleFindEmail());
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
          <div className="sign_bottom">
            <SignInput {...propsList} />
            <SignExtra {...propsList} toggleFindEmail={modalFindEmail} />
            <Button onClick={onSignIn}>
              <span>
                <FormattedMessage id="carplat-biz.signin.signin" />
              </span>
            </Button>
            <h5 className="sign_askCarplat">
              [느낌표] 나는요 오빠가 좋은걸 어떡해
            </h5>
          </div>
        </div>
      </SignWrap>
      <ModalFindEmail
        view={modalsData.findEmail}
        onClickExit={modalFindEmail}
      />
    </>
  );
};

export default SignIn;
