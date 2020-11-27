import React, { useState } from "react";
import "./index.css";
import { useTranslation } from "react-i18next";
import { Form, Container, Row, Col, Button, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addNewsletter } from "../../actions/authActions";

const Footer = (props) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNewsletter(email);
    setEmail("");
  };
  return (
    <div className="footer">
      <Container>
        <h3>{t("footer.header")}</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Row className="align-items-center">
            <Col>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="formControl"
                placeholder={t("footer.placeholder")}
                type="email"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit">{t("footer.submit")}</Button>
            </Col>
          </Form.Row>
        </Form>
        <Row className="footerInfo">
          <Col md={6} sm={6}>
            <p>
              (+90) 533-382-094 <br />
              suljak@suljak.com <br />
              {t("footer.address.0")}
              <br />
              {t("footer.address.1")}
              <br />
              {t("footer.copyright")} <br />
            </p>
          </Col>
          <Col md={3} sm={6}>
            <h4>{t("footer.follow")}</h4>
            <Nav className="socialCircle">
              <a
                href="https://5f3a88bbe029db000752d32c--istanbul-capstone-sdp.netlify.app/contact"
                rel="noopener noreferrer"
                target="_blank"
                className="iconLinkedin"
                title="Linkedin"
              >
                <i className="fa fa-linkedin"></i>
              </a>
              <a
                href="https://www.facebook.com/"
                rel="noopener noreferrer"
                target="_blank"
                className="iconFacebook"
                title="Facebook"
              >
                <i className="fa fa-facebook"></i>
              </a>
              <a
                href="https://twitter.com/"
                rel="noopener noreferrer"
                target="_blank"
                className="iconTwitter"
                title="Twitter"
              >
                <i className="fa fa-twitter"></i>
              </a>
            </Nav>
          </Col>
          <Col className="footerNavs" md={3} sm={6}>
            <Nav className="flex-column">
              <Link to="/">{t("footer.home")}</Link>
              <Link to="/contact">{t("footer.contact")}</Link>
              <Link to="/about">{t("footer.about")}</Link>
              <Link to="/assessment">{t("footer.assess")}</Link>
              <Link to="/donation">{t("footer.donate")}</Link>
              <Link to="/blogs">{t("footer.blogs")}</Link>
              <Link to="/login">{t("footer.login")}</Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewsletter: (email) => dispatch(addNewsletter(email)),
  };
};

export default connect(null, mapDispatchToProps)(Footer);
