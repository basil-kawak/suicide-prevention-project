import React from "react";
import { Container, Col, Form, Button, Nav, Modal } from "react-bootstrap";
import emailjs from "emailjs-com";
import { useTranslation } from "react-i18next";

const ContactUs = () => {
  const [successModalShow, setSuccessModalShow] = React.useState(false);
  const { t } = useTranslation();
  const SuccessModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("contact.alertThanks")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("contact.alertMessage")}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.onHide}>
            {t("contact.closeButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "default_service",
        "template_Uz0KFyDM",
        e.target,
        "user_31hCfU5FLOydTyY8iOnWx"
      )
      .then((result) => {
        setSuccessModalShow(true);
        document.forms["contactForm"].reset();
      });
  };

  return (
    <Container>
      <div className="contactCardContainer">
        <div className="followSide">
          <div className="followUs">
            <h2>{t("contact.contactUs.message.0")}</h2>
            <h3>{t("contact.contactUs.message.1")}</h3>
            <Col>
              <Nav className="socialCircle d-inline-flex p-2" md={3}>
                <Nav.Link href="#" className="iconLinkedin" title="Linkedin">
                  <i className="fa fa-linkedin"></i>
                </Nav.Link>
                <Nav.Link href="#" className="iconFacebook" title="Facebook">
                  <i className="fa fa-facebook"></i>
                </Nav.Link>
                <Nav.Link href="#" className="iconTwitter" title="Facebook">
                  <i className="fa fa-twitter"></i>
                </Nav.Link>
              </Nav>
            </Col>
          </div>
        </div>
        <div className="formSide">
          <h3>{t("contact.contactUs.form.title")}</h3>
          <Form name="contactForm" onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>{t("contact.contactUs.form.nameField")}</Form.Label>
                <Form.Control type="text" name="user_name" />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>
                  {t("contact.contactUs.form.surnameField")}
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <span className="redStar">*</span>
                {t("contact.contactUs.form.emailField")}
              </Form.Label>
              <Form.Control type="email" required name="user_email" />
              <Form.Text className="text-muted">
                <span className="redStar">*</span>
                {t("contact.contactUs.form.requiredMessage")}
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control
                as="textarea"
                rows="3"
                placeholder={t("contact.contactUs.form.callForReachingOut")}
                required
                name="message"
              />
              <Form.Text className="text-muted">
                {t("contact.contactUs.form.privacyMessage")}
              </Form.Text>
            </Form.Group>

            <SuccessModal
              show={successModalShow}
              onHide={() => setSuccessModalShow(false)}
            />
            <Button
              className="float-right"
              variant="primary"
              type="submit"
              value="Send"
            >
              {t("contact.contactUs.form.submitButton")}
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
