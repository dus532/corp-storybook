import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Wrap = styled.div`
  width: 100%;
  min-height: 400px;
  height: 100vh;

  hr {
    margin: 12px 0;
    padding: 0;
    width: 100%;
    height: 1px;
    border: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const Container = styled.div`
  width: 996px;
  height: 100%;
  margin: 0 auto;
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;

  .box {
    margin-right: 36px;
    margin-bottom: 36px;
  }
`;

export const H2 = styled.h2`
  font-size: 52px;
  font-weight: 900;
  margin: 0;
  padding: 0;
`;

export const H4 = styled.h5`
  font-size: 18px;
  font-weight: 500;
  margin: 0 0 8px;
  padding: 0;
`;

export const H5 = styled.h5`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  padding: 0;
`;

export const Tag = styled.div`
  background: #dcdee1;
  display: inline-block;
  padding: 4px 12px;
  border-radius: 5px;
  border: 1px solid #b9bcc1;
  font-size: 12px;
  margin-bottom: 20px;
  color: #525561;
  font-weight: 700;
`;

export const Header = ({ title, subtitle }) => (
  <>
    <H2>
      <span aria-label="img" role="img">
        🚀
      </span>{' '}
      {title}
    </H2>
    <H5>{subtitle}</H5>
    <hr />
  </>
);

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export const Info = ({ title, subtitle }) => (
  <>
    <H4>
      <span aria-label="img" role="img">
        💎
      </span>{' '}
      {title}
    </H4>
    <H5>{subtitle}</H5>
  </>
);

Info.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

const ExWrap = styled.div`
  width: 375px;
  padding: 20px;
  min-height: ${({ height }) => (height ? `${height}px` : '200px')};
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;

  .child {
    margin: 0 auto;
  }
`;

export const ExBox = ({ h, children }) => (
  <ExWrap height={h}>
    <div className="child">{children}</div>
  </ExWrap>
);

ExBox.propTypes = {
  h: PropTypes.string,
  children: PropTypes.node,
};
