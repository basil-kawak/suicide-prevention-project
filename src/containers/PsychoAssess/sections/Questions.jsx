import React from "react";
import { useTranslation } from "react-i18next";
import { Col, Row, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../index.css";

const OPTION_QUANTITY = 4;
const QUESTION_QUANTITY = 13;
const Scores = {
  VERY_SEVERE: 52,
  SEVERE: 25,
  MODERATE: 18,
  MILD: 13,
  LIGHT: 7,
  ANSWERS_MISSING: -15,
};

export default function Questions() {
  const [submitModalShow, setSubmitModalShow] = React.useState(false);
  const { t } = useTranslation();

  const SubmitModal = (props) => {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {t("assessment.title")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{showResults(calculateScore())}</Modal.Body>
        <Modal.Footer>
          <Link to="/contact">
            <Button className="testContactButton" variant="primary">
              {t("assessment.contactButton")}
            </Button>
          </Link>
          <Button className="testDoneButton" onClick={props.onHide}>
            {t("assessment.closeButton")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const showResults = (score) => {
    if (score !== Scores.ANSWERS_MISSING) {
      if (score >= Scores.VERY_SEVERE) {
        return (
          <>
            <span className="resultCategory">
              {t("assessment.verySevere.2")}
            </span>
            <h3>{t("assessment.verySevere.0")}</h3>
            <h6>{t("assessment.submitSuccess")}</h6>
            <h4>{t("assessment.verySevere.1")}</h4>
          </>
        );
      } else if (score >= Scores.SEVERE) {
        return (
          <>
            <span className="resultCategory">{t("assessment.severe.2")}</span>
            <h5>{t("assessment.severe.0")}</h5>
            <h6>{t("assessment.submitSuccess")}</h6>
            <p>{t("assessment.severe.1")}</p>
            <Link to="/contact">
              <Button className="testSubmitButton" variant="primary">
                {t("assessment.contactButton")}
              </Button>
            </Link>
          </>
        );
      } else if (score >= Scores.MODERATE) {
        return (
          <>
            <span className="resultCategory">{t("assessment.moderate.2")}</span>
            <h5>{t("assessment.moderate.0")}</h5>
            <h6>{t("assessment.submitSuccess")}</h6>
            <p>{t("assessment.moderate.1")}</p>
          </>
        );
      } else if (score >= Scores.MILD) {
        return (
          <>
            <span className="resultCategory">{t("assessment.mild.2")}</span>
            <h5>{t("assessment.mild.0")}</h5>
            <h6>{t("assessment.submitSuccess")}</h6>
            <p>{t("assessment.mild.1")}</p>
          </>
        );
      } else if (score >= Scores.LIGHT) {
        return (
          <>
            <span className="resultCategory">{t("assessment.light.2")}</span>
            <h5>{t("assessment.light.0")}</h5>
            <h6>{t("assessment.submitSuccess")}</h6>
            <p>{t("assessment.light.1")}</p>
          </>
        );
      }
    }
    return <h5>{t("assessment.answerMissing")}</h5>;
  };

  let userScore = 0;
  const calculateScore = () => {
    const radioButtons = document.getElementsByClassName("testChoice");
    let checkedRadioNumber = 0;
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons.item(i).checked) {
        userScore += parseInt(radioButtons.item(i).value);
        checkedRadioNumber++;
      }
    }
    if (checkedRadioNumber === QUESTION_QUANTITY) {
      return userScore;
    }
    return Scores.ANSWERS_MISSING;
  };

  let questionCount = 0;
  const renderQuestions = () => {
    const questions = [];
    for (let j = 0; j < QUESTION_QUANTITY; j++) {
      questions.push(
        <Row key={`question${questionCount}`} className="questionContainer">
          <Col xs={12} md={12} lg={12}>
            <h3 className="questionTitle">{t(`questions.${j}.title`)}</h3>
          </Col>
          <Col xs={12} md={12} lg={12} className="questionAnswers">
            <ul>{renderQuestionAnswers()}</ul>
          </Col>
        </Row>
      );
      questionCount++;
    }
    return questions;
  };

  const renderQuestionAnswers = () => {
    const options = [];
    for (let i = 0; i < OPTION_QUANTITY; i++) {
      options.push(
        <li key={`question${questionCount}.${i}`} className="form-check">
          <input
            className="form-check-input testChoice"
            type="radio"
            name={`question${questionCount}`}
            value={`${i}`}
          />
          <label className="form-check-label" htmlFor="exampleRadios1">
            {t(`questions.${questionCount}.multiple.${i}`)}
          </label>
        </li>
      );
    }
    return options;
  };

  return (
    <>
      <Col className="assessContainer">
        <div className="assessExplanation">
          <p>{t("assessExplanation.0")}</p>
          <p>{t("assessExplanation.1")}</p>
        </div>
        {renderQuestions()}
        <Row className="testSubmitButtonRow">
          <Button
            variant="primary"
            className="testSubmitButton"
            onClick={() => {
              setSubmitModalShow(true);
            }}
          >
            Submit
          </Button>
        </Row>
        <SubmitModal
          show={submitModalShow}
          onHide={() => setSubmitModalShow(false)}
        />
      </Col>
    </>
  );
}
