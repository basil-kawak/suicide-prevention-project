import React from "react";
import { Header } from "./sections/Header";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { useTranslation } from "react-i18next";
import Footer from "../../components/common/Footer";

export const Donation = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />

      <Container className="w-75">
        <Row className="donationPageTitle">
          <Col xs={12} md={12} lg={12}>
            <h1>{t("donation.header")}</h1>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <h2 className="secondaryTitle">{t("donation.secondaryHeader")}</h2>

            <article className="introParagraph">
              {t("donation.introParagraph.0")}
              <br />
              {t("donation.introParagraph.1")}
            </article>

            <article className="donateParagraph">
              <h3>{t("donation.donateParagraph.0")}</h3>
              {t("donation.donateParagraph.1")}
              <br />
              <p className="mailingPargraph">
                {t("donation.mailingParagraph.0")}
                <br />
                {t("donation.mailingParagraph.1")}
              </p>
            </article>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <section>
              <div className="mainTable">
                <div className="leftTableSection">
                  <div className="tableBlueSection">
                    <p className="leftCountNumbers">
                      5
                      <br />
                      <span className="leftActivityType">
                        {t("donation.tableContent.statistics.0")}
                      </span>
                    </p>
                  </div>

                  <div className="tableBlueSection">
                    <p className="leftCountNumbers">
                      3.1M
                      <br />
                      <span className="leftActivityType">
                        {t("donation.tableContent.statistics.1")}
                      </span>
                    </p>
                  </div>

                  <div className="tableBlueSection">
                    <p className="leftCountNumbers">
                      20K
                      <br />
                      <span className="leftActivityType">
                        {t("donation.tableContent.statistics.2")}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="rightTableSection">
                  <div className="tableBlueSection">
                    <p className="rightCountNumbers">
                      3000
                      <br />
                      <span className="rightActivityType">
                        {t("donation.tableContent.statistics.3")}
                      </span>
                    </p>
                  </div>

                  <div className="tableBlueSection">
                    <p className="rightCountNumbers">
                      28
                      <br />
                      <span className="rightActivityType">
                        {t("donation.tableContent.statistics.4")}
                      </span>
                    </p>
                  </div>

                  <div className="tableBlueSection">
                    <p className="rightCountNumbers">
                      220
                      <br />
                      <span className="rightActivityType">
                        {t("donation.tableContent.statistics.5")}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="tableSection">
                <div className="darkGreySection">
                  <img
                    className="tableSymbol"
                    src="https://i.ibb.co/0M25Rzj/tick-mark.png"
                    alt="Trick mark icon"
                  />
                  <p className="darkGreyColumn">
                    {t("donation.tableContent.greySection.tick")}
                  </p>
                </div>

                <div className="lightGreySection">
                  <img
                    className="tableSymbol"
                    src="https://i.ibb.co/LDKPgmn/gift-icon.png"
                    alt="Gift icon"
                  />
                  <p className="lightGreyColumn">
                    {t("donation.tableContent.greySection.gift")}
                  </p>
                </div>
              </div>

              <div className="tableSection">
                <div className="darkGreySection">
                  <img
                    className="tableSymbol"
                    src="https://i.ibb.co/85qjgNG/heart-icon.png"
                    alt="Heart icon"
                  />
                  <p className="darkGreyColumn">
                    {t("donation.tableContent.greySection.love")}
                  </p>
                </div>

                <div className="lightGreySection">
                  <img
                    className="tableSymbol"
                    src="https://i.ibb.co/34RCGp3/earth-icon.png"
                    alt="Earth icon"
                  />
                  <p className="lightGreyColumn">
                    {t("donation.tableContent.greySection.earth")}
                  </p>
                </div>
              </div>
            </section>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <section className="helpParagraph">
              <h3>{t("donation.helpParagraph.0")}</h3>
              <article>
                {t("donation.helpParagraph.1")}
                <br />
                {t("donation.helpParagraph.2")}
              </article>
            </section>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="wholeCarousel">
              <Carousel>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://i.ibb.co/xs5rwZj/survivor2.png"
                    alt="First slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://i.ibb.co/n85FZdS/survivor3.png"
                    alt="second slide"
                  />
                </Carousel.Item>

                <Carousel.Item>
                  <img
                    className="d-block w-100 quotes"
                    src="https://i.ibb.co/bRXGS5T/survivor1.png"
                    alt="Third slide"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={12} md={12} lg={12}>
            <section>
              <article className="introParagraph">
                {t("donation.endingParagraph.0")}
                <br />
                {t("donation.endingParagraph.1")}
              </article>
            </section>
          </Col>
        </Row>

        <Row>
          <div className="socialMedia">
            <a href="http://www.facebook.com">
              <img
                src="https://i.ibb.co/Jp1M5vp/Facebook-button-in-donation-page.png"
                alt="Facebook icon"
              />
            </a>

            <a href="http://www.twitter.com">
              <img
                src="https://i.ibb.co/DMV3TM9/Twitter-for-donation-page.png"
                alt="Twitter icon"
              />
            </a>

            <a href="http://www.instgram.com">
              <img
                src="https://i.ibb.co/7zkfzL2/Instgram-for-donation-page.png"
                alt="Instgram icon"
              />
            </a>
          </div>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};
