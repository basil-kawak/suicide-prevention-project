import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Container, Col, Row } from "react-bootstrap";

const Stories = () => {
  const { t } = useTranslation();
  return (
    <div className="stories">
      <Container>
        <Row>
          <Col xs={10} sm={10} md={6} lg={6}>
            <h1>{t("stories.heading")}</h1>
            <p>{t("stories.shareYourStory")}</p>
            <br />
            <div>
              <Link to="/blogs">
                <span className="readMore">{t("stories.readMore")}</span>
              </Link>
            </div>
          </Col>

          <Col xs={10} sm={10} md={6} lg={6}>
            <img
              className="halfFullImage"
              src="https://i.ibb.co/HqmDtgk/Stories-Image.png"
              alt={t("stories.imageAlt")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Stories;
