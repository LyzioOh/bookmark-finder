// Simple example of a React "smart" component

import { connect } from 'react-redux';
import BookmarkList from '../components/BookmarkList';
import * as actions from '../actions/mainContentActionCreators';
import { getBookmarksIdsForTagsIds, tagsByBookmarkCount } from '../reducers/bookmarkTagsReducer';
import { hasSearchedTags } from '../reducers/uiReducer';

const getProposedBookmarksIds = (state) => {
  const tagsCount = tagsByBookmarkCount(state);
  return (
    getBookmarksIdsForTagsIds(state, state.getIn(['ui', 'searchedTags']))
    .sortBy(bookmarkId => tagsCount.get(bookmarkId))
  );
};
// Which part of the Redux global state does our component want to receive as props?
const mapStateToProps = state => (
  {
    bookmarksIds: getProposedBookmarksIds(state),
  });

// Don't forget to actually use connect!
// Note that we don't export HelloWorld, but the redux "connected" version of it.
// See https://github.com/reactjs/react-redux/blob/master/docs/api.md#examples
export default connect(mapStateToProps, actions)(BookmarkList);
