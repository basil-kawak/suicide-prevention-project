import React from "react";
import "../index.css";
import { Container, Row } from "react-bootstrap";

export const Header = () => {
  return (
    <Container fluid>
      <Row>
        <img
          className="aboutPageHeader"
          src={"https://i.ibb.co/f170zGQ/About-Page3.png"}
          alt="About page header"
        />
      </Row>
    </Container>
  );
};
