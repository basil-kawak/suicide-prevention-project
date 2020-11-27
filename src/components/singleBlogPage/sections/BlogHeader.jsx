import React from "react";
import { Row, Col, Container, Image } from "react-bootstrap";

export const BlogHeader = (props) => {
  const { blog } = props;

  return (
    <Container className="w-100">
      <Row className="singleBlogTopImages">
        <Col xs={12} md={12} lg={12}>
          <Image className="blogHeader" src={blog.imageURL} alt="Blog header" />
          <Image
            className="authorImage"
            src={blog.authorProfileImage}
            alt="Author"
            roundedCircle
          />
          <p className="authorTitle">{blog.author}</p>
        </Col>
      </Row>
    </Container>
  );
};
