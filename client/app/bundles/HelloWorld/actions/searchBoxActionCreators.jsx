
import { UPDATE_SEARCHED_TAG } from '../constants/mainContentConstants';
import { UPDATE_SEARCH_BOX_VALUE } from '../constants/mainContentConstants';


export const updateSearchedTag = tags => ({
  type: UPDATE_SEARCHED_TAG,
  tags,
});

export const updateSearchBoxValue = value => ({
  type: UPDATE_SEARCH_BOX_VALUE,
  value,
});

export const addSearchedTag = tagId => ({
  type: 'ADD_SEARCHED_TAG',
  tagId,
});
