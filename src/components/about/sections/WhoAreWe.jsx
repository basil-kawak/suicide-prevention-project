import React from "react";
import { useTranslation } from "react-i18next";
import "../index.css";
import { Row } from "react-bootstrap";

export default function WhoAreWe() {
  const { t } = useTranslation();

  return (
    <Row>
      <h1 className="whoAreWe">{t("whoAreWe.header")}</h1>
    </Row>
  );
}
