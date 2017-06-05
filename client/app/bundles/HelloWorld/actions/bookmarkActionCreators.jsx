import { fetchData } from './mainContentActionCreators';
import { getAPIHeader } from './apiActionCreators';

const uuidV4 = require('uuid/v4');

const prependHttp = (url) => {
  let returnValue = '';
  if (!url.match(/^[a-zA-Z]+:\/\//)) { returnValue = `http://${url}`; }
  else { returnValue = url; }
  return (returnValue);
};

export const addTagToBookmark = (tagId, bookmark) => ({
  type: 'ADD_TAG_TO_BOOKMARK',
  bookmarkTagId: uuidV4(),
  tagId,
  bookmark,
});

export const createTag = (tagTitle, bookmark) => ({
  type: 'CREATE_TAG',
  tagId: uuidV4(),
  bookmarkTagId: uuidV4(),
  tagTitle,
  bookmark,
});

export const createBookmark = values => ({
  type: 'CREATE_BOOKMARK',
  id: uuidV4(),
  title: values.title,
  url: prependHttp(values.url),
});

export const postBookmark = values => (dispatch, getState) => {
  dispatch(createBookmark(values));
  fetch('/api/v1/bookmarks', {
    method: 'post',
    headers: getAPIHeader(getState()),
    body: JSON.stringify({
      bookmark: {
        title: values.title,
        url: prependHttp(values.url),
      }
    })
  });
  dispatch(fetchData());
  dispatch({ type: 'HIDE_ADD_BOOKMARK_FORM' });
};

export const postTag = (tagTitle, bookmark) => (dispatch, getState) => {
  dispatch(createTag(tagTitle, bookmark));
  fetch('/api/v1/bookmark_tags', {
    method: 'post',
    headers: getAPIHeader(getState()),
    body: JSON.stringify({
      bookmark_tag: {
        tag_title: tagTitle,
        bookmark_id: bookmark,
      }
    })
  });
  dispatch(fetchData());
};
