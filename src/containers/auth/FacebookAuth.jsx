import React from "react";
import facebookIcon from "../../images/facebookIcon.png";
import { connect } from "react-redux";
import { facebookAuth } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import "./index.css";

const FacebookAuth = (props) => {
  const { authError, errMessage, auth, errKey } = props;
  // Redirect to home page after the auth is done and signed in
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <img
        alt="Facebook icon"
        className="authIcon"
        src={facebookIcon}
        onClick={props.facebookAuth}
      />
      {/* Show error message when fails to auth with facebook */}
      {authError && errKey === "facebook" && (
        <div className="errMsgContainer">
          <b>{authError}</b>
          <div className="errMsg">{errMessage}</div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    errMessage: state.auth.errMessage,
    errKey: state.auth.errKey,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    facebookAuth: () => dispatch(facebookAuth()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FacebookAuth);
