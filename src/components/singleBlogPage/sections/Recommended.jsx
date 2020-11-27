import React from "react";
import { Row, Container } from "react-bootstrap";

export const Recommended = () => {
  return (
    <Container className="w-100">
      <Row>
        <div className="recommendedPost">
          <div>
            <img
              src="https://i.ibb.co/170vYHW/You-might-also-like-2.jpg"
              alt="recommended post"
            />
            <div className="postInfo">
              <p className="recommendedPostAuthorName">Amjad Ali</p>
              <p>&nbsp;.&nbsp;</p>
              <p>Mar 19, 2020</p>
            </div>
            <h4>How To Overcome Your Crises</h4>
          </div>
        </div>

        <div className="recommendedPost">
          <div>
            <img
              src="https://i.ibb.co/nM3Zb3N/You-might-also-like-1.jpg"
              alt="recommended post"
            />
            <div className="postInfo">
              <p className="recommendedPostAuthorName">Receb Yaseen</p>
              <p>&nbsp;.&nbsp;</p>
              <p>Jan20, 2020 </p>
            </div>
            <h4>How Far You Enlarge Your Fears</h4>
          </div>
        </div>
      </Row>
    </Container>
  );
};
