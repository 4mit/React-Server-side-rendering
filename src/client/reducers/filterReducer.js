import { FILTER_LAUNCHES } from '../actions/actionConstant';

export default (state = [], action) => {
  switch (action.type) {
    case FILTER_LAUNCHES:
      return action.payload;

    default:
      return state;
  }
};