import React from "react";
import "../index.css";
import { Container, Row } from "react-bootstrap";

export const Header = () => {
  return (
    <Container fluid>
      <Row>
        <img
          className="assessmentHeader"
          src={"https://i.ibb.co/bFKMYtL/assessment-header.png"}
          alt="Contact us page header"
        />
      </Row>
    </Container>
  );
};
