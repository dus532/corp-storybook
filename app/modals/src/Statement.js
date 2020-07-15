/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import moment from 'utils/moment';
import { actionGetRentalStatement } from 'stores';
import { FloatingDivBig } from 'components';
import { useToast } from 'utils/hooks';
import toChangeMoney from 'utils/toChangeMoney';
import { NormalizeData } from 'utils/regData';

const Label1 = ({ label, body }) => (
  <div style={{ display: 'flex', fontSize: '0.9rem', marginBottom: 8 }}>
    <div style={{ width: 120, color: '#525561', fontWeight: 400 }}>{label}</div>
    <div style={{ fontWeight: 500 }}>{body}</div>
  </div>
);

Label1.propTypes = {
  label: PropTypes.string,
  body: PropTypes.any,
};

const Label2 = ({ label, body }) => (
  <div
    style={{
      display: 'flex',
      fontSize: '0.9rem',
      marginBottom: 8,
      justifyContent: 'space-between',
    }}
  >
    <div style={{ width: 120, color: '#525561', fontWeight: 400 }}>{label}</div>
    <div style={{ fontWeight: 500 }}>{body}</div>
  </div>
);

Label2.propTypes = {
  label: PropTypes.string,
  body: PropTypes.any,
};

// JUW00000219
const Label3 = ({ date, price, link, billData }) => (
  <div
    style={{
      display: 'flex',
      fontSize: '0.9rem',
      marginBottom: 8,
      justifyContent: 'space-between',
    }}
  >
    <div style={{ width: 280, display: 'flex', flexDirection: 'column' }}>
      <div style={{ fontSize: `0.9rem`, fontWeight: 400 }}>
        {moment.unix(date).format('YYYY/MM/DD')} 결제
      </div>
      <div style={{ color: `#525561`, fontSize: `0.6rem` }}>
        {NormalizeData('cardType', billData.cardType)} /{' '}
        {NormalizeData('cardCorp', billData.cardCorp)} /{' '}
        {NormalizeData('cardNumber', billData.cardNumber)}
      </div>
    </div>
    <div
      style={{
        flex: 1,
        fontWeight: 700,
        textAlign: 'right',
        marginRight: 24,
      }}
    >
      {toChangeMoney(price)}
    </div>
    <a
      style={{
        width: 80,
        height: 32,
        background: '#2946b0',
        color: 'white',
        fontSize: `0.8rem`,
        lineHeight: '32px',
        textAlign: 'center',
        borderRadius: 4,
      }}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      영수증 발급
    </a>
  </div>
);

Label3.propTypes = {
  date: PropTypes.number,
  price: PropTypes.number,
  link: PropTypes.string,
  billData: PropTypes.any,
};

const Page = ({ data }) => {
  if (data && data !== 'loading') {
    return (
      <div style={{ width: 600, padding: 32, background: 'white' }}>
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
        <Label1 label="운전자" body={data.rental.employeeName} />
        <Label1 label="이용차량" body={data.rental.carName} />
        <Label1 label="차량번호" body={data.rental.carNumber} />
        <Label1 label="이용시간" body={`총 ${data.rental.usagePeriod} 시간`} />
        <Label1
          label="대여"
          body={moment.unix(data.rental.startDate).format(`MM/DD (ddd) HH:mm`)}
        />
        <Label1
          label="반납"
          body={moment.unix(data.rental.endDate).format(`MM/DD (ddd) HH:mm`)}
        />
        <br />
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
          요금상세
        </div>
        <Label2
          label="이용료"
          body={toChangeMoney(data.totalAmount, 'en', '0 원')}
        />
        <Label2 label="하이패스" body="0 원" />
        <Label2
          label="환불금액"
          body={toChangeMoney(data.totalCancelAmount, 'en', '0 원')}
        />
        <hr style={{ margin: '10px 0' }} />
        <div
          style={{
            display: 'flex',
            fontSize: '1.1rem',
            marginBottom: 8,
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: 120, color: '#000000', fontWeight: 500 }}>
            총 금액
          </div>
          <div style={{ fontWeight: 500, color: '#2946be' }}>
            {toChangeMoney(data.totalAmount, 'en', '0 원')}
          </div>
        </div>
        <br />
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
          결제내역
        </div>
        {data.chargeItems.map((d, index) => (
          <React.Fragment key={index}>
            <Label3
              date={d.paidAt}
              price={d.amount}
              link={`https://npg.nicepay.co.kr/issue/CheckCardInfo.do?TID=${
                d.pgTid
              }`}
              billData={data}
            />
          </React.Fragment>
        ))}
        <br />
        <hr style={{ margin: '10px 0' }} />
        <br />
        <Label1 label="법인명" body="휴맥스모빌리티(주)" />
        <Label1 label="사업자등록번호" body="559-81-00291" />
        <Label1
          label="사업장소재지"
          body="경기도 성남시 분당구 황새울로 216 (수내동, 휴맥스빌리지)"
        />
      </div>
    );
  }
  return <></>;
};

const Statement = ({ onClickExit, data }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [statementData, setData] = useState('loading');

  useEffect(() => {
    dispatch(actionGetRentalStatement(data, res => setData(res.data.payload)));
  }, []);

  if (!statementData) {
    toast('데이터가 없거나, 서버 통신에 실패했습니다.');
  }

  return (
    <FloatingDivBig
      title="이용내역서"
      subtitle={`예약번호 : ${data}`}
      rentalID={data}
      print={<Page data={statementData} />}
      onClickExit={onClickExit}
    />
  );
};

Page.propTypes = {
  data: PropTypes.any,
};

Statement.propTypes = {
  onClickExit: PropTypes.func,
  data: PropTypes.any,
};

export default Statement;
