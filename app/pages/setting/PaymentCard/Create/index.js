/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import C from 'config/constants';

import {
  Container,
  BigTitle,
  Container580,
  ButtonBottom,
  Input,
  InputRadio,
  RegisterInformation,
  SegmentControl,
  RegisterBirth,
  RegisterCardForm,
  RegisterEnterCard,
  RegisterIsName,
  RegisterCardDetail,
  RegisterCardExpired,
  DropBox,
} from 'components';
import {
  actionGetUserGroupsList,
  actionPostInitialCard,
  actionPutCard,
} from 'stores';
import UserManager from 'utils/userManager';
import { useToast } from 'utils/hooks';

const useQuery = () => new URLSearchParams(useLocation().search);

const Create = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const toast = useToast();
  const isMain = useQuery().get('main') === 'true' ? '대표' : '부서';
  const userGroupId = useQuery().get('userGroupId');

  // 수정과 삭제를 구분합니다.
  const { id } = useParams();
  const status = id === 'create' ? 'CREATE' : 'UPDATE';

  const [list, setList] = useState([]);

  useEffect(() => {
    // 부서 선택 리스트를 불러오기 위함
    dispatch(
      actionGetUserGroupsList(res => setList(res.data.payload.userGroups)),
    );
  }, []);

  const { handleSubmit, register, errors } = useForm();

  const [state, setState] = useState({
    cardType: C.CARD_TYPE.COMPANY, // 개인, 법인
    registerType: C.REGISTER_TYPE.TEAM, // 대표카드, 팀별카드
    userGroupId: isMain === '부서' ? userGroupId || 0 : null,
    isNameOn: false,
  });

  const onSubmit = data => {
    const body = {
      cardId: status === 'UPDATE' ? id : null,
      corpId: UserManager().getUser().corpId,
      ...state,
      ...data,
      cardNumber: data.card1 + data.card2 + data.card3 + data.card4,
      expiration: `20${data.expirationYY}${data.expirationMM}`,
    };
    if (status === 'UPDATE' || state.userGroupId) {
      dispatch(
        status === 'CREATE'
          ? // 등록시
            actionPostInitialCard(body, () => {
              history.push('/setting/paymentcard');
              toast(`${isMain} 결제카드 등록이 완료되었습니다.`, 'ok');
            })
          : // 재등록(수정)시
            actionPutCard(
              { editType: isMain === '대표' ? 1 : 2, ...body },
              () => {
                history.push('/setting/paymentcard');
                toast(`${isMain} 결제카드 재등록이 완료되었습니다.`, 'ok');
              },
            ),
      );
    } else {
      toast('부서를 선택하세요.');
    }
  };

  return (
    <Container>
      <BigTitle>{isMain} 결제카드 등록</BigTitle>
      <Container className="box_overflow" white>
        <Container580>
          <RegisterInformation type1>
            <h2>
              새로운 {isMain} 결제카드를 {status === 'UPDATE' && '재'}
              등록하세요.
            </h2>
            {isMain} 결제카드 정보를 입력 하신 후 <span>완료</span> 버튼을
            누르세요.
          </RegisterInformation>
          <RegisterCardForm onSubmit={handleSubmit(onSubmit)}>
            <SegmentControl
              data={[
                {
                  key: C.CARD_TYPE.COMPANY,
                  body: '법인카드',
                  onClick: () =>
                    setState({ ...state, cardType: C.CARD_TYPE.COMPANY }),
                },
                {
                  key: C.CARD_TYPE.PERSONAL,
                  body: '개인카드',
                  onClick: () =>
                    setState({ ...state, cardType: C.CARD_TYPE.PERSONAL }),
                },
              ]}
              clicked={state.cardType}
            />
            <br />
            {state.cardType === C.CARD_TYPE.COMPANY && (
              <>
                <h4>법인카드에 본인 이름이 있으세요?</h4>
                <RegisterIsName>
                  <InputRadio
                    name="isNameOn"
                    id="yes"
                    body="예"
                    onChange={() => setState({ ...state, isNameOn: true })}
                    checked={state.isNameOn}
                  />
                  <InputRadio
                    name="isNameOn"
                    id="no"
                    body="아니오"
                    onChange={() => setState({ ...state, isNameOn: false })}
                    checked={!state.isNameOn}
                  />
                </RegisterIsName>
                <br />
              </>
            )}
            <h4>카드 번호를 입력하세요.</h4>
            <RegisterEnterCard>
              <Input
                name="card1"
                ref={register({ minLength: 4, maxLength: 4 })}
                placeholder="0000"
                type="tel"
                maxLength="4"
                required
              />
              <Input
                name="card2"
                ref={register({ minLength: 4, maxLength: 4 })}
                placeholder="0000"
                type="tel"
                maxLength="4"
                required
              />
              <Input
                name="card3"
                ref={register({ minLength: 4, maxLength: 4 })}
                placeholder="0000"
                type="tel"
                maxLength="4"
                required
              />
              <Input
                name="card4"
                ref={register({ minLength: 4, maxLength: 4 })}
                placeholder="0000"
                type="tel"
                maxLength="4"
                required
              />
            </RegisterEnterCard>
            {(errors.card1 || errors.card2 || errors.card3 || errors.card4) && (
              <h5 className="error">번호를 정확하게 입력하세요 ( 4자리 )</h5>
            )}
            <br />
            <RegisterCardDetail>
              <RegisterCardExpired>
                <h4>유효기간</h4>
                <div className="center">
                  <Input
                    name="expirationMM"
                    ref={register({ minLength: 2, maxLength: 2 })}
                    placeholder="MM"
                    type="tel"
                    maxLength="2"
                    required
                  />
                  <Input
                    name="expirationYY"
                    ref={register({ minLength: 2, maxLength: 2 })}
                    placeholder="YY"
                    type="tel"
                    maxLength="2"
                    required
                  />
                </div>
                {(errors.expirationMM || errors.expirationYY) && (
                  <h5 className="error">유효기간을 정확하게 입력하세요</h5>
                )}
              </RegisterCardExpired>
              <RegisterCardExpired>
                <h4>카드 비밀번호 (앞 두자리)</h4>
                <div className="center">
                  <Input
                    name="twoPasswordDigits"
                    ref={register({ minLength: 2, maxLength: 2 })}
                    placeholder="**"
                    type="tel"
                    maxLength="2"
                    autocomplete="new-password"
                    required
                  />
                  <div className="circle" />
                  <div className="circle" />
                </div>
                {errors.twoPasswordDigits && (
                  <h5 className="error">
                    비밀번호를 정확하게 입력하세요 ( 2자리 )
                  </h5>
                )}
              </RegisterCardExpired>
            </RegisterCardDetail>
            {state.cardType === C.CARD_TYPE.COMPANY && !state.isNameOn ? (
              <>
                <h4>사업자 등록번호</h4>
                <RegisterBirth>
                  <Input
                    name="companyNumber"
                    ref={register}
                    placeholder="사업자 등록번호 10자리 입력"
                    type="tel"
                    maxLength="10"
                    required
                  />
                </RegisterBirth>
              </>
            ) : (
              <>
                <h4>생년월일 (주민번호 앞 6자리)</h4>
                <RegisterBirth>
                  <Input
                    name="birthday"
                    ref={register}
                    placeholder="ex) 951018"
                    type="tel"
                    maxLength="6"
                    required
                  />
                </RegisterBirth>
              </>
            )}

            {status === 'CREATE' && (
              <>
                <h4>부서 선택</h4>
                <DropBox
                  width="50%"
                  name="userGroupId"
                  className="dropbox"
                  title="부서 선택"
                  data={[
                    { value: 0, body: '선택하세요' },
                    ...list.map(
                      l => !l.isCardRegisteded && { value: l.id, body: l.name },
                    ),
                  ]}
                  onChange={data => setState({ ...state, userGroupId: data })}
                  value={state.userGroupId}
                />
              </>
            )}
            <br />
            <br />
            <br />
            <ButtonBottom
              left="취소"
              onClickLeft={() => history.goBack()}
              right="완료"
              typeRight="submit"
            />
            <br />
            <br />
            <br />
          </RegisterCardForm>
        </Container580>
      </Container>
    </Container>
  );
};

export default Create;
