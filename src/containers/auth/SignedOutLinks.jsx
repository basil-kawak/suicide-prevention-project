import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

const SignedOutLinks = () => {
  return (
    <div className="link signedOutLinks">
      <Link to="/login">Log In</Link>
    </div>
  );
};

export default SignedOutLinks;
