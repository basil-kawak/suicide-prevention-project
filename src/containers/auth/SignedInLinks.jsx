import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/authActions";
import "./index.css";

const SignedInLinks = (props) => {
  const { auth } = props;
  return (
    <div className="link signedInLinks">
      <Link to={"/" + auth.uid + "/profile"} className="linkItem">
        Profile
      </Link>
      <hr />
      <Link to="/" onClick={props.signOut} className="linkItem">
        Sign Out
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
