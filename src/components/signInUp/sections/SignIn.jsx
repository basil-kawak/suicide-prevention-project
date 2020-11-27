import React from "react";
import EmailPasswordSignIn from "../../../containers/auth/EmailPasswordSignIn";
import FacebookAuth from "../../../containers/auth/FacebookAuth";
import GoogleAuth from "../../../containers/auth/GoogleAuth";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SignIn = (props) => {
  const { t } = useTranslation();
  return (
    <Row className="justify-content-md-center signinUpContainer">
      <Col className="d-flex mt-5 mb-5 shadow-lg rounded p-0 " lg="7" sm="12">
        <Col lg="7" sm="7" className="leftSection">
          <h2>{t("signIn.login")}</h2>
          <EmailPasswordSignIn />
          <Row className="m-2 ">
            <h5>{t("signIn.loginOr")}</h5>
            <FacebookAuth />
            <GoogleAuth />
          </Row>
          <h6 onClick={props.handleLoggingSwitch}>
            {t("signIn.noAccount")}
            <span className="ml-4">{t("signIn.signUp")}</span>
          </h6>
        </Col>
        <Col lg="5" sm="5" className="rightSection">
          <p>{t("signIn.help")}</p>
          <h1>
            {t("signIn.welcome.0")}
            <br />
            {t("signIn.welcome.1")}
          </h1>
        </Col>
      </Col>
    </Row>
  );
};

export default SignIn;
