/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Color from 'config/color';
import DBIMG from 'images/icon_dropbox.png';

import IconClose from './IconClose';

const StyledDropBox = styled.div`
  width: 172px;
  height: 40px;
  display: inline-block;
  vertical-align: middle;

  input {
    text-indent: 8px;
    width: 100%;
    height: 100%;
    cursor: pointer;
    border: solid 1px #eee;
    font-size: 0.9rem;
    background: white url(${DBIMG}) right / 24px 24px no-repeat;
  }

  input:read-only {
    color: black;
  }

  @media screen and (max-width: 900px) {
    width: 48%;
  }
`;

const Select = styled.div`
  position: relative;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  z-index: 3;
  animation: opacity 0.25s;
  border: solid 1px #d6d6d6;
  max-height: 300px;
  overflow: auto;

  .box {
    text-indent: 8px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: white;
    cursor: pointer;
    font-size: 0.9rem;
    z-index: 2;
  }

  .box:hover {
    background: ${Color.SubGray};
  }

  .bg {
    z-index: 1;
    display: none;
  }

  .header {
    display: none;
  }

  @media screen and (max-width: 900px) {
    display: flex;
    position: fixed;
    overflow: none;
    width: 100%;
    max-height: 100%;
    height: 100%;
    top: 0;
    left: 0;
    justify-content: center;
    align-items: center;

    .close {
      cursor: pointer;
    }

    .header {
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h4 {
      font-weight: 700;
    }

    .select {
      width: 328px;
      background: white;
      min-height: 300px;
      height: 70vh;
      display: block;
      z-index: 2;
      box-sizing: border-box;
      max-height: 518px;
      overflow: auto;
    }

    .box {
      padding: 0 16px;
      position: relative;
      width: 100%;
      box-sizing: border-box;
      box-shadow: none;
      height: 56px;
      line-height: 56px;
    }

    .bg {
      background: rgba(0, 0, 0, 0.2);
      width: 100%;
      height: 100%;
      display: block;
      position: fixed;
      top: 0;
      left: 0;
    }
  }
`;

const DropBox = ({
  data,
  name,
  title,
  value = 1,
  className,
  onChange,
  width,
  inputRef,
}) => {
  const [viewBox, setViewBox] = useState(false);
  const iRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (iRef.current && !iRef.current.contains(event.target)) {
        setViewBox(false);
      }
    }

    if (document.body.clientWidth < 700) {
      if (viewBox) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [iRef, viewBox]);

  return (
    <StyledDropBox ref={iRef} style={{ width }} className={className}>
      <input
        ref={inputRef}
        name={name}
        readOnly
        value={data.filter(d => d.value === value)[0].body}
        onClick={() => {
          setViewBox(!viewBox);
        }}
      />
      {viewBox && (
        <Select>
          <div className="select">
            <div className="header">
              <h4>{title}</h4>
              <IconClose
                className="close"
                onClick={() => {
                  setViewBox(false);
                }}
              />
            </div>
            {data.map(
              d =>
                d && (
                  <div
                    key={d.value}
                    role="button"
                    tabIndex={0}
                    className="box"
                    onClick={() => {
                      setViewBox(false);
                      onChange(d.value);
                    }}
                  >
                    {d.body && d.body}
                  </div>
                ),
            )}
          </div>
          <div className="bg" />
        </Select>
      )}
    </StyledDropBox>
  );
};

DropBox.propTypes = {
  width: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.string,
  inputRef: PropTypes.any,
  data: PropTypes.array,
  name: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

export default DropBox;
