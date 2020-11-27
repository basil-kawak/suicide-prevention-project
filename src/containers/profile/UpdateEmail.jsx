import React from "react";
import { connect } from "react-redux";
import "./AccountSettingsSections.css";
import { updatePasswordAndEmail } from "../../actions/authActions";
import { Form, Container, Button, Col, Modal } from "react-bootstrap";

const UpdateEmail = (props) => {
  const { auth, authError, errMessage, errKey } = props;

  const [currentEmail, setCurrentEmail] = React.useState(auth.email);
  const [newEmail, setNewEmail] = React.useState("");
  const [emailRepeat, setEmailRepeat] = React.useState("");
  const [confirmModalShow, setConfirmModalShow] = React.useState(false);
  const [doesEmailMatch, setDoesEmailMatch] = React.useState(true);
  const [successModalShow, setSuccessModalShow] = React.useState(false);

  const updateEmail = (password) => {
    const data = {
      currentEmail: auth.email,
      currentPassword: password,
      newEmail,
      userId: auth.uid,
      key: "updateEmail",
    };
    if (newEmail === emailRepeat) {
      setDoesEmailMatch(true);
      props.updatePasswordAndEmail(data);
      setCurrentEmail(newEmail);
    } else {
      setDoesEmailMatch(false);
    }
  };

  const ConfirmModal = (props) => {
    const [password, setPassword] = React.useState("");
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Updating your email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Enter your password to confirm</h6>
          <Form.Control
            type="password"
            placeholder="Password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.onHide();
              updateEmail(password);
              setSuccessModalShow(true);
            }}
          >
            Update Email
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const SuccessModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Updating your email
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {authError && errKey === "updateEmail" ? (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          ) : (
            <p>Your email has been updated successfully</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="updateEmail">
      <h4 className="editingTitle">Email address</h4>
      <p>
        Your email address is <b>{authError ? auth.email : currentEmail}</b>
      </p>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>New Email Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="example@gmail.com"
              onInput={(e) => {
                setNewEmail(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Confirm New Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Re-type your new email"
              onInput={(e) => {
                setEmailRepeat(e.target.value);
                setDoesEmailMatch(true);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {!doesEmailMatch && (
            <div className="emailMatch">Your emails must match</div>
          )}
        </Form.Row>
        <Container>
          {/* Show error message when fails to sign up */}
          {authError && errKey === "updateEmail" && (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          )}
        </Container>
      </Form>

      <Button variant="primary" onClick={() => setConfirmModalShow(true)}>
        Update Email
      </Button>

      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
      />

      <SuccessModal
        show={successModalShow}
        onHide={() => setSuccessModalShow(false)}
      />
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
    updatePasswordAndEmail: (data) => dispatch(updatePasswordAndEmail(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEmail);
