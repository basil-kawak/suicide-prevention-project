import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link, Redirect } from "react-router-dom";
import { Tabs, Tab, Container } from "react-bootstrap";
import anonymousImage from "../../images/anonymousImage.png";
import profileHeaderBackground from "../../images/profileHeaderBackground.png";
import Header from "../../components/common/Header";
import "./Profile.css";
import AccountSettings from "./AccountSettings";
import ManageUsers from "./ManageUsers";
import ManageBlogs from "./ManageBlogs";
import { updateProfilePhoto } from "../../actions/authActions";
import { ADMIN_ROLE, AUTHOR_ROLE } from "../../components/common/roleConstants";

const Profile = (props) => {
  const { profile, auth, id, currentUserType } = props;

  const extraComponents = () => {
    // Add available address details
    const setAddress = () => {
      const addressParts = [];
      if (profile.city) {
        addressParts.push(profile.city);
      }
      if (profile.country) {
        addressParts.push(profile.country);
      }
      return addressParts.join(", ");
    };

    const addressContainer = (
      <div style={{ fontSize: "1.25em" }}>
        <b>From </b>
        <span>{setAddress()}</span>
      </div>
    );

    return (
      <div className="extraComponents">
        <h1>
          {profile.fullName}
          {profile.jobTitle && (
            <span className="jobTitle">({profile.jobTitle})</span>
          )}
        </h1>
        {setAddress().length > 0 && addressContainer}
        {profile.brief && <p className="profileBrief">{profile.brief}</p>}
      </div>
    );
  };

  // Protect the page from unauthorized access
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  if (profile) {
    if (!profile.isBlocked || currentUserType === ADMIN_ROLE) {
      const profileImage = profile.imageURL || anonymousImage;
      return (
        <div className="d-flex justify-content-center position-relative">
          <Header
            headerBackground={profileHeaderBackground}
            profilePhoto={profileImage}
            pageName={"profile"}
            isOwner={id === auth.uid && true}
            extraComponents={extraComponents()}
            userId={auth.uid}
            updateProfilePhoto={props.updateProfilePhoto}
          />
          <div className="shadow-lg pt-3 profileContainer">
            <Tabs
              defaultActiveKey="accountSettings"
              className="justify-content-center"
            >
              {id === auth.uid && (
                <Tab
                  eventKey="accountSettings"
                  title={<h4>Account Settings</h4>}
                  className="m-4"
                >
                  <AccountSettings id={id} />
                </Tab>
              )}

              {currentUserType === ADMIN_ROLE && (
                <Tab
                  eventKey="manageUsers"
                  title={<h4>Manage Users</h4>}
                  className="m-4"
                >
                  <ManageUsers />
                </Tab>
              )}
              {(currentUserType === AUTHOR_ROLE ||
                currentUserType === ADMIN_ROLE) && (
                <Tab
                  eventKey="manageBlogs"
                  title={<h4>Manage Blogs</h4>}
                  className="m-4"
                >
                  <ManageBlogs />
                </Tab>
              )}
            </Tabs>
          </div>
        </div>
      );
    } else {
      return (
        <Container className="mt-5">
          <h4>
            Your account has been blocked for violating our terms. Learn how you
            may be able to restore your account.{" "}
            <Link to="/accountrestore">Learn more</Link>
          </h4>
        </Container>
      );
    }
  } else {
    return (
      <Container className="mt-5">
        <h4>Loading profile...</h4>
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const profiles = state.firestore.data.profiles;
  const profile = profiles ? profiles[id] : null;
  // Set current user type
  const currentUserType = (() => {
    if (profiles) {
      if (profiles[state.firebase.auth.uid]) {
        return profiles[state.firebase.auth.uid].userType;
      } else {
        return null;
      }
    } else {
      return null;
    }
  })();

  return {
    profile: profile,
    auth: state.firebase.auth,
    id,
    currentUserType,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfilePhoto: (image, userId) =>
      dispatch(updateProfilePhoto(image, userId)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "profiles" }])
)(Profile);
