import React, { useState } from "react";
import "./CSS/Signup.css";
import Customaxios from "../Axios";
import { useGlobalContext } from "../Context";
import { useGoogleLogin } from "@react-oauth/google";
import FacebookLogin from "@greatsumini/react-facebook-login";
import Google from "./Google";
import OTP from "./OTP";
import axios from "axios";
//material ui
import Alert from "@mui/material/Alert";
import {
  Radio,
  Button,
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
//icons
import Instagram from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "../CustomIcons/GoogleIcon";

const SignUpform = () => {
  const initialRegisterData = Object.freeze({
    phone: "",
    password: "",
    password2: "",
    username: "",
    email: "",
  });
  const [registerdata, setregisterdata] = useState(initialRegisterData);
  const [phonevalidate, setphonevalidate] = useState("");
  const [emailvalidate, setemailvalidate] = useState("");
  const [passwordvalidate, setpasswordvalidate] = useState("");
  const [passwordnotmatch, setpasswordnotmatch] = useState("");
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleChanges = (e) => {
    if (e.target.name === "password2") {
      if (e.target.value.trim() === registerdata.password) {
        setpasswordnotmatch("validate");
      } else {
        setpasswordnotmatch("invalid");
      }
    }
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
        var qterm = e.target.value.trim();
        var validRegex =
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (validRegex.test(qterm)) {
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

  const { setlogin, otp, setsignin } = useGlobalContext();

  const [in_number, in_setnumber] = useState(true);
  const [in_otp, in_setotp] = useState(false);
  const [in_detail, in_setdetail] = useState(false);
  const [alert, setalert] = useState(false);
  const [alerttext, setalerttext] = useState("");
  const [loading, setloading] = useState(false);

  const Next = (e) => {
    settime(0);
    e.preventDefault();
    if (in_number === true) {
      if (
        registerdata.phone.length === 10 &&
        registerdata.password.length > 8 &&
        registerdata.password2.length > 8 &&
        registerdata.password === registerdata.password2
      ) {
        if (passwordvalidate === "validate" && phonevalidate === "validate") {
          setloading(true);
          Customaxios.post(`account/otp/`, {
            password: registerdata.password,
            phone: registerdata.phone,
          }).then((res) => {
            setloading(false);
            if (res.data.detail !== "Phone number already exists") {
              in_setotp(true);
              in_setnumber(false);
              in_setdetail(false);
              setalert(false);
            } else {
              setalert(true);
              setalerttext("Phone number already exists");
            }
          });
        }
      } else {
        if (registerdata.password.length < 8) setpasswordvalidate("invalid");
        if (registerdata.phone.length < 10) setphonevalidate("invalid");
        if (registerdata.password2.length < 1) setpasswordnotmatch("empty");
        if (registerdata.password !== registerdata.password2)
          setpasswordnotmatch("invalid");
      }
    } else if (in_otp === true) {
      setloading(true);
      Customaxios.post(`account/check_otp/`, {
        phone: registerdata.phone,
        otp: otp,
      }).then((res) => {
        setloading(false);
        in_setotp(false);
        in_setnumber(false);
        in_setdetail(true);
      });
    } else if (in_detail === true) {
      setloading(true);
      Customaxios.post(`account/signup/`, {
        username: registerdata.username,
        password: registerdata.password,
        email: registerdata.email,
        phone: registerdata.phone,
        otp: otp,
        gender: value ? value : null,
      })
        .then((res) => {
          if (res.status_code === 200) {
            setlogin(false);
            setloading(false);
            in_setotp(false);
            in_setnumber(true);
            in_setdetail(false);
            setsignin(false);
          }
        })
        .catch((error) => {});
    }
  };

  const Back = (e) => {
    e.preventDefault();
    if (in_detail === true) {
      in_setotp(true);
      in_setnumber(false);
      in_setdetail(false);
    } else if (in_otp === true) {
      in_setotp(false);
      in_setnumber(true);
      in_setdetail(false);
    }
  };

  const [time, settime] = useState(0);
  if (time < 30) {
    in_otp &&
      setTimeout(() => {
        increment();
      }, 1000);
    function increment() {
      settime(time + 1);
    }
  }

  const [ltype, setltype] = useState("normal");
  const [socialdata, setsocialdata] = useState([]);

  // Google login - @react-oauth/google
  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );
        setltype("google");
        setsocialdata({ name: res.data.name, email: res.data.email });
      } catch (err) {
        console.error("Google userinfo error", err);
      }
    },
    onError: (err) => console.error("Google login failed", err),
  });

  // Facebook login - @greatsumini/react-facebook-login
  const responseFacebook = (response) => {
    if (response && response.name) {
      setltype("fb");
      setsocialdata({ name: response.name, email: response.email || "" });
    }
  };

  // Instagram - Meta removed consumer Instagram OAuth.
  // Button retained for UI; shows an informational message on click.
  const handleInstagramClick = () => {
    setalert(true);
    setalerttext("Instagram login is currently unavailable. Please use another method.");
    setTimeout(() => setalert(false), 4000);
  };

  return (
    <>
      {ltype === "google" || ltype === "fb" ? (
        <Google data={socialdata} type={ltype} />
      ) : (
        <div className="signin_form">
          {alert && <Alert severity="info">{alerttext}</Alert>}

          {in_number && (
            <h1 style={{ fontWeight: "bold", margin: 0 }}>Sign up</h1>
          )}
          {in_detail && (
            <h1
              style={{
                fontWeight: "bold",
                margin: 0,
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              Enter Details
            </h1>
          )}

          {in_number && (
            <div className="social-container">
              {/* Facebook - @greatsumini/react-facebook-login */}
              <FacebookLogin
                appId="445505463664973"
                fields="name,email,picture"
                onSuccess={responseFacebook}
                onFail={(err) => console.error("Facebook login failed", err)}
                render={({ onClick }) => (
                  <span className="social" onClick={onClick}>
                    <FacebookIcon className="social_icons" />
                  </span>
                )}
              />

              {/* Google - @react-oauth/google */}
              <span className="social" onClick={() => googleLogin()}>
                <GoogleIcon
                  style={{ width: "18px !important", height: "18px !important" }}
                />
              </span>

              {/* Instagram - unavailable, button kept for UI */}
              <span className="social" onClick={handleInstagramClick}>
                <Instagram style={{ color: "rgba(253, 29, 29, 1)" }} />
              </span>
            </div>
          )}

          {in_number && <span>Create Account</span>}

          <div className="signup_input">
            {in_detail ? (
              <div>
                <TextField
                  autoComplete="new-password"
                  variant="outlined"
                  required
                  label="Enter Username"
                  name="username"
                  autoFocus
                  onChange={handleChanges}
                  margin="normal"
                  fullWidth
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  required
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="new-password"
                  onChange={handleChanges}
                  fullWidth
                  error={emailvalidate === "invalid"}
                  helperText={emailvalidate === "invalid" ? "Invalid Email" : ""}
                />
                <div className="gender_select">
                  <span style={{ display: "flex", alignItems: "center" }}>
                    <h3>Gender</h3>
                    <p style={{ paddingLeft: "10px", color: "gray" }}>
                      (optional*)
                    </p>
                  </span>
                  <div style={{ display: "grid" }}>
                    <FormControlLabel
                      onChange={handleChange}
                      checked={value === "Female"}
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      onChange={handleChange}
                      checked={value === "Male"}
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                    <FormControlLabel
                      onChange={handleChange}
                      checked={value === "Other"}
                      value="Other"
                      control={<Radio />}
                      label="Other"
                    />
                  </div>
                </div>
              </div>
            ) : in_otp ? (
              <div className="signup_otp_container">
                <span style={{ fontSize: "1.5rem" }}>
                  Enter Your Code We Sent to {registerdata.phone}
                </span>
                <h3 onClick={Back} style={{ color: "red", cursor: "pointer" }}>
                  Use a different Number
                </h3>
                <div className="signup_otp_container__">
                  <OTP registerdata={registerdata} />
                  {time < 30 ? (
                    <span style={{ placeSelf: "end" }} className="timer_otp">
                      {time} Sec
                    </span>
                  ) : (
                    <Button style={{ placeSelf: "end" }} variant="outlined">
                      Send Again
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div>
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
                  error={phonevalidate === "invalid"}
                  helperText={
                    phonevalidate === "invalid" ? " Invalid Phone Number" : ""
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">+977</InputAdornment>
                    ),
                  }}
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
                  error={passwordvalidate === "invalid"}
                  helperText={
                    passwordvalidate === "invalid"
                      ? "Must contain 8 characters and have 1 number"
                      : ""
                  }
                />
                <TextField
                  margin="normal"
                  variant="outlined"
                  required
                  name="password2"
                  label="Enter Password Again"
                  type="password"
                  autoComplete="new-password"
                  fullWidth
                  onChange={handleChanges}
                  error={
                    passwordnotmatch === "invalid" || passwordnotmatch === "empty"
                  }
                  helperText={
                    passwordnotmatch === "invalid"
                      ? "Password do not match"
                      : passwordnotmatch === "empty"
                      ? "Must contain 8 characters and have 1 number"
                      : ""
                  }
                />
              </div>
            )}
          </div>

          <button type="submit" onClick={(e) => Next(e)} className="sign-button">
            {loading ? (
              <div className="loading_btn">
                <div className="dot1"> </div>
                <div className="dot2"></div>
                <div className="dot3"></div>
              </div>
            ) : in_otp ? (
              "Check Otp"
            ) : (
              "SignUp"
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default SignUpform;
