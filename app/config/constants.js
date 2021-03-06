// 상수 정의
const C = {
  SUB_TYPE: {
    SUBSCRIBING: 1,
    EXPIRED_SUBSCRIBING: 2,
    UPGRADE_SUBSCRIBING: 3,
    DOWNGRADE_SUBSCRIBING: 4,
  },

  CARD_TYPE: {
    PERSONAL: 4,
    COMPANY: 3,
  },

  REGISTER_TYPE: {
    MAIN: 1,
    TEAM: 2,
  },

  NOTICE_TYPE: {
    NONE: 0,
    EMAIL: 1,
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
    DRIVING_FEE: 4,
    PANALTY: 5,
    CANCELLATION_FEE: 6,
    HI_PASS: 7,
    ETC: 99,
  },

  PAYMENT_TYPE: {
    PAYMENT: 1,
    REFUND: 2,
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
    RESERVATION: 1,
    RENTAL: 2,
    CANCEL: 3,
    DELAY: 4,
    FINISH: 5,
  },

  BUSINESS_PERSONAL_TYPE: {
    BUSINESS: 1,
    PERSONAL: 2,
  },
};

export default C;
