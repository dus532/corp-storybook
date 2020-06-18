import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import IconArrow from 'components/01Atoms/IconArrow';

import Color from 'config/color';
import { useQuery } from 'utils/hooks';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  margin-top: 20px;
  justify-content: center;
`;

const Button = styled.button`
  width: 40px;
  height: 40px;
  background: ${props => (props.check ? Color.Blue : Color.White)};
  color: ${props => (props.check ? Color.White : Color.Black)};
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 900px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
  }
`;

const Pagination = ({ now, total }) => {
  const history = useHistory();
  const URL = useQuery();

  const arr = [];
  const min = Math.floor((now * 1 - 1) / 10) * 10;
  const max = Math.ceil(now / 10) * 10;

  for (let i = 0; i <= total; i += 1) {
    arr.push(i);
  }

  if (now > total) {
    URL.set('page', total);
    history.push(`${document.location.pathname}?${URL.toString()}`);
  }

  return (
    <StyledPagination>
      {now > 1 && (
        <Button
          onClick={() => {
            URL.set('page', now * 1 - 1);
            history.push(`${document.location.pathname}?${URL.toString()}`);
          }}
        >
          <IconArrow arrow="left" />
        </Button>
      )}
      {arr.map(d => {
        if (d <= max && d > min) {
          return (
            <Button
              check={now * 1 === d}
              type="button"
              onClick={() => {
                URL.set('page', d);
                history.push(`${document.location.pathname}?${URL.toString()}`);
              }}
              key={d}
            >
              {d}
            </Button>
          );
        }
        return <React.Fragment key={d} />;
      })}
      {now * 1 < total && (
        <Button
          onClick={() => {
            URL.set('page', now * 1 + 1);
            history.push(`${document.location.pathname}?${URL.toString()}`);
          }}
        >
          <IconArrow />
        </Button>
      )}
    </StyledPagination>
  );
};

Pagination.propTypes = {
  now: PropTypes.any,
  total: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export default Pagination;
