import React from "react";
import "../index.css";
import PersonDisplay from "./PersonDisplay";
import { Row } from "react-bootstrap";

const STAFF_SPECS = [
  {
    title: "managerAssistant",
    photo: require("././images/staff0.png"),
  },
  {
    title: "generalManager",
    photo: require("././images/staff1.png"),
  },
  {
    title: "psychotherapist",
    photo: require("././images/staff2.png"),
  },
];

export default function peopleDisplay() {
  // we are assuming we won't hire the people that has same names, so using the name as key :D
  return (
    <Row>
      {STAFF_SPECS.map((staff) => {
        return (
          <PersonDisplay
            photo={staff.photo}
            translationKey={staff.title}
            key={staff.name}
          />
        );
      })}
    </Row>
  );
}
