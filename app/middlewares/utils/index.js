import { KEY, LIFECYCLE } from 'middlewares/pack/constants';
import { toggleSending } from 'store';

const utilsMiddleware = store => next => action => {
  const { type, meta } = action;
  const reqType = type.split('/')[0];

  // post와 put 통신시 Sending을 위한 미들웨어!
  switch (reqType) {
    case 'post':
    case 'put': {
      if (meta[KEY.LIFECYCLE] === LIFECYCLE.START) {
        store.dispatch(toggleSending());
      } else {
        store.dispatch(toggleSending());
      }
      break;
    }
    default: {
      break;
    }
  }

  return next(action);
};

export default utilsMiddleware;
