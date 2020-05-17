import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import C from 'config/constants';

import {
  ButtonBottom,
  Container580,
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
} from 'components';

import { actionPostInitialCard } from 'stores';
import UserManager from 'utils/userManager';

const RegisterCard = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { handleSubmit, register, errors } = useForm();

  const [state, setState] = useState({
    isNameOn: false,
    cardType: C.CARD_TYPE.COMPANY, // 개인, 법인
    registerType: C.REGISTER_TYPE.MAIN, // 대표카드, 팀별카드
  });

  const onSubmit = data => {
    dispatch(
      actionPostInitialCard(
        {
          page: 1,
          corpId: UserManager().getUser().coprId,
          ...state,
          ...data,
          cardNumber: data.card1 + data.card2 + data.card3 + data.card4,
          expiration: 20 + data.expirationYY + data.expirationMM,
        },
        () => history.push('/initial/payment'),
      ),
    );
  };

  // const onTest = () => {
  //   dispatch(
  //     actionRePostChargeSubscription(
  //       {
  //         corpId: UserManager().getUser().coprId,
  //         product: 1,
  //         userNumber: 2,
  //         cardId: '561f661f-48db-4c09-86e7-e51ffc786dfb',
  //         cardCorp: '[KB국민]',
  //         cardNumber: '94909400',
  //         periodicPaymentDate: 25,
  //         periodicPrice: 100,
  //         startHour: '12:00',
  //         endHour: '12:00',
  //       },
  //       () => {
  //         history.push('/home');
  //       },
  //     ),
  //   );
  // };

  return (
    <Container580>
      <RegisterInformation>
        <h2>대표 결제카드를 등록하세요.</h2>
        대표 결제카드 정보를 입력 하신 후 <span>다음</span> 버튼을 누르세요.
        <br />
        부서별로 결제카드를 등록하여 개별적으로 이용 요금 결제를 원하실 경우
        <br />
        <span className="underline">
          메뉴 &#8594; 설정 &#8594; 결제카드 관리
        </span>
        에서 부서 결제카드 등록을 설정하실 수 있습니다.
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
                autocomplete="new-password"
                type="tel"
                maxLength="2"
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
                placeholder="ex) 12312341234"
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
        <br />
        <ButtonBottom
          left="취소"
          onClickLeft={() => history.push('/initial/introduce')}
          right="다음"
          typeRight="submit"
        />
        <br />
      </RegisterCardForm>
    </Container580>
  );
};

export default RegisterCard;
