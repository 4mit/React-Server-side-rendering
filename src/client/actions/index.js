import request from '../network/httpClient';


import { FETCH_LAUNCHES } from '../actions/actionConstant'
export const fetchLaunches = (source) => {
  console.log(source);
  return async (dispatch) => {
    const res = await request.http.get('/v3/launches', { limit: 100 });

    dispatch({
      type: FETCH_LAUNCHES,
      payload: res,
    });
  }
};



export const filterArticles = (source) => async (dispatch) => {
  const res = await request.http.get('/v3/launches', { limit: 100, ...source });
  dispatch({
    type: FETCH_LAUNCHES,
    payload: res,
  });
};
