import React from "react";
import { Form, Button, Col, Container, Modal } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { signIn, resetPassword } from "../../actions/authActions";

const EmailPasswordSignIn = (props) => {
  const { t } = useTranslation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmModalShow, setConfirmModalShow] = React.useState(false);
  const [resetSuccessModalShow, setResetSuccessModalShow] = React.useState(
    false
  );

  // Sign in to an existing account with "Email & Password" method
  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn({ email, password });
  };

  const ConfirmModal = (props) => {
    const [recoverEmail, setRecoverEmail] = React.useState("");
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("signInForm.resetPassword")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h6>{t("signInForm.enterEmail")}</h6>
          <Form.Control
            type="text"
            placeholder="Email"
            onInput={(e) => {
              setRecoverEmail(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide}>
            {t("signInForm.cancel")}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              props.onHide();
              props.resetPassword(recoverEmail);
              setResetSuccessModalShow(true);
            }}
          >
            {t("signInForm.resetButton")}
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
            {t("signInForm.resetPopup")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {authError && errKey === "resetPassword" ? (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          ) : (
            <p>{t("signInForm.resetEmailSent")}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>
            {t("signInForm.success")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  // Redirect to home page after it's logged in
  const { auth, authError, errMessage, errKey } = props;
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  return (
    <Container>
      <Form>
        <Form.Group as={Col} controlId="email">
          <Form.Label>{t("signInForm.formEmail")}</Form.Label>
          <Form.Control
            type="text"
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="password">
          <Form.Label>{t("signInForm.formPassword")} </Form.Label>
          <Form.Control
            type="password"
            onInput={(e) => {
              setPassword(e.target.value);
            }}
          />
        </Form.Group>
        <div
          className="forgetPassword"
          onClick={() => setConfirmModalShow(true)}
        >
          {t("signInForm.forgotPassword")}
        </div>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {t("signInForm.loginButton")}
        </Button>
        <Container>
          {/* Show error message when fails to sign in */}
          {authError && errKey === "login" && (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          )}
        </Container>
      </Form>

      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
        resetPassword={props.resetPassword}
      />
      <SuccessModal
        show={resetSuccessModalShow}
        onHide={() => setResetSuccessModalShow(false)}
      />
    </Container>
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
    signIn: (creds) => dispatch(signIn(creds)),
    resetPassword: (recoverEmail) => dispatch(resetPassword(recoverEmail)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailPasswordSignIn);
