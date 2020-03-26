import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { load } from 'store/global/actions';

import { AsyncDiv } from 'components';

const Main = () => {
  const dispatch = useDispatch();
  const global = useSelector(state => state.global);

  useEffect(() => {
    dispatch(load());
  }, [dispatch]);

  return (
    <>
      <Helmet title="카플랫 관리자">
        <meta name="description" content="카플랫 관리자 페이지입니다." />
      </Helmet>
      <AsyncDiv data={global} body={<></>} />
    </>
  );
};

export default Main;
