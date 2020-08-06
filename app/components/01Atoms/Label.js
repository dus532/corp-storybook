import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { H5 } from './H';

const StyledDiv = styled.div`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  height: ${({ withBG }) => (withBG ? 64 : 48)}px;
  border-top: 1px solid var(--grey100);
  border-bottom: 1px solid var(--grey100);
  display: flex;
  align-items: center;
  box-sizing: border-box;
`;

const InLabel = styled.div`
  font-size: 14px;
  box-sizing: border-box;
  margin-right: 24px;
  color: var(--grey500);
  min-width: ${({ labelWidth }) => labelWidth || 106}px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  background: var(--grey100);
  height: 100%;
`;

const Label = props => (
  <StyledDiv width={props.width} withBG={props.withBG}>
    <InLabel labelWidth={props.labelWidth}>{props.label}</InLabel>
    <H5>{props.children}</H5>
  </StyledDiv>
);

Label.propTypes = {
  width: PropTypes.number,
  withBG: PropTypes.bool,
  label: PropTypes.string,
  labelWidth: PropTypes.number,
  children: PropTypes.any,
};

export default Label;
