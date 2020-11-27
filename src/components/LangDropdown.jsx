import React from "react";
import { useTranslation } from "react-i18next";
import "./langDropdown.css";

function LangDropdown() {
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="langDropdown">
      <select className="selectItem" onChange={(e) => handleChange(e)}>
        <option className="optionItem" value="en">
          {t("en.1")}
        </option>
        <option className="optionItem" value="tr">
          {t("tr.1")}
        </option>
        <option className="optionItem" value="ar">
          {t("ar.1")}
        </option>
      </select>
    </div>
  );
}

export default LangDropdown;
