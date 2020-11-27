import React from "react";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const { t } = useTranslation();
  return (
    <div className="homePageHeader">
      <div className="homePageHeaderTitle">
        <h2>{t("homepage.header.title")}</h2>
        <h3>
          {t("homepage.header.text.0")}
          <br />
          {t("homepage.header.text.1")}
        </h3>
      </div>

      <img
        className="homePageHeaderImage"
        src={"https://i.ibb.co/wcgjfCY/HP2.png"}
        alt="Home Page Header"
      />
    </div>
  );
};
