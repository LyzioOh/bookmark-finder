// Simple example of a React "smart" component

import { connect } from 'react-redux';
import BookmarkAddTag from '../components/BookmarkAddTag';
import { createTag , addTagToBookmark } from '../actions/bookmarkActionCreators';


// What are the tags to propose ?
const getProposedTags = (tags, inputValue) => {
  return ( tags.filter(t => RegExp(inputValue).exec(t.get('title'))));
}

// Is this tag is new ?
const isNewTag = (tags, value) => {
  return (!tags.map(t => t.get('title')).toSet().has(value));
}

// What is the tag UUid for this title.
const getTagUuidByTitle = (tags, title) => {
  return ((tags.find(t => t.get('title') === title)).get('id')) ;
}

// What to do when an user submit a tag ?
const submitTag = (tags, tagTitle, bookmarkId) => {
  const newTag = isNewTag(tags, tagTitle);
  if (newTag) {
    return createTag(tagTitle, bookmarkId)
  } else {
    const tagUuid = tags.find(t => (t.get('title') === tagTitle)).get('uuid');
    return addTagToBookmark(tagUuid, bookmarkId);
  }
};

// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = (state, ownprops) => ({
  bookmark: ownprops.bookmark,
  tags: state.get('entities').get('tags'),
  getProposedTags: (tags, inputValue) => getProposedTags(tags, inputValue)
});


const mapDispatchToProps = (dispatch, ownprops) => {
  return {
    submitTag: (tags, tagTitle, bookmarkId) => {dispatch(submitTag(tags, tagTitle, bookmarkId));}
  };
};


// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, mapDispatchToProps)(BookmarkAddTag);
