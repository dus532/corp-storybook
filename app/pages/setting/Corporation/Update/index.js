/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import produce from 'immer';

import { useHistory } from 'react-router-dom';

import {
  Container,
  BigTitle,
  AsyncDiv,
  Input,
  Container580,
  InputRadio,
  UserGroups,
  ButtonBottom,
} from 'components';
import {
  actionGetCorpInfo,
  actionHandleChangeCorpInfo,
  actionPutCorpInfo,
} from 'stores';

import Color from 'config/color';
import { useModal } from 'utils/hooks';
import { POST_CODE } from 'modals/constants';

const Button = styled.button`
  min-width: 120px;
  min-height: 40px;
  font-size: 0.8rem;
  border: 1px solid ${Color.LineGray};
  margin-left: 10px;
  border-radius: 5px;
`;

const Update = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const modal = useModal();

  const corpInfoStore = useSelector(state => state.info);
  const corpInfo = useSelector(state => state.info.data.corpInfo);
  const userGroups = useSelector(state => state.info.data.userGroups);

  const [data, setData] = useState({
    name: '',
    companyNumber: '',
    address: '',
    emailDomains: ['', ''],
    employeeNumberUsage: true,
    userGroupUsage: true,
    add: '',
  });

  useEffect(() => {
    if (!window.sessionStorage.getItem('CHECK')) {
      history.goBack();
    }
    window.sessionStorage.clear();
    // 리덕스에 저장된 데이터가 있으면, 저장된 데이터를 이용합니다.
    if (!corpInfo) {
      dispatch(actionGetCorpInfo());
    }
  }, []);

  useEffect(() => {
    setData({ ...data, ...corpInfo });
  }, [corpInfo]);

  const handleChange = e => {
    setData(
      produce(data, draft => {
        draft[e.target.name] = e.target.value;
      }),
    );
  };

  const handleRaidoChecked = (e, d) => {
    setData({
      ...data,
      [e.target.name]: d,
    });
  };

  const onAdd = () => {
    if (data.add) {
      const t = userGroups.concat({
        name: data.add,
        memberNumber: 0,
        isCardRegistered: false,
        changeType: 1,
      });
      dispatch(actionHandleChangeCorpInfo(`userGroups`, t));
      setData({ ...data, add: '' });
    }
  };

  const onSubmit = () => {
    const body = { corpInfo: data, userGroups };
    dispatch(
      actionPutCorpInfo(body, () => {
        history.push('/setting/corp');
      }),
    );
  };

  return (
    <Container>
      <BigTitle>기업 정보 변경</BigTitle>
      <AsyncDiv store={corpInfoStore}>
        {corpInfo && (
          <Container className="box_overflow" white>
            <Container580 noPadding>
              <div className="input">
                <h5>기업 이름</h5>
                <Input
                  name="name"
                  placeholder="이름"
                  value={data.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <h5>사업자 등록번호</h5>
                <Input
                  name="companyNumber"
                  placeholder="사업자 등록번호"
                  value={data.companyNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input">
                <h5>주소</h5>
                <Input
                  name="address"
                  placeholder="주소"
                  value={data.address}
                  onChange={handleChange}
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
                <h5>이메일 도메인1</h5>
                <Input
                  placeholder="이메일 도메인 1"
                  value={data.emailDomains[0]}
                  onChange={e => {
                    setData(
                      produce(data, draft => {
                        draft.emailDomains[0] = e.target.value;
                      }),
                    );
                  }}
                  required
                />
              </div>
              <div className="input">
                <h5>이메일 도메인2</h5>
                <Input
                  name="emailDomains[1]"
                  placeholder="이메일 도메인 2"
                  value={data.emailDomains[1] || ''}
                  onChange={e => {
                    setData(
                      produce(data, draft => {
                        draft.emailDomains[1] = e.target.value;
                      }),
                    );
                  }}
                  required
                />
              </div>
              <div className="input">
                <h5>사원 번호 사용</h5>
                <InputRadio
                  className="radio"
                  name="employeeNumberUsage"
                  id="employeeNumberUsage_yes"
                  body="네, 사용합니다."
                  onChange={e => handleRaidoChecked(e, true)}
                  checked={data.employeeNumberUsage}
                />
                <InputRadio
                  className="radio"
                  name="employeeNumberUsage"
                  id="employeeNumberUsage_no"
                  body="아니오, 사용하지 않습니다."
                  onChange={e => handleRaidoChecked(e, false)}
                  checked={!data.employeeNumberUsage}
                />
              </div>
              <div className="input">
                <h5>부서 정보 사용</h5>
                <InputRadio
                  className="radio"
                  name="userGroupUsage"
                  id="userGroupUsage_yes"
                  body="네, 사용합니다."
                  onChange={e => handleRaidoChecked(e, true)}
                  checked={data.userGroupUsage}
                />
                <InputRadio
                  className="radio"
                  name="userGroupUsage"
                  id="userGroupUsage_no"
                  body="아니오, 사용하지 않습니다."
                  onChange={e => handleRaidoChecked(e, false)}
                  checked={!data.userGroupUsage}
                />
              </div>
              <div className={!data.userGroupUsage ? 'hidden' : ''}>
                <div className="input" style={{ marginBottom: 10 }}>
                  <h5>부서 정보 등록</h5>
                  <Input
                    name="add"
                    placeholder="부서 이름"
                    onChange={handleChange}
                    onKeyDown={e =>
                      e.keyCode === 13 && e.target.value && onAdd()
                    }
                    value={data.add}
                  />
                  <Button onClick={onAdd} type="button">
                    입력
                  </Button>
                </div>
                <UserGroups type="1" edit="1" data={userGroups} />
              </div>
              <ButtonBottom
                style={{ marginTop: 60 }}
                left="취소"
                onClickLeft={() => history.push('/setting/corp')}
                right="저장"
                onClickRight={onSubmit}
              />
              <br />
              <br />
            </Container580>
          </Container>
        )}
      </AsyncDiv>
    </Container>
  );
};

export default Update;
