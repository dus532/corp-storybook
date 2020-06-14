import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Lottie from 'react-lottie';

import { REQUEST_SUCCESS, REQUEST_FAILURE } from 'stores/controller/constants';

import IconError from '../01Atoms/IconError';

import animationData from './loading.json';

const LoadFail = styled.div`
  width: 100%;
  background: white;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 0.9rem;
  flex-direction: column;
`;

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const AsyncDiv = ({ store, children }) => {
  if (store.status === REQUEST_SUCCESS) {
    return <>{children}</>;
  }
  if (store.status === REQUEST_FAILURE) {
    return (
      <LoadFail className="box_overflow">
        <IconError style={{ marginBottom: 8 }} />
        서버 로딩에 실패했습니다. 잠시 후 다시한번 시도해주세요.
      </LoadFail>
    );
  }
  return (
    <LoadFail className="box_overflow">
      <Lottie
        options={defaultOptions}
        height={40}
        width={40}
        isStopped={false}
      />
    </LoadFail>
  );
};

AsyncDiv.propTypes = {
  store: PropTypes.object,
  children: PropTypes.any,
};

export default AsyncDiv;
