// 상수 정의
const C = {
  CARD_TYPE: {
    PERSONAL: 1,
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
};

export default C;
