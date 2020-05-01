/* eslint-disable indent */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container, BigTitle, AsyncDiv, Input } from 'components';
import { actionGetCorpInfo } from 'stores';

const Update = () => {
  const dispatch = useDispatch();

  const corpInfoStore = useSelector(state => state.info);
  const corpInfo = useSelector(state => state.info.data.corpInfo);

  useEffect(() => {
    // 리덕스에 저장된 데이터가 있으면, 저장된 데이터를 이용합니다.
    if (!corpInfo) {
      dispatch(actionGetCorpInfo());
    }
  }, []);

  return (
    <Container>
      <BigTitle>기업 정보 변경</BigTitle>
      <AsyncDiv store={corpInfoStore}>
        <h4>기업 이름</h4>
        <Input name="card1" placeholder="0000" type="number" required />
      </AsyncDiv>
    </Container>
  );
};

export default Update;
