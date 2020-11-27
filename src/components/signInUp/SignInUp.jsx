import React from "react";
import "./index.css";
import SignIn from "./sections/SignIn";
import SignUp from "./sections/SignUp";
import { useState } from "react";

const SIGNING_IN_MODE = "SIGNING_IN";
const SIGNING_UP_MODE = "SIGNING_UP";

const SignInUp = () => {
  const [logging, setLogging] = useState(SIGNING_IN_MODE);

  const handleLoggingSwitch = () => {
    if (logging === SIGNING_IN_MODE) {
      setLogging(SIGNING_UP_MODE);
    } else {
      setLogging(SIGNING_IN_MODE);
    }
  };

  return (
    <div>
      {logging === "SIGNING_IN" ? (
        <SignIn handleLoggingSwitch={handleLoggingSwitch} />
      ) : (
        <SignUp handleLoggingSwitch={handleLoggingSwitch} />
      )}
    </div>
  );
};

export default SignInUp;
