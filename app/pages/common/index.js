import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';

import { load, handleChange } from 'store/global/actions';

import AsyncDiv from '../../components/04Templates/AsyncDiv';
import Input from '../../components/01Atoms/Input';

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
      <AsyncDiv
        data={global}
        body={
          <>
            <Input
              name="title"
              onChange={e => dispatch(handleChange(e))}
              value={global.title}
            />
          </>
        }
      />
    </>
  );
};

export default Main;
