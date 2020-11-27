import React from "react";
import "./ProfileInfoSections.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { updateProfile } from "../../actions/authActions";
import { Redirect } from "react-router-dom";
import { Form, Col, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import infoSign from "../../images/infoSign.png";

const EditProfileInfo = (props) => {
  const {
    userId,
    profile,
    auth,
    firstName = profile.firstName || "",
    lastName = profile.lastName || "",
    fullName = profile.fullName,
    jobTitle = profile.jobTitle || "",
    userType = profile.userType,
    city = profile.city || "",
    country = profile.country || "",
    brief = profile.brief || "",
  } = props;

  const [newFirstName, setNewFirstName] = React.useState(firstName);
  const [newLastName, setNewLastName] = React.useState(lastName);
  const [newCity, setNewCity] = React.useState(city);
  const [newCountry, setNewCountry] = React.useState(country);
  const [newJobTitle, setNewJobTitle] = React.useState(jobTitle);
  const [newBrief, setNewBrief] = React.useState(brief);
  const displayName =
    !newFirstName && !newLastName ? fullName : newFirstName + " " + newLastName;

  // Protect the page from unauthorized access
  if (!auth.uid) {
    return <Redirect to="/login" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleEditingStatus(true);

    const changes = {
      firstName: newFirstName,
      lastName: newLastName,
      fullName: displayName,
      city: newCity,
      country: newCountry,
      jobTitle: newJobTitle,
      brief: newBrief,
    };

    props.updateProfile({ userId, ...changes });
  };

  if (profile) {
    return (
      <Form className="d-flex flex-column infoContainer">
        <Form.Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={newFirstName}
              className="w-75"
              onInput={(e) => {
                setNewFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={newLastName}
              className="w-75"
              onInput={(e) => {
                setNewLastName(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row className="justify-content-between">
          <Col>
            <p className="w-75 m-0 pb-1 border-bottom">
              Display name
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    This name will be displayed when you comment or post a blog
                  </Tooltip>
                }
              >
                <span className="ml-2 d-inline-block">
                  <img alt="Info sign" src={infoSign} width="20" />
                </span>
              </OverlayTrigger>
            </p>
            <p className="w-75 m-0 p-1 displayName">{displayName}</p>
          </Col>
          <Col></Col>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="jobTitle">
            <Form.Label>Job title</Form.Label>
            <Form.Control
              type="text"
              value={newJobTitle}
              className="w-75"
              onInput={(e) => {
                setNewJobTitle(e.target.value);
              }}
            />
          </Form.Group>
          <Col>
            <p className="w-75 m-0 pb-1 border-bottom">
              User account type
              <OverlayTrigger
                overlay={
                  <Tooltip id="tooltip-disabled">
                    You can contact with the website admins to upgrade your
                    account
                  </Tooltip>
                }
              >
                <span className="ml-2 d-inline-block">
                  <img alt="Info sign" src={infoSign} width="20" />
                </span>
              </OverlayTrigger>
            </p>
            <p className="w-75 m-0 p-1 displayName">{userType}</p>
          </Col>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              value={newCity}
              className="w-75"
              onInput={(e) => {
                setNewCity(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              value={newCountry}
              className="w-75"
              onInput={(e) => {
                setNewCountry(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} controlId="brief">
            <Form.Label>Brief</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={newBrief}
              onInput={(e) => {
                setNewBrief(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="mr-3"
          >
            Save Changes
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={() => props.handleEditingStatus(false)}
          >
            Cancel
          </Button>
        </Form.Row>
      </Form>
    );
  } else {
    return <h4 className="container">Loading profile...</h4>;
  }
};

const mapStateToProps = (state, ownProps) => {
  const { userId } = ownProps;
  const profiles = state.firestore.data.profiles;
  const profile = profiles ? profiles[userId] : null;
  return {
    profile: profile,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profileInfo) => dispatch(updateProfile(profileInfo)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "profiles" }])
)(EditProfileInfo);
