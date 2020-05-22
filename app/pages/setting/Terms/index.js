import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, BigTitle, ItemPanel, AsyncDiv } from 'components';
import { actionGetTerms } from 'stores';

const Terms = () => {
  const dispatch = useDispatch();
  const Termsdata = useSelector(state => state.terms);

  useEffect(() => {
    dispatch(actionGetTerms());
  }, []);

  return (
    <Container>
      <BigTitle>약관 및 정책</BigTitle>
      <AsyncDiv store={Termsdata}>
        <ItemPanel data={Termsdata.data.terms} board />
      </AsyncDiv>
    </Container>
  );
};

export default Terms;
