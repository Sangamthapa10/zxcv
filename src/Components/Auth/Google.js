import React, { useState, useEffect } from "react";
import { TextField, Button } from "@material-ui/core";
import Customaxios from "../Axios";
import Otp from "./OTP";
import Alert from "@material-ui/lab/Alert";

import GoogleIcon from "../CustomIcons/GoogleIcon";
import { useGlobalContext } from "../Context";
import Facebook from "@material-ui/icons/Facebook";
const Google = ({ data, type }) => {
  const { otp, setlogin } = useGlobalContext();
  const initialRegisterData = Object.freeze({
    phone: "",
    password: "",
    username: data.name,
    email: data.email,
  });
  const [alerton, setalerton] = useState({
    alert: false,
    alerttext: "",
  });
  const [registerdata, setregisterdata] = useState(initialRegisterData);
  const [phonevalidate, setphonevalidate] = useState("");
  const [emailvalidate, setemailvalidate] = useState("");
  const [passwordvalidate, setpasswordvalidate] = useState("");
  const handleChanges = (e) => {
    // if (e.target.name === "password2") {
    //   if (e.target.value.trim() === registerdata.password) {
    //     setpasswordnotmatch("validate");
    //   } else {
    //     setpasswordnotmatch("invalid");
    //   }
    // }
    if (e.target.name === "password") {
      var term = e.target.value.trim();
      var re = new RegExp("^(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
      if (re.test(term)) {
        setpasswordvalidate("validate");
      } else {
        setpasswordvalidate("invalid");
      }
    }
    if (e.target.name === "phone") {
      if (e.target.value.length > 9) {
        var terms = e.target.value.trim();
        var res = new RegExp(
          "^(984|986|985|974|975|980|981|982|961|988|972|963)\\d{7}$"
        );
        if (res.test(terms)) {
          setphonevalidate("validate");
        } else {
          setphonevalidate("invalid");
        }
      }
    } else if (e.target.name === "email") {
      if (e.target.value.length > 9) {
        var termq = e.target.value.trim();

        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (validRegex.test(termq)) {
          setemailvalidate("validate");
        } else {
          setemailvalidate("invalid");
        }
      }
    }
    setregisterdata({
      ...registerdata,
      [e.target.name]: e.target.value.trim(),
    });
  };
  const [otpstep, setotpstep] = useState(false);
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/ ;secure";
  }
  const submit = () => {
    Customaxios.post(`account/socialregister/`, {
      username: registerdata.username ? registerdata.username : data.name,
      password: registerdata.password,
      email: registerdata.email ? registerdata.email : data.email,
      phone: registerdata.phone,
      otp: otp,
    })
      .then((res) => {
        if (res.status === 200) {
          Customaxios.post(`account/token/`, {
            grant_type: "password",
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
            username: registerdata.phone,
            password: registerdata.password,
          }).then((res) => {
            localStorage.setItem("axynghkwngasd", res.data.token.access_token);
            localStorage.setItem("refresh", res.data.token.refresh_token);
            localStorage.setItem("time", res.data.token.expires_in);
            localStorage.setItem("user", res.data.user.username);

            setCookie("refresh_token", res.data.refresh_token, 3600);
            console.log(res.data);
            setlogin(false);
          });
        }
      })
      .catch((error) => {
        if (error.status === 403) {
          setalerton({
            alert: true,
            alerttext: "Account with this number already exists",
          });
        }
      });
  };
  const send = (e) => {
    e.preventDefault();
    Customaxios.post(`account/otp/`, {
      password: registerdata.password,
      phone: registerdata.phone,
    }).then((res) => {
      if (res.data.detail === "Phone number already exists") {
        setalerton({
          alert: true,
          alerttext: "Account with this number already exists",
        });
      } else {
        setotpstep(true);
      }
    });
  };

  const [time, settime] = useState(0);
  if (time < 30) {
    otpstep &&
      setTimeout(() => {
        increment();
      }, 1000);

    function increment() {
      settime(time + 1);
    }
  }
  useEffect(() => {
    if (alerton.alert) {
      setTimeout(function one() {
        setalerton({
          alert: false,
          alerttext: "",
        });
      }, 6000);
    }
  }, [alerton.alert]);
  return (
    <div className="google_signup">
      {alerton.alert && (
        <span style={{ position: "absolute", top: "10px", left: 0, right: 0 }}>
          <Alert severity="error">{alerton.alerttext}</Alert>
        </span>
      )}
      <div
        style={{ zIndex: 10000000, background: "#fff", padding: "26px 16px" }}
      >
        {otpstep ? (
          <div className="signup_otp_container">
            <span style={{ fontSize: "1.5rem" }}>
              Enter Your Code We Sent to {registerdata.phone}
            </span>
            <div className="signup_otp_container__">
              <Otp registerdata={registerdata} />
              {time < 30 ? (
                <span style={{ placeSelf: "end" }} className="timer_otp">
                  {time} Sec
                </span>
              ) : (
                <div
                  style={{
                    placeSelf: "end",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <h6>Didn't Receive a Code ?</h6>
                  <Button
                    style={{ textTransform: "none", paddingLeft: "10px" }}
                  >
                    <h6 style={{ fontWeight: 600 }}> Send Again</h6>
                  </Button>
                </div>
              )}
            </div>
            <Button fullWidth onClick={submit} variant="outlined">
              Submit
            </Button>
          </div>
        ) : (
          <form style={{ display: "grid" }}>
            <span
              style={{
                display: "grid",
                gridGap: "9px",
                paddingBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "1.5rem",
                }}
              >
                We Received this detail from{" "}
                {type === "google" ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "5px",
                    }}
                  >
                    <GoogleIcon style={{ width: "18px", height: "18px" }} />
                    oogle
                  </span>
                ) : type === "fb" ? (
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: "5px",
                    }}
                  >
                    <Facebook style={{ color: "blue" }} />
                    acebook
                  </span>
                ) : (
                  ""
                )}
              </span>
              <h5>Fill the remaining one's</h5>
            </span>
            <TextField
              autoComplete="new-password"
              variant="outlined"
              required
              label="Fullname"
              name="username"
              autoFocus
              onChange={handleChanges}
              margin="normal"
              fullWidth
              value={data.name}
            />
            <TextField
              margin="normal"
              variant="outlined"
              required
              autoFocus
              name="email"
              label="Email"
              type="email"
              value={data.email}
              autoComplete="new-password"
              onChange={handleChanges}
              fullWidth
              error={emailvalidate === "invalid" ? true : false}
              helperText={`${
                emailvalidate === "invalid" ? "Invalid Phone Number" : ""
              }`}
            />
            <TextField
              fullWidth
              variant="outlined"
              required
              label="Enter Phone"
              name="phone"
              autoComplete="new-password"
              autoFocus
              onChange={handleChanges}
              margin="normal"
              error={phonevalidate === "invalid" ? true : false}
              helperText={`${
                phonevalidate === "invalid" ? " Invalid Phone Number" : ""
              }`}
            />
            <TextField
              fullWidth
              margin="normal"
              variant="outlined"
              required
              name="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              onChange={handleChanges}
              error={passwordvalidate === "invalid" ? true : false}
              helperText={`${
                passwordvalidate === "invalid"
                  ? "Must contain 8 characters and have 1 number"
                  : ""
              }`}
            />
            <button type="submit" onClick={send} className="sign-button">
              SUBMIT
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Google;
