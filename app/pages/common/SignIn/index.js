import React, { useEffect } from 'react';
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
import {
  POSTSignIn,
  actionSignHandleChange,
  toggleFindEmail,
  toggleSending,
} from 'store';
import { ModalFindEmail } from 'modals';

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalsData = useSelector(state => state.modals);
  const userData = useSelector(state => state.user);

  const handleChange = data => {
    dispatch(actionSignHandleChange(data.target));
  };

  const handleCheckBoxChange = data => {
    dispatch(actionSignHandleChange(data.target, 'checkbox'));
  };

  const onSignIn = () => {
    dispatch(toggleSending());
    dispatch(
      POSTSignIn(
        userData,
        () => {
          dispatch(toggleSending());
          // history.push('/home');
        },
        () => {
          dispatch(toggleSending());
        },
      ),
    );
  };

  const onToggleFindEmail = () => {
    dispatch(toggleFindEmail());
  };

  const propsList = { userData, handleChange, handleCheckBoxChange };

  useEffect(() => {
    if (userData.name) {
      history.push('/home');
    }
  }, []);

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
            <SignExtra {...propsList} toggleFindEmail={onToggleFindEmail} />
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
        onClickExit={onToggleFindEmail}
      />
    </>
  );
};

export default SignIn;
