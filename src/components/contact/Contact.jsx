import React from "react";
import "./index.css";
import { Image } from "react-bootstrap";
import header from "./images/contact-page.png";
import Info from "./sections/Info";
import ContactUs from "./sections/ContactUs";
import Footer from "../common/Footer";

export const Contact = () => {
  return (
    <>
      <div className="contactHeader">
        <Image src={header} />
      </div>
      <ContactUs />
      <Info />
      <Footer />
    </>
  );
};
