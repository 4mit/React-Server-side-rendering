import { FETCH_LAUNCHES } from '../actions/actionConstant';

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LAUNCHES:
      return action.payload;

    default:
      return state;
  }
};
