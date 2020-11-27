import {
  ADD_BLOG_SUCCESS,
  ADD_BLOG_ERROR,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_ERROR,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_ERROR,
  BLOG_APPROVAL_SUCCESS,
  BLOG_APPROVAL_ERROR,
  DELETE_BLOG_FROM_STORAGE_SUCCESS,
  DELETE_BLOG_FROM_STORAGE_ERROR,
  DELETE_BLOG_FROM_DB_SUCCESS,
  DELETE_BLOG_FROM_DB_ERROR,
} from "../actions/actionTypes";

const initState = {
  blogError: null,
  blogErrKey: null,
};

const blogReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_BLOG_SUCCESS:
      return {
        ...state,
        blogError: null,
      };
    case ADD_BLOG_ERROR:
      return {
        ...state,
        blogError: "Bloge adding failed",
        blogErrMessage: action.err.message,
        blogErrKey: "addBlog",
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        blogError: null,
      };
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        blogError: "Adding a new comment failed",
        blogErrMessage: action.err.message,
        blogErrKey: "addComment",
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        blogError: null,
      };
    case DELETE_COMMENT_ERROR:
      return {
        ...state,
        blogError: "Comment deletion failed",
        blogErrMessage: action.err.message,
        blogErrKey: "deleteComment",
      };
    case BLOG_APPROVAL_SUCCESS:
      return {
        ...state,
        blogError: null,
      };
    case BLOG_APPROVAL_ERROR:
      return {
        ...state,
        blogError: "Blog approval failed",
        blogErrMessage: action.err.message,
        blogErrKey: "blogApproval",
      };
    case DELETE_BLOG_FROM_STORAGE_SUCCESS:
      return {
        ...state,
        blogError: null,
      };
    case DELETE_BLOG_FROM_STORAGE_ERROR:
      return {
        ...state,
        blogError: "Blog deletion from storage failed",
        blogErrMessage: action.err.message,
        blogErrKey: "deleteBlogFromStorage",
      };
    case DELETE_BLOG_FROM_DB_SUCCESS:
      return {
        ...state,
        blogError: null,
      };
    case DELETE_BLOG_FROM_DB_ERROR:
      return {
        ...state,
        blogError: "Blog deletion from firebase db failed",
        blogErrMessage: action.err.message,
        blogErrKey: "deleteBlogFromDB",
      };
    default:
      return state;
  }
};

export default blogReducer;
