import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { load } from 'store/actions/global';

import AsyncDiv from '../../components/04Templates/AsyncDiv';

const Main = () => {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.counter);

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  return (
    <>
      <Helmet title="카플랫 관리자">
        <meta name="description" content="카플랫 관리자 페이지입니다." />
      </Helmet>
      <AsyncDiv data={counter} body={<>df</>} />
    </>
  );
};

export default Main;
