import React from "react";
import "./index.css";
import { Container } from "react-bootstrap";
import AboutParagraph from "./sections/AboutPageParags";
import WhoAreWe from "./sections/WhoAreWe";
import PeopleDisplay from "./sections/PeopleDisplay";
import { Header } from "./sections/Header";
import Footer from "../common/Footer";

function About() {
  return (
    <>
      <div>
        <Header />
        <Container>
          <WhoAreWe />
          <AboutParagraph />
          <PeopleDisplay />
        </Container>
        <Footer />
      </div>
    </>
  );
}

export default About;
