import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import UserManager from 'utils/userManager';

import { FloatingDiv, SubButton, ModalLabel, Input } from 'components';
import { actionPostCheckPW } from 'stores';

const CheckPW = ({ data, onClickExit }) => {
  const [state, setState] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();

  const USER = UserManager().getUser();
  const onNext = e => {
    e.preventDefault();
    dispatch(
      actionPostCheckPW({ password: state }, () => {
        history.push(data);
        onClickExit();
      }),
    );
  };

  return (
    <form onSubmit={onNext}>
      <FloatingDiv
        fullScreen
        title="비밀번호 입력"
        body={
          <>
            해당 메뉴로 진입하기 위해서 비밀번호를 입력해주세요.
            <br />
            <br />
            <ModalLabel title="아이디" body={USER.corpName} />
            <ModalLabel
              title="비밀번호"
              body={
                <Input
                  type="password"
                  onChange={e => setState(e.target.value)}
                  value={state}
                />
              }
            />
          </>
        }
        footer={
          <>
            <SubButton blue white size="small" type="submit">
              <span>확인</span>
            </SubButton>
            <SubButton white size="small" onClick={onClickExit}>
              <span>취소</span>
            </SubButton>
          </>
        }
        onClickExit={onClickExit}
      />
    </form>
  );
};

CheckPW.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.string,
};

export default CheckPW;
