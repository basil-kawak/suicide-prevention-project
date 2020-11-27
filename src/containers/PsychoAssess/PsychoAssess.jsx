import React from "react";
import { Container } from "react-bootstrap";
import "./index.css";
import { useTranslation } from "react-i18next";
import Questions from "./sections/Questions";
import { Header } from "./sections/Header";
import Footer from "../../components/common/Footer";

export default function PsychoAssess() {
  const { t } = useTranslation();

  return (
    <div>
      <Header />
      <Container>
        <h1 className="assesmentTitle">{t("assessment.title")}</h1>
        <Questions />
      </Container>
      <Footer />
    </div>
  );
}
