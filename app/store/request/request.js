import handle from 'middlewares/pack/handle';
import {
  REQUEST_START,
  REQUEST_FINISH,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
} from 'store/request/constants';

const ApiRequest = (state, action, payload) =>
  handle(state, action, {
    start: prevState => ({
      ...prevState,
      status: REQUEST_START,
    }),
    finish: prevState => ({
      ...prevState,
      status: REQUEST_FINISH,
    }),
    success: prevState => ({
      ...prevState,
      status: REQUEST_SUCCESS,
      res: payload.data,
    }),
    failure: prevState => ({
      ...prevState,
      status: REQUEST_FAILURE,
      err: payload.response,
    }),
  });

export default ApiRequest;
