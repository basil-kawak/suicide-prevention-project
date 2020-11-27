import React from "react";
import "../index.css";
import { Container, Row } from "react-bootstrap";

export const Header = () => {
  return (
    <Container fluid>
      <Row>
        <img
          className="contactUsHeader"
          src={"https://i.ibb.co/xqC3sjG/contact-page.png"}
          alt="Contact us page header"
        />
      </Row>
    </Container>
  );
};
