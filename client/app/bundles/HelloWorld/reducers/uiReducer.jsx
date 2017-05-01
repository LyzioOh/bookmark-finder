import { combineReducers } from 'redux-immutable';
import {
  UPDATE_SEARCHED_TAG,
  ADD_SEARCHED_TAG,
  UPDATE_SEARCH_BOX_VALUE,
} from '../constants/mainContentConstants';

const searchBoxValue = (state = Map({}), action) => {
  switch (action.type) {
    case UPDATE_SEARCH_BOX_VALUE:
      return action.value;
    case UPDATE_SEARCHED_TAG:
      return '';
    case ADD_SEARCHED_TAG:
      return '';
    default:
      return state;
  }
};

const searchedTags = (state = Map({}), action) => {
  switch (action.type) {
    case '@@INIT':
      return state.toSet();
    case UPDATE_SEARCHED_TAG:
      return action.tags.toSet();
    case ADD_SEARCHED_TAG:
      return state.add(action.tagId);
    default:
      return state;
  }
};


const ui = combineReducers({
  searchedTags,
  searchBoxValue,
});

export default ui;
