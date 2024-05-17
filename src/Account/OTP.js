import React, { useRef, useState } from "react";
import "./CSS/OTP.css";
import { useGlobalContext } from "../Components/Context";

const OTP = (data) => {
  const { setotp } = useGlobalContext();
  const { registerdata } = data;
  console.log(registerdata);
  const [first, setfirst] = useState("");
  const [second, setsecond] = useState("");
  const [third, setthird] = useState("");
  const [fourth, setfourth] = useState("");
  //   const clickEvent = (e) => {
  //     alert(e.target.value);
  //   };
  function clickEvent(e, last) {
    if (last === "last") {
      alert("one");
      // setotp(first + second + third + fourth);
    } else {
      if (e.target.value.length) {
        document.getElementById(last).focus();
      }
    }
  }

  const [time, settime] = useState(0);
  return (
    <div className="otp_container">
      Enter Your Code We Sent to {registerdata.phone}
      {time}
      <div className="userInput">
        <input
          className="otp_input"
          type="text"
          id="ist"
          maxlength="1"
          value={first}
          onChange={(e) => setfirst(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "sec")}
        />

        <input
          className="otp_input"
          type="text"
          id="sec"
          maxlength="1"
          onChange={(e) => setsecond(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "third")}
        />
        <input
          className="otp_input"
          type="text"
          id="third"
          maxlength="1"
          onChange={(e) => setthird(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "fourth")}
        />
        <input
          className="otp_input"
          onChange={(e) => setfourth(e.target.value)}
          onKeyUp={(e) => clickEvent(e, "last")}
          type="text"
          id="fourth"
          maxlength="1"
        />
      </div>
    </div>
  );
};

export default OTP;
