// 상수 정의
const C = {
  SUB_TYPE: {
    SUBSCRIBING: 1,
    EXPIRED_SUBSCRIBING: 2,
    UPGRADE_SUBSCRIBING: 3,
    DOWNGRADE_SUBSCRIBING: 4,
  },

  CARD_TYPE: {
    PERSONAL: 3,
    COMPANY: 2,
  },

  REGISTER_TYPE: {
    MAIN: 1,
    TEAM: 2,
  },

  NOTICE_TYPE: {
    NONE: 0,
    ALL: 1,
    EMAIL: 2,
    SMS: 3,
  },

  RENATL_STATUS: {
    ALL: 0,
    CAR_RESERVATION: 1,
    CAR_RENTAL: 2,
    RENTAL_CANCEL: 3,
    RETURN_DELAY: 4,
    COMPLETE: 5,
  },

  PURPOSE: {
    ALL: 0,
    OUTSIDE: 1,
    BUSINESS_TRIP: 2,
    INHOUSE_EVENT: 3,
  },

  PAYMENT_STATUS: {
    ALL: 0,
    FINISH: 1,
    CANCEL: 2,
  },

  PAYMENT_ITEM: {
    ALL: 0,
    RENTAL_FEE: 1,
    EXTRA_FEE: 2,
    FEE: 3,
    PANALTY: 5,
    CANCELLATION_FEE: 6,
    HI_PASS: 7,
    ETC: 99,
  },

  PAYMENT_TYPE: {
    PAYMENT: 0,
    PAYMENT_FINISH: 1,
  },

  LICENSE_TYPE: {
    ALL: 0,
    REGISTERD: 1,
    NOT_REGISTERD: 2,
  },

  ITEM_TYPE: {
    PREMIUM: { value: 3, price: 15 },
    STANDARD: { value: 2, price: 10 },
    BASIC: { value: 1, price: 5 },
  },

  ITEM_TYPE_ARRAY: [
    { value: 3, price: 15 },
    { value: 2, price: 10 },
    { value: 1, price: 5 },
  ],

  EXPIRES_TYPE: {
    IMMEDIATELY: 1,
    NEXT_MONTH: 2,
  },

  RENTAL_TYPE: {
    RENTAL: 0,
    RESERVATION: 1,
    DELAY: 2,
    FINISH: 3,
    CANCEL: 5,
  },
};

export default C;
