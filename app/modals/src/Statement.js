import React from 'react';
import PropTypes from 'prop-types';

import { FloatingDivBig } from 'components';

const Page = ({ data }) => {
  console.log(data);
  const label1 = (label, body) => (
    <div style={{ display: 'flex', fontSize: '0.9rem', marginBottom: 8 }}>
      <div style={{ width: 120, color: '#525561', fontWeight: 300 }}>
        {label}
      </div>
      <div style={{ fontWeight: 500 }}>{body}</div>
    </div>
  );

  return (
    <div style={{ width: 600, padding: 32 }}>
      <div
        style={{
          width: '100%',
          paddingBottom: 8,
          fontSize: '1.2rem',
          fontWeight: 700,
          borderBottom: `2px solid black`,
          marginBottom: 8,
        }}
      >
        이용정보
      </div>
      {label1('운전자', '이광일')}
      {label1('이용차량', '차량 모델(연료타입)')}
      {label1('차량번호', '12하 3456')}
      {label1('이용시간', '총 0시간')}
      {label1('대여', 'YYYY-MM-DD')}
      {label1('반납', 'YYYY-MM-DD')}
    </div>
  );
};

const Statement = ({ onClickExit, data }) => (
  <FloatingDivBig
    title={data.title}
    subtitle={data.subtitle}
    print={<Page />}
    onClickExit={onClickExit}
  />
);

Page.propTypes = {
  data: PropTypes.object,
};

Statement.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.object,
};

export default Statement;
