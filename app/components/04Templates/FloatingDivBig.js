import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import IconClose from 'components/01Atoms/IconClose';
import Color from 'config/color';

const Div = styled.div`
  top: 0px;
  left: 0px;
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-items: flex-start;
  animation: floating_div 0.25s;

  .floating_container {
    position: relative;
    top: 170px;
    width: 1172px;
    margin: 0 20px;
    box-sizing: border-box;
    background: white;
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.2);
  }

  .floating_header {
    padding: 24px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    border-bottom: 1px solid ${Color.LineGray};
  }

  h3 {
    font-weight: 700;
  }

  .floating_body {
    margin-bottom: 36px;
    width: 572px;
    min-height: 400px;
    max-height: 756px;
    overflow: auto;
    margin: 20px auto;
    text-align: left;
    font-size: 1rem;
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

  @media screen and (max-width: 768px) {
    .floating_container {
      margin: 0;
      height: 100%;
      top: 60px;
    }
    .floating_body {
      width: 100%;
      padding: 0 20px;
      height: 100%;
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
  cursor: pointer;
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
    background: rgba(0, 0, 0, 0.1);
  }
`;

const FloatingDivBig = ({ title, subtitle, body, footer, onClickExit }) => (
  <>
    <BG onClick={onClickExit} />
    <Div>
      <div className="floating_container">
        <div className="floating_header">
          <div>
            <h3>{title}</h3>
            {subtitle}
          </div>
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

FloatingDivBig.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  body: PropTypes.element,
  onClickExit: PropTypes.func,
  footer: PropTypes.element,
};

export default FloatingDivBig;
