import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import filterReducer from './filterReducer';

export default combineReducers({
  articles: usersReducer,
  filteredArticles: filterReducer
});
