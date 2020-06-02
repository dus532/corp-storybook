/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';

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
  align-items: center;
  animation: floating_div 0.25s;
  z-index: 99;

  .floating_container {
    position: relative;
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
    border-bottom: 1px solid ${Color.LineGray};
  }

  h3 {
    font-weight: 700;
  }

  .floating_print {
    background: #f7f7f7;
    width: 100%;
    min-height: 40vh;
    max-height: 70vh;
    height: 100%;
  }

  .print {
    background: white;
    margin: 0 auto;
    transform: scale(0.8);
  }

  .floating_body {
    margin-top: 20px;
    margin-bottom: 36px;
    width: 572px;
    min-height: 40vh;
    height: 100%;
    max-height: 70vh;
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
      opacity: 0.5;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 900px) {
    .floating_container {
      margin: 0;
      height: 100%;
      top: 60px;
      display: flex;
      flex-direction: column;
    }
    .floating_body {
      width: 100%;
      padding: 0 20px 120px;
      overflow: auto;
    }
  }
`;

const BG = styled.div`
  overflow: hidden;
  position: fixed;
  background: rgba(0, 0, 0, 0.1);
  width: 100%;
  top: 0;
  left: 0;
  height: 110vh;
  cursor: pointer;
  animation: bg 0.5s;
  z-index: 99;

  @keyframes bg {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 900px) {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const PrintPage = ({ data, pageRef }) => <div ref={pageRef}>{data}</div>;

PrintPage.propTypes = {
  data: PropTypes.any,
  pageRef: PropTypes.any,
};

const FloatingDivBig = ({
  title,
  subtitle,
  body,
  print,
  html,
  footer,
  leftButton,
  onClickExit,
}) => {
  const makeHTML = () => ({ __html: html });

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    const y = window.scrollY;
    document.body.style.overflow = 'hidden';
    if (document.body.clientWidth < 768) {
      document.body.style.position = 'fixed';
    } else {
      document.body.style.paddingRight = '17px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.position = 'unset';
      document.body.style.paddingRight = '0px';
      window.scrollTo(0, y);
    };
  }, []);

  return (
    <>
      <BG onClick={onClickExit} />
      <Div>
        <div className="floating_container">
          <div className="floating_header">
            <div>
              <h3>{title}</h3>
              {subtitle}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button
                style={{ display: 'flex' }}
                type="button"
                onClick={onClickExit}
              >
                <IconClose />
              </button>
              <div>{leftButton}</div>
            </div>
          </div>
          {print && (
            <div className="floating_print">
              <button onClick={handlePrint} type="button">
                프린트
              </button>
              <div className="print">
                <PrintPage pageRef={componentRef} data={print} />
              </div>
            </div>
          )}
          {body && <div className="floating_body">{body}</div>}
          {html && (
            <div
              className="floating_body html"
              dangerouslySetInnerHTML={makeHTML()}
            />
          )}
          <div className="floating_footer">{footer}</div>
        </div>
      </Div>
    </>
  );
};

FloatingDivBig.propTypes = {
  html: PropTypes.any,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  print: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  leftButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClickExit: PropTypes.func,
  footer: PropTypes.element,
};

export default FloatingDivBig;
