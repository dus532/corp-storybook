/* eslint-disable react/no-danger */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useReactToPrint } from 'react-to-print';
import { useDispatch } from 'react-redux';

import IconClose from 'components/01Atoms/IconClose';
import SubButton from 'components/01Atoms/SubButton';
import Color from 'config/color';
import ICON_MAIL from 'images/icon_mail.png';
import ICON_PRINTER from 'images/icon_printer.png';
import { actionPostSendStatement } from 'stores';
import { useToast } from 'utils/hooks';

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
    margin-bottom: 4px;
  }

  .floating_print {
    background: #f7f7f7;
    width: 100%;
    min-height: 40vh;
    max-height: 70vh;
    height: 100%;
    overflow: auto;
  }

  .print {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    transform: scale(0.8);
  }

  .icon_print {
    width: 24px;
    display: inline-block;
    height: 24px;
    margin-right: 8px;
    background: url(${ICON_PRINTER}) center / cover no-repeat;
  }

  .icon_mail {
    width: 24px;
    display: inline-block;
    height: 24px;
    margin-right: 8px;
    background: url(${ICON_MAIL}) center / cover no-repeat;
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
    .print {
      transform: scale(0.6);
    }
    .floating_container {
      margin: 0;
      width: 100%;
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
  rentalID,
  body,
  print,
  html,
  footer,
  leftButton,
  onClickExit,
}) => {
  const makeHTML = () => ({ __html: html });
  const dispatch = useDispatch();
  const toast = useToast();

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
            <div className="floating_header_flex">
              <h3>{title}</h3>
              {subtitle}
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
              }}
            >
              <button
                style={{ display: 'flex' }}
                type="button"
                onClick={onClickExit}
              >
                <IconClose />
              </button>
              <div>
                {print && (
                  <>
                    <SubButton
                      style={{ width: 172, marginTop: 4, marginRight: 8 }}
                      onClick={handlePrint}
                      size="small"
                      white
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="icon_print" /> 출력하기
                      </div>
                    </SubButton>
                    <SubButton
                      style={{ width: 172, marginTop: 4 }}
                      onClick={() =>
                        dispatch(
                          actionPostSendStatement(rentalID, () => {
                            toast('이메일이 발송되었습니다', 'ok');
                          }),
                        )
                      }
                      size="small"
                      white
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="icon_mail" /> 이메일 보내기
                      </div>
                    </SubButton>
                  </>
                )}
                {leftButton}
              </div>
            </div>
          </div>
          {print && (
            <div className="floating_print">
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
  rentalID: PropTypes.string,
  subtitle: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  print: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  leftButton: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClickExit: PropTypes.func,
  footer: PropTypes.element,
};

export default FloatingDivBig;
