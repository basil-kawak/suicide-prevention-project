import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import ProfileBox from "./ProfileBox";
import "./ManageUsers.css";

const ManageUsers = (props) => {
  const { profiles, auth } = props;

  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <ListGroup defaultActiveKey="none">
        {profiles &&
          profiles.map((profile) => {
            return (
              <ListGroup.Item>
                <ProfileBox profile={profile} auth={auth} />
              </ListGroup.Item>
            );
          })}
      </ListGroup>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profiles: state.firestore.ordered.profiles,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "profiles" }])
)(ManageUsers);
