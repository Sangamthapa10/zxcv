import React, { useState } from "react";
import { useGlobalContext } from "../Context";
import "./CSS/Otp.css";
const OTP = () => {
  const { setotp } = useGlobalContext();
  const [first, setfirst] = useState("");
  const [second, setsecond] = useState("");
  const [third, setthird] = useState("");
  const [fourth, setfourth] = useState("");

  function clickEvent(e, last) {
    if (e.target.value.length) {
      document.getElementById(last).focus();
    }
  }

  return (
    <div className="otp_container">
      <div className="userInput">
        <input
          className="otp_input"
          type="text"
          id="ist"
          maxLength="1"
          value={first}
          onChange={(e) => setfirst(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "sec")}
        />

        <input
          className="otp_input"
          type="text"
          id="sec"
          maxLength="1"
          onChange={(e) => setsecond(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "third")}
        />
        <input
          className="otp_input"
          type="text"
          id="third"
          maxLength="1"
          onChange={(e) => setthird(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "fourth")}
        />
        <input
          className="otp_input"
          onChange={(e) => setfourth(e.target.value)}
          type="text"
          id="fourth"
          maxLength="1"
          onKeyUp={() => setotp(first + second + third + fourth)}
        />
      </div>
    </div>
  );
};

export default OTP;
