export const REQUEST_POST = 'REQUEST_POST';
export const SUCCESS_POST = 'SUCCESS_POST';
export const FAILURE_POST = 'FAILURE_POST';

export const requestPost = () => ({
  type: REQUEST_POST,
});

export const successPost = (data) => ({
  type: SUCCESS_POST,
  payload: data,
});

export const failurePost = (error) => ({
  type: FAILURE_POST,
  payload: error,
});