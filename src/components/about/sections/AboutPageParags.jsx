import React from "react";
import { useTranslation } from "react-i18next";
import "../index.css";
import { Row } from "react-bootstrap";

export default function Paragraph() {
  const { t } = useTranslation();

  return (
    <Row>
      <div className="aboutParagraphs">
        <p>
          <big>
            <b>{t("aboutPart.bigText")}</b>
          </big>{" "}
          {t("aboutPart.purpose")}
        </p>
        <p>{t("aboutPart.goals")}</p>
        <p>{t("aboutPart.noAdsPolicy")}</p>
      </div>
    </Row>
  );
}
