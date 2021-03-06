import C from './constants';

const F = {
  // 카드 타입
  cardType: [
    { value: C.CARD_TYPE.PERSONAL, body: '개인카드' },
    { value: C.CARD_TYPE.COMPANY, body: '법인카드' },
  ],

  // 사원관리
  licenseType: [
    { value: C.LICENSE_TYPE.ALL, body: '전체 면허증' },
    { value: C.LICENSE_TYPE.REGISTERD, body: '등록완료' },
    { value: C.LICENSE_TYPE.NOT_REGISTERD, body: '미인증' },
  ],

  // 예약관리
  rentalStatus: [
    { value: C.RENATL_STATUS.ALL, body: '전체 예약' },
    { value: C.RENATL_STATUS.CAR_RESERVATION, body: '차량 예약' },
    { value: C.RENATL_STATUS.CAR_RENTAL, body: '차량 대여' },
    { value: C.RENATL_STATUS.RENTAL_CANCEL, body: '예약 취소' },
    { value: C.RENATL_STATUS.RETURN_DELAY, body: '반납 지연' },
    { value: C.RENATL_STATUS.COMPLETE, body: '이용 완료' },
  ],

  rentalPuropose: [
    { value: 0, body: '전체 목적' },
    { value: C.PURPOSE.OUTSIDE, body: '외근' },
    { value: C.PURPOSE.BUSINESS_TRIP, body: '출장' },
    { value: C.PURPOSE.INHOUSE_EVENT, body: '사내 행사' },
  ],

  // 결제내역
  PaymentItem: [
    { value: C.PAYMENT_ITEM.ALL, body: '전체 구독' },
    { value: C.PAYMENT_ITEM.RENTAL_FEE, body: '정기구독' },
    { value: C.PAYMENT_ITEM.EXTRA_FEE, body: '추가구독' },
    { value: C.PAYMENT_ITEM.FEE, body: '이용료' },
    { value: C.PAYMENT_ITEM.DRIVING_FEE, body: '주행료' },
    { value: C.PAYMENT_ITEM.PANALTY, body: '패널티' },
    { value: C.PAYMENT_ITEM.CANCELLATION_FEE, body: '취소 수수료' },
    { value: C.PAYMENT_ITEM.HI_PASS, body: '하이패스' },
    { value: C.PAYMENT_ITEM.ETC, body: '기타' },
  ],

  PaymentStatus: [
    { value: C.PAYMENT_STATUS.ALL, body: '전체 결제상태' },
    { value: C.PAYMENT_STATUS.FINISH, body: '결제완료' },
    { value: C.PAYMENT_STATUS.CANCEL, body: '결제취소' },
  ],

  PaymentsType: [
    { value: C.PAYMENT_TYPE.PAYMENT, body: '결제' },
    { value: C.PAYMENT_TYPE.REFUND, body: '환불' },
  ],

  ProductType: [
    { value: C.ITEM_TYPE.PREMIUM.value, body: '프리미엄' },
    { value: C.ITEM_TYPE.STANDARD.value, body: '스탠다드' },
    { value: C.ITEM_TYPE.BASIC.value, body: '베이직' },
  ],

  businessPersonalType: [
    { value: C.BUSINESS_PERSONAL_TYPE.BUSINESS, body: '업무용' },
    { value: C.BUSINESS_PERSONAL_TYPE.PERSONAL, body: '개인용' },
  ],

  isLicense: [{ value: 1, body: '등록 완료' }, { value: 0, body: '미인증' }],

  // 존재유무
  Boolean: [{ value: 0, body: '-' }, { value: 1, body: '있음' }],
};

export default F;
