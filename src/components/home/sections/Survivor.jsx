import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "../index.css";
export const Survivor = () => {
  return (
    <Container className="w-100">
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}>
          <div className="homePagewholeCarousel">
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.ibb.co/nRstRwf/1-Survivor.png"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src="https://i.ibb.co/CJ1hmvM/2-Survivor.png"
                  alt="second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 quotes"
                  src="https://i.ibb.co/Jny15L3/3-Survivor.png"
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
