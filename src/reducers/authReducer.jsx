import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
  FACEBOOK_AUTH_SUCCESS,
  FACEBOOK_AUTH_ERROR,
  GOOGLE_AUTH_SUCCESS,
  GOOGLE_AUTH_ERROR,
  UPDATE_SUCCESS,
  UPDATE_ERROR,
  PROFILE_AUTH_DELETE_SUCCESS,
  PROFILE_AUTH_DELETE_ERROR,
  PROFILE_DATA_DELETE_SUCCESS,
  PROFILE_DATA_DELETE_ERROR,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
  SEND_RESET_PASSWORD_EMAIL_SUCCESS,
  SEND_RESET_PASSWORD_EMAIL_ERROR,
  PHOTO_UPLOAD_SUCCESS,
  PHOTO_UPLOAD_ERROR,
  DELETE_STORAGE_SUCCESS,
  DELETE_STORAGE_ERROR,
  ADD_NEWSLETTER_SUCCESS,
  ADD_NEWSLETTER_ERROR,
} from "../actions/actionTypes";

const initState = {
  authError: null,
  errKey: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: "Log in failed",
        errMessage: action.err.message,
        errKey: "login",
      };
    case SIGN_OUT_SUCCESS:
      return state;
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        authError: "Sign up failed",
        errMessage: action.err.message,
        errKey: "signup",
      };
    case FACEBOOK_AUTH_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case FACEBOOK_AUTH_ERROR:
      return {
        ...state,
        authError: "Facebook authentication failed",
        errMessage: action.err.message,
        errKey: "facebook",
      };
    case GOOGLE_AUTH_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case GOOGLE_AUTH_ERROR:
      return {
        ...state,
        authError: "Google authentication failed",
        errMessage: action.err.message,
        errKey: "google",
      };
    case UPDATE_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case UPDATE_ERROR:
      return {
        ...state,
        authError: "User's info update failed",
        errMessage: action.err.message,
        errKey: "updateInfo",
      };
    case PROFILE_AUTH_DELETE_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case PROFILE_AUTH_DELETE_ERROR:
      return {
        ...state,
        authError: "Account auth deletion failed",
        errMessage: action.err.message,
        errKey: "accountAuthDelete",
      };
    case PROFILE_DATA_DELETE_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case PROFILE_DATA_DELETE_ERROR:
      return {
        ...state,
        authError: "Account data deletion failed",
        errMessage: action.err.message,
        errKey: "accountDataDelete",
      };
    case UPDATE_EMAIL_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case UPDATE_EMAIL_ERROR:
      return {
        ...state,
        authError: "Email update failed",
        errMessage: action.err.message,
        errKey: "updateEmail",
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        authError: "Password update failed",
        errMessage: action.err.message,
        errKey: "updatePassword",
      };
    case SEND_RESET_PASSWORD_EMAIL_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case SEND_RESET_PASSWORD_EMAIL_ERROR:
      return {
        ...state,
        authError: "Sending reset password email failed",
        errMessage: action.err.message,
        errKey: "resetPassword",
      };
    case PHOTO_UPLOAD_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case PHOTO_UPLOAD_ERROR:
      return {
        ...state,
        authError: "Profile photo upload failed",
        errMessage: action.err.message,
        errKey: "photoUpload",
      };
    case DELETE_STORAGE_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case DELETE_STORAGE_ERROR:
      return {
        ...state,
        authError: "Profile storage deletion failed",
        errMessage: action.err.message,
        errKey: "deleteStorage",
      };
    case ADD_NEWSLETTER_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case ADD_NEWSLETTER_ERROR:
      return {
        ...state,
        authError: "Adding to newsletter failed",
        errMessage: action.err.message,
        errKey: "addNewsletter",
      };
    default:
      return state;
  }
};

export default authReducer;
