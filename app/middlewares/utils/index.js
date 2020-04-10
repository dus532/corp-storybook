import { KEY, LIFECYCLE } from 'middlewares/pack/constants';
import { toggleSending } from 'stores';

import createActions from 'stores/controller/createActions';

const utilsMiddleware = store => next => action => {
  const { type, meta } = action;
  const reqType = type.split('/')[0];

  // POST,PUT 통신시 Sending을 위한 미들웨어!
  switch (reqType) {
    case 'post':
    case 'put': {
      if (meta[KEY.LIFECYCLE] === LIFECYCLE.START) {
        store.dispatch(toggleSending(true));
      } else {
        store.dispatch(toggleSending(false));
      }
      break;
    }
    default: {
      break;
    }
  }

  // POST,PUT 이후 다시 데이터를 가져와야할 경우 사용함!
  if (meta && meta.read && meta[KEY.LIFECYCLE] === LIFECYCLE.SUCCESS) {
    const { read } = createActions(meta.resourceName);

    store.dispatch(read({ url: meta.read }));
  }

  return next(action);
};

export default utilsMiddleware;
