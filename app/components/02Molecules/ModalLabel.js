import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  display: flex;
  font-size: 0.9rem;
  height: 40px;
  margin-bottom: 4px;
  align-items: center;

  .title {
    width: 100px;
    flex-shrink: 0;
    font-weight: 500;
  }

  .body {
    flex: 1;
  }
`;

const ModalLabel = ({ title, body }) => (
  <StyledDiv>
    <div className="title">{title}</div>
    <div className="body">{body}</div>
  </StyledDiv>
);

ModalLabel.propTypes = {
  title: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
};

export default ModalLabel;
