import React from "react";
import { Container, Col, Nav } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Info = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Col className="infoSection">
        <Nav.Link href="#">{t("contact.info.contactTitle")}</Nav.Link>
        <p>
          (+90) 533-382-094 <br />
          suljak@suljak.com <br />
          {t("contact.info.address")}
        </p>
      </Col>
      <Col className="infoSection">
        <Nav.Link href="#">{t("contact.info.businessHoursTitle")}</Nav.Link>
        <p>
          {t("contact.info.hotlineText")} <br />
          {t("contact.info.workingHours.0")}
          <br />
          {t("contact.info.workingHours.1")} <br />
          {t("contact.info.workingHours.2")}
        </p>
      </Col>
    </Container>
  );
};

export default Info;
