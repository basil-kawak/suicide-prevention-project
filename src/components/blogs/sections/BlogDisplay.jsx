import React from "react";
import { Col, Row } from "react-bootstrap";
import "../index.css";

export default function BlogDisplay(props) {
  const { blog } = props;

  const createMarkup = () => {
    return { __html: blog.content };
  };

  return (
    <>
      <Col className="oneLineBlogpost ">
        <Row>
          <Col xs={12} md={6} className="blogPhotoContainer">
            <img
              className="blogPic"
              src={blog.imageURL}
              alt="Blog Post Content"
            />
            <br />
          </Col>
          <Col xs={12} md={6} className="blogPhotoTextContent">
            <h4>{blog.title}</h4>
            <div
              dangerouslySetInnerHTML={createMarkup()}
              className="blogContentDisplay"
            ></div>
          </Col>
        </Row>
      </Col>
    </>
  );
}
