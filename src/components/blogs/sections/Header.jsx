import React from "react";
import "../index.css";
import { Container, Row } from "react-bootstrap";

export const Header = () => {
  return (
    <Container fluid>
      <Row>
        <img
          className="blogsPageHeader"
          src={"https://i.ibb.co/JpN8KLK/blogs-page.png"}
          alt="Blog page header"
        />
      </Row>
    </Container>
  );
};
