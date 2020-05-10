import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import IconClose from 'components/01Atoms/IconClose';

const Div = styled.div`
  top: 0px;
  left: 0px;
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-items: center;
  animation: floating_div 0.25s;

  .floating_container {
    padding: 24px;
    width: 428px;
    margin: 0 20px;
    box-sizing: border-box;
    background: white;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  }

  .floating_header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  h3 {
    font-weight: 700;
  }

  .floating_body {
    margin-bottom: 36px;
    text-align: left;
    font-size: 0.9rem;
    line-height: 1.6rem;
  }

  .floating_footer {
    display: flex;

    * {
      margin-right: 8px;
    }

    *:last-child {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .floating_container {
      width: 100%;
      max-width: 428px;
    }

    .floating_big {
      width: 100%;
      max-width: 100%;
      margin: 0;
      height: 100%;
    }

    .floating_big > .floating_header {
      flex-direction: column;
    }

    .floating_big > .floating_header > h3 {
      order: 2;
    }

    .floating_big > .floating_header > button {
      order: 1;
      text-align: right;
    }
  }

  @keyframes floating_div {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const BG = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  top: 0;
  left: 0;
  height: 100%;
  animation: bg 0.5s;

  @keyframes bg {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    background: rgba(0, 0, 0, 0.4);
  }
`;

const FloatingDiv = ({ title, body, footer, onClickExit, fullScreen }) => (
  <>
    <BG onClick={onClickExit} />
    <Div>
      <div className={`${fullScreen ? 'floating_big' : ''} floating_container`}>
        <div className="floating_header">
          <h3>{title}</h3>
          <button type="button" onClick={onClickExit}>
            <span>
              <IconClose />
            </span>
          </button>
        </div>
        <div className="floating_body">{body}</div>
        <div className="floating_footer">{footer}</div>
      </div>
    </Div>
  </>
);

FloatingDiv.propTypes = {
  title: PropTypes.string,
  body: PropTypes.element,
  onClickExit: PropTypes.func,
  footer: PropTypes.element,
  fullScreen: PropTypes.bool,
};

export default FloatingDiv;
