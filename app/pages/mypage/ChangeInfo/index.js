import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';

import {
  Container,
  BigTitle,
  Container580,
  Input,
  ButtonBottom,
  AsyncDiv,
} from 'components';
import { actionGetMyPage, actionPutAdminInfo } from 'stores';
import { useToast } from 'utils/hooks';

const ChangeInfo = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();

  const MyPageData = useSelector(state => state.myPage);
  const adminData = useSelector(state => state.myPage.data.admin);
  const [firstEdit, isFirstEdit] = useState(true);

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

  const { handleSubmit, register, errors } = useForm({
    defaultValues: adminData,
  });

  const onSubmit = data => {
    dispatch(
      actionPutAdminInfo({ uuid: adminData.adminLoginId, ...data }, () => {
        history.push('/mypage');
        toast('관리자 정보가 변경되었습니다', 'ok');
      }),
    );
  };

  return (
    <Container>
      <BigTitle>관리자 정보 변경</BigTitle>
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
                <h4>관리자 이름</h4>
                <Input name="name" ref={register} required />
                <br />
                <h4>관리자 전화번호</h4>
                <Input
                  name="phoneNumber"
                  type="tel"
                  ref={register({
                    pattern: {
                      value: /^[0-9]{3,13}$/,
                      message: '전화번호가 맞지 않습니다.',
                    },
                  })}
                  required
                />
                {errors.phoneNumber && (
                  <h5 className="error">{errors.phoneNumber.message}</h5>
                )}
                <br />
                <h4>이메일 주소</h4>
                <Input
                  name="email"
                  ref={register({
                    pattern: {
                      value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                      message: '이메일 형식에 맞지 않습니다.',
                    },
                  })}
                  required
                />
                {errors.email && (
                  <h5 className="error">{errors.email.message}</h5>
                )}
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
              </Container580>
            </form>
            <br />
            <br />
          </Container>
        ) : (
          '로딩중'
        )}
      </AsyncDiv>
    </Container>
  );
};

export default ChangeInfo;
