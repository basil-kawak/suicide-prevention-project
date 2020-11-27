import React from "react";
import EmailPasswordSignUp from "../../../containers/auth/EmailPasswordSignUp";
import FacebookAuth from "../../../containers/auth/FacebookAuth";
import GoogleAuth from "../../../containers/auth/GoogleAuth";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SignUp = (props) => {
  const { t } = useTranslation();
  return (
    <Row className="signinUpContainer justify-content-md-center">
      <Col className="d-flex mt-5 mb-5 shadow-lg rounded p-0 " lg="7" sm="12">
        <Col lg="5" sm="5" className="rightSection">
          <p>{t("signUp.signUp")}</p>
          <h1>
            {t("signUp.welcome.0")}
            <br />
            {t("signUp.welcome.1")} <br />
            {t("signUp.welcome.2")}
          </h1>
        </Col>
        <Col lg="7" sm="7" className="leftSection">
          <h2>{t("signUp.signUp")}</h2>
          <EmailPasswordSignUp />
          <Row className="m-2 ">
            <h5>{t("signUp.signUpOr")}</h5>
            <FacebookAuth />
            <GoogleAuth />
          </Row>
          <h6>
            {t("signUp.alreadyMember")}
            <span onClick={props.handleLoggingSwitch}>{t("signUp.login")}</span>
          </h6>
        </Col>
      </Col>
    </Row>
  );
};

export default SignUp;
