import React from "react";
import { connect } from "react-redux";
import "./AccountSettingsSections.css";
import {
  updatePasswordAndEmail,
  resetPassword,
} from "../../actions/authActions";
import { Form, Container, Button, Col, Modal } from "react-bootstrap";

const UpdatePassword = (props) => {
  const { auth, authError, errMessage, errKey } = props;
  const operations = {
    passwordUpdate: {
      label: "Updating your password",
      successMessage: "Your password has been updated successfully",
      updateKey: "updatePassword",
    },
    passwordReset: {
      label: "Recovering your password",
      successMessage:
        "A reset password email has been sent successfully, you can check your mailbox to set a new password",
      updateKey: "resetPassword",
    },
  };

  const [newPassword, setNewPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [confirmModalShow, setConfirmModalShow] = React.useState(false);
  const [updateSuccessModalShow, setUpdateSuccessModalShow] = React.useState(
    false
  );
  const [resetSuccessModalShow, setResetSuccessModalShow] = React.useState(
    false
  );
  const [doesPasswordMatch, setDoesPasswordMatch] = React.useState(true);
  const [doesPasswordValid, setDoesPasswordValid] = React.useState(true);

  const checkPassword = () => {
    if (newPassword === passwordRepeat && newPassword.length > 5) {
      setDoesPasswordMatch(true);
      setDoesPasswordValid(true);
      return true;
    } else {
      if (newPassword !== passwordRepeat) {
        setDoesPasswordMatch(false);
      }
      if (newPassword.length < 6) {
        setDoesPasswordValid(false);
      }
    }
    return false;
  };

  const updatePassword = (password) => {
    const data = {
      currentEmail: auth.email,
      currentPassword: password,
      newPassword,
      userId: auth.uid,
      key: "updatePassword",
    };
    props.updatePasswordAndEmail(data);
  };

  const ConfirmModal = (props) => {
    const [currentPassword, setCurrentPassword] = React.useState("");
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter updatePassword"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter updatePassword">
            Updating your password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>Enter your current password to confirm</h6>
          <Form.Control
            type="password"
            placeholder="Password"
            onInput={(e) => {
              setCurrentPassword(e.target.value);
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
              updatePassword(currentPassword);
              setUpdateSuccessModalShow(true);
            }}
          >
            Update Password
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
        aria-labelledby={`contained-modal-title-vcenter ${props.operation.label}`}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id={`contained-modal-title-vcenter ${props.operation.label}`}
          >
            {props.operation.label}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {authError && errKey === props.operation.updateKey ? (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          ) : (
            <p>{props.operation.successMessage}</p>
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
    <div className="updatePassword">
      <h4 className="editingTitle">Change Password</h4>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="email">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onInput={(e) => {
                setNewPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="email">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-type password"
              onInput={(e) => {
                setPasswordRepeat(e.target.value);
                setDoesPasswordMatch(true);
                setDoesPasswordValid(true);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          {!doesPasswordMatch && (
            <div className="passwordMatch">Your passwords must match</div>
          )}
        </Form.Row>
        <Form.Row>
          {!doesPasswordValid && (
            <div className="passwordValid">
              Your password must be at least 6 characters
            </div>
          )}
        </Form.Row>
        <Container>
          {/* Show error message when fails to sign up */}
          {authError && errKey === "updatePassword" && (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          )}
        </Container>
      </Form>
      <div className="resetPassword">
        <p>
          Forgot your password?{" "}
          <b
            onClick={() => {
              props.resetPassword(auth.email);
              if (errKey !== "updatePassword") {
                setResetSuccessModalShow(true);
              }
            }}
          >
            Click here
          </b>{" "}
          to send you a reset password email
        </p>
      </div>

      <Button
        variant="primary"
        onClick={() => {
          if (checkPassword()) {
            setConfirmModalShow(true);
          }
        }}
      >
        Update Password
      </Button>

      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
      />

      <SuccessModal
        show={updateSuccessModalShow}
        onHide={() => setUpdateSuccessModalShow(false)}
        operation={operations.passwordUpdate}
      />

      <SuccessModal
        show={resetSuccessModalShow}
        onHide={() => setResetSuccessModalShow(false)}
        operation={operations.passwordReset}
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
    resetPassword: (email) => dispatch(resetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePassword);
