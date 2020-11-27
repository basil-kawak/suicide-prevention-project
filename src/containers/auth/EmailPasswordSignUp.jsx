import React from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../actions/authActions";
import { useTranslation } from "react-i18next";

const EmailPasswordSignUp = (props) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [doesPasswordMatch, setDoesPasswordMatch] = React.useState(true);
  const { auth, authError, errMessage, errKey } = props;
  // Redirect to home page after it's signed up and logged in
  if (auth.uid) {
    return <Redirect to="/" />;
  }
  // Create a new account with "Email & Password" method
  const handleSubmit = (e) => {
    if (password === passwordRepeat) {
      setDoesPasswordMatch(true);
      props.signUp({
        firstName,
        lastName,
        fullName: firstName + " " + lastName,
        email,
        password,
        imageURL: null,
      });
    } else {
      setDoesPasswordMatch(false);
    }
    e.preventDefault();
  };
  return (
    <Container>
      <Form>
        <Form.Row>
          <Form.Group as={Col} controlId="firstName">
            <Form.Label>{t("signUpForm.fName")}</Form.Label>
            <Form.Control
              type="text"
              onInput={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="lastName">
            <Form.Label>{t("signUpForm.lName")}</Form.Label>
            <Form.Control
              type="text"
              onInput={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Form.Group>
        </Form.Row>
        <Form.Group controlId="email">
          <Form.Label>{t("signUpForm.email")}</Form.Label>
          <Form.Control
            type="text"
            onInput={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>{t("signUpForm.password")}</Form.Label>
          <Form.Control
            type="password"
            onInput={(e) => {
              setPassword(e.target.value);
              setDoesPasswordMatch(true);
            }}
          />
        </Form.Group>
        <Form.Group controlId="passwordRepeat">
          <Form.Label>{t("signUpForm.rePassword")}</Form.Label>
          <Form.Control
            type="password"
            onInput={(e) => {
              setPasswordRepeat(e.target.value);
              setDoesPasswordMatch(true);
            }}
          />
        </Form.Group>
        {!doesPasswordMatch && (
          <div className="passwordMatch">{t("signUpForm.passNotMatch")}</div>
        )}
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          {t("signUpForm.signUpButton")}
        </Button>
        <Container>
          {/* Show error message when fails to sign up */}
          {authError && errKey === "signup" && (
            <div className="errMsgContainer">
              <b>{authError}</b>
              <div className="errMsg">{errMessage}</div>
            </div>
          )}
        </Container>
      </Form>
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
    signUp: (newProfile) => dispatch(signUp(newProfile)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailPasswordSignUp);
