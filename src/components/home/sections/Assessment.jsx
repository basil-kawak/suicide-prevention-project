import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Col, Row } from "react-bootstrap";

const Assessment = () => {
  const { t } = useTranslation();
  return (
    <div className="assessment">
      <Container>
        <Row>
          <Col xs={10} sm={10} md={6} lg={6}>
            <h1>{t("assessmentHomepage.heading")}</h1>
            <p>{t("assessmentHomepage.assessmentDetails")}</p>
            <br />
            <div>
              <Link to="assessment">
                <Button className="rediectLink">
                  {t("assessmentHomepage.assessmentButton")}
                </Button>
              </Link>
            </div>
          </Col>

          <Col xs={10} sm={10} md={6} lg={6}>
            <img
              className="halfFullImage"
              src="https://i.ibb.co/17fcbqD/assessment-image.png"
              alt={t("assessmentHomepage.imageAlt")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Assessment;
