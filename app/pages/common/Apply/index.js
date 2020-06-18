/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form/dist/react-hook-form.ie11';
import produce from 'immer';
import Sticky from 'react-sticky-fill';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import {
  Container,
  Input,
  InputRadio,
  DatePicker,
  ButtonBottom,
} from 'components';
import { useModal, useToast } from 'utils/hooks';
import { POST_CODE } from 'modals/constants';
import Color from 'config/color';
import moment from 'utils/moment';
import ICON_DEL from 'images/icon_delete.png';
import LogoHeader from 'components/01Atoms/LogoHeader';

const StyledHeader = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${Color.LineGray};
  align-items: center;
  background: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
`;

const Div = styled.form`
  background: white;
  min-height: 100vh;

  h3 {
    margin-top: 26px;
    margin-bottom: 8px;
    font-size: 1.4rem;
  }

  h5 {
    width: 148px;
    flex-shrink: 0;
    display: inline-block;
  }

  .input {
    height: 40px;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }

  .input > input {
    width: 220px;
  }

  .input_flex {
    display: flex;
    justify-content: space-between;
  }

  .radio {
    width: 220px;
  }

  @media screen and (max-width: 900px) {
    h5 {
      width: 100%;
    }
    .input {
      width: 100%;
      height: auto;
      margin: 10px 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
    }

    .date {
      margin-bottom: 20px;
    }

    .date > div {
      width: 100%;
    }

    .input > input {
      width: 100%;
    }

    .radio {
      margin: 10px 0;
    }

    .input_flex {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
`;

const Button = styled.button`
  min-width: 172px;
  min-height: 40px;
  font-size: 0.8rem;
  border: 1px solid ${Color.LineGray};
  margin-left: 10px;
  border-radius: 5px;

  @media screen and (max-width: 900px) {
    margin-left: auto;
  }
`;

const PartInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  box-sizing: border-box;
  background: #f7f7f7;
  border: 1px solid ${Color.LineGray};
  max-width: 676px;
  margin-left: auto;
  min-height: 60px;
  width: 100%;
  align-items: flex-start;

  .partinfo_card {
    cursor: pointer;
    align-items: center;
    font-size: 0.9rem;
    background: white;
    display: flex;
    padding: 4px 4px 4px 10px;
    margin-right: 8px;
    border-radius: 50px;
    border: 1px solid ${Color.LineGray};
    transition: 0.35s;
  }

  .partinfo_card:hover {
    background: #f1f1f1;
    transition: 0.35s;
  }

  .partinfo_del {
    margin-left: 4px;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(${ICON_DEL}) center / cover;
    opacity: 0.2;
  }
`;

const Apply = () => {
  const toast = useToast();
  const modal = useModal();
  const history = useHistory();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      productName: '프리미엄',
      workTime: 'NineToSix',
      usingEmployeeNumber: 'true',
      usingDepartment: 'true',
    },
  });

  const [data, setData] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    corpAddress: '',
    departmentNames: [],
    add: '',
  });

  const onSubmit = inputData => {
    const body = {
      ...inputData,
      ...data,
      corpAddress: data.address,
      departmentNames: `${data.departmentNames.map(dn => `${dn}`)}`,
    };

    axios
      .post(
        `https://biz-mobile-api.prod.platdev.net/action/public/subscription`,
        body,
      )
      .then(() => history.push('/apply/ok'))
      .catch(() =>
        toast(
          '오류가 발생했습니다. 반복될 경우 1833-7164 ( 카플랫 비즈 고객센터 )에 문의해주세요!',
        ),
      );
  };

  const onDelete = index => {
    setData(
      produce(draft => {
        draft.departmentNames.splice(index, 1);
      }),
    );
  };

  const handleChange = (value, name) => {
    setData(
      produce(draft => {
        draft[name] = value;
      }),
    );
  };

  const onAdd = () => {
    setData(
      produce(draft => {
        draft.departmentNames.push(draft.add);
        draft.add = '';
      }),
    );
  };

  return (
    <Div onSubmit={handleSubmit(onSubmit)}>
      <Sticky>
        <StyledHeader>
          <Container
            style={{ height: 60, display: 'flex', alignItems: 'center' }}
          >
            <LogoHeader />
          </Container>
        </StyledHeader>
      </Sticky>
      <br />
      <br />
      <Container width="864">
        <h2>카플랫 기업 카셰어링 가입 신청</h2>
        <hr />
        <h3>구독 상품 선택</h3>
        <div className="input">
          <h5>구독 상품</h5>
          <InputRadio
            className="radio"
            name="productName"
            id="products_premium"
            body="프리미엄"
            value="프리미엄"
            inputRef={register}
          />
          <InputRadio
            className="radio"
            name="productName"
            id="products_standard"
            body="스탠다드"
            value="스탠다드"
            inputRef={register}
          />
          <InputRadio
            className="radio"
            name="productName"
            id="products_basic"
            body="베이직"
            value="베이직"
            inputRef={register}
          />
        </div>
        <div className="input">
          <h5>동시 구독 인원</h5>
          <Input
            style={{ textAlign: 'right' }}
            name="concurrentUserCount"
            placeholder="명"
            type="number"
            inputMode="numeric"
            ref={register}
            required
          />
        </div>
        <div className="input date">
          <h5>서비스 시작일</h5>
          <DatePicker
            width={220}
            className="datepicker"
            value={new Date(data.startDate)}
            onChange={d =>
              handleChange(moment(d).format('YYYY-MM-DD'), 'startDate')
            }
          />
        </div>
        <div className="input">
          <h5>업무 시간 지정</h5>
          <InputRadio
            className="radio"
            name="workTime"
            id="8to5"
            body="오전 8시 ~ 오후 5시"
            value="EightToFive"
            inputRef={register}
          />
          <InputRadio
            className="radio"
            name="workTime"
            id="9to6"
            body="오전 9시 ~ 오후 6시"
            value="NineToSix"
            inputRef={register}
          />
          <InputRadio
            className="radio"
            name="workTime"
            id="10to7"
            body="오전 10시 ~ 오후 7시"
            value="TenToSeven"
            inputRef={register}
          />
        </div>
        <br />
        <h3>기업 정보 입력</h3>
        <div className="input_flex">
          <div className="input">
            <h5>기업 이름</h5>
            <Input name="corpName" ref={register} required />
          </div>
          <div className="input">
            <h5>사업자 등록번호</h5>
            <Input
              name="corpNumber"
              type="number"
              inputMode="numeric"
              ref={register}
              required
            />
          </div>
        </div>
        <div className="input">
          <h5>주소</h5>
          <Input
            style={{ width: '100%' }}
            name="address"
            placeholder="주소"
            value={data.address}
            onChange={e => handleChange(e.target.value, e.target.name)}
            required
          />
          <Button
            type="button"
            onClick={() => modal(POST_CODE, { data, setData })}
          >
            우편 번호 검색
          </Button>
        </div>
        <div className="input">
          <h5>기업 담당자 이름</h5>
          <Input name="corpManagerName" ref={register} required />
        </div>
        <div className="input_flex">
          <div className="input">
            <h5>담당자 이메일 주소</h5>
            <Input
              name="corpManagerEmail"
              type="email"
              ref={register}
              required
            />
          </div>
          <div className="input">
            <h5>담당자 전화번호</h5>
            <Input
              name="corpManagerPhoneNumber"
              type="number"
              inputMode="numeric"
              ref={register}
              required
            />
          </div>
        </div>
        <div className="input_flex">
          <div className="input">
            <h5>이메일 도메인1</h5>
            <Input name="corpDomain1" ref={register} required />
          </div>
          <div className="input">
            <h5>이메일 도메인2</h5>
            <Input name="corpDomain2" ref={register} />
          </div>
        </div>
        <div className="input">
          <h5>사원 번호 사용</h5>
          <InputRadio
            className="radio"
            name="usingEmployeeNumber"
            id="useEmployeeNumber_yes"
            body="네, 사용합니다."
            value
            inputRef={register}
            required
          />
          <InputRadio
            className="radio"
            name="usingEmployeeNumber"
            id="useEmployeeNumber_no"
            body="아니오, 사용하지 않습니다."
            value={false}
            inputRef={register}
            required
          />
        </div>
        <div className="input">
          <h5>부서 정보 사용</h5>
          <InputRadio
            className="radio"
            name="usingDepartment"
            id="useTeamInfo_yes"
            body="네, 사용합니다."
            value
            inputRef={register}
            required
          />
          <InputRadio
            className="radio"
            name="usingDepartment"
            id="useTeamInfo_no"
            body="아니오, 사용하지 않습니다."
            value={false}
            inputRef={register}
            required
          />
        </div>
        <div className="input" style={{ marginBottom: 10 }}>
          <h5>부서 정보 등록</h5>
          <Input
            style={{ width: '100%' }}
            name="add"
            placeholder="부서 이름"
            onChange={e => handleChange(e.target.value, e.target.name)}
            onKeyDown={e => {
              if (e.keyCode === 13 && e.target.value) {
                e.preventDefault();
                onAdd();
              }
            }}
            value={data.add}
            maxLength={10}
          />
          <Button type="button" onClick={onAdd}>
            부서 정보 입력
          </Button>
        </div>
        <PartInfo>
          {data.departmentNames.map((d, index) => (
            <button
              key={index}
              type="button"
              className="partinfo_card"
              onClick={() => onDelete(index)}
            >
              {d} <div className="partinfo_del" />
            </button>
          ))}
        </PartInfo>
        <br />
        <br />
        <br />
        <ButtonBottom typeRight="submit" right="가입 신청하기" />
        <br />
        <br />
        <br />
      </Container>
    </Div>
  );
};

export default Apply;
