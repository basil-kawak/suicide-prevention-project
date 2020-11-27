import React from "react";
import "../index.css";
import { Row, Col, Container } from "react-bootstrap";

export const BlogContent = (props) => {
  const { blog } = props;

  const createMarkup = () => {
    return { __html: blog.content };
  };

  return (
    <div>
      <Container className="w-100">
        <Row>
          <Col xs={10} md={10} lg={10} className="article">
            <h1>{blog.title}</h1>
            <p className="publishingDate">Last updated on {blog.date}</p>
            <div dangerouslySetInnerHTML={createMarkup()}></div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
