import React from "react";
import { Image, Dropdown } from "react-bootstrap";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import "./index.css";
import { connect } from "react-redux";
const LoggingDropdownMenu = (props) => {
  const { auth, profile } = props;
  const avatar = (
    <Image
      src={profile.imageURL || "https://i.ibb.co/s5Xh2d2/Login-Signup-Icon.png"}
      className="loginIcon"
      width="27"
      height="27"
      roundedCircle
    />
  );
  const loggingLinks = auth.uid ? (
    <SignedInLinks auth={auth} profile={profile} />
  ) : (
    <SignedOutLinks />
  );
  return (
    <Dropdown className="langDropdown loggingLinks">
      <Dropdown.Toggle id="dropdown-basic" className="langDropdown">
        {avatar}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item>{loggingLinks}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(LoggingDropdownMenu);
