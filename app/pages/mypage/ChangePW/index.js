/* eslint-disable no-useless-escape */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';

import {
  Container,
  BigTitle,
  Container580,
  InfoBox,
  Input,
  ButtonBottom,
  AsyncDiv,
} from 'components';
import { actionGetMyPage, actionPutPassword } from 'stores';
import { useToast } from 'utils/hooks';

const ChangePW = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const MyPageData = useSelector(state => state.myPage);
  const adminData = useSelector(state => state.myPage.data.admin);
  const [firstEdit, isFirstEdit] = useState(true);

  const { handleSubmit, register, errors, getValues } = useForm({});

  const REG = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{1,50}).{8,12}$/;

  useEffect(() => {
    if (!window.sessionStorage.getItem('CHECK')) {
      history.goBack();
    }
    window.sessionStorage.clear();

    document.addEventListener(
      'keydown',
      () => firstEdit && isFirstEdit(false),
      { once: true },
    );
    if (!adminData) {
      dispatch(actionGetMyPage());
    }
  }, []);

  const onSubmit = data => {
    dispatch(
      actionPutPassword(
        { adminLoginId: adminData.adminLoginId, ...data },
        () => {
          history.push('/mypage');
          toast('비밀번호가 변경되었습니다', 'ok');
        },
      ),
    );
  };

  return (
    <Container>
      <BigTitle>비밀번호 변경</BigTitle>
      <AsyncDiv store={MyPageData}>
        {adminData ? (
          <Container className="box_overflow" white>
            <br />
            <br />
            <form onSubmit={handleSubmit(onSubmit)}>
              <Container580 maxWidth="372">
                <h4>아이디</h4>
                <Input value={adminData.adminLoginId} readOnly />
                <br />
                <h4>현재 비밀번호</h4>
                <Input
                  name="password"
                  ref={register}
                  type="password"
                  required
                />
                {errors.password && (
                  <h5 className="error">{errors.password.message}</h5>
                )}
                <br />
                <h4>새 비밀번호</h4>
                <Input
                  name="newPassword"
                  ref={register({
                    pattern: {
                      value: REG,
                      message:
                        '영문, 숫자, 특수문자를 조합하여 8~12자로 입력하세요',
                    },
                  })}
                  type="password"
                  required
                />
                {errors.newPassword && (
                  <h5 className="error">{errors.newPassword.message}</h5>
                )}
                <br />
                <h4>새 비밀번호 확인</h4>
                <Input
                  name="newPWCheck"
                  ref={register({
                    validate: value =>
                      value === getValues().newPassword ||
                      '비밀번호 확인이 맞지 않습니다.',
                  })}
                  type="password"
                  required
                />
                {errors.newPWCheck && (
                  <h5 className="error">{errors.newPWCheck.message}</h5>
                )}
                <InfoBox>
                  영문,숫자,특수문자를 조합하여 8~12자로 입력해주세요.
                </InfoBox>
                <br />
                <ButtonBottom
                  left="취소"
                  onClickLeft={() => {
                    history.goBack();
                  }}
                  right="저장"
                  typeRight="submit"
                  disabledRight={firstEdit}
                />
                <br />
              </Container580>
            </form>
            <br />
          </Container>
        ) : (
          '로딩중'
        )}
      </AsyncDiv>
    </Container>
  );
};

export default ChangePW;
