import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Col, Row } from "react-bootstrap";

const WeCare = () => {
  const { t } = useTranslation();
  return (
    <Container className="w-75">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12} className="weCare">
          <h1>{t("weCare.heading")}</h1>
          <p>
            <span className="firstWord"> {t("weCare.firstWord")} </span>
            {t("weCare.motivationalText")}
            <span className="blueText"> {t("weCare.pinkText")}</span>
            {t("weCare.supportiveText")}
            <span className="blueText">{t("weCare.pinkTextWord")}</span>.
            {t("weCare.hopefulText")}
          </p>
          <br />

          <div>
            <Link to="/contact">
              <Button className="pinkButtonWithWhiteText">
                {t("weCare.reachUsButton")}
              </Button>
            </Link>
            <br />
            <Link to="/assessment">
              <Button className="blueButtonWithWhiteText">
                {t("weCare.assessmentButton")}
              </Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default WeCare;
