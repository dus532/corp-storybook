import handle from 'middlewares/handle';

const ApiRequest = (state, action, payload) =>
  handle(state, action, {
    start: prevState => ({
      ...prevState,
      status: 1,
    }),
    finish: prevState => ({
      ...prevState,
      status: 2,
    }),
    success: prevState => ({
      ...prevState,
      status: 3,
      res: payload.data,
    }),
    failure: prevState => ({
      ...prevState,
      status: 4,
      err: payload.response,
    }),
  });

export default ApiRequest;
