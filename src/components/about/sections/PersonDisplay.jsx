import React from "react";
import { useTranslation } from "react-i18next";
import { Col } from "react-bootstrap";
import "../index.css";
export default function PersonDisplay(props) {
  const { t } = useTranslation();
  return (
    <Col xs={12} md={6} lg={4} className="staffPhotoContainer">
      <img className="staffPic" alt="Staff Member" src={props.photo} />
      <br />
      <span className="staffNameSpan">{t(props.translationKey + ".name")}</span>
      <br />
      <span className="staffTitleSpan">
        {t(props.translationKey + ".title")}
      </span>
    </Col>
  );
}
