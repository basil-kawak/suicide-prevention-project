import React from "react";
import { useTranslation } from "react-i18next";
import { Nav, Navbar } from "react-bootstrap";
import "./index.css";
import { Link } from "react-router-dom";
import LangDropdown from "./LangDropdown";
import LoggingMenu from "../../containers/auth/LoggingMenu";
export const NavBar = () => {
  const [isMovingSideMenu, setIsMovingSideMenu] = React.useState(false);
  const { t } = useTranslation();
  return (
    <div>
      <Navbar className="navBar">
        <div>
          <Nav.Item>
            <Link to="/">
              <img
                className="suljakLogo"
                src="https://i.ibb.co/L9GcrMY/LLogo-2.png"
                alt="Suljak Logo"
              />
            </Link>
          </Nav.Item>
        </div>
        <Nav.Item>
          <img
            onClick={() => setIsMovingSideMenu(!isMovingSideMenu)}
            className="hamburgerIcon"
            src="https://i.ibb.co/PQgDXbj/LLogo-4.png"
            alt="hamburger Icon"
          />
        </Nav.Item>
        <Nav
          className={`collapse navbar-collapse justify-content-end navbarItems
           ${!isMovingSideMenu ? "movingSideMenu" : ""}`}
        >
          <Nav.Item className="navItemsMargins">
            <Link to="/" className="navLink">
              {t("navbar.home")}
            </Link>
          </Nav.Item>
          <Nav.Item className="navItemsMargins">
            <Link to="/contact" className="navLink">
              {t("navbar.contact")}
            </Link>
          </Nav.Item>
          <Nav.Item className="navItemsMargins">
            <Link to="/about" className="navLink">
              {t("navbar.about")}
            </Link>
          </Nav.Item>
          <Nav.Item className="navItemsMargins">
            <Link to="/assessment" className="navLink">
              {t("navbar.assess")}
            </Link>
          </Nav.Item>
          <Nav.Item className="navItemsMargins">
            <Link to="/donation" className="navLink">
              {t("navbar.donate")}
            </Link>
          </Nav.Item>
          <Nav.Item className="navItemsMargins">
            <Link to="/blogs" className="navLink">
              {t("navbar.blogs")}
            </Link>
          </Nav.Item>
        </Nav>
        <div>
          <LoggingMenu />
        </div>
        <div>
          <LangDropdown />
        </div>
      </Navbar>
    </div>
  );
};
