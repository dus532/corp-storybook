// 상수 정의
const C = {
  SUB_TYPE: {
    SUBSCRIBING: 1,
    EXPIRED_SUBSCRIBING: 2,
    NEXT_MONTH_SUBSCRIBING: 3,
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

  PAYMENT_STATUS: {
    ALL: 0,
    FINISH: 1,
    CANCEL: 2,
  },

  PAYMENT_ITEM: {
    ALL: 0,
    RENTAL_FEE: 1,
    CANCELLATION_FEE: 2,
    RETURN_DELAY: 3,
    HI_PASS: 4,
    SUBSCRIBE: 5,
  },

  LICENSE_TYPE: {
    ALL: 0,
    REGISTERD: 1,
    NOT_REGISTERD: 2,
  },

  ITEM_TYPE: {
    PREMIUM: 1,
    STANDARD: 2,
    BASIC: 3,
  },

  EXPIRES_TYPE: {
    NEXT_MONTH: 0,
    IMMEDIATELY: 1,
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
